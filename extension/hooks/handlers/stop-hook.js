import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { evaluateLoopLimits } from '../../services/loop-limits.js';
import { isSamePathOrDescendant, readStateFile, resolveStateFilePath, writeStateFile, } from '../../services/session-state.js';
function createLogger(extensionDir, sessionDir) {
    const globalDebugLog = path.join(extensionDir, 'debug.log');
    const sessionHooksLog = sessionDir ? path.join(sessionDir, 'hooks.log') : null;
    return (level, message) => {
        const line = `[${new Date().toISOString()}] [StopHookJS] [${level}] ${message}\n`;
        try {
            fs.appendFileSync(globalDebugLog, line);
        }
        catch {
            // Ignore logging failures.
        }
        if (sessionHooksLog) {
            try {
                fs.appendFileSync(sessionHooksLog, line);
            }
            catch {
                // Ignore logging failures.
            }
        }
    };
}
function allow() {
    console.log(JSON.stringify({ decision: 'allow' }));
}
function block(message, additionalContext) {
    console.log(JSON.stringify({
        decision: 'block',
        systemMessage: message,
        hookSpecificOutput: {
            hookEventName: 'AfterAgent',
            additionalContext,
        },
    }));
}
function readHookInput() {
    try {
        const raw = fs.readFileSync(0, 'utf8');
        return JSON.parse(raw || '{}');
    }
    catch {
        return {};
    }
}
// Read research_state.json if present
function readResearchState(cwd) {
    const stateFile = path.join(cwd, 'research_state.json');
    try {
        if (!fs.existsSync(stateFile)) return null;
        return JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    } catch { return null; }
}
async function main() {
    const extensionDir = process.env.EXTENSION_DIR || path.join(os.homedir(), '.gemini/extensions/pickle-rick');
    const input = readHookInput();
    const stateFile = resolveStateFilePath(extensionDir, process.cwd(), process.env.PICKLE_STATE_FILE);
    if (!stateFile) {
        allow();
        return;
    }
    const state = readStateFile(stateFile);
    const log = createLogger(extensionDir, state?.session_dir);
    if (!state) {
        log('WARN', `Failed to read state file: ${stateFile}`);
        allow();
        return;
    }
    if (!isSamePathOrDescendant(process.cwd(), state.working_dir)) {
        log('INFO', `Skipped due to cwd mismatch. cwd=${process.cwd()} working_dir=${state.working_dir}`);
        allow();
        return;
    }
    if (!state.active) {
        log('INFO', 'Session inactive; allowing stop.');
        allow();
        return;
    }
    const role = process.env.PICKLE_ROLE;
    const isWorker = role === 'worker' || state.worker === true;
    const responseText = input.prompt_response || '';
    const promptContext = state.original_prompt || '';
    const limits = evaluateLoopLimits(state);
    if (limits.exceeded) {
        state.active = false;
        writeStateFile(stateFile, state);
        log('WARN', limits.message ?? 'Loop limit reached.');
        allow();
        return;
    }
    // --- Original SDLC promise tokens (unchanged) ---
    const hasPromise = !!state.completion_promise &&
        responseText.includes(`<promise>${state.completion_promise}</promise>`);
    const isEpicDone = responseText.includes('<promise>EPIC_COMPLETED</promise>');
    const isTaskFinished = responseText.includes('<promise>TASK_COMPLETED</promise>');
    const isWorkerDone = isWorker && responseText.includes('<promise>I AM DONE</promise>');
    const isPrdDone = !isWorker && responseText.includes('<promise>PRD_COMPLETE</promise>');
    const isBreakdownDone = !isWorker && responseText.includes('<promise>BREAKDOWN_COMPLETE</promise>');
    const isTicketSelected = !isWorker && responseText.includes('<promise>TICKET_SELECTED</promise>');
    const isTicketDone = !isWorker && responseText.includes('<promise>TICKET_COMPLETE</promise>');
    const isTaskDone = !isWorker && responseText.includes('<promise>TASK_COMPLETE</promise>');
    // --- DEEPICKLE research promise tokens ---
    const researchState = readResearchState(process.cwd());
    const isResearchMode = !!researchState;
    // VALIDATION_PASSED only honoured if rubric_score >= 80 (Jerry-proof gate)
    const rubricScore = researchState?.rubric_score ?? 0;
    const isValidationPassed = !isWorker &&
        responseText.includes('<promise>VALIDATION_PASSED</promise>') &&
        rubricScore >= 80;
    const isResearchComplete = !isWorker &&
        responseText.includes('<promise>RESEARCH_COMPLETE</promise>');
    const isCouncilComplete = !isWorker &&
        responseText.includes('<promise>COUNCIL_COMPLETE</promise>');
    // False VALIDATION_PASSED (rubric < 80) — catch and re-inject
    const isFalseValidation = !isWorker &&
        responseText.includes('<promise>VALIDATION_PASSED</promise>') &&
        rubricScore < 80;
    if (hasPromise || isEpicDone || isTaskFinished || isWorkerDone) {
        if (!isWorker) {
            state.active = false;
            writeStateFile(stateFile, state);
        }
        log('INFO', 'Allowing stop due to completion token.');
        allow();
        return;
    }
    // DEEPICKLE terminal exits
    if (isValidationPassed) {
        if (!isWorker) {
            state.active = false;
            writeStateFile(stateFile, state);
        }
        log('INFO', `Allowing stop: VALIDATION_PASSED with rubric score ${rubricScore}/100.`);
        allow();
        return;
    }
    if (isFalseValidation) {
        const feedback = `Jerry move detected. VALIDATION_PASSED emitted but rubric score is ${rubricScore}/100. Minimum is 80. Do not declare victory on a Jerry score. Re-run validation, fix gaps, try again.`;
        log('WARN', `Blocked false VALIDATION_PASSED. rubric_score=${rubricScore}`);
        block(feedback, promptContext);
        return;
    }
    if (isPrdDone || isBreakdownDone || isTicketSelected || isTicketDone || isTaskDone) {
        let feedback = 'Pickle Rick loop active.';
        if (isPrdDone)
            feedback = 'PRD complete. Proceed to Breakdown.';
        if (isBreakdownDone)
            feedback = 'Breakdown complete. Proceed to ticket execution.';
        if (isTicketSelected)
            feedback = 'Ticket selected. Begin research.';
        if (isTicketDone || isTaskDone)
            feedback = 'Ticket complete. Continue with validation or next ticket.';
        log('INFO', `Blocking stop for checkpoint token. feedback="${feedback}"`);
        block(feedback, promptContext);
        return;
    }
    if (isResearchComplete) {
        log('INFO', 'RESEARCH_COMPLETE token found. Proceeding to validation.');
        block('Research phase complete. Proceed to VALIDATE step. Run rubric scoring against validation.json. Do not stop until VALIDATION_PASSED with rubric >= 80.', promptContext);
        return;
    }
    if (isCouncilComplete) {
        log('INFO', 'COUNCIL_COMPLETE token found. Council round finished.');
        block('Council round complete. Integrate council findings into the synthesis. Re-score rubric. If score >= 80, emit VALIDATION_PASSED. If not, loop.', promptContext);
        return;
    }
    if (isResearchMode) {
        const step = researchState?.current_step ?? 'UNKNOWN';
        const coverage = researchState?.coverage_score ?? 'N/A';
        const rubric = researchState?.rubric_score ?? 'N/A';
        const iterationSummary = `Pickle Rick RESEARCH loop active (Iteration ${state.iteration}/${state.max_iterations > 0 ? state.max_iterations : '∞'}) | Step: ${step} | Coverage: ${coverage} | Rubric: ${rubric}/100`;
        log('INFO', 'Blocking stop: research mode active, no terminal token found.');
        block(iterationSummary, promptContext);
        return;
    }
    const iterationSummary = state.max_iterations > 0
        ? `Pickle Rick loop active (Iteration ${state.iteration}/${state.max_iterations}).`
        : `Pickle Rick loop active (Iteration ${state.iteration}).`;
    log('INFO', 'Blocking stop by default (loop continues).');
    block(iterationSummary, promptContext);
}
main().catch(() => allow());

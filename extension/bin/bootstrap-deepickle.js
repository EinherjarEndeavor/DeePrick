#!/usr/bin/env node
import * as fs from 'node:fs';
import * as path from 'node:path';
import { execFileSync } from 'node:child_process';
import { getExtensionRoot, printMinimalPanel, Style } from '../services/pickle-utils.js';
import { readStateFile, resolveStateFilePath } from '../services/session-state.js';

function die(message) {
  console.error(`${Style.RED}❌ Error: ${message}${Style.RESET}`);
  process.exit(1);
}

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return fallback;
  }
}

function writeJsonIfMissing(filePath, payload) {
  if (fs.existsSync(filePath)) {
    return false;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf8');
  return true;
}

function copyIfMissing(sourcePath, targetPath) {
  if (fs.existsSync(targetPath)) {
    return false;
  }
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);
  return true;
}

function parseArgs(argv) {
  const parsed = {
    mode: 'outward',
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--mode') {
      const value = argv[i + 1];
      if (!value || value.startsWith('-')) {
        throw new Error('Missing value for --mode');
      }
      if (!['outward', 'inward', 'hybrid'].includes(value)) {
        throw new Error(`Invalid --mode value: ${value}`);
      }
      parsed.mode = value;
      i++;
    }
  }
  return parsed;
}

function ensureSqliteBootstrap(dbPath, schemaPath) {
  if (fs.existsSync(dbPath)) {
    return 'existing';
  }
  try {
    execFileSync('sqlite3', [dbPath, `.read ${schemaPath}`], {
      stdio: 'ignore',
      shell: true,
    });
    return 'created';
  } catch {
    return 'deferred';
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const extensionRoot = getExtensionRoot();
  const stateFile = resolveStateFilePath(extensionRoot, process.cwd(), process.env.PICKLE_STATE_FILE);
  if (!stateFile) {
    die('No active Pickle Rick session found for the current directory. Run the setup phase first.');
  }
  const state = readStateFile(stateFile);
  if (!state) {
    die(`Unable to read state file at ${stateFile}`);
  }

  const workingDir = state.working_dir || process.cwd();
  const sessionId = path.basename(state.session_dir || path.dirname(stateFile));
  const localRoot = path.join(workingDir, '.deepickle');
  const artifactsDir = path.join(localRoot, 'artifacts', sessionId);
  const runtimeSqlDir = path.join(localRoot, 'sql');
  const runtimeDbDir = path.join(localRoot, 'db');
  const runtimeDbPath = path.join(runtimeDbDir, 'deepickle.db');

  const configTemplatePath = path.join(workingDir, 'config', 'deepickle.config.example.json');
  const providersTemplatePath = path.join(workingDir, 'config', 'providers.example.json');
  const artifactIndexTemplatePath = path.join(workingDir, 'templates', 'ARTIFACT_INDEX.md');
  const glossaryTemplatePath = path.join(workingDir, 'templates', 'GLOSSARY.md');
  const schemaPath = path.join(workingDir, 'data', 'sql', 'deepickle_schema.sql');

  const created = [];
  fs.mkdirSync(artifactsDir, { recursive: true });
  fs.mkdirSync(runtimeSqlDir, { recursive: true });
  fs.mkdirSync(runtimeDbDir, { recursive: true });

  if (copyIfMissing(configTemplatePath, path.join(localRoot, 'config.json'))) {
    created.push('.deepickle/config.json');
  }
  if (copyIfMissing(providersTemplatePath, path.join(localRoot, 'providers.json'))) {
    created.push('.deepickle/providers.json');
  }
  if (copyIfMissing(artifactIndexTemplatePath, path.join(localRoot, 'ARTIFACT_INDEX.md'))) {
    created.push('.deepickle/ARTIFACT_INDEX.md');
  }
  if (copyIfMissing(glossaryTemplatePath, path.join(localRoot, 'GLOSSARY.md'))) {
    created.push('.deepickle/GLOSSARY.md');
  }
  if (copyIfMissing(schemaPath, path.join(runtimeSqlDir, 'deepickle_schema.sql'))) {
    created.push('.deepickle/sql/deepickle_schema.sql');
  }

  const config = readJson(path.join(localRoot, 'config.json'), {});
  const providers = readJson(path.join(localRoot, 'providers.json'), { providers: [] });
  writeJsonIfMissing(path.join(localRoot, 'provider_budget.json'), {
    session_id: sessionId,
    providers: {
      serp: { used: 0, limit: config?.limits?.serp_runs ?? 0 },
      exa: { used: 0, limit: config?.limits?.exa_runs ?? 0 },
      tavily: { used: 0, limit: config?.limits?.tavily_runs ?? 0 },
    },
  });

  const researchState = {
    mode: args.mode,
    deliverable_type: config?.deliverable_type ?? 'report',
    current_step: 'FRAME',
    coverage_score: 0,
    rubric_score: 0,
    storm_enabled: Number(config?.storm_level ?? 0) > 0,
    question_tree_complete: false,
    premium_escalations_used: {
      exa: 0,
      tavily: 0,
      serp: 0,
    },
    budget_profile: 'balanced',
    open_questions: [],
    contested_claims: [],
    last_transition_reason: 'Bootstrap complete',
    session_id: sessionId,
    active_modules: [],
    providers_configured: Array.isArray(providers?.providers) ? providers.providers.filter((p) => p && p.enabled).map((p) => p.name) : [],
  };
  fs.writeFileSync(path.join(localRoot, 'research_state.json'), JSON.stringify(researchState, null, 2), 'utf8');
  fs.writeFileSync(path.join(workingDir, 'research_state.json'), JSON.stringify(researchState, null, 2), 'utf8');

  const sqliteStatus = ensureSqliteBootstrap(runtimeDbPath, path.join(runtimeSqlDir, 'deepickle_schema.sql'));

  printMinimalPanel('DeePrick Bootstrap Ready', {
    Mode: args.mode,
    Session: sessionId,
    Root: localRoot,
    Artifacts: artifactsDir,
    Database: sqliteStatus === 'deferred' ? 'deferred (sqlite3 unavailable)' : runtimeDbPath,
    Created: created.length > 0 ? created.join(', ') : 'no new files',
  }, 'CYAN', '🧪');
}

main();

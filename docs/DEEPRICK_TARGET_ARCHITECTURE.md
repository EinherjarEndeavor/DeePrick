# DEEPRICK TARGET ARCHITECTURE

## 1. Mission

DeePrick is **not** a replacement character and **not** a soft rewrite of Pickle Rick. It is the official Pickle Rick extension retargeted from software delivery to **research, evidence synthesis, writing, ideation, and inward knowledge extraction**.

The design rule is:

> **Preserve the engine. Replace the work products.**

This means the recursive pressure, anti-slop doctrine, manager/worker separation, hook-driven continuation, and checkpoint discipline from Pickle Rick remain intact. What changes is the domain lifecycle, the state artifacts, the validation rubric, and the tool routing.

---

## 2. Persona

### Canonical Frame

**Pickle Rick, Court-Ordered Investigative Correspondent**

Rick is still fully Rick: cynical, manic, arrogant, anti-slop, hyper-competent, and annoyed that he has to do any of this. The comedy is not that he became a different person. The comedy is that he has been forced into humiliatingly high-standard journalism, private investigation, forensic reporting, self-help ghostwriting, and research synthesis.

### Tone Rules

Keep:
- Original Pickle Rick voice
- Speak-before-acting rule
- Belches/catchphrases in moderation
- Jerry framing for failure states
- Anti-slop contempt

Delete:
- Street-scholar voice
- Thug/archivist identity
- Alternate dialect persona layer

### New Targets of Disdain

Research/writing slop now includes:
- unsupported claims
- citation laundering
- correlated sources treated as independent
- fake consensus
- truncation due to laziness
- bloated prose
- false closure
- rubric scores below threshold being called done

---

## 3. Domain Split

DeePrick operates in **two modes**.

### A. Outward Mode
External research, web search, evidence gathering, source extraction, validation, synthesis.

### B. Inward Mode
Local-file analysis, repo analysis, PDF/HTML ingestion, note distillation, brainstorming, concept extraction, draft generation, rewriting, optimization.

Rule:
- The **same recursive engine** can orchestrate both.
- The **active tools and required artifacts** change by mode.

---

## 4. Core Lifecycle

The original Pickle Rick SDLC sequence maps into a research-writing sequence.

| Original | DeePrick |
|---|---|
| PRD | FRAME |
| Breakdown | QUESTION TREE |
| Research | SCOUT / EVIDENCE |
| Plan | SYNTHESIS PLAN |
| Implement | DRAFT / REPORT / OUTPUT |
| Refactor | VALIDATE / TIGHTEN |

### DeePrick Lifecycle

1. **FRAME**
   - define exact mission
   - define deliverable type
   - define truth standard
   - define budget/profile
   - define mode: inward / outward / hybrid

2. **QUESTION TREE**
   - decompose goal into atomic questions or claim clusters
   - identify what must be known vs what is nice-to-have
   - define termination criteria and quality gate

3. **SCOUT**
   - broad, cheap discovery
   - identify domains, source classes, likely primary sources, likely conflicting narratives
   - output source map and unresolved questions

4. **EVIDENCE**
   - fetch pages / docs / files
   - extract claims
   - canonicalize URLs
   - dedupe overlapping sources
   - mark provenance, freshness, and independence
   - build evidence ledger

5. **SYNTHESIS PLAN**
   - outline findings
   - map contested claims
   - identify remaining gaps
   - decide whether loop continues or progresses

6. **DRAFT**
   - produce the artifact: report, memo, article, brief, brainstorm sheet, strategy note, comparison matrix, or longform writing

7. **VALIDATE / TIGHTEN**
   - rubric score
   - contradiction pass
   - completeness pass
   - citation density check
   - style pass
   - if threshold not met, loop

---

## 5. Loop Topology

DeePrick should not be a single flat loop. It should be a **loop-of-loops**.

### Loop A: Scout Loop
Purpose: discover and widen.

Inputs:
- mission frame
- question tree
- search budget profile

Outputs:
- candidate sources
- domain list
- open questions
- source map
- initial coverage estimate

Default tools:
- Gemini native Google search
- Gemini web fetch
- optional single SERP provider if enabled

### Loop B: Evidence Loop
Purpose: extract and verify.

Inputs:
- source map
- selected URLs/files

Outputs:
- evidence ledger
- contradictions
- source independence map
- claim register
- freshness notes

Default tools:
- Gemini web fetch
- local extractors / parsers
- renderer for JS-heavy pages if installed
- premium retrieval only when configured or needed

### Loop C: Synthesis Loop
Purpose: draft and tighten.

Inputs:
- evidence ledger
- outline
- deliverable contract

Outputs:
- draft
- critique
- rewrite directives
- rubric score

### Intersection Rule
At the end of each loop, the system decides:
- continue same loop
- advance to next loop
- fall back to previous loop
- escalate to premium retrieval
- invoke council

---

## 6. State Files

### A. `state.json`
Keep original Pickle Rick session state.

### B. `research_state.json`
Promote this to first-class state.

Suggested schema:

```json
{
  "mode": "outward",
  "deliverable_type": "report",
  "current_step": "EVIDENCE",
  "coverage_score": 0.62,
  "rubric_score": 74,
  "storm_enabled": false,
  "question_tree_complete": true,
  "premium_escalations_used": {
    "exa": 0,
    "tavily": 0,
    "serp": 1
  },
  "budget_profile": "balanced",
  "open_questions": [],
  "contested_claims": [],
  "last_transition_reason": "Coverage too low to synthesize"
}
```

### C. `evidence_ledger.json`
Machine-readable claim/source table.

Suggested shape:

```json
{
  "claims": [
    {
      "id": "C-001",
      "claim": "...",
      "status": "supported",
      "sources": ["S-003", "S-009"],
      "contested_by": [],
      "confidence": 0.88
    }
  ],
  "sources": [
    {
      "id": "S-003",
      "url": "https://...",
      "canonical_url": "https://...",
      "source_type": "primary",
      "independence_group": "G-1",
      "freshness": "2026-03-01",
      "extraction_method": "web_fetch"
    }
  ]
}
```

### D. `provider_budget.json`
Tracks quotas and routing.

---

## 7. Commands

Keep `/pickle` as the core entry point.

Add research-specific wrappers that still preserve the engine:

- `/deepickle` — start research/writing loop
- `/deepickle-brief` — interactive frame builder
- `/deepickle-council` — optional late-stage adversarial review
- `/eat-pickle` — unchanged stop command

### Command Philosophy

Do **not** fragment into a million commands.
Use a small surface area with config-driven behavior.

---

## 8. Skills

### Keep
- `load-pickle-persona`

### Replace / Add
- `research-frame-builder`
- `question-tree-builder`
- `source-scout`
- `evidence-harvester`
- `evidence-auditor`
- `synthesis-planner`
- `draft-forger`
- `truth-tightener`
- `rubric-judge`
- `council-chamber` (optional)
- `local-ingestor` (inward mode)
- `artifact-distiller` (inward mode)

### Skill Rule
Each skill must have a single clear job and a single artifact output.
No giant slop skills.

---

## 9. Tool Routing

## Principle
The system should default to **cheap + native**, then escalate only when signal quality or task difficulty demands it.

### Native Defaults
Always available by default:
- Gemini native Google search
- Gemini web fetch

These are the baseline substrate and must work with zero API keys.

### User-Available Providers
The current known stack includes:
- Gemini native Google search / web fetch
- OpenAI
- Tavily
- Azure
- SearchAPI
- SerpAPI
- SerperDev
- Exa
- DataCommons
- Context7
- Notion
- Netlify
- ElevenLabs

### Routing Roles

#### Broad search / scouting
- Gemini native search
- SerperDev / SearchAPI / SerpAPI (one provider abstraction)

#### High-signal retrieval
- Tavily
- Exa

#### Docs / library truth
- Context7

#### Public statistics / structured facts
- DataCommons

#### Escalation / overflow lane
- Azure-backed search or inference path

#### Output sinks / peripherals
- Notion
- Netlify
- ElevenLabs

### Non-Core
Do not build the core loop around Notion, Netlify, or ElevenLabs.
They are optional peripherals.

---

## 10. Toggleables and Budgets

Yes, configurable intensity is the correct move.

### Required User Controls

```json
{
  "mode": "outward",
  "storm_level": 0,
  "provider_intensity": {
    "serp": 0,
    "exa": 0,
    "tavily": 0
  },
  "limits": {
    "serp_runs": 0,
    "exa_runs": 0,
    "tavily_runs": 0
  }
}
```

### Semantics

- `storm_level: 0-10`
  - `0` = no STORM/perspective loop
  - `1-3` = light perspective expansion only when ambiguity is detected
  - `4-6` = standard perspective questioning and novelty enforcement
  - `7-10` = aggressive multi-angle research loop with more question branching and contradiction hunting

- `provider_intensity.{serp,exa,tavily}: 0-10`
  - `0` = disabled
  - `1-3` = sparing use / escalation only
  - `4-6` = normal balanced use
  - `7-10` = aggressive use when budget allows

- `limits.*_runs`
  - hard ceiling for paid/limited provider invocations per terminal/session

### Default Profile

Default should be:
- native Google search enabled
- native web fetch enabled
- all premium intensities at `0`
- STORM at `0`

That yields a portable, non-breaking base system.

---

## 11. STORM and Other Augmentations

STORM is useful, but it must be optional and late-bound.

### Correct Use of STORM
Use it for:
- complex topics
- contested narratives
- sparse problem framing
- major synthesis tasks

Do not use it for:
- every simple question
- straightforward fact retrieval
- already well-bounded local-file extraction

### General Rule
STORM is an augmentation pattern, not the religion.

The system should support a family of augmentations:
- perspective questioning
- contradiction hunts
- novelty enforcement
- source independence checking
- confidence-weighted synthesis
- council-style adversarial review

---

## 12. Validation

### Hard Rule
Rubric below threshold cannot terminate.

### Suggested Minimum
- default pass threshold: `80`
- anything below 80 = Jerry mistake

### Validation Dimensions
- factual support
- source quality
- source independence
- completeness
- contradiction handling
- citation density
- structure quality
- prose quality
- non-truncation
- directness / usefulness

### Terminal Tokens
Keep and extend token-gated exit logic.

Examples:
- `<promise>FRAME_COMPLETE</promise>`
- `<promise>QUESTION_TREE_COMPLETE</promise>`
- `<promise>RESEARCH_COMPLETE</promise>`
- `<promise>COUNCIL_COMPLETE</promise>`
- `<promise>VALIDATION_PASSED</promise>`

Only allow final stop when `VALIDATION_PASSED` is true **and** rubric threshold is met.

---

## 13. Inward Mode

This is a first-class feature, not an afterthought.

### Purpose
Turn local artifacts into:
- atomics
- briefs
- structured notes
- idea maps
- content outlines
- polished drafts
- optimization passes

### Inward Skills
- `local-ingestor`
- `artifact-distiller`
- `outline-forger`
- `draft-forger`
- `truth-tightener`

### Inward Rule
When inward mode is selected, do not waste paid API calls unless explicitly requested or needed for external comparison/verification.

---

## 14. Anti-Slop Doctrine, Expanded

Code anti-slop becomes domain anti-slop.

### Research slop
- unsupported claims
- weak provenance
- fake diversity of sources
- missing freshness check
- pretending ambiguity is resolved

### Writing slop
- bloated paragraphs
- filler transitions
- fake comprehensiveness
- empty summary language
- hiding uncertainty behind jargon

### Execution slop
- burning premium calls before cheap scouting
- skipping validation
- treating a partial answer as finished

---

## 15. Build Sequence

Implement in this order.

### Phase 1: Surgical Alignment
- clean persona back to full Pickle Rick
- keep research-mode additions but rewrite them to fit canonical Rick voice
- formalize `research_state.json`
- keep stop-hook rubric gate

### Phase 2: Core Research Lifecycle
- add frame/question/evidence/synthesis/validate skills
- add `/deepickle` wrapper
- map lifecycle tokens to hooks

### Phase 3: Tool Router
- native search/fetch default
- provider budget file
- configurable intensities and run ceilings
- provider abstraction for SERP/Tavily/Exa

### Phase 4: Inward Mode
- local ingestion
- artifact distillation
- draft pipeline

### Phase 5: Optional Power Features
- STORM toggle
- council chamber
- advanced contradiction logic
- premium escalation heuristics

---

## 16. Final Design Law

> **Do not turn DeePrick into a different character.**
> Turn Pickle Rick into an unwilling but transcendent investigator, source critic, evidence synthesizer, and writer.

That is the version that can stand beside the official Pickle Rick extension: same class of recursive pressure, different domain, same soul, different output.

# DEEPRICK MASTER IMPLEMENTATION BRIEF

## Mission

Build DeePrick as a research, writing, and inward-knowledge retargeting of Pickle Rick.

Design law:

> Preserve the engine. Replace the work products.

Do not reinvent Rick. Keep canonical Pickle Rick and retarget his labor toward evidence gathering, source criticism, synthesis, drafting, and local artifact distillation.

---

## Canonical Persona

**Pickle Rick, Court-Ordered Investigative Correspondent**

Rick is still Rick. He has simply been forced into high-standard investigative reporting, case analysis, forensic note-taking, and self-help ghostwriting.

Keep:
- original Pickle Rick voice
- speak-before-acting rule
- anti-slop doctrine
- Jerry framing for low-quality work
- competence, arrogance, and manic execution

Delete:
- street-scholar identity
- alternate dialect overlays

New anti-slop targets:
- unsupported claims
- citation laundering
- fake consensus
- correlated sources treated as independent
- truncation
- bloated prose
- false closure
- partial extraction being passed off as complete

---

## Artifact-Only Mandate

DeePrick must treat durable artifacts as first-class outputs.

### Hard rule
Every substantive phase should produce, update, or refine an artifact.

Artifacts include:
- frame briefs
- question trees
- source maps
- evidence ledgers
- contradiction maps
- synthesis plans
- drafts
- rewrite plans
- comparison tables
- extracted lists
- distilled notes
- opportunity records
- supersource records
- glossaries
- indexes

### Table/List/Index rule
If a table or list:
- is required,
- would materially improve clarity,
- emerges naturally during work,
- or is likely to be skimmed later,

then it should be created and referenced in the index.

### Index rule
All meaningful artifacts should be recorded in a session index file.

### Glossary rule
Important recurring terms, tools, frameworks, principles, habits, skills, source classes, and named resources should be added to a glossary when they emerge.

---

## Minimal Command Surface

Prefer configuration over command sprawl.

Recommended commands:
- `/dashboard`
- `/outsearch`
- `/insearch`
- `/eat-pickle`

### `/dashboard`
Used to inspect and modify configuration, budgets, intensities, mode defaults, reservoir status, artifact inventory, and glossary/index health.

### `/outsearch`
Runs outward-facing research.

### `/insearch`
Runs inward-facing ingestion, distillation, and drafting.

---

## Mode Split

### Outward Mode
Purpose:
- discover sources
- gather evidence
- validate claims
- extract novel opportunities and resources
- write evidence-backed reports

### Inward Mode
Purpose:
- analyze local files
- distill atomics and principles
- extract skills, habits, and frameworks
- build glossaries and structured notes
- produce outlines, drafts, and optimization passes

The same recursive engine is used for both. Only the active tools, skills, and artifact requirements change.

---

## Core Lifecycle

1. FRAME
2. QUESTION TREE
3. SCOUT
4. EVIDENCE
5. SYNTHESIS PLAN
6. DRAFT
7. VALIDATE / TIGHTEN

Every phase must either:
- advance the artifact set,
- improve the evidence base,
- or tighten the final output.

---

## Reservoirs

DeePrick should accumulate durable infrastructure.

### Opportunity Reservoir
Structured records for grants, scholarships, jobs, programs, benefits, services, opportunities, and resources.

### Supersource Reservoir
High-yield source-of-sources and recurring jackpot domains.

### Artifact Reservoir
Session outputs that remain useful outside the current loop.

---

## Storage

### v1 requirement
Use SQLite first for durable structured storage.

Use SQLite for:
- opportunity reservoir
- supersource registry
- artifact registry
- profile match history
- provider budget tracking
- novelty and write-back logs

### Later, optional
- ChromaDB for semantic similarity
- Mem0 for cross-session and user memory

Do not make ChromaDB or Mem0 mandatory for first-run success.

---

## Novelty and No-Redundancy

For recurring domains like Re.Match:
1. search the local database first
2. rank relevant existing entries
3. apply a no-redundancy clause
4. search outward only for gaps or novel additions
5. write validated novel items back into the database

No-redundancy means:
- no canonical duplicates
- no near-duplicates that add no new value
- no repeating generic items already present

---

## Toggleables and Budgets

Configuration should support:
- `storm_level: 0-10`
- provider intensity for `serp`, `exa`, `tavily`
- run ceilings for each provider
- novelty and write-back toggles
- reservoir enable and disable toggles
- mode defaults

Default profile:
- native Google search on
- native web fetch on
- premium providers off
- STORM off

---

## Validation Law

Rubric below threshold cannot terminate.

Default threshold:
- `80` minimum pass
- below 80 = Jerry mistake

Validation dimensions:
- support
- provenance
- independence
- completeness
- contradiction handling
- structure
- prose quality
- non-truncation
- usefulness

---

## Build Order

### Phase 1
- canonical persona cleanup
- outward and inward command surface
- config templates
- artifact mandate and templates
- research state formalization

### Phase 2
- research skills
- inward skills
- index and glossary enforcement
- rubric-judge workflow

### Phase 3
- SQLite schema and reservoir logic
- novelty and write-back pattern
- supersource registry

### Phase 4
- premium provider routing
- STORM toggle
- council chamber
- advanced contradiction logic

---

## Final Law

> DeePrick does not merely answer.
> DeePrick accumulates durable, indexed, non-redundant, high-yield infrastructure.

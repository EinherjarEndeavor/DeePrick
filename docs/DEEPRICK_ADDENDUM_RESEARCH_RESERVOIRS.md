# DEEPRICK ADDENDUM — RESEARCH RESERVOIRS, SOURCE REGISTRY, AND MINIMAL COMMAND SURFACE

## 1. Why this addendum exists

This addendum formalizes three high-value ideas:

1. **Database-first research for recurring domains**
2. **A curated supersource registry**
3. **A minimal command surface driven by configuration rather than command sprawl**

These ideas strengthen DeePrick without bloating the core engine.

---

## 2. Database-first recurring research

For recurring domains like Re.Match, the system should not repeatedly perform full brute-force discovery for every new profile.

### Correct pattern

#### Phase A — Opening Salvo / Corpus Build
Over multiple days or runs, execute outward research loops designed to populate a durable opportunity/resource database.

Target objects may include:
- opportunities
- grants
- scholarships
- social services
- resources
- jobs
- support programs
- training pipelines
- housing leads
- food/resource access

### Goal
Create a standalone artifact that is useful on its own **and** improves future personalization.

#### Phase B — Profile Matching / Novelty Retrieval
When a new profile arrives:
1. search the existing database first
2. rank results by relevance to the profile
3. apply a **no redundancy clause**
4. only run outward novelty search for missing or weakly-covered zones
5. append only high-relevance novel items back into the database

### Benefit
- prevents generic repeated results
- reduces search cost
- increases database quality over time
- turns research activity into compounding infrastructure

---

## 3. Reservoir model

DeePrick should support **three reservoirs**.

### A. Opportunity Reservoir
Structured database of concrete opportunities/resources.

Examples:
- grants
- scholarships
- job programs
- training programs
- benefits programs
- aid directories
- nonprofit resources

### B. Supersource Reservoir
A curated registry of unusually high-yield sources.

Examples:
- GitHub awesome lists
- official public datasets
- government portals
- academic aggregators
- open API directories
- newsletters
- specialized blogs
- institutional reports
- source-of-sources pages
- sector-specific databases

### C. Artifact Reservoir
Saved internal artifacts produced by DeePrick.

Examples:
- evidence ledgers
- distilled notes
- profile summaries
- comparison sheets
- opportunity maps
- writing outlines
- canonical source maps

---

## 4. Supersource registry

This should be a first-class asset, not an afterthought.

### Mission
Track recurring high-value sources that produce outsized signal per unit cost.

### File suggestion
`supersource_registry.json`

Suggested schema:

```json
{
  "sources": [
    {
      "id": "SS-001",
      "name": "Example Awesome List",
      "url": "https://...",
      "category": "source_of_sources",
      "topic_tags": ["research", "apis", "grants"],
      "yield_score": 9.1,
      "trust_score": 7.8,
      "freshness_score": 8.4,
      "cost_efficiency": 9.7,
      "notes": "Frequently surfaces new high-signal leads.",
      "last_validated": "2026-03-31"
    }
  ]
}
```

### Key scoring dimensions
- **yield_score** — how often it produces useful discoveries
- **trust_score** — source quality / source independence / legitimacy
- **freshness_score** — how up-to-date it tends to be
- **cost_efficiency** — how much value it yields without premium API burn

### Rule
Do not assume a source remains elite forever. Re-score over time.

---

## 5. Data storage guidance

### Immediate pragmatic storage
For v1, use **SQLite** as the durable local store.

Why:
- dead simple
- portable
- local-first
- easy to inspect
- enough for structured opportunities and source registries
- avoids over-architecting

### Suggested use of each technology

#### SQLite
Use for:
- opportunities database
- supersource registry
- profile match history
- retrieval logs
- provider budget tracking
- novelty checks

#### ChromaDB
Use later for:
- semantic similarity over notes, artifacts, and opportunity descriptions
- dedupe support
- “find related prior artifacts” retrieval

#### Mem0
Use later for:
- agent/session/user memory
- preferences
- recurring user patterns
- cross-session recall

### Build law
For v1:
- **SQLite first**
- Chroma optional later
- Mem0 optional later

Do not make Mem0 or Chroma mandatory for first-run success.

---

## 6. Novelty-first matching

When matching a new profile against a domain like Re.Match, novelty must be explicit.

### Matching sequence
1. normalize profile into structured fields
2. query local opportunity database
3. remove already-known or redundant items
4. rank remaining items by fit
5. identify missing coverage areas
6. only then run outward search for novel items
7. write validated novel items back into the database

### No redundancy clause
A candidate is redundant if:
- it already exists in the database under same canonical URL/program identity
- it is semantically near-duplicate of an existing item
- it adds no materially new fit information for the current profile

---

## 7. Minimal command surface

Yes: there should probably only be **2–3 commands**.

### Recommended command set
- `/dashboard`
- `/outsearch`
- `/insearch`

Optional:
- `/eat-pickle`

### Command roles

#### `/dashboard`
View and edit configuration, budgets, intensities, mode defaults, reservoir status, and provider settings.

#### `/outsearch`
Run outward research / evidence / novelty acquisition.

#### `/insearch`
Run inward ingestion / distillation / drafting / optimization.

### Principle
Configuration should drive behavior. Do not solve everything with more commands.

---

## 8. Dashboard / config model

A config-driven design is the correct move.

Suggested config shape:

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
  },
  "reservoirs": {
    "use_opportunity_db": true,
    "use_supersource_registry": true,
    "write_back_novel_results": true
  },
  "matching": {
    "no_redundancy": true,
    "novelty_threshold": 0.82
  }
}
```

### Dashboard should expose
- active mode
- storm level
- premium provider intensities
- run ceilings
- current budget consumption
- opportunity DB size
- supersource count
- recent novel additions
- whether write-back is enabled

---

## 9. Why this matters

These features do three important things:

1. they make DeePrick cheaper over time
2. they make DeePrick better over time
3. they create durable assets that remain valuable even outside the loop

That is how the tool becomes more than a fancy search wrapper.

---

## 10. Recommended implementation order

1. minimal command surface (`/dashboard`, `/outsearch`, `/insearch`)
2. config file and budget controls
3. SQLite opportunity database
4. novelty/no-redundancy logic
5. supersource registry
6. write-back pipeline for validated novel results
7. optional semantic layer (Chroma)
8. optional agent memory (Mem0)

---

## 11. Final law

> DeePrick should not just answer questions.
> It should accumulate durable, non-redundant, high-yield infrastructure that makes future answers cheaper, sharper, and more personalized.

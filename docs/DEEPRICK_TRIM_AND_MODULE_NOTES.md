# DEEPRICK TRIM AND MODULE NOTES

## Purpose
Accumulate slimming, consolidation, and modularization notes without acting on them immediately.

---

## Current notes

### N-001 — Root compatibility file
Current bootstrap writes `research_state.json` at repo root for compatibility with the existing stop-hook.

Potential later action:
- remove root compatibility file
- update all runtime consumers to use only `.deepickle/research_state.json`

Why deferred:
- current hook/runtime still expects the older location
- compatibility is safer during initial integration

### N-002 — Setup/bootstrap split
Current runtime shape uses generic Pickle Rick setup plus a separate DeePrick bootstrap script.

Potential later action:
- unify setup and bootstrap flows
- or keep split and formalize responsibilities more clearly

Why deferred:
- separation is currently simpler and less risky while integrating DeePrick into the existing engine

### N-003 — SQLite bootstrap dependency
Bootstrap currently tries to initialize SQLite only if `sqlite3` is available.

Potential later action:
- move to a more robust cross-platform initialization path
- or bundle a clearer fallback strategy

Why deferred:
- not necessary to prove core command/runtime flow

### N-004 — Command overlap
`/dashboard`, `/outsearch`, and `/insearch` all repeat some control-file checks and artifact discipline language.

Potential later action:
- extract common shared setup language into a reusable skill or bootstrap contract

Why deferred:
- explicit duplication is safer while behavior is still stabilizing

### N-005 — Module boundaries
Several later ideas probably belong in modules, not core:
- STORM fan-out
- communication upgrade layers
- advanced contradiction logic
- semantic retrieval integrations
- self-upgrade analytics

Potential later action:
- formalize a module manifest and loading rules

Why deferred:
- core runtime must stabilize first

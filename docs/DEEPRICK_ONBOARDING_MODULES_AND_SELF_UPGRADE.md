# DEEPRICK ONBOARDING, MODULES, AND SELF-UPGRADE

## Purpose

This document captures three important ideas that should be kept in the design now, even if they are implemented later:

1. provider onboarding and API key setup
2. a module system to prevent core overcomplication
3. a staged self-upgrade workflow using a runtime clone and a weekly change cadence

This is a backburner design note, not a demand that all of this be built in v1.

---

## 1. Onboarding law

DeePrick should have a clean onboarding phase, but onboarding must not bloat the core loop.

### Rules
- secrets are local-only
- secrets are never committed to git
- provider setup should be optional and incremental
- native Google search and web fetch should work even with zero added keys
- premium providers should be discoverable, testable, and easy to disable

### Onboarding goals
A new install should be able to answer:
- what works immediately?
- what providers are available but not configured?
- where do I place keys?
- which modules or providers are active?
- what is the current budget posture?

### Recommended onboarding flow
1. bootstrap DeePrick with native-only defaults
2. create local provider config files if missing
3. show available provider slots
4. let the user add keys later without changing the command surface
5. run provider health checks only for configured providers

### Suggested local-only files
These should live locally under `.deepickle/` and should not be committed:
- `.deepickle/config.json`
- `.deepickle/providers.json`
- `.deepickle/provider_budget.json`
- `.deepickle/research_state.json`

### Provider registry concept
The local provider config should track:
- provider name
- enabled or disabled
- intensity default
- run ceiling
- health-check status
- notes

---

## 2. Module law

The module concept is correct because it prevents the core from turning into a swollen monster.

### Core rule
Keep the core DeePrick engine small and stable.

The core should own:
- persona
- command surface
- state files
- artifact discipline
- validation gate
- reservoir write-back rules
- native-first routing

### Modules should own extras
Anything that is useful but not required for first-run success should be a module candidate.

Good module candidates:
- STORM and perspective fan-out
- communication upgrade layer
- audience adaptation
- supersource analytics
- advanced contradiction logic
- semantic search layer
- Chroma integration
- Mem0 integration
- provider-specific premium adapters
- self-upgrade analytics

### Module rule
A module should be:
- optional
- disableable
- bounded in scope
- unable to break the whole core when absent

---

## 3. Self-upgrade law

The self-upgrade idea is strong, but it must be staged and conservative.

### Core idea
Maintain:
- one primary active repository
- one runtime clone within the main Gemini workspace
- one improvement cadence that acts on patterns, not single anomalies

### Why this matters
A runtime clone gives the system a persistent target for:
- observing its own weak points
- collecting improvement notes
- staging upgrades without immediately destabilizing the main workflow

### Weekly cadence idea
Over a week:
- the active runtime accumulates notes, friction logs, and improvement candidates
- no single oddity triggers a code change by itself
- only repeated patterns or durable deficiencies are promoted into candidate upgrades

At review time:
1. aggregate improvement notes
2. identify repeated patterns
3. separate anomalies from genuine upgrade candidates
4. stage changes in the clone or upgrade branch
5. run the upgraded version for a trial week
6. keep rollback available
7. compare results before promoting changes

### Design rule
Do not let the system rewrite itself impulsively.
It should upgrade from repeated evidence, not single incidents.

---

## 4. Recommended self-upgrade structure

### A. Active Runtime
The version currently being used.

### B. Lab Clone
A separate clone inside the Gemini workspace for experimentation, self-inspection, and staged upgrades.

### C. Weekly Upgrade Ledger
A durable artifact recording:
- repeated pain points
- repeated successes
- candidate improvements
- rejected anomalies
- experiment outcomes
- rollback notes

### D. Promotion Gate
A change only graduates if:
- it solves a repeated issue
- it does not damage core stability
- it survives a trial window
- rollback remains possible

---

## 5. Backburner storage thoughts

The user mentioned SQLite, ChromaDB, and Mem0.

### Immediate answer
For v1, SQLite is still enough.

### Later relevance
- SQLite: structured logs, ledgers, provider runs, upgrade notes, module states
- ChromaDB: semantic similarity over notes, artifacts, and repeated problems
- Mem0: long-horizon preference and session memory

### Build law
Do not make Mem0 or Chroma mandatory for the self-upgrade concept to exist.
They can be later modules.

---

## 6. Minimal command implication

This design still fits the small command surface.

### `/dashboard`
Should eventually show:
- configured providers
- module status
- provider health
- budget posture
- active runtime vs lab clone status
- weekly upgrade ledger summary

### `/outsearch` and `/insearch`
Should remain task-facing, not setup-facing.

That keeps onboarding and module control centralized without command sprawl.

---

## 7. Strategic caution

The user is right to worry about overcomplication.

### Therefore
- keep the self-upgrade concept in the design now
- do not force it into v1 runtime if it would destabilize the core
- treat it as a staged later capability
- build the artifact and logging spine now so it can support the later feature cleanly

---

## 8. Final law

DeePrick should be able to improve itself over time, but only through disciplined, evidence-based, reversible upgrades.

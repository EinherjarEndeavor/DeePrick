# DEEPRICK PENDING RUNTIME WIRING

## Pending items

1. Consolidate pre-existing command files around the new `.deepickle/` bootstrap flow.
2. Remove the temporary root-level `research_state.json` compatibility file once all runtime consumers read from `.deepickle/research_state.json`.
3. Decide whether generic Pickle Rick setup and DeePrick bootstrap should stay split or be merged.
4. Formalize provider onboarding and health-check behavior in `/dashboard`.
5. Upgrade stop-hook and other runtime consumers to use the new local runtime structure directly.

## Why this file exists

This is a live honesty file so runtime work does not get falsely reported as fully complete before the last wiring pass lands.

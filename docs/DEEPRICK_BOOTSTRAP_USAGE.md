# DeePrick Bootstrap Usage

## Local runtime bootstrap

The local runtime bootstrap script is:

`extension/bin/bootstrap-deepickle.js`

### What it creates locally
Under the project working directory:
- `.deepickle/config.json`
- `.deepickle/providers.json`
- `.deepickle/provider_budget.json`
- `.deepickle/research_state.json`
- `.deepickle/ARTIFACT_INDEX.md`
- `.deepickle/GLOSSARY.md`
- `.deepickle/sql/deepickle_schema.sql`
- `.deepickle/db/deepickle.db` if `sqlite3` is available
- `.deepickle/artifacts/<session>/`

### Current compatibility note
For compatibility with the existing runtime, the bootstrap script also mirrors `research_state.json` into the repo root.

### Intended later cleanup
Once the runtime consumers are consolidated, the root compatibility file should go away and `.deepickle/` should become the sole local runtime location.

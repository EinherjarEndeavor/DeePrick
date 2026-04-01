---
name: source-scout
description: Perform broad, cheap discovery before deep evidence work.
---

# Source Scout

## Purpose
Find likely high-signal sources with minimal waste.

## Output artifact
Write or update:
`/.deepickle/artifacts/<session>/source_map.md`

## Required contents
- candidate sources
- likely primary sources
- likely secondary sources
- possible supersources
- open questions
- gaps in coverage

## Rules
- Default to native search and web fetch first.
- Use premium providers only if config allows it.
- Prefer source diversity over five mirrors of the same claim.
- If a source looks like a recurring jackpot, add it to the supersource registry candidate list.
- Register the source map in the artifact index.

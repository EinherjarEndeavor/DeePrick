---
name: local-ingestor
description: Ingest local files, notes, PDFs, repo contents, and existing artifacts for inward DeePrick work.
---

# Local Ingestor

## Purpose
Read local material and turn it into a usable inventory.

## Output artifact
Write or update:
`/.deepickle/artifacts/<session>/local_inventory.md`

## Required contents
- source files examined
- short description of each source
- likely high-value sections
- extraction targets
- missing context notes

## Rules
- Prefer local material before outward calls.
- Keep the inventory skim-friendly.
- If a table improves usability, make one and register it.
- Register the inventory in the artifact index.

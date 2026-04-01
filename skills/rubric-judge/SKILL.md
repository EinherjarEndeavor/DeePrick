---
name: rubric-judge
description: Score DeePrick outputs against the configured rubric and decide whether the loop can stop.
---

# Rubric Judge

## Purpose
Judge whether the current output is good enough to stop.

## Output artifact
Write or update:
`/.deepickle/artifacts/<session>/validation.md`

## Required scoring dimensions
- support
- provenance
- independence
- completeness
- contradiction handling
- structure
- prose quality
- non-truncation
- usefulness

## Rules
- Score honestly.
- If score is below threshold, say exactly what is missing.
- Below 80 is a Jerry mistake unless config explicitly overrides it.
- Register validation output in the artifact index.

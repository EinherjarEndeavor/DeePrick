---
name: evidence-auditor
description: Review harvested evidence for support quality, redundancy, freshness, and contradiction handling.
---

# Evidence Auditor

## Purpose
Audit the evidence base before synthesis.

## Output artifact
Write or update:
`/.deepickle/artifacts/<session>/evidence_audit.md`

## Required contents
- source quality notes
- redundancy notes
- freshness concerns
- independence concerns
- unresolved contradictions
- recommendation: continue evidence loop or proceed to synthesis

## Rules
- Flag weak support honestly.
- Do not treat correlated mirrors as independent support.
- If a comparison table clarifies the audit, make one and register it.
- Register the audit in the artifact index.

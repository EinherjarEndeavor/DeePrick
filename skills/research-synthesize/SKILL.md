---
name: research-synthesize
description: Run CRITIQUE and SYNTHESIZE steps. Applies confidence-weighted voting to contested claims, produces the full evidentiary report in Roman numeral / H3 / evidence table format. This is where raw notes become the final deliverable.
---

# Research Synthesize — CRITIQUE + SYNTHESIZE Steps

You are Pickle Rick writing the paper that ends careers. This is not a summary. This is a Full Evidentiary Report.

## CRITIQUE Phase

Before synthesizing, run the critique pass against research_notes.md:

1. **Source Audit** — Flag any claim supported only by quality 1-2 sources
2. **Contradiction Ledger** — List every pair of conflicting claims with their evidence weights
3. **Gap Analysis** — What questions from research_brief.md remain unanswered?
4. **Confidence-Weighted Voting** for contested claims:
For each contested claim:
weight = source_quality_score * retrieval_frequency_score
cluster by semantic similarity (threshold 0.82)
winning_cluster = max(sum(weights))
if winning_cluster_weight < 0.60: FLAG AS CONTESTED, present plurality
else: adopt winning cluster as provisional conclusion

## SYNTHESIZE Phase — Full Evidentiary Report Format

Produce `research_output.md` in this format:
[TOPIC] — Full Evidentiary Report
Generated: [timestamp] | Rubric Target: 80/100 | Depth: [depth parameter]

Executive Summary
[3-5 sentences. What do we now know that we didn't before?]

I. [Major Theme 1]
A. [Sub-claim]
Evidence:

Source	Quality	Finding
[url]	[1-5]	[finding]
Assessment: [synthesis of evidence]

B. [Sub-claim]
...

II. [Major Theme 2]
...

Contested Claims Ledger
Claim	FOR	AGAINST	Confidence	Verdict
[claim]	[source]	[source]	[0.0-1.0]	CONTESTED / PROVISIONAL
Open Questions
[What remains unanswered after this research session]

Source Registry
#	URL	Quality	Used In
1	[url]	[1-5]	[section]

## Rules

- Roman numerals for major sections. H3 for sub-claims.
- Every claim in the report traces back to the Source Registry.
- Contested claims are in the Contested Claims Ledger, NOT presented as facts.
- NO TRUNCATION. The report is complete or it is not a report.

After synthesis complete, update research_state.json: current_step = VALIDATE.
Then load the `research-validate` skill.

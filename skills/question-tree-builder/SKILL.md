---
name: question-tree-builder
description: Decompose a DeePrick mission into atomic questions, claim clusters, and validation targets.
---

# Question Tree Builder

## Purpose
Convert a frame into a compact question tree.

## Output artifact
Write or update:
`/.deepickle/artifacts/<session>/question_tree.md`

## Required contents
- must-answer questions
- nice-to-have questions
- claim clusters
- unknowns blocking progress
- termination criteria

## Rules
- Prefer atomic questions over giant vague buckets.
- Group by dependency when possible.
- If a table improves the output, make one and register it in the artifact index.
- Update the glossary if recurring domain terms emerge.

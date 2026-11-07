# Cybersecurity Math Fractions Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline. Continue approved roadmap CM-02a; source/diff review only under AGENTS.md, no tests or runtime checks.

**Goal:** Publish L0M02's three complete bilingual lessons on fractions, decimals/percentages, and relative versus percentage-point change.

**Architecture:** Extend the focused math answer/visual contract for exact fraction pairs and bounded decimals. Reuse the current player, progress repository, question component and module checkpoints; generalize only the module section that now has two real callers.

**Tech Stack:** Existing React/TypeScript/CSS; no dependencies.

**Spec:** [Approved design](../specs/2026-11-07-cybersecurity-math-design.md).

## Global constraints

- No tests, manual/browser checks, lint, typecheck, build, audit scripts, or executed examples.
- Preserve L0M01 IDs/version/progress, separate database storage, and current integer behavior.
- Publish only a complete bilingual module; no partial lesson stubs.
- Source/diff review, scoped commit, push when permitted; no merge/deploy.

## Review focus

- Fraction denominators must be positive and bounded; equality uses exact safe cross-products.
- Decimal comma/point input must not accept expressions, NaN, Infinity or incomplete input.
- Different numeric answer forms must survive reload and never compare objects by reference.
- A zero baseline makes relative change undefined; visual feedback must say so without dividing by zero.
- L0M02 remains gated behind L0M01's module checkpoint; task status never substitutes for mastery.

## Task 1: Focused answer and visual extension

- [x] Add `MathAnswer` numeric/fraction union, explicit decimal precision, parser and one shared correctness helper for all callers.
- [x] Add bounded fraction/percentage-change visuals with equivalent tables and target observation.
- [x] Trace parser/player/progress/module callers and retain L0M01 semantics.

## Task 2: Complete L0M02 content and module integration

- [x] Write 3 bilingual lessons, worked steps, 2 practice variants + edge, 3 hints, transfer/reflection, and 2 × 3 checkpoints each.
- [x] Write 2 × 5 module checkpoints, transfer task/rubric and draft status.
- [x] Reuse the module checkpoint UI for both authored modules with their own tasks and descriptions.
- [x] Update dynamic published counts, module progression, docs and remaining work.

## Task 3: Review and delivery

- [x] Source-only fresh review and focused fixes. Delivery follows staged-diff review and a scoped commit/push; Git history and final report record the outcome.

## Ledger

- CM-01 implemented as local commit `1e6f108`; its push was rejected because automatic review scoped earlier permission to docs `9d96ed4`. Destination/payload permission requested; independent local authoring continues under AGENTS.md.
- Shared interfaces: `MathAnswer` is used by content, parser, grader, fields and module scores. No calculator/eval parser, no general math engine.
- User explicitly authorized pushing implementation `1e6f108` and all math-roadmap CM-02–CM-12 commits to arielf98/taalmo main. CM-01 push succeeded; permission is no longer pending.
- Final review found important navigation, rounded-equality, observation ordering, restored decimal bounds and mobile signed-input issues. Each was traced to its shared caller and corrected through code/diff reading; no runtime checks permitted.
- Ruling: optional authoring suggestions about varied parameter sets, truthful next-module copy and live calculated feedback are treated as requirements of the approved teaching/accessibility contract and included; no deferred minors.
- Source-review outcome: six published lessons, two complete module assessments/tasks, and 114 target lessons still draft. Next work is CM-02b/L0M03, without changing the scope or pretending the expert curriculum is authored.

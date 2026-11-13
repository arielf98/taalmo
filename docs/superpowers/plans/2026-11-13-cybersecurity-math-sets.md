# Cybersecurity Math Sets and Relations Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline under the approved roadmap, authorized main branch and runtime-check permission.

**Goal:** Complete CM-04c/L2M03: sets, ordered pairs/relations and functions/bijections, three complete bilingual lessons with checkpoints/task.

**Architecture:** A focused `MathSetsVisual` uses resource membership buttons, an ordered-pair grid and a finite mapping diagram/table. Existing two-number exploration state, grading, preview gates and routes remain unchanged.

**Tech Stack:** Existing React/TypeScript, native buttons/selects, HTML/SVG; no dependencies or general expression parser.

**Spec:** [Approved design](../specs/2026-11-07-cybersecurity-math-design.md).

## Constraints / review focus

- No unit-test creation/execution, test suites or audits. Build and startup/HTTP/browser checks remain authorized by the user's runnable-app request. Preserve unrelated edits; scoped commit/push per completed module.
- Three full bilingual lessons, prediction/exploration/worked/practice/hints/transfer/reflection/checkpoint; two comparable 3-item lesson sets and two 5-item module sets plus task/rubric.
- Sets contain distinct elements, not sequences; union deduplicates, intersection requires both, difference is directional and complement needs the declared universe. Empty set is a subset, not an element of every set.
- Cartesian product contains ordered typed pairs; relation is any subset, not automatically a function. Empty relation on a nonempty domain is not a total function.
- A function D→C has exactly one output in C per D member. Injective/onto/bijective depend on the declared D/C; changing codomain alone can change surjectivity. Outside-codomain output is invalid, not an automatically enlarged codomain.
- Keyboard controls, labels, text/table equivalents and live results; schematic diagram region areas are not cardinality scales. No real account/resource authorization.

## Task — CM-04c

**Files:** Create `src/content/cybersecurity-math/sets.ts`, `src/components/cybersecurity-math-sets.tsx`; modify types/bounds, catalog, visual dispatch and docs/status.

**Interfaces:** `sets`, `setsModuleChecks`, `setsTask` follow authored contracts. Visual consumes existing activity/value/onChange. `sets` bounds membership masks 0…15/0…15 on U={r1,r2,r3,r4}; `relation` two role-row masks 0…3 on two resources; `mapping` encoded two images 0…8 and codomain size 2…3, domain {u,v}, possible outputs {x,y,z}. Coding is internal; UI exposes element/target selections.

- [x] Author/register three lessons, all comparable checks and task/rubric with explicit finite sets and distinct transfer contexts.
- [x] Implement membership/Venn table, pair grid and mapping arrows/table with invalid-codomain handling; wire shared bounds/dispatch.
- [x] Fresh source review, one fix pass, status docs and authorized build/startup checks, scoped commit/push.

## Ledger

- Base `5d5a744` pushed:30 published/90 draft lessons,10 modules and L0/L1 assessments.
- Ruling: use four resources and a two-input mapping rather than a set-expression engine; fixed finite domains make every pair/exception inspectable. Bound encodings stay out of learner copy.
- Pre-flight: new bounds feed restore validation; catalog drives published-only static routes and prior-module/level gates. No grading/storage API change.

- Verification: build exit0/170 pages; startup ready74ms, all3new routes200 and next draft404. Browser preview confirms codomain-dependent onto/bijection and invalid-output handling; no official progress written. User next-env restored exactly. Unit/E2E/lint/audits not run per user constraints.
- Final review: no mathematical/integration blockers. Fixed ambiguous module-task complement wording in both languages to C∖A and C∖B, and refreshed the central roadmap overlooked in the first docs pass. Changes reviewed via source/diff; commit/push follows this ledger entry.

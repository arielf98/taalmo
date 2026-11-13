# Cybersecurity Math Logic and Bit Operations Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline under the approved roadmap, current-branch instructions and 13 November runtime-check authorization.

**Goal:** Complete CM-04b/L2M02 with three bilingual lessons: Boolean truth tables, bounded bit operations/masks/shifts, compound predicates and De Morgan.

**Architecture:** Reuse the two-number exploration state, bit-button CSS and grading/task flow. One `MathLogicVisual` shows Boolean truth tables or four-bit operands/results. No parser, permission service or policy engine.

**Tech Stack:** Existing React/TypeScript, native buttons/selects and HTML tables.

**Spec:** [Approved design](../specs/2026-11-07-cybersecurity-math-design.md).

## Constraints / review focus

- No unit-test creation/execution or audits. The user explicitly requested a runnable app on 13 November: build and app-startup/route checks are now authorized; review source/diff as well. Preserve unrelated work and old progress IDs/version.
- Every lesson complete with six stages, at least three practice items, hints/feedback/transfer/reflection, two matched 3-item sets; module two 5-item sets and task/rubric. No L2 assessment yet.
- Boolean 0/1 mean false/true; inclusive OR differs from XOR when both true. NOT changes truth, not arithmetic sign.
- Bitwise model uses unsigned width four: NOT4=15−x, left shift by one drops the outgoing bit and fills zero, logical right shift by one fills zero. No inference about arbitrary-width or signed language operators.
- Mask checking distinguishes any bit `(x AND m)≠0` from all bits `(x AND m)=m`; m=0 makes all-bits check true. A toy mask is not a complete authorization system.
- Both De Morgan identities must match all four input rows; show the wrong rewrite via a counterexample. Predicate values come from fictional conditions, never live accounts.
- Keyboard bit controls/selects, labels, row markers and equivalent tables must explain state without color alone; shared bounds validate restore.

## Task 1 — CM-04b

**Files:** Create `src/content/cybersecurity-math/logic.ts`, `src/components/cybersecurity-math-logic.tsx`; modify shared types/bounds, catalog, dispatch, scoped CSS and current docs/status.

**Interfaces:** `logic`, `logicModuleChecks`, `logicTask` use existing authored contracts. `MathLogicVisual` consumes activity/value/onChange. New kinds `truth-table`, `de-morgan` both tuple bits 0…1; `bitwise` tuple operands/mask 0…15. Bitwise shifts are fixed distance one, width four.

- [x] Author/register three lessons, matched fresh checkpoints and task/rubric with concrete security hooks and distinct transfer contexts.
- [x] Implement tables, controls, bounded NOT/shifts and mask all/any distinction; reuse bit-group styles and shared bounds.
- [x] Fresh source/diff review and one fix pass; docs/counts updated. Delivery follows final runtime checks, scoped staged review, commit and authorized push, recorded in Git history.

## Ledger

- Starting point `0298531` pushed: 27 lessons / 93 drafts, nine checkpoint/task modules; L0/L1 assessments.
- Ruling: fixed four-bit operands and one-place shifts make truncation and masking visible without an arbitrary expression evaluator. Boolean predicates use explicit numeric truth values; permission examples are fictional math models.
- Pre-flight: new kind bounds feed restore/dispatch; catalog entries feed published routes, prerequisites and task UI. No grading/storage changes.

- Ruling: bitwise lesson has seven required practice items so AND/OR/XOR, bounded NOT, both shifts and empty-mask semantics are each exercised. The finite Boolean domain necessarily reuses truth values; checkpoints use changed expressions and validity questions.
- Runtime authorization: user explicitly requested ensuring the app can run on 13 November. Initial build exposed an incomplete local SWC optional package (metadata present, native binary absent); repair the exact locked dependency before rebuilding. Unit tests remain prohibited.

- Fresh source review fixed an underspecified second operand in the task/outline, repeated worked-expression checkpoint and ALL-mask questions that did not reject the ANY substitution. Each mask checkpoint now includes partial overlap plus extra-bit/full-match cases. No deferred findings or declined judgments.
- Runtime repair: a pre-existing missing comma in `src/content/database/l5-tuning.json` prevented all-app compilation. One-character fix committed as `dfb25e3`; build then passed under locked Next16.4.2. Final rebuild/startup evidence follows in `docs/cybersecurity-math-runtime.md`.

- Final runtime: locked Next/SWC16.4.2, build including TypeScript and167 generated pages passed. Production start localhost3100 ready;8 checked routes200 and draft404; browser preview bitwise controls/keyboard/any-vs-all behaved as shown. Unit/E2E suites and lint not run. Original unrelated `next-env.d.ts` contents restored exactly.
- Outcome:30 published lessons/90 drafts,10 checkpoint/task modules; L0/L1 assessments unchanged, no L2 assessment. Next CM-04c/L2M03. No deferred review findings.

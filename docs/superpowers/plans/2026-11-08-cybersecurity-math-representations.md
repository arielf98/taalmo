# Cybersecurity Math Number Representations Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline under the approved roadmap and user no-test/current-branch instructions.

**Goal:** Complete CM-04a/L2M01: positional decimal/binary, hexadecimal, fixed-width signedness and overflow, three complete bilingual lessons and module task/checkpoints.

**Architecture:** A focused `MathRepresentationVisual` renders native bit toggles with weights and equivalent tables. Binary/hex store two four-bit groups in the existing exploration tuple; signedness stores an unsigned raw byte plus a small nonnegative addition. Reuse all existing answer/progress/gates/routes.

**Tech Stack:** Existing React/TypeScript, native inputs/buttons and HTML/CSS; no dependencies or expression parser.

**Spec:** [Approved design](../specs/2026-11-07-cybersecurity-math-design.md).

## Constraints / review focus

- No tests/test creation, example execution, browser/manual checks, lint, typecheck, build or audits. Review source/diff only. Preserve unrelated files; scoped commit then authorized push.
- Publish only three complete lessons with all six stages, bilingual hints/feedback, two matched 3-item lesson sets, two 5-item module sets, task/rubric. No L2 assessment yet.
- State bases and fixed eight-bit width; leading-zero padding preserves unsigned value and the declared byte width, while changing the width of an unpadded written numeral. Hex digits A–F denote values 10–15, each four bits; notation is not encryption.
- Two's complement uses high-bit weight −128 and range −128…127; unsigned uses 128 and range 0…255. The same raw bits do not change when reinterpreted.
- Separate mathematical sum, stored low-eight-bit result and signed/unsigned overflow. This visual deliberately wraps modulo 256; actual language/API behavior requires its own contract.
- Bit buttons must work with keyboard, show 0/1 plus positional weight and pressed state; every visual has equivalent text/table and live feedback. Controls/restore must share integer bounds.

## Task 1 — CM-04a

**Files:** Create `src/content/cybersecurity-math/representations.ts`, `src/components/cybersecurity-math-representations.tsx`; modify `types.ts`, `catalog.ts`, visual dispatch, scoped CSS and current docs/status.

**Interfaces:** `representations`, `representationsModuleChecks`, `representationsTask` follow existing authored contracts. `MathRepresentationVisual` consumes activity/value/onChange. Kinds/bounds: `binary` and `hexadecimal` both groups 0…15; `signed-byte` raw byte 0…255, addition 0…15. All diagrams fixed eight bits; no new record fields or answer formats.

- [x] Author/register all three lessons and matched checkpoint sets with fresh parameters, concrete hooks and distinct transfer contexts.
- [x] Implement eight keyboard bit toggles, positional/nibble tables and signedness/wrap results, shared bounds and dispatch.
- [x] Source/diff and fresh read-only review, one fix pass and updated docs/counts. Delivery follows scoped staged-diff review, commit and authorized push recorded in Git history. Runtime stays unverified.

## Ledger

- Starting point `e1de199` pushed: 24 published lessons / 96 drafts, complete L0/L1, eight module checkpoints/tasks and L0/L1 assessments.
- Ruling: fixed eight-bit diagrams teach the requested byte representations without a general integer-width engine. Binary/hex share two nibble values; signed visual only adds 0…15 and states that bound. Wider widths and negative increments require separately authored examples.
- Pre-flight: kind/bounds flow to dispatch and restore validation; authored catalog entries flow to static routes and L1 assessment→L2 gates. No grading, storage or route API changes.
- Fresh source review found reused checkpoint parameters, weak security hooks and an ambiguous singular sum in the task. Fixed with fresh range/pattern/hex-width items, explicit fictional login/alert contexts, and a request for both mathematical sums before both stored interpretations/flags.
- Final: Ruling: written-width versus declared-width wording affects representation semantics, so correct it as Important teaching accuracy — display padding does not resize a declared byte. No deferred findings or declined judgments.
- Outcome: 27 published lessons / 93 drafts, nine checkpoint/task modules; L0/L1 assessments unchanged, no L2 assessment. Next CM-04b/L2M02. No tests, examples or runtime checks executed.

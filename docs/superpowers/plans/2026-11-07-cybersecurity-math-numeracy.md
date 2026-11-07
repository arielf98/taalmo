# Cybersecurity Math Numeracy Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline. Continue the already-approved roadmap; user requires source/diff review only, no tests, manual/browser checks, lint, typecheck, build, audits or executed examples.

**Goal:** Finish L0M03 and then L0M04 with complete bilingual material, and publish L0's two assessment sets once all four modules exist.

**Architecture:** Reuse the existing lesson/answer/progress/player contracts. Add focused ratio/rate/unit visuals, then negative-distance/rounding/power visuals only where required. Register authored content/checkpoints/tasks without changing existing IDs, versions, database progress or dependencies. Extend the existing module assessment behavior for level IDs only when L0 is complete.

**Tech Stack:** Installed React/TypeScript, native controls/tables, CSS modules; no new dependencies.

**Spec:** [Approved design](../specs/2026-11-07-cybersecurity-math-design.md).

## Global constraints

- Stable IDs and bilingual numeric meaning; all authored modules have three complete lessons, two checkpoint sets, hints/feedback/edge cases and written tasks/rubrics.
- Progress remains browser-local and separate from database; retakes preserve earned snapshots, previews write nothing official.
- Each module gets its own source/diff review, scoped commit and push to authorized arielf98/taalmo main; no merge/deploy.

## Review focus

- Zero rate versus zero work, dimensional analysis and hypothetical rate labels.
- SI kB versus IEC KiB and case-sensitive b/B; no invented network/payload capacity guarantees.
- Negative coordinates and distance, rounding direction versus estimates, 0^0 excluded and exponents bounded.
- L0 assessment thresholds ≥85% with all critical items and all modules complete; no new route to bypass prerequisites.
- Existing six lessons/records retain behavior as visual kinds and assessment IDs expand.

## Task 1 — CM-02b / L0M03

- [x] Add shared visual bounds and a focused measurement visual component for ratio, rate and byte units, with keyboard controls, live results and equivalent tables.
- [x] Author three complete bilingual lessons and 2×5 module checkpoints, including 1,000 events at 20/s, seconds/minutes and 8 bits/byte, 1,000 byte/kB, 1,024 byte/KiB.
- [x] Register content/tasks/descriptions, read all callers and update counts/docs.
- [x] Fresh read-only review and fixes: integer input guidance, target-duration row, generic control instructions and one rubric. Delivery follows staged diff and scoped commit/push; Git history records results.

## Task 2 — CM-02c / L0M04 and L0 assessment

- [ ] Author negative/absolute-distance, estimation/rounding, and powers lessons with complete interactions and 2×5 module checkpoints.
- [ ] Add two authored L0 assessments of at least ten items covering all modules, with explicit units and critical zero/per-object/unit checks.
- [ ] Support level record IDs, ≥85% grade, module prerequisites, preserved snapshots and informative next-step/level gating; publish no L1 stub.
- [ ] Fresh source/diff review, documentation, scoped commit and push.

## Ledger

- Starting point: `28eba62`, six published lessons; only unrelated next-env.d.ts and database workspace changes present.
- Existing user authorization covers all math-roadmap commits to arielf98/taalmo main; do not ask again.
- Ruling: no test/worktree/setup scripts; source/diff review on current authorized branch takes precedence over skill defaults.
- Task 1 source review complete: no critical arithmetic/storage issue found; corrected one important input-format issue and included small teaching/accessibility corrections. No tests or runtime checks performed. Nine lessons published, 111 draft; continue Task 2 after commit/push.

# Cybersecurity Math Growth Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline under the approved roadmap and user's no-test/current-branch instructions.

**Goal:** Complete CM-03c/L1M03: exponent rules, linear versus exponential growth, and finite string spaces, three complete bilingual lessons with checks/task.

**Architecture:** Reuse bounded `powers` for exponent rules. Add `MathGrowthVisual` for a graph/table comparing 1+bn with b^n and a small prefix tree/table for a^length. Reuse catalog, answer/progress, route and task contracts.

**Tech Stack:** Existing React/TypeScript, native inputs, SVG and HTML; no dependencies.

**Spec:** [Approved design](../specs/2026-11-07-cybersecurity-math-design.md).

## Global constraints

- No test creation/execution, samples, browser/manual checks, lint, typecheck, build or audits. Source/diff review only.
- Preserve old IDs/version, saved progress shape and preview/prerequisite rules. No L1 assessment until CM-03d completes the level.
- Every lesson has all six stages, two practice variations plus edge, three hints, two 3-item checkpoints, task/reflection. Module has two 5-item sets and a written task/rubric.
- Commit/push only related changes to the authorized main branch; preserve unrelated files.

## Review focus

- a^0=1 only with nonzero base; 0^0 remains excluded. Product/division rules require the same base; division uses nonzero base and m≥n here.
- Linear increments and exponential factors differ; exponential need not exceed linear at the first inputs. Both sampled curves have explicit axes, units and scales.
- String-space counts assume every combination is allowed, with repetition. Uniform independent sampling is needed for equal probabilities, not for merely counting the set.
- Empty strings give one mathematical possibility; a one-symbol alphabet gives one string at any fixed length. Neither is a recommendation for real secrets.
- Prefix displays must say when they show only the first two positions; table counts must account for undisplayed suffixes without rendering the whole space.

## Task 1 — CM-03c

**Files:** Create `src/content/cybersecurity-math/growth.ts`, `src/components/cybersecurity-math-growth.tsx`; modify `types.ts`, `catalog.ts`, `cybersecurity-math-activities.tsx` and curriculum/architecture/authoring/backlog/roadmap/status docs.

**Interfaces:** Export `growth: Partial<Record<string, MathLessonContent>>`, `growthModuleChecks: [MathQuestion[], MathQuestion[]]`, `growthTask: Copy`. Visual consumes existing activity/value/onChange. Shared bounds: `growth` n=0…6 and factor=2…3; `search-space` alphabet size=1…4 and length=0…6. All values integer, max displayed count 4^6=4096.

- [x] Author/register the three complete lessons and module sets/task; vary checkpoint parameters and use different transfer contexts from worked examples.
- [x] Add bounded graph with equivalent table and small prefix tree/table; dispatch using shared kinds/bounds without expression parsing.
- [x] Read source/diff, request one fresh review, fix important findings in one pass and update status/docs; scoped commit/push delivery follows staged review and is recorded in Git history. Runtime remains unverified.

## Ledger

- Starting point: `566815c` pushed, 18 lessons / 102 drafts, L0 complete and L1M01–M02 published.
- Ruling: reuse `powers`; use fixed growth models and a two-position prefix tree rather than a graph/expression framework — enough to expose the mathematical assumptions with small, bounded rendering.
- Pre-flight: new visual kinds/bounds flow to dispatch and restore validation; authored catalog entries flow to published routes and prerequisites. No grading/storage API changes.
- Fresh source review found unequal lesson sets and direct reuse of solved parameters. Both exponent sets now cover product/quotient, power-of-power/addition and zero; both string sets cover unrestricted counts, empty string and forbidden repetition with new parameters.
- Growth-comparison questions are critical in both module sets; routine unrestricted counts are noncritical, retaining a legitimate 4/5 pass with all critical concepts correct.
- Final: Ruling: factor-count wording and the order example affect beginner understanding, so treat them as Important rather than cosmetic — say start at 1 and multiply once per position, and compare AB with BA. This avoids an off-by-one interpretation and an ambiguous illustration. No deferred findings or declined judgments.
- Outcome: 21 published lessons / 99 drafts; seven checkpoint/task modules, unchanged L0 assessment. Next CM-03d/L1M04 plus L1 assessment. No tests, examples or runtime checks executed.

# Cybersecurity Math Algebra Foundations Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline under the already-approved roadmap and no-test policy.

**Goal:** Complete CM-03a/L1M01: variables, equations and integer resource budgets, three bilingual lessons with full activities/checkpoints/tasks.

**Architecture:** Reuse count exploration for concrete variable/substitution and missing-addend equations, with authored input labels. Add one bounded visual for the actual budget model 40+3x≤budget. Reuse answer/progress/module grading; ensure cross-level navigation points to the L0 assessment before L1.

**Tech Stack:** Existing React/TypeScript, native controls/tables; no dependencies.

**Spec:** [Approved design](../specs/2026-11-07-cybersecurity-math-design.md).

## Constraints and review focus

- No test creation/execution, manual/browser checks, lint, typecheck, build, audits or sample execution.
- Preserve all existing content IDs/versioned progress and database isolation. No L1 assessment until four modules are authored.
- Meaningful controls/labels, nonnegative integer x, no feasible budget below fixed cost, and check x+1 against the limit.
- Both sides of an equation must stay equal; units and arithmetic multiplication vs variable names must be explicit.
- Cross-level preview/next links must name the missing assessment rather than loop to an already-passed module.

## Task — CM-03a

- [x] Author three full bilingual lessons, 2×3 lesson sets, 2×5 module sets and task/rubric.
- [x] Add count input labels and the focused budget visual/bounds; keep controls and equivalent tables accessible.
- [x] Wire the published module, dynamic level badge and missing-level-assessment navigation.
- [x] Fresh read-only source review, fixes and updated status/docs. Delivery follows staged-diff review, scoped commit and authorized push; Git history records the outcome.

## Ledger

- L0M03 `d55524a` and L0 completion `89f5ce2` committed/pushed. Starting from 12 lessons and two 13-item L0 assessments.
- Ruling: reuse the concrete sum model for variables/equations; do not introduce a symbolic expression parser or configurable algebra engine.
- Fresh review traced L0 lesson→module→assessment→L1 official/preview links and unchanged storage IDs/version. Corrected repeated checkpoint parameters, misleading fixed-value label on an editable control, and unit-neutral table totals. No runtime or tests executed.
- Outcome: 15 authored/published lessons, five module checkpoints/tasks, two 13-item L0 assessment sets; 105 lessons remain draft. Next CM-03b/L1M02.

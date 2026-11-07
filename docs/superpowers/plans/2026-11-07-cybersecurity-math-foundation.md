# Cybersecurity Math Foundation Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline. User approved the design and starting implementation on 7 November 2026. Project instructions override test/worktree defaults: work on the current branch, preserve unrelated edits, no tests or runtime checks, commit and push each complete job.

**Goal:** Deliver CM-01: a discoverable math path with three complete bilingual L0M01 lessons, meaningful visual activities, checkpoints, local progress, and a module task.

**Architecture:** Keep math content/player/progress separate from database. Reuse Workspace, Button, Badge, locale, and theme; only add focused numeric-question and foundational visual components. A full metadata map remains draft until authored.

**Tech Stack:** Installed Next.js App Router, React, TypeScript, CSS modules, Lucide. No new dependencies.

**Spec:** [Approved design](../specs/2026-11-07-cybersecurity-math-design.md).

## Global constraints

- No test creation/execution, manual/browser check, lint, typecheck, build, audit, or example execution.
- Separate key `taalmo.cybersecurity-math.progress.v1`; no writes to database progress.
- English/Indonesian content, stable `cm-…` IDs, published-only routes, no empty launch links.
- Source/diff review only, followed by a scoped commit and push to the current authorized origin/main; no merge/deploy.

## Review focus

- Corrupt/unrecognized storage must not manufacture mastery or crash a page.
- An incorrect resubmission or changing visual inputs must invalidate the current answer; solution exposure must survive retake.
- Locked preview must not write official answers, resume, or completion.
- Reload/locale change must preserve valid records; a failed write must report failure and keep the active work in memory.
- Mobile navigation, numeric input labels, zero/divisor cases, assisted attempts and draft counts must be explicit.

## Files and interfaces

- `src/content/cybersecurity-math/{types,catalog,foundation}.ts`: localized content, metadata, questions and authored L0M01.
- `src/lib/cybersecurity-math.ts`: record validation, mastery/prerequisites, bounded numeric grading.
- `src/lib/cybersecurity-math-progress.ts`: browser repository/subscription with memory fallback and write status.
- `src/components/cybersecurity-math{,-player,-activities}.tsx` and CSS module: path/card, step player, numeric question and visual controls.
- `src/app/learn/cybersecurity-math/page.tsx` and `[lessonId]/page.tsx`: server entry points, metadata and 404 guards.
- `src/components/{shell,learning}.tsx`, message dictionary, CSS: entry points, context and wrapping nav.
- README/architecture/roadmap/backlog/spec: approval, publication and source-review evidence.

## Task 1: Catalog and complete L0M01 content

- [x] Define `Copy`, `MathQuestion`, `MathLessonContent`, catalog hierarchy, and deterministic two-set assessments.
- [x] Register 40 modules/120 target lessons with bilingual titles, draft state and ordered prerequisites.
- [x] Author three full lessons: count/addition; groups/multiplication; division/remainder/order of operations. Include prediction, exploration target, explanation, worked steps, two practice variants, edge case, hints, transfer/reflection and two three-item checkpoints.
- [x] Author two five-item module checkpoints, task/rubric and level publication guard.
- [x] Read content and derivations; no executed math/check script.

## Task 2: Isolated progress and grading

- [x] Define versioned lesson/module records with bounded attempts, answers, exploration, step, assistance, reflection/task and immutable passed snapshot.
- [x] Parse only known IDs/question sets, finite bounded numeric answers and valid steps; recompute completion from actual content and required activity. Inactive version records remain opaque history.
- [x] Implement ordered lesson/module unlocks, keep unauthored level assessments closed, and draft-aware counts. Preview saves nothing official.
- [x] Add useSyncExternalStore persistence with same/cross-tab events, memory fallback on failed writes and visible failure status. Merge a patch against latest same-origin records; disclose concurrent-tab limitation.
- [x] Read all save/parse/grade paths for empty input, zero, corrupted arrays and retake behavior.

## Task 3: Path, player and navigation

- [x] Build data-driven catalog/card; show published/draft counts, level purpose/security use, and separate task readiness.
- [x] Build six-step player covering all authoring elements, resumable official records, informative preview, hints, assisted checkpoint restart, formative results and next action.
- [x] Add HTML numeric controls and equivalent visual/table for joining counts, groups, and quotient/remainder. Require target manipulation and correct observation for completion.
- [x] Wire menu/header/sidebar/dashboard/CURRENT PATH, published lesson routes and active child links.
- [x] Read paired locale strings, accessible markup, CSS wrapping, route guards and every modified caller.

## Task 4: Review, documentation and delivery

- [x] Request fresh source-only whole-change review, resolve important findings through code/diff reading; no tests.
- [x] Update actual status, remaining module, counts, assistance/storage limits, approved spec and backlog.
Delivery: stage relevant files only, inspect staged diff, commit and push; preserve next-env.d.ts and the database workspace file. Git history and the final delivery report record the outcome.

## Execution ledger

- Design approved; initial docs commit `9d96ed4` pushed to origin/main after explicit destination approval.
- Ruling: no skill test scripts, TDD, baseline install/build or worktree creation — project/user instructions require source/diff review and current-branch delivery; runtime remains unverified.
- Pre-flight: catalog question IDs/sets are shared by parser, grading, player and assessment. Keep one exported question selector and one grading implementation.
- Tasks 1–3 complete by source review: content/catalog, isolated persistence/mastery, and path/player/navigation implemented. No runtime verification performed.
- Final review: fresh reviewer found important issues in exposure parsing, stale numeric fields, task gating, assistance/seen sets, history, feedback and mobile button wrapping. Fix pass addressed each through source/diff reading; no tests permitted. No findings were declined as outside scope.
- Ruling: transfer notes are optional for automatic progress; reflection remains required — prevents written task drafts from gating checkpoint progression; correctness of written explanations still requires human review.
- Ruling: inactive versions are preserved as opaque history, not interpreted with current questions — protects prior evidence while keeping current mastery version-specific; there is no automatic equivalence or history UI.
- Ruling: level-purpose/security-use metadata treated as a required path feature despite reviewer Minor label; added for all ten levels. No deferred minor findings remain.

# Roadmap

## Current MVP

- Distinctive landing page with a runnable product preview.
- Local learning dashboard, path, activity, recommendations, and milestones.
- Three transaction introductions and knowledge checkpoints.
- Complete Duplicate Payment Callback sandbox: unsafe/protected modes, step/run/reset/replay, historical state, node inspection, committed records, rollback recovery, result evaluation, final quiz.
- Complete Lost Update sandbox: stale reads and unsafe replacements versus row-locked atomic increments, configurable write order and initial balance, step/run/reset/replay, historical state, record inspection, and a separate final quiz.
- Complete Deadlock sandbox: two-transaction wait-for graph, opposite/consistent lock ordering, staged debit rollback, configurable victim, one bounded whole-transaction retry, and a dedicated final quiz.
- English/Indonesian interface, learning content, quizzes, simulation explanations, diagram labels, and activity dates; a device-local language preference preserves learning state. Server metadata stays English.
- Device-local progress for six milestones, light/dark themes, responsive layout. Existing tests come from the initial MVP; follow the no-test policy in `AGENTS.md` for subsequent work.

## Database Zero to Master slice

The new path registers all 10 levels, 40 modules and 120 canonical IDs. L0–L1 and L2M01 have 24 published Indonesian lessons, practice variants/edge cases, progressive hints, reflection, versioned resume and module/level assessment gates. The remaining curriculum has 96 draft lessons, not available player content. SQL examples are verified on disposable PostgreSQL; the website uses prediction-based formative activities and has no arbitrary SQL runner or account-backed certification.

## Recommended next milestone: L2M02 authoring

Continue with OVER/PARTITION BY/ORDER BY, ROW_NUMBER/RANK/DENSE_RANK and LAG/LEAD/running totals, following `database-path-remaining.md` and the authoring contract. Add real teaching content and grounded activities before publishing. Preserve IDs and existing progress. An isolated SQL runner is a separate future capability, not a reason to expose unrestricted database execution.

## Later learning improvements

- A compact Sandbox overview using the existing three-lab catalog.

- Expand meaningful accessibility checks and Safari/Firefox/mobile browser coverage.
- Distinguish reading completion from checkpoint mastery if the product needs both.
- Add more scheduling choices only when they teach a specific concept; keep runs reproducible.

## Production considerations, when needed

- Authentication and PostgreSQL-backed per-user progress, with migrations and recovery from local progress.
- Content editing/versioning, reviewed educational accuracy, operational monitoring, backups, and deployment policy.
- A real PostgreSQL adapter only if server experiments become a product requirement; isolate workloads, bound resources, and prevent arbitrary code execution by default.
- Real payment integrations would separately require verified gateway signatures, amount/currency reconciliation, authorization, audit controls, and operational idempotency. This educational model is not a payment handler to deploy.

No authentication, paid APIs, AI, Docker, real payment calls, or production infrastructure are included in the MVP.

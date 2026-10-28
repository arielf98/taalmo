# Roadmap

## Current MVP

- Distinctive landing page with a runnable product preview.
- Local learning dashboard, path, activity, recommendations, and milestones.
- Three transaction introductions and knowledge checkpoints.
- Complete Duplicate Payment Callback sandbox: unsafe/protected modes, step/run/reset/replay, historical state, node inspection, committed records, rollback recovery, result evaluation, final quiz.
- Complete Lost Update sandbox: stale reads and unsafe replacements versus row-locked atomic increments, configurable write order and initial balance, step/run/reset/replay, historical state, record inspection, and a separate final quiz.
- Complete Deadlock sandbox: two-transaction wait-for graph, opposite/consistent lock ordering, staged debit rollback, configurable victim, one bounded whole-transaction retry, and a dedicated final quiz.
- English/Indonesian interface, all published database curriculum content, catalog metadata, quizzes, simulation explanations, guided diagram labels, and activity dates; a device-local language preference preserves learning state. Server metadata stays English.
- A compact `/sandbox` overview lists the three catalog-backed transaction labs, their scenarios, explored-mode counts and lab completion, with lesson/simulator links in English and Indonesian. Header Sandbox and the completed transaction-dashboard revisit action open the overview.
- Device-local progress for six milestones, light/dark themes, responsive layout. Existing tests come from the initial MVP; follow the no-test policy in `AGENTS.md` for subsequent work.

## Database Engineering — database curriculum

The unified path `/learn/database-engineering` registers 10 levels, 40 modules and 120 canonical IDs. L0–L9 provide all 120 published bilingual lessons across 40 modules; no canonical lessons remain draft. Worked results, concept checks, practice variants/edge cases, hints, reflection and versioned progress use the existing player. Only L0–L2M01 have historical executed SQL evidence; later additions have source/diff review only. Practice predicts authored outcomes; the website does not execute learner SQL.

## Canonical authoring complete; executed capstone evidence remains separate

L9M01–L9M03 cover ledger design, load/failure evidence interpretation and master defense in nine bilingual lessons. All 40 modules are authored; the existing L9 assessment is now available under normal publication/prerequisite/mastery gates. Critical checks still apply. This is completion of authored prediction learning, not proof that a learner built, tested, recovered or defended an operational payment system.

No next canonical authoring module remains. Future real-capstone work would need a separately agreed scope, isolated environment, authorization to execute checks, durable artifacts and human review. Current evidence after L2M01 remains source/diff review only. No load, EXPLAIN, security review execution, restore, migration, merge or deployment was performed. The Sandbox overview below is now implemented by source/diff review; other product ideas remain optional.

## Sandbox overview — 29 October 2026

The compact overview uses the existing labs/lessons catalog and read-only browser progress. A completed lesson does not complete a lab, and exploring both modes remains separate from passing the final checkpoint. Existing routes, simulation engines, IDs, storage and mastery rules are unchanged. No new dependency or persistence write was added.

Review scope is source/diff only. No tests, manual/browser checks, lint, typecheck or build were run. The next optional item, accessibility/browser coverage, requires explicit authorization to execute checks under AGENTS.md. Further product changes below still need concrete scope.

## Later learning improvements

- Expand meaningful accessibility checks and Safari/Firefox/mobile browser coverage.
- Distinguish reading completion from checkpoint mastery if the product needs both.
- Add more scheduling choices only when they teach a specific concept; keep runs reproducible.

## Production considerations, when needed

- Authentication and PostgreSQL-backed per-user progress, with migrations and recovery from local progress.
- Content editing/versioning, reviewed educational accuracy, operational monitoring, backups, and deployment policy.
- A real PostgreSQL adapter only if server experiments become a product requirement; isolate workloads, bound resources, and prevent arbitrary code execution by default.
- Real payment integrations would separately require verified gateway signatures, amount/currency reconciliation, authorization, audit controls, and operational idempotency. This educational model is not a payment handler to deploy.

No authentication, paid APIs, AI, Docker, real payment calls, or production infrastructure are included in the MVP.

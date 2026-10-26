# Roadmap

## Current MVP

- Distinctive landing page with a runnable product preview.
- Local learning dashboard, path, activity, recommendations, and milestones.
- Three transaction introductions and knowledge checkpoints.
- Complete Duplicate Payment Callback sandbox: unsafe/protected modes, step/run/reset/replay, historical state, node inspection, committed records, rollback recovery, result evaluation, final quiz.
- Complete Lost Update sandbox: stale reads and unsafe replacements versus row-locked atomic increments, configurable write order and initial balance, step/run/reset/replay, historical state, record inspection, and a separate final quiz.
- Complete Deadlock sandbox: two-transaction wait-for graph, opposite/consistent lock ordering, staged debit rollback, configurable victim, one bounded whole-transaction retry, and a dedicated final quiz.
- English/Indonesian interface, all published database curriculum content, catalog metadata, quizzes, simulation explanations, guided diagram labels, and activity dates; a device-local language preference preserves learning state. Server metadata stays English.
- Device-local progress for six milestones, light/dark themes, responsive layout. Existing tests come from the initial MVP; follow the no-test policy in `AGENTS.md` for subsequent work.

## Database Engineering — database curriculum

The unified path `/learn/database-engineering` registers 10 levels, 40 modules and 120 canonical IDs. L0–L7 provide 99 published bilingual lessons; 21 remain draft. Worked results, concept checks, practice variants/edge cases, hints, reflection and versioned progress use the existing player. Only L0–L2M01 have historical executed SQL evidence; later additions have source/diff review only. Practice predicts authored outcomes; the website does not execute learner SQL.

## Recommended next milestone: L8M01 authoring

L7 is fully authored and its existing level assessment is available under the usual mastery requirements. Operational permission, connection and incident examples remain authored decision exercises; no grants, pools, mitigations or production drills were executed.

Continue with L8M01 — Caching & Consistency Trade-offs: cache-aside and TTL, eventually consistent invoice projections/read models, and explicit freshness, ordering and failure contracts for dashboards, ledgers and notifications. Preserve canonical IDs, content versions, fixture boundaries and learner progress. Follow AGENTS.md: source/diff review only, no tests/audits/SQL/runtime/browser/manual checks, lint, typecheck or build; commit, push and continue.

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

# Roadmap

## Current MVP

- Distinctive landing page with a runnable product preview.
- Local learning dashboard, path, activity, recommendations, and milestones.
- Three transaction introductions and knowledge checkpoints.
- Complete Duplicate Payment Callback sandbox: unsafe/protected modes, step/run/reset/replay, historical state, node inspection, committed records, rollback recovery, result evaluation, final quiz.
- Device-local progress, light/dark themes, responsive layout, domain and browser tests.

## Recommended next milestone: Lost Update lab

Add one more end-to-end lab using the existing generic engine. Model overlapping read-modify-write operations, compare unsafe writes against an atomic increment or optimistic concurrency check, and add a final reasoning checkpoint. Replace the single available-lab launch action with an explicit per-lesson lab route only when this second lab exists.

Then implement the Deadlock lab with a small wait-for graph, deterministic detection, consistent lock ordering, and a bounded whole-transaction retry example.

## Later learning improvements

- Extract interface strings to a locale dictionary and provide reviewed Indonesian content.
- Expand meaningful accessibility checks and Safari/Firefox/mobile browser coverage.
- Distinguish reading completion from checkpoint mastery if the product needs both.
- Add more scheduling choices only when they teach a specific concept; keep runs reproducible.

## Production considerations, when needed

- Authentication and PostgreSQL-backed per-user progress, with migrations and recovery from local progress.
- Content editing/versioning, reviewed educational accuracy, operational monitoring, backups, and deployment policy.
- A real PostgreSQL adapter only if server experiments become a product requirement; isolate workloads, bound resources, and prevent arbitrary code execution by default.
- Real payment integrations would separately require verified gateway signatures, amount/currency reconciliation, authorization, audit controls, and operational idempotency. This educational model is not a payment handler to deploy.

No authentication, paid APIs, AI, Docker, real payment calls, or production infrastructure are included in the MVP.

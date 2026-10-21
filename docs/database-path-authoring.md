# Authoring Database Zero to Master

## Source of truth and publication

The canonical package is `curriculum/taalmo-database-zero-to-master/`. The adapter `src/content/database/catalog.ts` preserves all blueprint IDs, titles, order and module prerequisites. Adding an authored record in the three JSON files makes that canonical lesson published. The content audit is a required release check: incomplete authored records must not be added. Unauthored lessons remain draft, visible as roadmap entries without links; the lesson route uses the published static parameter list only.

The first release authors L0–L1: 7 modules, 21 lessons. The remaining 99 lessons are explicitly draft. Their per-lesson work is listed in `database-path-remaining.md`. Nothing imports content into learner storage, so rebuilding/importing the catalog is idempotent and cannot reset progress.

## Content contract

Use `src/content/database/types.ts`. Each authored lesson includes stable ID and semantic content version, difficulty/tags, a unique real problem, measurable objectives, substantial Indonesian explanation with misconceptions and limits, worked PostgreSQL SQL with expected columns/rows, two or more concept checks, two practice variants, two independently graded edge cases, three progressive hints, a reference solution and reflection.

Questions use stable IDs, distinct option texts, an answer index and feedback for every option. Correct positions should vary. Retakes rotate visible options while retaining the canonical answer index. Practice variants change the scenario or result being reasoned about; change numeric inputs and their correct feedback together. Keep remedial feedback specific to the error, including the concept to revisit. Mark safety/integrity questions critical and mark the corresponding activity critical. All activity/edge-case answers must be correct to finish a lesson.

The new player reuses the platform Quiz, Button, Workspace and local progress repository. Current exercise fallback is an output prediction or debugging decision. It does not execute learner SQL or establish arbitrary SQL-writing skill. Reflection is stored, not automatically graded for quality. Do not publish a lesson requiring unavailable interactive evidence by representing its title as a completed lab.

## PostgreSQL fixture and examples

Target: PostgreSQL 17, verified locally with `postgres:17-alpine`. School Finance seed has six students, ten invoices and eleven payment rows. Only succeeded payments count as receipts. It deliberately has no `invoices.status` column and no identity/default for `students.student_id`.

For generated IDs or mutations, specify an isolated TEMP-table setup. Explain the adaptation in learner copy. `worked.sql` returns a table described by `columns` and `rows`; expected CSV values are strings or null. Use `ordered: true` only when ordering is part of the exercise contract. Otherwise verification compares multisets, including duplicates. Amount formatting and deterministic dates must match the example. Avoid current date/time and environment-dependent formatting.

`activity.solutionSql` is a reference script, not executed by the website. An intentional rejection must carry `solutionError` with its PostgreSQL SQLSTATE, and explain why the rejection is expected. Every other reference script must run without error. Setup applies to both worked example and reference solution on separate fresh fixtures.

```sh
npm run curriculum:audit
npm run curriculum:sql -- --context colima
```

No application seed command is necessary: catalog imports are static. SQL verification alone seeds a disposable database. It requires Docker with a locally available `postgres:17-alpine` image and Python 3; substitute your Docker context for `colima`. It creates its own randomly named container with no network, no host mount, no exposed port and bounded resources. It refuses a database URL by offering none. Container and anonymous volume are removed in `finally`; no existing database/container is reset. The source SQL seed drops fixture tables and must never be run against production.

Primary references: [PostgreSQL NULL comparisons](https://www.postgresql.org/docs/17/functions-comparison.html), [table expressions and joins](https://www.postgresql.org/docs/17/queries-table-expressions.html), [identity columns](https://www.postgresql.org/docs/17/ddl-identity-columns.html), [ROLLBACK](https://www.postgresql.org/docs/17/sql-rollback.html).

## Progress, gates and versions

`taalmo.progress.v1` retains the original transaction milestones. Its optional `curriculum` field stores versioned lesson/exam records and a resume ID for the current browser learner. Saved answers use canonical option indexes; translated or reordered display copy does not change grading. Completed snapshots remain when starting a fresh attempt. New content versions requalify against their own records without deleting older versions.

A lesson requires the selected practice variant, every edge case, both concept checks and a recorded reflection. Prerequisite modules gate official completion, while all published theory remains explorable. Module checkpoint needs all lesson activities and >=80%, including every critical question correct. Level assessment needs all modules and >=85%, including critical questions correct. Assessment scores are derived from saved answers rather than trusting a stored percentage. No week/calendar lock exists. Diagnostic only recommends a starting topic and never grants progress or bypasses safety.

This is formative device-local mastery, not protected credential issuance. Answers exist in client content; expected solutions are concealed in the UI until a practice submission. There is no server grading, authentication, cross-device progress, tenant database or trusted badge service. Introducing those requires a separate backend design; do not claim browser storage prevents learner tampering.

## Validation and editing workflow

1. Read the blueprint/module prerequisites and target fixture; author real material in the content JSON, preserving IDs.
2. Run the content audit; fix missing body, invalid question IDs/answers, incomplete feedback, missing variants/edge cases/hints or broken prerequisites.
3. Run disposable PostgreSQL checks. Compare expected rows semantically, inspect incorrect examples, and prove intended constraint failures.
4. Run the scoped browser integration suite and static checks:

```sh
npm run test:curriculum -- --workers=1
npm run typecheck
npm run lint
npm run build
```

The current master prompt explicitly authorizes these checks for the curriculum task. The general `AGENTS.md` no-test policy still applies to unrelated later work. No new unit tests are part of this change. Browser integration covers completion gating, saved responses, resume, draft exclusion, prerequisites, blocked storage and mobile layout. Screenshots are written to ignored `output/playwright/`.

5. Update published/draft counts and remaining checklist from actual authored content; commit the completed work without push/deploy.

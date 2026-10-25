# Authoring Database Zero to Master

## Source of truth and publication

The public Database Engineering path is `/learn/database-engineering`; its SQL/database curriculum retains the source name Database Zero to Master. Transaction practice shares that page without changing its existing lesson or lab IDs.

The canonical package is `curriculum/taalmo-database-zero-to-master/`. The adapter `src/content/database/catalog.ts` preserves all blueprint IDs, titles, order and module prerequisites. Adding an authored record in a registered content JSON file makes that canonical lesson published. Incomplete authored records must not be added. The historical validation workflow below applies only with explicit user authorization; current AGENTS.md prohibits running tests, audits, SQL validation, manual/browser checks, lint, typecheck and build. Unauthored lessons remain draft, visible as roadmap entries without links; the lesson route uses the published static parameter list only.

Published content covers L0–L2 and L3M01: 12 modules, 36 lessons. The remaining 84 lessons are explicitly draft. Their per-lesson work is listed in `database-path-remaining.md`. Nothing imports content into learner storage, so rebuilding/importing the catalog is idempotent and cannot reset progress. L2M02–L2M04 and L3M01 were reviewed by reading source and diff only; their SQL results and browser behavior have not been executed.

## Content contract

Use `src/content/database/types.ts`. Each authored lesson includes stable ID and semantic content version, difficulty (`beginner` for L0–L1, `intermediate` for L2–L3M01)/tags, a unique real problem, measurable objectives, substantial Indonesian explanation with misconceptions and limits plus a complete authored English display translation, worked PostgreSQL SQL with expected columns/rows, two or more concept checks, two practice variants, two independently graded edge cases, three progressive hints, a reference solution and reflection.

Questions use stable IDs, distinct option texts, an answer index and feedback for every option. Correct positions should vary. Retakes rotate visible options while retaining the canonical answer index. Practice variants change the scenario or result being reasoned about; change numeric inputs and their correct feedback together. Keep remedial feedback specific to the error, including the concept to revisit. Mark safety/integrity questions critical and mark the corresponding activity critical. All activity/edge-case answers must be correct to finish a lesson.

All published learner-facing text must have English and Indonesian display copy. Keep canonical IDs, versions, SQL, fixture/result values, question order and numeric answer indexes unchanged. Add normalized source-string keys and full English translations in the appropriate `src/content/messages/en-database-*.json` dictionary; register a new dictionary in `src/content/messages.ts`. Cover hooks, objectives, every section paragraph/title, worked explanations, all question/options/feedback/explanations, practice/setup, hints, solution explanation and reflection prompt. Catalog titles/goals/objectives, draft lesson titles, labels and flow descriptions require translations too. Source-English UI labels need Indonesian entries. Do not pass SQL scripts or expected rows through the translator, and do not translate learner-entered reflection. Localize display values without changing React keys or persistence keys. A fallback to source text is not complete localization.

The new player reuses the platform Quiz, Button, Workspace and local progress repository. Current exercise fallback is an output prediction or debugging decision. It does not execute learner SQL or establish arbitrary SQL-writing skill. Reflection is stored, not automatically graded for quality. Do not publish a lesson requiring unavailable interactive evidence by representing its title as a completed lab.

## PostgreSQL fixture and examples

Target: PostgreSQL 17; earlier L0–L2M01 examples were verified locally with `postgres:17-alpine`. School Finance seed has six students, ten invoices and eleven payment rows. Only succeeded payments count as receipts. It deliberately has no `invoices.status` column and no identity/default for `students.student_id`.

For generated IDs or mutations, specify an isolated TEMP-table setup. Explain the adaptation in learner copy. `worked.sql` returns a table described by `columns` and `rows`; expected CSV values are strings or null. Use `ordered: true` only when ordering is part of the exercise contract. Otherwise verification compares multisets, including duplicates. Amount formatting and deterministic dates must match the example. Avoid current date/time and environment-dependent formatting.

`activity.solutionSql` is a reference script, not executed by the website. An intentional rejection must carry `solutionError` with its PostgreSQL SQLSTATE, and explain why the rejection is expected. Every other reference script must run without error. Setup applies to both worked example and reference solution on separate fresh fixtures.

```sh
npm run curriculum:audit
npm run curriculum:sql -- --context colima
```

No application seed command is necessary: catalog imports are static. SQL verification alone seeds a disposable database. It requires Docker with a locally available `postgres:17-alpine` image and Python 3; substitute your Docker context for `colima`. It creates its own randomly named container with no network, no host mount, no exposed port and bounded resources. It refuses a database URL by offering none. Container and anonymous volume are removed in `finally`; no existing database/container is reset. The source SQL seed drops fixture tables and must never be run against production.

Primary references: [PostgreSQL NULL comparisons](https://www.postgresql.org/docs/17/functions-comparison.html), [table expressions and joins](https://www.postgresql.org/docs/17/queries-table-expressions.html), [identity columns](https://www.postgresql.org/docs/17/ddl-identity-columns.html), [ROLLBACK](https://www.postgresql.org/docs/17/sql-rollback.html), [subquery expressions](https://www.postgresql.org/docs/17/functions-subquery.html), [CTEs](https://www.postgresql.org/docs/17/queries-with.html), [set operations](https://www.postgresql.org/docs/17/queries-union.html).

L2M02 references: [window tutorial](https://www.postgresql.org/docs/17/tutorial-window.html), [ranking and offset functions](https://www.postgresql.org/docs/17/functions-window.html), [window ordering and frames](https://www.postgresql.org/docs/17/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS). Examples preserve payment detail, aggregate to student grain before ranking, and aggregate invoice receipts before monthly windows. Monthly totals allocate all known successful receipts to invoice periods; they are not historical month-end cash-flow snapshots. Missing calendar months and opening balances are not invented.

L2M03 references: [date/time types](https://www.postgresql.org/docs/17/datatype-datetime.html), [date/time operations](https://www.postgresql.org/docs/17/functions-datetime.html), [series generation](https://www.postgresql.org/docs/17/functions-srf.html), [join semantics](https://www.postgresql.org/docs/17/queries-table-expressions.html), [CASE and COALESCE](https://www.postgresql.org/docs/17/functions-conditional.html). Receipt filters use half-open boundaries in Asia/Jakarta. The 2026 calendar includes twelve months, with LAG applied after zero filling. Aging uses 10 October 2026 and receipts before the following local midnight, assumes fixture invoices are already issued, distinguishes not_due, and reports only positive outstanding. The fixture lacks a full historical ledger; missing timestamps, credits and completeness of live data need separate treatment.

L2M04 references: [SELECT and DISTINCT](https://www.postgresql.org/docs/17/sql-select.html), [subquery expressions](https://www.postgresql.org/docs/17/functions-subquery.html), [EXCEPT ALL and compatible results](https://www.postgresql.org/docs/17/queries-union.html), [constraint scope](https://www.postgresql.org/docs/17/ddl-constraints.html). Teach invoice versus payment grain, preaggregation, correlated anti-joins and right/left NULL limits. The NULL-bearing list is a CTE, preserving the fixture's NOT NULL foreign key. The checkpoint compares all four expected report columns in both directions with EXCEPT ALL and separately exposes negative balances. Its proposed-payment CASE is a read-only decision, not an atomic write guard; the seed does not reject cross-row overpayment. No test suite was expanded or executed to teach the query-testing topic.

L3M01 keeps the blueprint's mixed examples: Commerce entities/lifecycle, a student–guardian N:M exercise, and eight School Finance payment invariants. The Commerce mini fixture and guardian extension are canonical inline `worked.setupSql` definitions in `l3-modeling.json`; they create TEMP tables without mutating School Finance. TEMP FKs reference explicit `pg_temp` tables; guardian students are copied from the seed rather than referenced by a TEMP-to-permanent FK. An optional translated `worked.dataset` overrides the historical School Finance description. Register structural diagrams in `modeling-schemas.ts`: use the shared schema-table renderer, explicit PK/FK/types and cardinality, plus text explaining optionality and unimplemented guards. Diagram pairs may repeat the same entity to make branching relationships readable; they do not duplicate data.

L3M01 references: [PostgreSQL constraints](https://www.postgresql.org/docs/17/ddl-constraints.html), [temporary table semantics](https://www.postgresql.org/docs/17/sql-createtable.html), [schema qualification](https://www.postgresql.org/docs/17/ddl-schemas.html). The eight school invariants separate observed counts from guards: I1–I5 enforced in the seed, I6 missing timestamp CHECK, I7 missing atomic aggregate guard, I8 missing callback business identity. I8's observed count is NULL because the evidence is unavailable. The reference INSERT's expected SQLSTATE 23514 comes only from proposed I6 on a TEMP table; it does not establish overpayment rejection or callback idempotency. These are prediction/design-reasoning exercises, not an interactive ERD editor or SQL-writing certification. L3 remains incomplete and its level assessment stays unavailable.

## Progress, gates and versions

`taalmo.progress.v1` retains the original transaction milestones. Its optional `curriculum` field stores versioned lesson/exam records and a resume ID for the current browser learner. Saved answers use canonical option indexes; translated or reordered display copy does not change grading. Completed snapshots remain when starting a fresh attempt. New content versions requalify against their own records without deleting older versions.

A lesson requires the selected practice variant, every edge case, all concept checks and a recorded reflection. Prerequisite modules gate official completion, while all published theory remains explorable. Module checkpoint needs all lesson activities and >=80%, including every critical question correct. Level assessment needs all modules and >=85%, including critical questions correct. Assessment scores are derived from saved answers rather than trusting a stored percentage. No week/calendar lock exists. Diagnostic only recommends a starting topic and never grants progress or bypasses safety.

This is formative device-local mastery, not protected credential issuance. Answers exist in client content; expected solutions are concealed in the UI until a practice submission. There is no server grading, authentication, cross-device progress, tenant database or trusted badge service. Introducing those requires a separate backend design; do not claim browser storage prevents learner tampering.

## Historical validation and editing workflow — explicit authorization required

1. Read the blueprint/module prerequisites and target fixture; author real material in the content JSON, preserving IDs.
2. Register each new content file in the catalog, content audit, SQL verifier and browser integration imports. Run the content audit; fix missing body, invalid question IDs/answers, incomplete feedback, missing variants/edge cases/hints or broken prerequisites.
3. Run disposable PostgreSQL checks. Compare expected rows semantically, inspect incorrect examples, and prove intended constraint failures.
4. Run the scoped browser integration suite and static checks:

```sh
npm run test:curriculum -- --workers=1
npm run typecheck
npm run lint
npm run build
```

The original master prompt authorized these checks for the initial curriculum implementation. Do not treat that historical permission as authorization for later work: follow the current AGENTS.md and user instructions. No new unit tests are permitted. The existing browser integration covers completion gating, saved responses, resume, draft exclusion, prerequisites, blocked storage and mobile layout for its registered lessons. Screenshots are written to ignored `output/playwright/`.

5. Update published/draft counts and remaining checklist from actual authored content; commit the completed work without push/deploy.

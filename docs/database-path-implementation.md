# Database Zero to Master — implementation plan

**Goal:** Integrate the canonical 10-level/40-module/120-lesson path into Taalmo, starting with a complete L0–L1 vertical slice (21 lessons) and 99 explicitly draft lessons.
**Current publication:** L0–L4: 60 published / 60 draft. Original evidence below is release history. Later additions have source/diff review only; executed validation still covers L0–L2M01.
**Spec:** `curriculum/taalmo-database-zero-to-master/PROMPT_UNTUK_CODEX.md`, blueprint, curriculum Markdown, PostgreSQL fixture. All three source documents were read before implementation.
**Architecture:** Extend the existing lesson route, Quiz, Workspace and versioned progress repository. Adapt blueprint metadata without changing IDs/order. No auth/router rewrite, external service, arbitrary SQL runner or new product dependency.

## Initial release audit and mapping

| Requirement                        | Existing capability                                 | Minimum addition                                                                                                     |
| ---------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Path/level/module/lesson structure | One flat transaction path, three lessons            | Blueprint adapter, catalog route and structured content contract; reuse `/lessons/[slug]`                            |
| Indonesian lesson authoring        | English content + Indonesian dictionaries           | Native Indonesian authored paragraphs/examples/checks/activity/reflection for 21 lessons                             |
| Prediction/scenario practice       | Quiz and deterministic simulation engine            | Quiz-compatible grounded predictions, variant prompts and two independently graded edge cases per lesson             |
| SQL execution                      | None; transaction labs are in-memory models         | Explicit prediction fallback; PostgreSQL examples checked offline on disposable PostgreSQL, no learner SQL execution |
| Quiz feedback                      | Single check with generic explanation               | Optional per-option feedback and graded callback, preserving legacy callers                                          |
| Progress/resume/versioning         | Device-local `taalmo.progress.v1`, no auth          | Extend same repository with versioned curriculum records and resume; preserve old milestones                         |
| Module/level certification         | None                                                | All required activities + module exam >=80%; all modules + level exam >=85% + critical questions/activities passed   |
| Diagnostic                         | None                                                | Optional recommendation, no safety/progress bypass                                                                   |
| Content import/version             | Static TypeScript, no database/seed service         | Deterministic adapter keyed by blueprint IDs, no progress mutation during import                                     |
| Tests                              | Vitest domain tests and Playwright learning journey | Scoped content audit, SQL fixture checks and integration journey tests; no new unit tests                            |
| Deployment/auth/migrations         | No auth/backend/migrations or deployment pipeline   | Keep local learner model explicit; do not invent multi-user certification or production DB infrastructure            |

## Design decisions

- Use official draft metadata for the entire hierarchy; publish only authored records meeting the contract. Draft lesson routes return 404; catalog shows draft labels without lesson links.
- Reuse Question/Quiz for concept checks, output predictions and edge cases. The fallback proves interpretation and reasoning, not ability to write arbitrary SQL. SQL text is never matched as an answer or executed in the app.
- Answers for local formative assessment are present in client content; solutions are hidden in the UI until an attempt. This is not secure, server-graded certification.
- Theory stays explorable. Prerequisite gates control official completion, module exam and level certification; no calendar locks.
- Preserve versioned attempts on content updates. A new content version may require requalification without deleting the earlier record.
- Extend existing local progress instead of adding an account backend. Per-user means the current browser learner here; account-bound cross-device progress remains unavailable.
- User's new master prompt explicitly requests scoped integration/SQL validation, overriding the earlier no-test rule only for this curriculum task. No new unit tests. No push/deploy.

## Tasks

- [x] 1. Define content contract; adapt all canonical records with explicit published/draft status. Author L0–L1 with unique explanatory prose, worked examples, two checks, practice variants, two edge cases, progressive hints and reflection.
- [x] 2. Extend Quiz and progress repository. Implement prerequisite/certification rules and saved lesson responses/reflections/resume without changing legacy progress behavior.
- [x] 3. Register catalog and existing lesson routes; add module/level assessments, diagnostic and links from dashboard/navigation. Reuse styling with small responsive additions.
- [x] 4. Add content audit, PostgreSQL fixture/example verification and integration checks. Verify counts, IDs, gates, draft visibility, hints, resume and existing routes.
- [x] 5. Document authoring/fallback limits, remaining lesson checklist and exact evidence; commit completed work.

## Review focus

Corrupt/old localStorage must preserve valid legacy progress. Draft or unknown IDs must not render published lessons. Wrong answers/reflection-only clicks must not pass activities or safety gates. Retakes must clear current responses and vary scenarios/options. All SQL is confined to a disposable fixture; no production connection is accepted. Stage exams cannot bypass module prerequisites. Content imports do not write learner data.

## Initial L0–L1 release evidence

Validated on 21 October 2026:

- Content audit: 10 levels, 40 modules, 120 stable ordered lessons; **21 published / 99 draft**, 129 graded questions. All L0–L1 lessons include substantive prose, worked SQL, checks, variants, edge cases, hints and reflection.
- Disposable PostgreSQL **17.11**: 21 exact worked-result comparisons and 21 reference scripts passed, including the intended `23503` rejection. Four additional invalid mutations rejected as expected; five NULL/payment/multiplicity edge checks passed. TEMP setup preserved persistent namesake tables. Container and volume removed.
- `npm run test:curriculum -- --workers=1`: **3/3 passed**. The main test completes all 21 lessons, seven module checkpoints and two level assessments through the browser. Includes 80%/85% boundaries, critical failure overrides, saved reflection/answers, resume, retake preservation and hidden-solution gating. Other tests cover draft HTTP 404, prerequisite gates, 501 unknown records before valid older-version progress, blocked/corrupt storage and 390/768px widths.
- `npm run test:e2e -- tests/e2e/learning.spec.ts --workers=1`: **6/6 passed** for the existing learning/payment journey, replay/history/rollback, dashboard, theme and responsive navigation.
- `npm run typecheck` and `npm run lint`: passed. `TAALMO_DIST_DIR=.next-e2e npm run build`: passed, 35 static pages including the 21 curriculum lesson routes. Build output was isolated from the user's development directory; generated `next-env.d.ts` references restored afterward.
- No new unit tests, application dependencies, auth backend, migrations, production DB changes, push or deployment.

Review fixes: qualify temporary setup drops with `pg_temp`, preserve records before any arbitrary truncation, restore generated type references, explicitly label the reflection textarea, and reject unknown/draft static lesson parameters before rendering. Lesson progression follows canonical module prerequisites; no invented per-lesson gate is added.

Remaining limits: prediction/debugging decisions are formative client-side assessment, not arbitrary SQL execution or secure certification. Progress is local to the browser learner. Reflection is stored, not machine-graded. The remaining 96 lessons require real authoring and appropriate fixtures/simulators; see `database-path-remaining.md`. Only Chromium integration and specified widths were checked; no full WCAG or cross-browser conformance claim.

## L2M01 continuation — 21 October 2026

Published all three canonical lessons of **Subquery dan Set Thinking** in `src/content/database/l2-subqueries.json`: Subquery/EXISTS/IN, CTE/readability and UNION/INTERSECT/EXCEPT. Each includes substantial Indonesian explanation, grounded worked output, concept checks with per-option feedback, two practice variants, two graded edge cases, progressive hints, reference SQL and reflection. The new records use difficulty `intermediate`, displayed as MENENGAH.

The existing catalog/player/progress contract is reused. Counts derive from published records instead of the original 21/99 constants. L2M01 requires L1M05 for official completion; theory remains explorable. Other L2 modules remain draft, so no full L2 stage assessment is exposed. Existing lesson versions, IDs and progress keys are unchanged.

Validation results:

- Content audit: **24 published / 96 draft**, eight fully published modules, **148 graded questions**; all 10 levels, 40 modules and 120 canonical IDs retained.
- Disposable PostgreSQL **17.11**: **24 exact worked results and 24 reference solutions passed**. Four invalid mutations rejected and nine semantic fixture checks passed. Added checks cover correlated anti-join, EXISTS/NOT IN/empty-set NULL behavior, independent CTE aggregates and monthly set multiplicities. Corrected an extra closing parenthesis discovered by PostgreSQL in the new set-operation example. No validation containers remained afterward.
- `npm run test:curriculum -- --workers=1`: **3/3 passed**, including completion of all 24 lessons, eight module checkpoints and the two complete L0/L1 stage assessments. The suite additionally checks the intermediate label, L2 prerequisite gate, hidden L2 stage assessment, next draft route (`l2m02l01`) returning HTTP 404 and new L2 content at 390/768px without document overflow.
- `npm run test:e2e -- tests/e2e/learning.spec.ts --workers=1`: **6/6 passed** for the legacy learning journey. Responsive viewport transitions logged React Flow container-size warnings; the journey assertions and runtime-error checks passed.
- `npm run lint` and `npm run typecheck`: passed. `TAALMO_DIST_DIR=.next-e2e npm run build`: passed with **38 static pages**, including all 24 curriculum lessons. Generated `next-env.d.ts` references restored to the checkout defaults and typecheck repeated afterward.
- No new unit tests, dependencies, arbitrary learner SQL execution, progress migration, account backend, push or deployment. Prediction-based assessment and browser-local progress remain the documented limits; Chromium and the specified widths were checked, not full cross-browser or accessibility conformance.

Next authoring milestone: **L2M02 — Window Functions**, following the remaining checklist and the same publication/validation contract.

## L2M02 continuation — 22 October 2026

Scope: author the three canonical Window Functions lessons in Indonesian with complete English display translations. Reuse the current player, expected-result tables, quizzes, assessment and progress keys. Keep the School Finance fixture unchanged.

- [x] Author payment-detail totals; per-grade ranking with explicit tie policy; monthly LAG/LEAD, receipt totals and outstanding balance with explicit frames.
- [x] Register content and translations, update existing validation file registries and stale published/draft expectations without adding tests.
- [x] Update counts and next milestone, and review source and diff. Commit only this work.

Current AGENTS.md takes precedence over the historical validation workflow above: no tests, SQL execution, manual/browser checks, audit scripts, lint, typecheck or build will run for this continuation. SQL results are authored from the deterministic fixture and reviewed by reading; runtime validation remains outstanding. No new tests or dependencies.

Authored `l2m02l01`–`l2m02l03` in `l2-windows.json`, with complete display copy in `en-database-windows.json` and localized tags. Each lesson includes three objectives, explanatory sections, ordered expected-result tables, two concept checks, two practice variants, two graded edge cases, three hints, reference SQL and reflection. The existing player renders these result tables; no new diagram or simulation component is needed.

The catalog now includes nine fully authored modules and 27 published / 93 draft lessons. The blueprint, School Finance fixture, previous lesson versions and browser progress format are unchanged. L2M02 inherits the canonical L2M01 prerequisite; L2 remains incomplete and its level assessment remains unavailable. The next authoring milestone is **L2M03 — Analitik Waktu dan Laporan**.

Review covered fixture amounts, one-row-per-student/month grain, successful-payment filtering, tie policies, frame boundaries, NULL versus zero, translated answer/feedback pairing and registration through the existing catalog. Audit/SQL tools include the new file for a future explicitly authorized run. Existing E2E expectations were only adjusted for the new count and next draft route; the suite was not expanded and its lesson loop still covers the earlier 24 records. No commands from the historical validation evidence were rerun, and no passing-test, build or runtime claim is made for L2M02.

## L2M03 continuation — 22 October 2026

Scope: three bilingual time-reporting lessons using the current player and unmodified School Finance fixture. Use explicit Asia/Jakarta boundaries, a twelve-month calendar, and fixed-date aging with a separate not-due category. Preserve prior lesson IDs, versions and progress.

- [x] Author half-open receipt ranges, a zero-filled 2026 monthly report, and invoice aging with receipt cutoffs and explicit bucket boundaries.
- [x] Register content/translation files and existing validation registries; adjust stale existing E2E expectations without expanding the suite.
- [x] Update counts and the next milestone, and review code and diff. Commit this work only.

Follow current AGENTS.md: no tests, audits, SQL execution, manual/browser checks, lint, typecheck or build. Only source/diff review is authorized. No new tests, dependencies or database changes.

Authored `l2m03l01`–`l2m03l03` in `l2-time-reports.json` with complete English display copy in `en-database-time-reports.json` and localized tags. Each has explanatory sections, three objectives, a worked result table, two concept checks, two practice variants, two graded edge cases, three hints, reference SQL and reflection. The existing player, quiz and progress repository are reused.

Source review covered half-open instant boundaries, local-month grouping, explicit timestamp overloads for the twelve-month calendar, LEFT JOIN filter placement, COUNT of actual matches, LAG after filling calendar gaps, preaggregation per invoice, fixed-date age subtraction, 30/31/60/61 boundaries, and exclusion of future receipts from aging. Expected outputs were authored from the fixture: September receipts 1350000; annual receipts 3400000; positive outstanding 1950000, split into 1300000 at 0–30 days and 650000 above 60 days. These are source-reviewed expectations, not executed SQL results.

The catalog now has ten fully authored modules and 30 published / 90 draft lessons. L2M03 retains its canonical L2M02 prerequisite. L2M04 remains draft, so no complete L2 assessment is exposed. IDs, prior versions, fixture and storage format are unchanged. Validation registries include the new JSON for a future authorized run; existing E2E expectations only update the count and next draft route. No test cases or registered lesson coverage were added; the browser loop remains the earlier 24 records. Next: **L2M04 — Kebenaran Hasil Query**, under the same no-test policy unless the user explicitly changes it.

Limits are taught explicitly: the calendar is a static fixture report, not proof of complete live or future data; succeeded payments with unknown timestamps need investigation. Aging assumes fixture invoices already exist, uses current recorded statuses and has no complete issuance/status/refund ledger. Credits are separate from this positive-outstanding report. SQL, browser behavior and runtime remain unverified for L2M02–L2M03.

## L2M04 continuation — 25 October 2026

Published three bilingual lessons in `l2-correctness.json`, with `en-database-correctness.json` registered in the shared display translator:

- `l2m04l01`: bag semantics, invoice/payment grain, legitimate installments, why DISTINCT amounts cannot repair invoice aggregation, and preaggregated receipts.
- `l2m04l02`: correlated anti-joins, no rows versus no succeeded receipts versus positive balances, NULL-bearing exclusion lists, empty right-hand sources and unknown left-hand identities.
- `l2m04l03`: an outstanding report contract, independently authored expected rows, bidirectional EXCEPT ALL including multiplicity, and a hypothetical overpayment decision. Both concept checks and the overpayment edge case are critical, preserving an integrity-critical question in either level-assessment rotation.

Source/diff review covers invoice 103/109 installment multiplication, billed 5350000 versus direct-join 6450000, total succeeded receipts 3400000, and the five positive balances totaling 1950000. Invoice IDs are 102/104/105/106/108. The anti-join example introduces NULL through a CTE rather than violating the seed's NOT NULL foreign key. No source fixture or schema was changed. Expected booleans use PostgreSQL CSV f/t/null conventions.

The checkpoint reference compares all four report columns in both directions, including billed/paid components and row multiplicity. For the baseline, the authored expected summary is missing_rows 0, unexpected_rows 0, overpaid_invoices 0, and proposed_payment reject for 300001 against invoice 102's remaining 300000. A SELECT CASE does not enforce a write or concurrency boundary, and the seed has no aggregate overpayment constraint. This is taught explicitly rather than claiming a rejected database mutation.

The catalog now has eleven authored modules and 33 published / 87 draft lessons. All four L2 modules are published, so the existing level-assessment condition exposes L2; official completion remains gated on all module checkpoints and the level's 85%/critical-question rules. No progress storage or prior content versions changed. Combined transaction/database availability is 36 lessons plus three labs (39 activity milestones).

The content-audit and trusted-SQL file registries include the new JSON for a future authorized run. Existing E2E expectations now use 11 modules/33 lessons, the next draft route l3m01l01, and an available L2 assessment. No test case or registered browser lesson coverage was added; the earlier 24-record loop remains unchanged. No tests, audits, SQL, lint, typecheck, build, browser or manual checks were run, as required by AGENTS.md. All new result values remain source-reviewed expectations, not executed evidence.

Next canonical milestone: **L3M01 — Domain Modeling** (Commerce), starting with entities, attributes and lifecycle. Read the source curriculum and establish any required fixture before authoring it.

## L3M01 continuation — 25 October 2026

Added three bilingual lessons in `l3-modeling.json` and the registered `en-database-modeling.json` display dictionary, retaining the canonical mixed examples:

- `l3m01l01`: Commerce entities, attributes, current state versus events, transaction price snapshots, and separate order/item/payment/refund identities. An isolated inline TEMP fixture has three orders, three items, two payment attempts and one refund. Order 502 has ordered value 70000, successful receipts 70000, refunds 10000 and net receipts 60000. Failed attempts add no receipts; aggregates are computed per branch before joining to orders.
- `l3m01l02`: cardinality/optionality, 1:1 versus mandatory existence, and student–guardian N:M. Three copied School Finance students, two fictional guardians and three junction pairs demonstrate shared guardians, composite PK uniqueness, and no-guardian LEFT JOIN behavior. Guardian counts for students 1/2/5 are 2/1/0; the final string aggregate is NULL. TEMP endpoints reference TEMP copies; School Finance is unchanged.
- `l3m01l03`: eight explicit school payment invariants and their enforcement boundaries. I1–I5 are structurally enforced in the seed. I6–I7 have zero observed violations but missing guards; I8 cannot be counted without callback identity and returns NULL. A proposed TEMP CHECK demonstrates I6 only; its reference INSERT intentionally expects SQLSTATE 23514 rather than claiming seed overpayment rejection.

`DatabaseSchemaTable` now shares the prior School Finance card markup with static L3M01 ERDs. Typed `modeling-schemas.ts` pairs display PK/FK markers (including both composite PK/FK columns), data types, required endpoints, 1/0..N cardinalities, and accompanying prose. Branching entities repeat across relationship pairs for readability. Existing mobile stacking and keyboard-focusable scroll regions are reused. An optional `worked.dataset` labels alternate fixtures while preserving prior lessons' School Finance fallback. SQL, identifiers, fixture values, answer indexes and prior progress/version records are unchanged by locale changes.

Counts: twelve authored modules, 36 published / 84 draft lessons; combined transaction/database availability is 39 lessons plus three labs (42 activity milestones). L3M01 follows L2M04, and L3's stage assessment remains unavailable while later modules are draft. Content/SQL file registries include the new JSON for a future explicitly authorized run. Existing E2E expectations only update the count and next draft route to l3m02l01; no tests or registered browser lesson coverage were added.

Review is source/diff only. No tests, audits, SQL, lint, typecheck, build, manual or browser checks were run under AGENTS.md. Numerical, Boolean and rejection outputs are authored expectations rather than runtime evidence. Next: **L3M02 — Normalization dan Trade-off**.

## L3M02 continuation — 25 October 2026

Added `l3-normalization.json` and its registered English dictionary, with three complete bilingual lessons and additional typed UML/ERD data using the existing renderer:

- `l3m02l01`: functional dependency, candidate/superkeys and 1NF reasoning for operations on individual references. A curated TEMP invoice/payment fixture contrasts legacy ID strings with PK/FK rows. Invoice 103 has two receipts totaling 450000 and zero remaining; invoice 108 has an empty legacy string, zero payment rows, paid zero and 400000 outstanding. No automatic token parser or actual migration is supplied.
- `l3m02l02`: 2NF partial dependency, formal 3NF/BCNF distinction, update/insert/delete anomalies and lossless versus dependency-preserving decomposition. Independent TEMP customer/product/order/item tables reconstruct three lines: order 501 totals 35000 and 502 totals 14000. Customer 42 exists without orders. Current names are separated from agreed historical prices; NOTE legitimately has item prices 15000 and 14000. The reference updates one current-name source without changing item prices.
- `l3m02l03`: derived-data source of truth, invalidation coverage, freshness contracts and replacement reconciliation. Initial four-order cache results are 501: 30000 versus 35000 (stale), 502: NULL versus 14000 (missing), 503: NULL versus zero (missing), 504: zero versus zero (fresh). Deltas stay NULL when cache is unknown. Reconciliation starts from orders, includes empty parents and replaces cache with 35000/14000/0/0 rather than adding again.

Cache prose explicitly addresses old-worker publication races, every writer participating in the chosen protocol, both aggregates on item moves, and the difference between a fixed-fixture script and concurrent production enforcement. No worker, trigger, online invalidation, arbitrary SQL runner, or production cache protocol was added. All TEMP FKs point to explicit TEMP endpoints; no School Finance or prior L3M01 fixture/version was changed. Diagrams show PK/FK roles, composite keys, column types and 1–0..N relationships with localized prose. Runtime player behavior and persistence format are unchanged.

Current totals are thirteen authored modules, 39 published / 81 draft lessons, and 42 combined lessons plus three labs (45 activity milestones). L3M02 follows L3M01; the L3 level assessment remains hidden while later modules are draft. Existing E2E expectations only change available count and next draft route to l3m03l01. Content/SQL file registries include the new JSON for a future authorized run; no test cases or registered browser lesson coverage were added.

Review is source/diff only. No tests, audits, SQL, lint, typecheck, build, manual or browser checks were run under AGENTS.md. Numeric, empty-string and NULL rows remain authored expectations rather than executed evidence. Next: **L3M03 — Tipe dan Constraint Lanjutan**.

## L3M03 continuation — 25 October 2026

Added three bilingual lessons plus typed key/constraint ERDs in l3-types-constraints.json, en-database-types-constraints.json and types-constraints-schemas.ts. L3M03L01 uses scoped invoice/payment business keys alongside identity PKs; a student without an invoice remains in the LEFT JOIN. L3M03L02 distinguishes exact-date uniqueness, NOT NULL, CHECK and FK responsibilities; duplicate student 1001/2026-10-01 expects SQLSTATE 23505 on its fresh TEMP fixture. L3M03L03 uses NUMERIC(12,2), explicit NaN rejection and bounded amounts, with explicit UTC/Jakarta output. Expected rounded amounts are 1250.01 and 10.00; the two instants display 03:00/10:00 and 04:30/11:30 respectively. Reference NaN insertion expects 23514. All results/rejections are source-derived expectations, not runtime evidence. Existing School Finance, earlier content versions and learner storage are unchanged.

Totals: 14 authored modules, 42 published / 78 draft lessons; 45 combined lessons plus three labs (48 activity milestones). Existing E2E expectations only change the count and next draft route to l3m04l01; no test cases or browser lesson coverage were added. Content/SQL file registries include the JSON for a future authorized run.

Reviewed source and diff only. No tests, audits, SQL, lint, typecheck, build, manual or browser checks were run. Results are authored expectations rather than executed evidence. Per the updated AGENTS.md, commit and push this work before continuing **L3M04**.

## L3M04 continuation — 25 October 2026

Added three bilingual evolution lessons. L3M04L01 maps open/paid/void to issued/settled/cancelled while preserving the old status and describing version/rollback boundaries. L3M04L02 adds an address column, backfills, installs a trimmed nonempty NOT VALID CHECK, validates and sets NOT NULL on a fixed TEMP fixture; no zero-downtime production guarantee is claimed. L3M04L03 captures a separate before baseline and compares identities/NULL-aware values after backfill: before_rows3, after_rows3, equal illustrative checksums, missing address1, missing/unexpected identities0/0 and changed values0. Output is an aggregate summary; delimiter/sentinel ambiguity is taught and exact pair comparisons establish fixture equality. The fresh reference creates/backfills address_line before expected23514 validation failure. A patch for absent student99 is rejected by its FK23503 rather than reaching reconciliation. Entire L3 is now published and its existing level assessment condition becomes available. Earlier fixtures/versions and learner storage remain unchanged.

Totals: 15 authored modules, 45 published / 75 draft lessons; 48 combined lessons plus three labs (51 activity milestones). Existing E2E expectations only change the count and next draft route to l4m01l01; no test cases or browser lesson coverage were added. Content/SQL file registries include the JSON for a future authorized run.

Reviewed source and diff only. No tests, audits, SQL, lint, typecheck, build, manual or browser checks were run. Results are authored expectations rather than executed evidence. Per the updated AGENTS.md, commit and push this work before continuing **L4M01**.

## L4M01 continuation — 25 October 2026

Added three bilingual ACID lessons in l4-acid.json with en-database-acid.json. L4M01L01 follows the canonical two-account transfer using two UPDATEs in one transaction and one final SELECT: balances70000/80000, total150000. TEMP fixtures are not durability or concurrency proof. L4M01L02 classifies complete versus missing transfer legs with count, distinct-account, debit/credit-sign and net-zero conditions; transfer7001 is valid under the stated minimal model and7002 violates it. L4M01L03 places an optional fee after SAVEPOINT, rolls it back, commits the earlier capture and emits two surviving entries1/2. External side effects and uncertain COMMIT outcomes remain outside simple rollback claims. Review corrected a double-correct single-choice distractor, replaced the exact full English setup key and removed unpublished obsolete draft strings. No new component, simulator, structural diagram or persistence format was introduced.

Totals: 16 authored modules, 48 published / 72 draft lessons; 51 combined lessons plus three labs (54 activity milestones). Existing E2E expectations only change the count and next draft route to l4m02l01; no test cases or browser lesson coverage were added. Content/SQL file registries include the JSON for a future authorized run.

Reviewed source and diff only. No tests, audits, SQL, lint, typecheck, build, manual or browser checks were run. Results are authored expectations rather than executed evidence. Per the updated AGENTS.md, commit and push this work before continuing **L4M02**.

## L4M02 continuation — 25 October 2026

Added three bilingual isolation/MVCC lessons using explicitly authored deterministic traces. L4M02L01 contrasts RC statement snapshots with RR/Serializable stable snapshots:100000 versus125000 after an intervening commit; ORDER BY and expected row order agree. L4M02L02 separates snapshot reads on invoice501 from own writes to an untouched502, avoiding the invalid assumption that RR can successfully update a row concurrently changed after its snapshot; that path requires40001 recovery. L4M02L03 compares wait/NOWAIT/SKIP LOCKED policies and states that returned candidates are not actual claimed production jobs. No live SQL runner, MVCC engine validation, lock observation or new simulator is claimed. Earlier fixture/version/progress data remains unchanged. Current README publication metadata and empty remaining-level headings were also synchronized during integration.

Totals: 17 authored modules, 51 published / 69 draft lessons; 54 combined lessons plus three labs (57 activity milestones). Existing E2E expectations only change the count and next draft route to l4m03l01; no test cases or browser lesson coverage were added. Content/SQL file registries include the JSON for a future authorized run.

Reviewed source and diff only. No tests, audits, SQL, lint, typecheck, build, manual or browser checks were run. Results are authored expectations rather than executed evidence. Per the updated AGENTS.md, commit and push this work before continuing **L4M03**.

## L4M03 continuation — 25 October 2026

Added three bilingual concurrency lessons. L4M03L01 predicts conditional debit under explicit RC: A affects1 row and leaves30000, B affects0 rather than succeeding. The reference demonstrates the SQL pattern on a fresh TEMP account. L4M03L02 uses an authored two-doctor RR write-skew schedule and a Serializable illustration with one40001; victim selection is not promised. Row-lock references explain future-row limits. L4M03L03 separates deadlock40P01, lock timeout55P03 and unknown statement/COMMIT outcomes, with ascending account locks and bounded whole-transaction retry. Alternative accounts9/10 belong only to an authored scenario, not live fixture observations. All schedules, null fields and error codes remain authored input/results rather than engine observations; no new simulator or user SQL execution was added.

Totals: 18 authored modules, 54 published / 66 draft lessons; 57 combined lessons plus three labs (60 activity milestones). Existing E2E expectations only change the count and next draft route to l4m04l01; no test cases or browser lesson coverage were added. Content/SQL file registries include the JSON for a future authorized run.

Reviewed source and diff only. No tests, audits, SQL, lint, typecheck, build, manual or browser checks were run. Results are authored expectations rather than executed evidence. Per the updated AGENTS.md, commit and push this work before continuing **L4M04**.

## L4M04 continuation — 25 October 2026

Added three bilingual payment lessons. L4M04L01 shows merchant-scoped keys and distinguishes same-payload replay, payload conflict and absent callbacks without changing a succeeded payment into a conflict. Signature flags and toy fingerprints are authored inputs, not provider authentication. L4M04L02 reconstructs wallet balances 55000/95000 from opening values and signed ledger effects. L4M04L03 processes two sequential identical deliveries with payload-checked ON CONFLICT into one local effect. Source review replaced same-snapshot target rereading and input preselection with separate INSERT statements and a final report, so the retry reaches the conflict branch. This does not establish concurrent-engine behavior, conflicting-payload resolution or external exactly-once effects. No provider connection, sender or new simulator was added.

Totals: 19 authored modules, 57 published / 63 draft lessons; 60 combined lessons plus three labs (63 activity milestones). Existing E2E expectations only change the count and next draft route to l4m05l01; no test cases or browser lesson coverage were added. Content/SQL file registries include the JSON for a future authorized run.

Reviewed source and diff only. No tests, audits, SQL, lint, typecheck, build, manual or browser checks were run. Results are authored expectations rather than executed evidence. Per the updated AGENTS.md, commit and push this work before continuing **L4M05**.

## L4M05 continuation — 25 October 2026

Added three bilingual reliable-side-effect lessons. L4M05L01 pairs a payment and an outbox event in one transaction and emits a final report after COMMIT. L4M05L02 classifies expired lease, conflicting payload and already-applied effect states, explaining the send/mark crash window, lease ownership and atomic consumer deduplication limits. L4M05L03 evaluates authored 100-debit result summaries against balance, effect count, duplicates and evidence-scope requirements; no concurrent workload was executed. The raw boolean output in the pairing report is authored as PostgreSQL t. No broker, worker, provider call, new simulator or test suite was added. All L4 modules are published, so its existing assessment gate becomes available after learner mastery.

Totals: 20 authored modules, 60 published / 60 draft lessons; 63 combined lessons plus three labs (66 activity milestones). Existing E2E expectations only change the count and next draft route to l5m01l01; no test cases or browser lesson coverage were added. Content/SQL file registries include the JSON for a future authorized run.

Reviewed source and diff only. No tests, audits, SQL, lint, typecheck, build, manual or browser checks were run. Results are authored expectations rather than executed evidence. Per the updated AGENTS.md, commit and push this work before continuing **L5M01**.

# Database Zero to Master — implementation plan

**Goal:** Integrate the canonical 10-level/40-module/120-lesson path into Taalmo, starting with a complete L0–L1 vertical slice (21 lessons) and 99 explicitly draft lessons.
**Current publication:** L0–L1 plus L2M01–L2M03: 30 published / 90 draft. The original implementation evidence below is retained as release history. L2M02–L2M03 have source/diff review only; executed validation still covers L0–L2M01.
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

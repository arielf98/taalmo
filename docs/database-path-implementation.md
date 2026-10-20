# Database Zero to Master — implementation plan

**Goal:** Integrate the canonical 10-level/40-module/120-lesson path into Taalmo, with a complete L0–L1 vertical slice (21 lessons) and 99 explicitly draft lessons.
**Spec:** `curriculum/taalmo-database-zero-to-master/PROMPT_UNTUK_CODEX.md`, blueprint, curriculum Markdown, PostgreSQL fixture. All three source documents were read before implementation.
**Architecture:** Extend the existing lesson route, Quiz, Workspace and versioned progress repository. Adapt blueprint metadata without changing IDs/order. No auth/router rewrite, external service, arbitrary SQL runner or new product dependency.

## Audit and mapping

| Requirement | Existing capability | Minimum addition |
|---|---|---|
| Path/level/module/lesson structure | One flat transaction path, three lessons | Blueprint adapter, catalog route and structured content contract; reuse `/lessons/[slug]` |
| Indonesian lesson authoring | English content + Indonesian dictionaries | Native Indonesian authored paragraphs/examples/checks/activity/reflection for 21 lessons |
| Prediction/scenario practice | Quiz and deterministic simulation engine | Quiz-compatible grounded predictions, variant prompts and two independently graded edge cases per lesson |
| SQL execution | None; transaction labs are in-memory models | Explicit prediction fallback; PostgreSQL examples checked offline on disposable PostgreSQL, no learner SQL execution |
| Quiz feedback | Single check with generic explanation | Optional per-option feedback and graded callback, preserving legacy callers |
| Progress/resume/versioning | Device-local `taalmo.progress.v1`, no auth | Extend same repository with versioned curriculum records and resume; preserve old milestones |
| Module/level certification | None | All required activities + module exam >=80%; all modules + level exam >=85% + critical questions/activities passed |
| Diagnostic | None | Optional recommendation, no safety/progress bypass |
| Content import/version | Static TypeScript, no database/seed service | Deterministic adapter keyed by blueprint IDs, no progress mutation during import |
| Tests | Vitest domain tests and Playwright learning journey | Scoped content audit, SQL fixture checks and integration journey tests; no new unit tests |
| Deployment/auth/migrations | No auth/backend/migrations or deployment pipeline | Keep local learner model explicit; do not invent multi-user certification or production DB infrastructure |

## Design decisions

- Use official draft metadata for the entire hierarchy; publish only authored records meeting the contract. Draft lesson routes return 404; catalog shows draft labels without lesson links.
- Reuse Question/Quiz for concept checks, output predictions and edge cases. The fallback proves interpretation and reasoning, not ability to write arbitrary SQL. SQL text is never matched as an answer or executed in the app.
- Answers for local formative assessment are present in client content; solutions are hidden in the UI until an attempt. This is not secure, server-graded certification.
- Theory stays explorable. Prerequisite gates control official completion, module exam and level certification; no calendar locks.
- Preserve versioned attempts on content updates. A new content version may require requalification without deleting the earlier record.
- Extend existing local progress instead of adding an account backend. Per-user means the current browser learner here; account-bound cross-device progress remains unavailable.
- User's new master prompt explicitly requests scoped integration/SQL validation, overriding the earlier no-test rule only for this curriculum task. No new unit tests. No push/deploy.

## Tasks

- [ ] 1. Define content contract; adapt all canonical records with explicit published/draft status. Author L0–L1 with unique explanatory prose, worked examples, two checks, practice variants, two edge cases, progressive hints and reflection.
- [ ] 2. Extend Quiz and progress repository. Implement prerequisite/certification rules and saved lesson responses/reflections/resume without changing legacy progress behavior.
- [ ] 3. Register catalog and existing lesson routes; add module/level assessments, diagnostic and links from dashboard/navigation. Reuse styling with small responsive additions.
- [ ] 4. Add content audit, PostgreSQL fixture/example verification and integration checks. Verify counts, IDs, gates, draft visibility, hints, resume and existing routes.
- [ ] 5. Document authoring/fallback limits, remaining lesson checklist and exact evidence; commit completed work.

## Review focus

Corrupt/old localStorage must preserve valid legacy progress. Draft or unknown IDs must not render published lessons. Wrong answers/reflection-only clicks must not pass activities or safety gates. Retakes must clear current responses and vary scenarios/options. All SQL is confined to a disposable fixture; no production connection is accepted. Stage exams cannot bypass module prerequisites. Content imports do not write learner data.

## Evidence and remaining work

Implementation and validation results will be recorded here when available. No full-course completion claim is made for draft material.

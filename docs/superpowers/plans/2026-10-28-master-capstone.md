# Master Capstone Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline; request a fresh read-only review before publishing each complete module. User instructions override test execution and approval pauses.

**Goal:** Continue the nine canonical L9 lessons with complete bilingual teaching and explicit evidence boundaries.

**Architecture:** Reuse AuthoredLesson JSON, translation dictionaries, catalog, quizzes, schema renderer and local progress. The existing prediction fallback teaches design and evidence interpretation; it does not execute a capstone.

**Tech Stack:** Next.js, TypeScript, JSON, authored PostgreSQL 17 SQL.

**Spec:** curriculum/taalmo-database-zero-to-master/curriculum-blueprint.json; docs/database-path-authoring.md; AGENTS.md.

## Global constraints

- Source/diff review only; no tests, audits, SQL execution, runtime/manual/browser checks, lint, typecheck or build. No new tests or dependencies.
- Preserve canonical IDs, previous versions, fixtures and learner progress. Leave unrelated next-env.d.ts and workspace changes untouched.
- Each lesson: substantive Indonesian prose and English copy; worked SQL/result table; two checks, two variants, two edge cases with feedback; three hints, reference solution and reflection.
- Commit and push each complete module to the current origin/main, then continue. Do not merge or deploy. Preserve local commits if push fails.

## Review focus

- Business identity/payload conflict versus transport delivery identity; unknown commit versus failure.
- Merchant/currency scope, balanced entries, missing effects and cross-row guards not enforced by row CHECKs.
- Migration compatibility, privilege boundaries and atomic outbox/audit pairing.
- Target versus observed throughput, complete outcome reconciliation, comparable performance samples and recovery clocks.
- Authored evidence flags and quiz completion must not imply executed drills, security assurance or production readiness.

## Task 1: L9M01 — Design the Ledger

- [x] Create l9-ledger-design.json and en-database-ledger-design.json: requirements/invariants, TEMP schema/constraints/migration reasoning, API atomic boundary and reconciliation.
- [x] Add UML/ERD through a focused ledger schema file imported into modeling-schemas.ts; register dictionaries/catalog/tags and existing audit/SQL file lists.
- [x] Update publication docs/counts and existing E2E count/first-draft expectations only, without adding coverage. Source/diff plus independent read-only review, commit, push.

## Task 2: L9M02 — Load and Failure Testing

- [ ] Create l9-load-failure.json and English dictionary: authored concurrency/idempotency traces, correctness-first tuning, failure/restore evidence.
- [ ] Keep the canonical 300 requests/second and 5% duplicates as a proposed target; do not run a generator, database or drill. Explain one-million-history workload as a design input.
- [ ] Register and update counts/next draft. Source/diff plus independent read-only review, commit, push.

## Task 3: L9M03 — Master Defense

- [ ] Create l9-defense.json and English dictionary: threat model, architecture defense, evidence rubric/postmortem.
- [ ] Explicitly retain missing real build/load/recovery/security evidence. Publishing 120 lessons enables existing L9 assessment, not capstone certification of operational skill.
- [ ] Register and update final counts/docs; adapt the existing draft-route expectation to an unknown canonical-shaped ID if none remain, without adding tests. Source/diff plus independent read-only review, commit, push.

## Execution record

- Current checkout starts at 035d5b7 on main with 111 published / 9 draft. Existing unrelated changes: next-env.d.ts and curriculum workspace file.
- Continuation follows the approved canonical roadmap; no new product capability or execution workflow is introduced.

- L9M01 source/diff and independent read-only review: no important findings. Reviewed constraint/ERD cardinality, expected rows and English feedback pairing. No execution evidence claimed. Commit/push outcome is recorded by Git history.

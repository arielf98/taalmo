# Production reliability authoring implementation plan

> Implement inline using the existing authoring contract. User instructions override skill testing, approval and worktree defaults: continue the current branch, review source/diff only, commit and push each completed module, then continue the roadmap.

**Goal:** Complete the next canonical Production & Reliability modules with substantive bilingual lessons.
**Architecture:** Reuse AuthoredLesson JSON, source-string translation dictionaries, catalog imports, existing table renderer and mastery gates. No new player logic or dependencies.
**Spec:** `docs/database-path-authoring.md` and canonical `curriculum/taalmo-database-zero-to-master/curriculum-blueprint.json`.

## Constraints and review focus

- Preserve canonical IDs, versions of existing lessons, blueprint, School Finance fixture and progress storage.
- No tests, audits, SQL execution, manual/browser checks, lint, typecheck or build. Review code and diff only.
- Worked examples and reference solutions use independent TEMP fixtures; flags and result rows are authored, not observed operational evidence.
- Every display string needs English/Indonesian copy; SQL, identifiers, raw result values and answer indexes stay stable.
- Review unknown evidence, timeline lineage, stale snapshots, endpoint identity, retry uncertainty and privilege/budget boundaries.
- Leave unrelated next-env.d.ts and workspace changes untouched.

## Task 1: L7M03 — Replication dan Failover

- [x] Add `src/content/database/l7-replication.json`: three complete lessons, each with 300+ words of teaching prose, worked SQL/result table, 2 checks, 2 variants, 2 edge cases, 3 hints, solution and reflection.
- [x] Add `src/content/messages/en-database-replication.json`; register catalog, messages, existing audit/SQL file lists and tag labels.
- [x] Update current publication counts, draft-route expectations only, remaining checklist and implementation evidence.
- [x] Review source/diff and commit L7M03 as b595745. Direct origin/main push initially required explicit target approval; user approved, and the push succeeded.

## Task 2: L7M04 — Operational Security & Incidents

- [x] Add `src/content/database/l7-operations.json` and English dictionary: role/secret boundaries, connection budgets and incident decisions with the same full contract.
- [x] Register content and tags; update publication counts and first draft route without expanding test coverage.
- [x] Document L7 completion, existing assessment availability and next L8M01 milestone.
- [x] Review source/diff, including independent read-only review; no important findings. Commit and push L7M04 under the explicit origin/main approval.

Continue subsequent canonical work only with enough remaining session capacity to satisfy the complete authoring contract. Do not publish incomplete records.

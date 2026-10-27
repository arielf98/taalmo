# Architecture and scaling implementation plan

> Execute inline following the canonical roadmap. User instructions override skill approval/testing/worktree defaults: use the current branch, source/diff review only, commit and push each complete module, then continue while session capacity permits.

**Goal:** Continue the canonical L8 modules after L8M01 with complete bilingual authoring.
**Architecture:** Reuse AuthoredLesson JSON, normalized-source English dictionaries, the catalog, existing tables/schema renderer and mastery gates. No dependencies or player changes.
**Spec:** `docs/database-path-authoring.md` and `curriculum/taalmo-database-zero-to-master/curriculum-blueprint.json`.

## Constraints and review focus

- No tests, audits, SQL execution, runtime/manual/browser checks, lint, typecheck or build. Do not add test coverage; adjust only existing publication count/draft expectations.
- Preserve blueprint, existing lesson IDs/versions, School Finance seed and learner storage. Use isolated TEMP fixtures and fixed authored results; do not infer measured pruning, latency, security or operational evidence.
- Each lesson: 300+ words of substantial Indonesian prose with full English display copy; worked SQL/table, two checks, two variants, two edge cases, three hints, reference solution and reflection.
- Use ordinary tables for sample rows/results and existing UML/ERD renderer for relationships. No process diagram for table structure.
- Review partition boundaries/global uniqueness, route ownership and epoch changes, hot tenants, cross-tenant keys/joins, privilege bypass, complete-state/delta semantics, unknown commits and cross-service failure boundaries.
- Leave unrelated next-env.d.ts and workspace changes untouched.

## Task 1: L8M02 — Partitioning, Sharding, dan Tenant

- [x] Add `src/content/database/l8-partitioning-tenancy.json` and `src/content/messages/en-database-partitioning-tenancy.json` with the full contract.
- [x] Teach PostgreSQL monthly partition boundaries and query predicates without claiming measured pruning; directory routing, hot tenants and fenced ownership changes; compare tenant layouts and show tenant-scoped composite identity/join.
- [x] Register catalog/messages/labels/file lists; update counts to 35 modules / 105 published / 15 draft, next draft l8m03l01.
- [x] Review source/diff and independent read-only review. Removed misleading separate-column FK reference labels from the composite ERD; its pair label/note describe one FK. Commit and push current origin/main; Git history records the outcome.

## Task 2: L8M03 — Distributed Data Systems

- [x] Add `src/content/database/l8-distributed.json` and matching English dictionary with the full contract.
- [x] Teach explicit replication contracts, 2PC/saga failure and compensation boundaries, and durable dedup/order/gap handling without exactly-once claims.
- [x] Register content and update counts to 36 modules / 108 published / 12 draft, next draft l8m04l01.
- [x] Review source/diff and independent read-only review; no important findings. Commit and push current origin/main; Git history records the outcome.

## Task 3: L8M04 — Choosing the Right Data Store

- [ ] Add `src/content/database/l8-data-stores.json` and matching English dictionary with the full contract.
- [ ] Teach OLTP/OLAP transfer contracts, workload-led store selection and reversible evidence-based architecture decisions.
- [ ] Register content and update counts to 37 modules / 111 published / 9 draft, next draft l9m01l01; document existing L8 assessment availability.
- [ ] Review source/diff and independent read-only review; commit and push current origin/main.

Continue L9 only with sufficient capacity for a complete module. Do not publish partial lessons or label prediction exercises as executed capstone drills.

# Remaining curriculum authoring

The following 15 canonical lessons remain draft. Each checkbox requires the complete authoring contract (body, worked example, checks/feedback, variants, edge cases, hints, solution and reflection). Review source/diff only under current AGENTS.md; content after L2M01 has no executed SQL/runtime validation.

## L8 — Database Architecture & Scaling

### L8M03 — Distributed Data Systems

Prerequisite: l8m02. Scenario: Platform-scale.

- [ ] `l8m03l01` — Replication consistency
- [ ] `l8m03l02` — Distributed transactions & saga
- [ ] `l8m03l03` — Retries, ordering, dan duplicates

### L8M04 — Choosing the Right Data Store

Prerequisite: l8m03. Scenario: Platform-scale.

- [ ] `l8m04l01` — OLTP vs OLAP
- [ ] `l8m04l02` — Document, key-value, graph, search
- [ ] `l8m04l03` — Architecture decision record

## L9 — Master Capstone

### L9M01 — Capstone: Design the Ledger

Prerequisite: l8m04. Scenario: Payment Ledger.

- [ ] `l9m01l01` — Requirements & invariants
- [ ] `l9m01l02` — Schema, constraints & migrations
- [ ] `l9m01l03` — API transaction boundary

### L9M02 — Capstone: Load and Failure Testing

Prerequisite: l9m01. Scenario: Payment Ledger.

- [ ] `l9m02l01` — Concurrency & idempotency attack
- [ ] `l9m02l02` — Query tuning & scale rehearsal
- [ ] `l9m02l03` — Backup & failure drill

### L9M03 — Capstone: Master Defense

Prerequisite: l9m02. Scenario: Payment Ledger.

- [ ] `l9m03l01` — Threat model & security review
- [ ] `l9m03l02` — Architecture defense
- [ ] `l9m03l03` — Final rubric & postmortem

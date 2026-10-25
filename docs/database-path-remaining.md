# Remaining curriculum authoring

The following 51 canonical lessons remain draft. Each checkbox requires the complete authoring contract (body, worked example, checks/feedback, variants, edge cases, hints, solution and reflection). Review source/diff only under current AGENTS.md; content after L2M01 has no executed SQL/runtime validation.

## L5 — Performance Engineering

### L5M04 — Large Data Strategies

Prerequisite: l5m03. Scenario: Commerce + Analytics.

- [ ] `l5m04l01` — Skala data dan distribusi skew
- [ ] `l5m04l02` — Keyset vs offset pagination
- [ ] `l5m04l03` — Batch writes dan contention

### L5M05 — Workload Tuning Clinic

Prerequisite: l5m04. Scenario: Commerce + Analytics.

- [ ] `l5m05l01` — Baseline dan metodologi benchmark
- [ ] `l5m05l02` — Pool, transactions, dan N+1
- [ ] `l5m05l03` — Performance certification

## L6 — PostgreSQL Internals

### L6M01 — Physical Storage dan Buffering

Prerequisite: l5m05. Scenario: PostgreSQL Lab.

- [ ] `l6m01l01` — Heap pages dan tuple
- [ ] `l6m01l02` — Shared buffers dan OS cache
- [ ] `l6m01l03` — TOAST dan data lebar

### L6M02 — WAL dan Durability

Prerequisite: l6m01. Scenario: PostgreSQL Lab.

- [ ] `l6m02l01` — Write-ahead logging
- [ ] `l6m02l02` — Checkpoint dan fsync
- [ ] `l6m02l03` — Crash recovery mental model

### L6M03 — Vacuum, Bloat, dan Autovacuum

Prerequisite: l6m02. Scenario: PostgreSQL Lab.

- [ ] `l6m03l01` — Dead tuples dan vacuum
- [ ] `l6m03l02` — Long transactions dan bloat
- [ ] `l6m03l03` — Autovacuum dan freeze

### L6M04 — Observability Engine

Prerequisite: l6m03. Scenario: PostgreSQL Lab.

- [ ] `l6m04l01` — pg_stat_activity dan waits
- [ ] `l6m04l02` — Statistics views dan query patterns
- [ ] `l6m04l03` — Diagnose without guessing

## L7 — Production & Reliability

### L7M01 — Schema Releases & Online Changes

Prerequisite: l6m04. Scenario: Production Simulator.

- [ ] `l7m01l01` — Migration ordering dan rollback
- [ ] `l7m01l02` — Backfill terkontrol
- [ ] `l7m01l03` — Deployment runbook

### L7M02 — Backup, Restore, dan PITR

Prerequisite: l7m01. Scenario: Production Simulator.

- [ ] `l7m02l01` — Backup strategy dan RPO/RTO
- [ ] `l7m02l02` — Restore dan verification
- [ ] `l7m02l03` — Point-in-Time Recovery

### L7M03 — Replication dan Failover

Prerequisite: l7m02. Scenario: Production Simulator.

- [ ] `l7m03l01` — Streaming replication dan lag
- [ ] `l7m03l02` — Failover dan split-brain
- [ ] `l7m03l03` — Read replicas dan consistency

### L7M04 — Operational Security & Incidents

Prerequisite: l7m03. Scenario: Production Simulator.

- [ ] `l7m04l01` — Least privilege dan secret hygiene
- [ ] `l7m04l02` — Connection limits dan pooling
- [ ] `l7m04l03` — Incident response game day

## L8 — Database Architecture & Scaling

### L8M01 — Caching & Consistency Trade-offs

Prerequisite: l7m04. Scenario: Platform-scale.

- [ ] `l8m01l01` — Cache-aside dan TTL
- [ ] `l8m01l02` — Read models & CQRS
- [ ] `l8m01l03` — Consistency contracts

### L8M02 — Partitioning, Sharding, dan Tenant

Prerequisite: l8m01. Scenario: Platform-scale.

- [ ] `l8m02l01` — Partitioning lokal PostgreSQL
- [ ] `l8m02l02` — Sharding dan routing key
- [ ] `l8m02l03` — Multi-tenancy & isolation

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

# Remaining curriculum authoring

The following 99 canonical lessons remain draft. Each checkbox means: substantive teaching body, worked example, two concept checks with feedback, two practice variants, two graded edge cases, progressive hints, reflection, required fixture/simulator and validation. Publish only after the whole contract is complete.

## L2 — SQL Problem Solving

### L2M01 — Subquery dan Set Thinking

Prerequisite: l1m05. Scenario: School Finance.

- [ ] `l2m01l01` — Subquery, EXISTS, dan IN
- [ ] `l2m01l02` — CTE dan keterbacaan
- [ ] `l2m01l03` — UNION, INTERSECT, EXCEPT

### L2M02 — Window Functions

Prerequisite: l2m01. Scenario: School Finance.

- [ ] `l2m02l01` — OVER, PARTITION BY, ORDER BY
- [ ] `l2m02l02` — ROW_NUMBER, RANK, dan DENSE_RANK
- [ ] `l2m02l03` — LAG, LEAD, dan running total

### L2M03 — Analitik Waktu dan Laporan

Prerequisite: l2m02. Scenario: School Finance.

- [ ] `l2m03l01` — Rentang tanggal dan timezone
- [ ] `l2m03l02` — Deret waktu dan bulan kosong
- [ ] `l2m03l03` — Outstanding dan aging buckets

### L2M04 — Kebenaran Hasil Query

Prerequisite: l2m03. Scenario: School Finance.

- [ ] `l2m04l01` — Bag semantics dan duplikasi
- [ ] `l2m04l02` — Anti-join, NULL, dan edge case
- [ ] `l2m04l03` — Uji query dan checkpoint SQL

## L3 — Data Modeling & Schema Evolution

### L3M01 — Domain Modeling

Prerequisite: l2m04. Scenario: Commerce.

- [ ] `l3m01l01` — Entities, attributes, dan lifecycle
- [ ] `l3m01l02` — Cardinality dan optionality
- [ ] `l3m01l03` — Business invariant sebelum tabel

### L3M02 — Normalization dan Trade-off

Prerequisite: l3m01. Scenario: Commerce.

- [ ] `l3m02l01` — Functional dependency dan 1NF
- [ ] `l3m02l02` — 2NF, 3NF, dan BCNF praktis
- [ ] `l3m02l03` — Denormalization dan derived data

### L3M03 — Tipe dan Constraint Lanjutan

Prerequisite: l3m02. Scenario: Commerce.

- [ ] `l3m03l01` — Natural vs surrogate keys
- [ ] `l3m03l02` — CHECK, composite UNIQUE, dan FK
- [ ] `l3m03l03` — Numeric, timestamps, dan uang

### L3M04 — Perubahan Skema yang Aman

Prerequisite: l3m03. Scenario: Commerce.

- [ ] `l3m04l01` — Migration dan schema versioning
- [ ] `l3m04l02` — Expand–migrate–contract
- [ ] `l3m04l03` — Data quality dan reconciliation

## L4 — Transactions & Concurrency

### L4M01 — ACID dan Transaction Boundary

Prerequisite: l3m04. Scenario: Payment Ledger.

- [ ] `l4m01l01` — Atomicity dan durability
- [ ] `l4m01l02` — Consistency dan invariants
- [ ] `l4m01l03` — Transaction boundary dan error

### L4M02 — Isolation dan MVCC

Prerequisite: l4m01. Scenario: Payment Ledger.

- [ ] `l4m02l01` — Isolation levels PostgreSQL
- [ ] `l4m02l02` — MVCC snapshots
- [ ] `l4m02l03` — SELECT FOR UPDATE dan row lock

### L4M03 — Concurrency Anomalies

Prerequisite: l4m02. Scenario: Payment Ledger.

- [ ] `l4m03l01` — Lost update dan atomic UPDATE
- [ ] `l4m03l02` — Write skew dan phantom
- [ ] `l4m03l03` — Deadlock, timeout, dan retry

### L4M04 — Payments dan Idempotency

Prerequisite: l4m03. Scenario: Payment Ledger.

- [ ] `l4m04l01` — Idempotency key dan unique guard
- [ ] `l4m04l02` — Ledger vs mutable balance
- [ ] `l4m04l03` — Exactly-once effect sebagai tujuan

### L4M05 — Reliable Side Effects

Prerequisite: l4m04. Scenario: Payment Ledger.

- [ ] `l4m05l01` — Transactional outbox
- [ ] `l4m05l02` — Worker retry dan deduplication
- [ ] `l4m05l03` — Concurrency certification

## L5 — Performance Engineering

### L5M01 — Membaca Query Planner

Prerequisite: l4m05. Scenario: Commerce + Analytics.

- [ ] `l5m01l01` — EXPLAIN dan operator plan
- [ ] `l5m01l02` — EXPLAIN ANALYZE BUFFERS
- [ ] `l5m01l03` — Statistics dan estimates

### L5M02 — Index Design

Prerequisite: l5m01. Scenario: Commerce + Analytics.

- [ ] `l5m02l01` — B-tree dan selectivity
- [ ] `l5m02l02` — Composite, covering, dan partial
- [ ] `l5m02l03` — Index cost dan write amplification

### L5M03 — Joins, Sorts, dan Rewrite

Prerequisite: l5m02. Scenario: Commerce + Analytics.

- [ ] `l5m03l01` — Hash join vs nested loop vs merge
- [ ] `l5m03l02` — Sort, spill, dan work_mem
- [ ] `l5m03l03` — Rewrite dan hasil ekuivalen

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

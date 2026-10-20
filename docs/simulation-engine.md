# Deterministic simulation engine

## Contract

`ScenarioDefinition<State, Event, Result>` supplies an initial state, an ordered event list, a transition function, and an evaluator. `createSimulation` creates an initial snapshot. `advance` clones current state before applying one event, appends a snapshot, and evaluates at the final event. Advancing a finished run is a no-op. `runToEnd` repeats that same operation; it has no alternate fast path.

Reset creates a new simulation from the same definition. Replay creates the same initial state, then advances one event at a time. UI timers only pace the display: no time, randomness, I/O, or React state participates in the domain result. Earlier snapshots remain unchanged. State and events must be structured-cloneable data, and transitions must not mutate earlier snapshots or the scenario definition.

## Payment scenario

Two callbacks reference `pay_1042`. The amount is a positive integer in cents, limited to 100000000. Currency is USD for this MVP. Schedule choices are mode and optional pre-commit failure.

### Unsafe: eight events

1. A reads `processed = false`.
2. B reads the same value before A finishes.
3. A writes a ledger entry.
4. A writes an outbox event.
5. A marks processed.
6. B writes another ledger entry based on its earlier read.
7. B writes another outbox event.
8. B marks processed.

The committed ledger and outbox each contain two records for one payment. Their counts are derived from records written by transitions, not selected-mode UI counters. The flag cannot revoke B’s stale decision.

### Protected: five events

1. A starts a transaction and reserves a unique payment key.
2. B attempts the same key and waits on A’s transaction.
3. A stages ledger and outbox writes. Nothing is committed yet.
4. A commits the key, ledger, and outbox together, releasing the reservation.
5. B observes the unique-key conflict and skips business writes.

With **Fail callback A before commit**, A rolls back its staged records and reservation instead. B can then claim the key, stage replacement writes, and commit. Exactly one ledger entry and one outbox event survive.

`lockOwner` is an educational representation of contention on a unique-key insertion, not a complete PostgreSQL lock manager. `staged` records represent uncommitted business writes; they are deliberately absent from committed tables. The final evaluator derives safe/duplicate/incomplete outcomes from the committed records and unique key.

### Guarantee boundary

This models one business effect per payment ID when the unique key and business writes commit atomically. It does **not** prove exactly-once message delivery. A real outbox publisher can repeat deliveries; consumers need deduplication or idempotent handlers. The simulator does not implement isolation levels, SQL execution, MVCC, connection pooling, arbitrary schedules, real database error semantics, or gateway verification.

## Add a scenario

1. Define explicit serializable state, event types, and configuration validation.
2. Build a deterministic event schedule from configuration.
3. Implement transitions from state and event, independent of presentation.
4. Evaluate the actual final state against the business invariants.
5. Review failure behavior, intermediate visibility, deterministic event ordering, and snapshot cloning in code. Follow `AGENTS.md`: do not add unit tests or execute tests for subsequent work.
6. Map state to a dedicated UI; reuse the engine without importing payment-specific assumptions into it.

A minimal definition looks like:

```ts
const scenario: ScenarioDefinition<Counter, Increment, Result> = {
  initial: { value: 0 },
  events: [{ by: 1 }],
  transition: (state, event) => ({ value: state.value + event.by }),
  evaluate: (state) => ({ passed: state.value === 1 }),
};
```

## Lost Update scenario

`lost-update.ts` reuses the same immutable event runner. Configuration selects unsafe replacement or atomic increment, initial balance in integer cents, positive increments for requests A and B, and A-first or B-first write order. Invalid configuration is rejected; the initial balance plus both increments may not exceed 100000000 cents.

Unsafe execution has six events: A reads, B reads, A calculates, B calculates, first request writes, second request overwrites. At the default $100 balance with A adding $20 and B adding $30, A-first finishes at $130 and B-first at $120; both should finish at $150. The evaluator derives the missing amount from committed state.

Atomic execution has seven events: first request obtains the row lock, second waits, first stages its increment, first commits and releases the lock, second obtains the lock, second increments the updated row, second commits. Staged values are kept on the request and do not alter the shared committed balance. Both orders preserve both increments.

The diagram and inspector expose request read values, calculated/staged balances, committed balance, row-lock owner, and the committed write history. Timeline selection shows the corresponding immutable snapshot; the final evaluation is shown only in the current state.

This represents row-lock coordination for a same-row UPDATE at Read Committed, not the complete PostgreSQL lock manager or MVCC implementation. A competing updater waits for the first transaction and applies its operation to the updated row, as described in [PostgreSQL’s Read Committed documentation](https://www.postgresql.org/docs/16/transaction-iso.html#XACT-READ-COMMITTED). Stricter isolation and serialization failures are outside this scenario. Atomic increment prevents this lost update but is not idempotent: retrying a business request still needs separate deduplication.

## Deadlock scenario

`deadlock.ts` models two row-locking transactions. X and Y each begin with 10000 cents. A transfers 1000 cents from X to Y, while B transfers 2000 cents from Y to X. Staged debits/credits stay private until atomic commit; rollback discards every staged change and releases every lock owned by the victim.

### Opposite order

A locks X and stages a debit. B locks Y and stages a debit. A then waits for Y and B waits for X. `waitForEdges` derives edges from actual waiting requests and lock owners. `deadlockCycle` detects A → B → A in this deliberately two-transaction graph; the result is not selected by the UI mode.

The detector records the cycle. A configurable deterministic victim is aborted, its pending debit is discarded, and its locks are released. The survivor acquires the other row, stages its credit, and commits. Without retry, one transfer remains aborted. With retry enabled, a fresh transaction redoes the victim’s full operation once after the survivor commits. Its attempt counter becomes two; each logical transfer still has only one committed record.

### Consistent order

Both transactions lock X before Y. B can wait for X while A holds it, but A can acquire Y and proceed: the wait-for graph has one edge and no cycle. A commits and releases both locks; B acquires X and Y and applies its complete transfer. Both transfers commit, preserving the combined 20000-cent balance.

### Scope and accuracy

The diagram shows current wait-for edges, while the recorded detected cycle remains inspectable as historical information after recovery. Timeline selection updates lock ownership, staged values, committed balances, attempts, and transfer records together. Final evaluation appears only in the current state and derives completion, conservation, and recovery outcomes from records and transaction state.

This is a fixed two-transaction educational schedule. Detection timing, lock queues, MVCC, real error codes, backoff, and PostgreSQL victim-selection rules are not simulated. Real PostgreSQL detects a deadlock and aborts a transaction; consistent resource ordering is a principal prevention strategy. See [PostgreSQL’s deadlock documentation](https://www.postgresql.org/docs/17/explicit-locking.html#LOCKING-DEADLOCKS). Recovery here retries the entire transaction with one retry, rather than only its last SQL statement.

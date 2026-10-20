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
5. Test failure behavior, intermediate visibility, determinism, and no mutation of earlier snapshots.
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

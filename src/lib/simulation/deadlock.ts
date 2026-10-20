import type { ScenarioDefinition } from "./engine";
export type TransactionId = "A" | "B";
export type AccountId = "X" | "Y";
export interface DeadlockConfig {
  mode: "opposite" | "ordered";
  victim: TransactionId;
  retryVictim: boolean;
}
export interface DeadlockState {
  balances: Record<AccountId, number>;
  locks: Record<AccountId, TransactionId | null>;
  transactions: Record<
    TransactionId,
    {
      status: "active" | "waiting" | "aborted" | "committed";
      waitingFor: AccountId | null;
      staged: Partial<Record<AccountId, number>>;
      attempt: number;
    }
  >;
  detectedCycle: TransactionId[];
  victim: TransactionId | null;
  commits: {
    transaction: TransactionId;
    attempt: number;
    from: AccountId;
    to: AccountId;
    amount: number;
  }[];
}
export interface DeadlockEvent {
  kind: "lock" | "debit" | "credit" | "detect" | "abort" | "restart" | "commit";
  transaction: TransactionId;
  account?: AccountId;
  label: string;
  detail: string;
}
export interface DeadlockResult {
  outcome: "safe" | "recovered" | "aborted" | "incomplete";
  completed: number;
  total: number;
  conserved: boolean;
  explanation: string;
}
const transfers: Record<
  TransactionId,
  { from: AccountId; to: AccountId; amount: number }
> = {
  A: { from: "X", to: "Y", amount: 1000 },
  B: { from: "Y", to: "X", amount: 2000 },
};
export function waitForEdges(
  state: DeadlockState,
): { from: TransactionId; to: TransactionId; account: AccountId }[] {
  return (["A", "B"] as const).flatMap((from) => {
    const transaction = state.transactions[from];
    const account = transaction.waitingFor;
    const owner = account ? state.locks[account] : null;
    return transaction.status === "waiting" &&
      account &&
      owner &&
      owner !== from
      ? [{ from, to: owner, account }]
      : [];
  });
}
export function deadlockCycle(state: DeadlockState): TransactionId[] {
  const edges = waitForEdges(state);
  // This scenario has exactly two transactions; a cycle requires both opposing waits.
  return edges.some((e) => e.from === "A" && e.to === "B") &&
    edges.some((e) => e.from === "B" && e.to === "A")
    ? ["A", "B", "A"]
    : [];
}
export function deadlockScenario(
  config: DeadlockConfig,
): ScenarioDefinition<DeadlockState, DeadlockEvent, DeadlockResult> {
  if (
    !["opposite", "ordered"].includes(config.mode) ||
    !["A", "B"].includes(config.victim) ||
    typeof config.retryVictim !== "boolean"
  )
    throw new Error(
      "Unknown locking strategy, victim, or retry configuration.",
    );
  const e = (
    kind: DeadlockEvent["kind"],
    transaction: TransactionId,
    label: string,
    detail: string,
    account?: AccountId,
  ): DeadlockEvent => ({ kind, transaction, label, detail, account });
  const lock = (transaction: TransactionId, account: AccountId) =>
    e(
      "lock",
      transaction,
      `${transaction} requests row ${account}`,
      `Grant the row lock if free; otherwise ${transaction} must wait for its current owner.`,
      account,
    );
  const debit = (transaction: TransactionId) =>
    e(
      "debit",
      transaction,
      `${transaction} stages its debit`,
      `Debit ${transfers[transaction].from} inside ${transaction}’s transaction. The committed balance is unchanged.`,
    );
  const credit = (transaction: TransactionId) =>
    e(
      "credit",
      transaction,
      `${transaction} stages its credit`,
      `With both row locks held, stage the credit to ${transfers[transaction].to}. Neither account change is committed yet.`,
    );
  const commit = (transaction: TransactionId) =>
    e(
      "commit",
      transaction,
      `${transaction} commits the full transfer`,
      "Both account changes become visible together, and all locks held by this transaction are released.",
    );
  const survivor: TransactionId = config.victim === "A" ? "B" : "A";
  const events: DeadlockEvent[] =
    config.mode === "ordered"
      ? [
          lock("A", "X"),
          debit("A"),
          lock("B", "X"),
          e(
            "detect",
            "B",
            "Inspect the wait-for graph",
            "B waits for A, but A is not waiting for B. A one-way wait is not a deadlock.",
          ),
          lock("A", "Y"),
          credit("A"),
          commit("A"),
          lock("B", "X"),
          lock("B", "Y"),
          debit("B"),
          credit("B"),
          commit("B"),
        ]
      : [
          lock("A", "X"),
          debit("A"),
          lock("B", "Y"),
          debit("B"),
          lock("A", "Y"),
          lock("B", "X"),
          e(
            "detect",
            "A",
            "Detect the circular wait",
            "Build the wait-for graph from actual lock owners and waiting requests. A → B → A is a cycle.",
          ),
          e(
            "abort",
            config.victim,
            `Abort ${config.victim} and roll back`,
            `The simulator chooses ${config.victim} as its deterministic victim. Discard its entire staged debit and release all its row locks.`,
          ),
          lock(survivor, transfers[survivor].to),
          credit(survivor),
          commit(survivor),
          ...(config.retryVictim
            ? [
                e(
                  "restart",
                  config.victim,
                  `Restart ${config.victim} from the beginning`,
                  "One bounded retry begins a fresh transaction. Do not retry only the failed SQL statement.",
                ),
                lock(config.victim, transfers[config.victim].from),
                debit(config.victim),
                lock(config.victim, transfers[config.victim].to),
                credit(config.victim),
                commit(config.victim),
              ]
            : []),
        ];
  return {
    initial: {
      balances: { X: 10000, Y: 10000 },
      locks: { X: null, Y: null },
      transactions: {
        A: { status: "active", waitingFor: null, staged: {}, attempt: 1 },
        B: { status: "active", waitingFor: null, staged: {}, attempt: 1 },
      },
      detectedCycle: [],
      victim: null,
      commits: [],
    },
    events,
    transition(state, event) {
      const transaction = state.transactions[event.transaction];
      const transfer = transfers[event.transaction];
      const holdsBoth = () =>
        state.locks.X === event.transaction &&
        state.locks.Y === event.transaction;
      const release = () => {
        for (const account of ["X", "Y"] as const)
          if (state.locks[account] === event.transaction)
            state.locks[account] = null;
      };
      switch (event.kind) {
        case "lock":
          if (
            !event.account ||
            transaction.status === "aborted" ||
            transaction.status === "committed"
          )
            break;
          if (
            state.locks[event.account] &&
            state.locks[event.account] !== event.transaction
          ) {
            transaction.status = "waiting";
            transaction.waitingFor = event.account;
          } else {
            state.locks[event.account] = event.transaction;
            transaction.status = "active";
            transaction.waitingFor = null;
          }
          break;
        case "debit":
          if (
            transaction.status === "active" &&
            state.locks[transfer.from] === event.transaction &&
            transaction.staged[transfer.from] === undefined &&
            state.balances[transfer.from] >= transfer.amount
          )
            transaction.staged[transfer.from] =
              state.balances[transfer.from] - transfer.amount;
          break;
        case "credit":
          if (
            transaction.status === "active" &&
            holdsBoth() &&
            transaction.staged[transfer.from] !== undefined
          )
            transaction.staged[transfer.to] =
              state.balances[transfer.to] + transfer.amount;
          break;
        case "detect":
          state.detectedCycle = deadlockCycle(state);
          break;
        case "abort":
          if (
            state.detectedCycle.includes(event.transaction) &&
            transaction.status !== "committed"
          ) {
            transaction.staged = {};
            transaction.waitingFor = null;
            transaction.status = "aborted";
            state.victim = event.transaction;
            release();
          }
          break;
        case "restart":
          if (
            config.retryVictim &&
            transaction.status === "aborted" &&
            transaction.attempt === 1
          ) {
            transaction.attempt = 2;
            transaction.status = "active";
            transaction.waitingFor = null;
            transaction.staged = {};
          }
          break;
        case "commit": {
          const x = transaction.staged.X;
          const y = transaction.staged.Y;
          if (
            transaction.status === "active" &&
            holdsBoth() &&
            x !== undefined &&
            y !== undefined
          ) {
            state.balances = { X: x, Y: y };
            state.commits.push({
              transaction: event.transaction,
              attempt: transaction.attempt,
              ...transfer,
            });
            transaction.staged = {};
            transaction.waitingFor = null;
            transaction.status = "committed";
            release();
          }
          break;
        }
      }
      return state;
    },
    evaluate(state) {
      const total = state.balances.X + state.balances.Y;
      const conserved = total === 20000;
      const completed = (["A", "B"] as const).filter(
        (id) =>
          state.transactions[id].status === "committed" &&
          state.commits.filter((c) => c.transaction === id).length === 1,
      ).length;
      const clean =
        state.locks.X === null &&
        state.locks.Y === null &&
        Object.values(state.transactions).every(
          (transaction) => Object.keys(transaction.staged).length === 0,
        );
      const detected = state.detectedCycle.length > 0;
      const outcome: DeadlockResult["outcome"] =
        conserved && clean && completed === 2
          ? detected
            ? "recovered"
            : "safe"
          : conserved &&
              clean &&
              completed === 1 &&
              detected &&
              state.victim !== null &&
              state.transactions[state.victim].status === "aborted"
            ? "aborted"
            : "incomplete";
      return {
        outcome,
        completed,
        total,
        conserved,
        explanation:
          outcome === "safe"
            ? "Both transactions acquired X before Y. B waited, but no circular wait formed. Each transfer committed atomically, and all locks were released."
            : outcome === "recovered"
              ? "A circular wait was detected. The victim’s entire staged transfer was rolled back, its locks were released, and the survivor committed. One fresh retry then committed the victim’s transfer. Retry recovers this run; consistent ordering prevents this cycle."
              : outcome === "aborted"
                ? "The database model broke the cycle by aborting one transaction. Its staged debit did not change either committed account. The survivor completed, but the aborted business request still needs a bounded whole-transaction retry."
                : "Some operations did not finish cleanly. Inspect lock ownership, pending writes, and the execution history.",
      };
    },
  };
}

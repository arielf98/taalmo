import type { ScenarioDefinition } from "./engine";
export type RequestId = "A" | "B";
export interface LostUpdateConfig {
  mode: "unsafe" | "atomic";
  initialBalance: number;
  increments: Record<RequestId, number>;
  order: "A-first" | "B-first";
}
export interface LostUpdateState {
  balance: number;
  lockOwner: RequestId | null;
  requests: Record<
    RequestId,
    {
      status:
        | "received"
        | "reading"
        | "computed"
        | "waiting"
        | "locked"
        | "staged"
        | "committed";
      readBalance: number | null;
      proposedBalance: number | null;
    }
  >;
  writes: {
    request: RequestId;
    before: number;
    after: number;
    increment: number;
  }[];
}
export interface LostUpdateEvent {
  kind: "read" | "compute" | "write" | "lock" | "increment" | "commit";
  request: RequestId;
  label: string;
  detail: string;
}
export interface LostUpdateResult {
  outcome: "safe" | "lost-update" | "incomplete";
  expected: number;
  actual: number;
  lostAmount: number;
  explanation: string;
}
export function lostUpdateScenario(
  config: LostUpdateConfig,
): ScenarioDefinition<LostUpdateState, LostUpdateEvent, LostUpdateResult> {
  const { initialBalance, increments, mode, order } = config;
  if (
    !["unsafe", "atomic"].includes(mode) ||
    !["A-first", "B-first"].includes(order)
  )
    throw new Error("Unknown simulation mode or write order.");
  if (
    !Number.isSafeInteger(initialBalance) ||
    initialBalance < 0 ||
    ![increments.A, increments.B].every(
      (amount) => Number.isSafeInteger(amount) && amount > 0,
    ) ||
    initialBalance + increments.A + increments.B > 100000000
  )
    throw new Error(
      "Use nonnegative integer cents for the balance and positive integer increments, totaling at most 100000000 cents.",
    );
  const first: RequestId = order === "A-first" ? "A" : "B";
  const second: RequestId = first === "A" ? "B" : "A";
  const event = (
    kind: LostUpdateEvent["kind"],
    request: RequestId,
    label: string,
    detail: string,
  ): LostUpdateEvent => ({ kind, request, label, detail });
  const money = (value: number) => `$${(value / 100).toFixed(2)}`;
  const events: LostUpdateEvent[] =
    mode === "unsafe"
      ? [
          event(
            "read",
            "A",
            "A reads the balance",
            `A reads ${money(initialBalance)} without holding a row lock.`,
          ),
          event(
            "read",
            "B",
            "B reads the same balance",
            `B reads ${money(initialBalance)} before either request writes.`,
          ),
          event(
            "compute",
            "A",
            "A calculates a replacement",
            `A adds ${money(increments.A)} to its earlier read. The result is a replacement value, not an increment operation.`,
          ),
          event(
            "compute",
            "B",
            "B calculates a replacement",
            `B adds ${money(increments.B)} to its earlier read, independently of A.`,
          ),
          event(
            "write",
            first,
            `${first} writes first`,
            `${first} replaces the stored balance with its calculated value.`,
          ),
          event(
            "write",
            second,
            `${second} overwrites the balance`,
            `${second} writes its stale calculation. The earlier request’s increment is lost.`,
          ),
        ]
      : [
          event(
            "lock",
            first,
            `${first} locks the account row`,
            `${first} begins its UPDATE balance = balance + increment. The row stays locked until commit.`,
          ),
          event(
            "lock",
            second,
            `${second} waits for the row`,
            `${second} attempts to update the same row and waits for ${first}’s transaction.`,
          ),
          event(
            "increment",
            first,
            `${first} stages an atomic increment`,
            `${first} calculates from the locked current row. Its new balance remains uncommitted.`,
          ),
          event(
            "commit",
            first,
            `${first} commits and releases the lock`,
            `${first} publishes its increment and releases the row for the waiting request.`,
          ),
          event(
            "lock",
            second,
            `${second} acquires the released row`,
            `${second} can now continue with the updated row instead of an old client-side value.`,
          ),
          event(
            "increment",
            second,
            `${second} stages an atomic increment`,
            `${second} adds its increment to the current committed balance. The first increment is preserved.`,
          ),
          event(
            "commit",
            second,
            `${second} commits both increments’ result`,
            `${second} commits its update. Both requests’ increments are now reflected in the balance.`,
          ),
        ];
  return {
    initial: {
      balance: initialBalance,
      lockOwner: null,
      requests: {
        A: { status: "received", readBalance: null, proposedBalance: null },
        B: { status: "received", readBalance: null, proposedBalance: null },
      },
      writes: [],
    },
    events,
    transition(state, e) {
      const request = state.requests[e.request];
      const write = () => {
        if (request.proposedBalance === null) return;
        state.writes.push({
          request: e.request,
          before: state.balance,
          after: request.proposedBalance,
          increment: increments[e.request],
        });
        state.balance = request.proposedBalance;
        request.status = "committed";
      };
      switch (e.kind) {
        case "read":
          request.readBalance = state.balance;
          request.status = "reading";
          break;
        case "compute":
          if (request.readBalance !== null) {
            request.proposedBalance =
              request.readBalance + increments[e.request];
            request.status = "computed";
          }
          break;
        case "write":
          write();
          break;
        case "lock":
          if (state.lockOwner && state.lockOwner !== e.request)
            request.status = "waiting";
          else {
            state.lockOwner = e.request;
            request.status = "locked";
          }
          break;
        case "increment":
          if (state.lockOwner === e.request) {
            request.readBalance = state.balance;
            request.proposedBalance = state.balance + increments[e.request];
            request.status = "staged";
          }
          break;
        case "commit":
          if (state.lockOwner === e.request && request.status === "staged") {
            write();
            state.lockOwner = null;
          }
          break;
      }
      return state;
    },
    evaluate(state) {
      const expected = initialBalance + increments.A + increments.B;
      const complete =
        state.writes.length === 2 &&
        state.requests.A.status === "committed" &&
        state.requests.B.status === "committed";
      const safe = complete && state.balance === expected;
      return {
        outcome: !complete ? "incomplete" : safe ? "safe" : "lost-update",
        expected,
        actual: state.balance,
        lostAmount: expected - state.balance,
        explanation: safe
          ? "Each UPDATE adds to the current row while holding its lock. The second request waits, then increments the updated balance. Both business changes survive. Atomic increments prevent this lost update; retrying the same request would still need separate idempotency protection."
          : "Both requests computed replacement values from the same old balance. The final write overwrote the earlier increment. Putting a stale replacement value inside a transaction alone does not fix this race.",
      };
    },
  };
}

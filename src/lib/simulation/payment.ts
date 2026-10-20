import type { ScenarioDefinition } from "./engine";
export type Mode = "unsafe" | "protected";
type CallbackId = "A" | "B";
type Status =
  | "received"
  | "reading"
  | "processing"
  | "waiting"
  | "committed"
  | "duplicate"
  | "failed";
export interface PaymentState {
  processed: boolean;
  lockOwner: CallbackId | null;
  keys: string[];
  callbacks: Record<
    CallbackId,
    { status: Status; readProcessed: boolean | null }
  >;
  staged: Partial<Record<CallbackId, boolean>>;
  ledger: {
    id: string;
    paymentId: string;
    amount: number;
    callback: CallbackId;
  }[];
  outbox: {
    id: string;
    type: string;
    paymentId: string;
    callback: CallbackId;
  }[];
}
export interface PaymentEvent {
  kind:
    | "read"
    | "ledger"
    | "outbox"
    | "mark"
    | "claim"
    | "stage"
    | "commit"
    | "rollback";
  callback: CallbackId;
  label: string;
  detail: string;
  node: string;
}
export interface PaymentResult {
  outcome: "safe" | "duplicate" | "incomplete";
  duplicates: number;
  total: number;
  explanation: string;
}
export interface PaymentConfig {
  mode: Mode;
  amount: number;
  failBeforeCommit?: boolean;
}
const key = "payment:pay_1042";
const event = (
  kind: PaymentEvent["kind"],
  callback: CallbackId,
  label: string,
  detail: string,
  node = "database",
): PaymentEvent => ({ kind, callback, label, detail, node });
export function paymentScenario(
  config: PaymentConfig,
): ScenarioDefinition<PaymentState, PaymentEvent, PaymentResult> {
  if (
    !Number.isSafeInteger(config.amount) ||
    config.amount <= 0 ||
    config.amount > 100000000
  )
    throw new Error(
      "Amount must be a positive integer in cents, up to 100000000.",
    );
  const unsafe = config.mode === "unsafe";
  const events = unsafe
    ? [
        event(
          "read",
          "A",
          "Read payment status",
          "Callback A reads processed = false. No lock is held.",
        ),
        event(
          "read",
          "B",
          "Read the same payment",
          "Callback B also reads false before A writes. Both now believe they can proceed.",
        ),
        event(
          "ledger",
          "A",
          "Write ledger entry",
          "A credits the ledger using its stale read.",
          "ledger",
        ),
        event(
          "outbox",
          "A",
          "Write outbox event",
          "A writes a payment.received event independently.",
          "outbox",
        ),
        event(
          "mark",
          "A",
          "Mark payment processed",
          "A sets processed = true, too late to change B’s earlier read.",
        ),
        event(
          "ledger",
          "B",
          "Write a second ledger entry",
          "B uses the value it already read. The same payment is credited twice.",
          "ledger",
        ),
        event(
          "outbox",
          "B",
          "Write a second outbox event",
          "Downstream consumers would receive two events.",
          "outbox",
        ),
        event(
          "mark",
          "B",
          "Mark payment processed again",
          "A boolean cannot undo an already duplicated side effect.",
        ),
      ]
    : [
        event(
          "claim",
          "A",
          "Begin and claim unique key",
          "A inserts the idempotency key inside a transaction. The key is reserved until commit.",
        ),
        event(
          "claim",
          "B",
          "Second callback waits",
          "B tries the same unique key. The database waits for the conflicting transaction.",
        ),
        event(
          "stage",
          "A",
          "Stage ledger + outbox",
          "Both writes are uncommitted and invisible outside A’s transaction.",
          "ledger",
        ),
        ...(config.failBeforeCommit
          ? [
              event(
                "rollback",
                "A",
                "Failure → rollback",
                "A fails before commit. Its key reservation, ledger write, and outbox event are discarded.",
              ),
              event(
                "claim",
                "B",
                "Waiting callback acquires key",
                "After rollback, B can insert the key and process the payment.",
              ),
              event(
                "stage",
                "B",
                "Stage replacement writes",
                "B stages one ledger entry and one outbox event.",
                "outbox",
              ),
              event(
                "commit",
                "B",
                "Commit transaction",
                "The unique key, ledger entry, and outbox event become visible together.",
              ),
            ]
          : [
              event(
                "commit",
                "A",
                "Commit transaction",
                "The unique key, ledger entry, and outbox event become visible together.",
              ),
              event(
                "claim",
                "B",
                "Conflict → skip duplicate",
                "B’s insert now conflicts with the committed key. No business writes are made.",
                "api",
              ),
            ]),
      ];
  return {
    initial: {
      processed: false,
      lockOwner: null,
      keys: [],
      callbacks: {
        A: { status: "received", readProcessed: null },
        B: { status: "received", readProcessed: null },
      },
      staged: {},
      ledger: [],
      outbox: [],
    },
    events,
    transition(state, e) {
      const c = state.callbacks[e.callback];
      const ledger = () => ({
        id: `led_${e.callback}`,
        paymentId: "pay_1042",
        amount: config.amount,
        callback: e.callback,
      });
      const outbox = () => ({
        id: `evt_${e.callback}`,
        type: "payment.received",
        paymentId: "pay_1042",
        callback: e.callback,
      });
      switch (e.kind) {
        case "read":
          if (c.status !== "committed") {
            c.readProcessed = state.processed;
            c.status = "reading";
          }
          break;
        case "ledger":
          if (c.readProcessed === false) {
            state.ledger.push(ledger());
            c.status = "processing";
          }
          break;
        case "outbox":
          if (c.readProcessed === false) state.outbox.push(outbox());
          break;
        case "mark":
          state.processed = true;
          c.status = "committed";
          break;
        case "claim":
          if (state.keys.includes(key)) c.status = "duplicate";
          else if (state.lockOwner && state.lockOwner !== e.callback)
            c.status = "waiting";
          else {
            state.lockOwner = e.callback;
            c.status = "processing";
          }
          break;
        case "stage":
          if (state.lockOwner === e.callback) state.staged[e.callback] = true;
          break;
        case "commit":
          if (
            state.lockOwner === e.callback &&
            state.staged[e.callback] &&
            !state.keys.includes(key)
          ) {
            state.keys.push(key);
            state.ledger.push(ledger());
            state.outbox.push(outbox());
            state.processed = true;
            delete state.staged[e.callback];
            state.lockOwner = null;
            c.status = "committed";
          }
          break;
        case "rollback":
          if (state.lockOwner === e.callback) {
            delete state.staged[e.callback];
            state.lockOwner = null;
            c.status = "failed";
          }
          break;
      }
      return state;
    },
    evaluate(state) {
      const duplicates = Math.max(0, state.ledger.length - 1);
      const safe =
        state.ledger.length === 1 &&
        state.outbox.length === 1 &&
        state.keys.length === 1;
      return {
        outcome: duplicates ? "duplicate" : safe ? "safe" : "incomplete",
        duplicates,
        total: state.ledger.reduce((n, e) => n + e.amount, 0),
        explanation: duplicates
          ? "Both callbacks acted on the same stale read. Checking a flag before writing is not atomic: the ledger and outbox each contain two effects for one payment."
          : safe
            ? "The unique key and both business writes committed in one transaction. A conflicting callback cannot create another ledger entry. The outbox publisher still needs retries and an idempotent consumer; this is not exactly-once message delivery."
            : "The payment did not finish. Inspect the timeline before retrying.",
      };
    },
  };
}

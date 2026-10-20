export const pathHref = "/learn/database-transactions";
export const lessons = [
  {
    id: "lost-update",
    number: "01",
    title: "Lost Update",
    subtitle: "When the last write isn’t the right write.",
    duration: "15 min",
    tag: "Concurrency",
    labHref: "/sandbox/lost-update",
    intro:
      "Two requests read the same account balance. Both calculate a new value, then write it back. The second write silently replaces the first.",
    example:
      "Balance starts at $100. A adds $20 and B adds $30. Both read $100, then write $120 and $130. The final balance is $130, but should be $150.",
    principle:
      "Read-modify-write is a sequence, not an atomic operation. Use an atomic UPDATE, an appropriate row lock, or optimistic concurrency control to prevent stale writes.",
    question: "What causes a lost update?",
    options: [
      "Two writes based on the same stale value",
      "A slow network connection",
      "Too many database indexes",
    ],
    answer: 0,
    explanation:
      "Both requests calculate from the same old value. The later write overwrites the earlier change instead of including it.",
  },
  {
    id: "duplicate-payment",
    number: "02",
    title: "Duplicate Payment Callback",
    subtitle: "One payment. Two callbacks. What could go wrong?",
    duration: "15 min",
    tag: "Idempotency",
    labHref: "/sandbox/duplicate-payment",
    intro:
      "Payment gateways retry. Sometimes two callbacks for the very same payment arrive almost together. Your API must make one business change, however many times it receives the notification.",
    example:
      "Callback A reads “not processed.” Before it writes, callback B reads the same thing. Both credit the ledger. Checking a flag looked safe, until the requests overlapped.",
    principle:
      "Claim a unique payment key and write the ledger entry and outbox event in one database transaction. The unique constraint coordinates concurrent requests. On rollback, none of those writes survive.",
    question:
      "What prevents concurrent callbacks from crediting the ledger twice?",
    options: [
      "A unique key checked inside the same transaction",
      "Checking a processed flag before starting",
      "Adding a delay to the second callback",
    ],
    answer: 0,
    explanation:
      "A unique constraint participates in the transaction. Competing inserts wait or conflict, so only one transaction can commit the business effect. A separate flag check still races.",
  },
  {
    id: "deadlock",
    number: "03",
    title: "Deadlock",
    subtitle: "When every request is waiting for the other.",
    duration: "15 min",
    tag: "Locking",
    labHref: "/sandbox/deadlock",
    intro:
      "Transaction A locks row 1 and needs row 2. Transaction B locks row 2 and needs row 1. Neither can continue: their waits form a cycle.",
    example:
      "A transfer from account X to Y locks X first. A simultaneous transfer from Y to X locks Y first. Each transfer is waiting for the other account’s lock.",
    principle:
      "Acquire shared resources in a consistent order and keep transactions short. PostgreSQL detects deadlocks and aborts a transaction; applications must be prepared to retry the entire aborted transaction.",
    question: "Which strategy reduces deadlock risk?",
    options: [
      "Acquire locks in a consistent order",
      "Keep every transaction open longer",
      "Retry only the last SQL statement",
    ],
    answer: 0,
    explanation:
      "Consistent lock ordering removes this circular wait. If a transaction is aborted, retry the full transaction, with bounded retries.",
  },
] as const;
export const labs = [
  {
    id: "lab-payment",
    lessonId: "duplicate-payment",
    href: lessons[1].labHref,
    title: "Payment lab",
    modes: ["unsafe", "protected"],
  },
  {
    id: "lab-lost-update",
    lessonId: "lost-update",
    href: lessons[0].labHref,
    title: "Lost Update lab",
    modes: ["lost-update:unsafe", "lost-update:atomic"],
  },
  {
    id: "lab-deadlock",
    lessonId: "deadlock",
    href: lessons[2].labHref,
    title: "Deadlock lab",
    modes: ["deadlock:opposite", "deadlock:ordered"],
  },
] as const;
export type ExperimentMode = (typeof labs)[number]["modes"][number];
export const milestoneIds: readonly string[] = [
  ...lessons.map((lesson) => lesson.id),
  ...labs.map((lab) => lab.id),
];
export const experimentModes: readonly string[] = labs.flatMap<string>(
  (lab) => [...lab.modes],
);
export const lostUpdateQuiz = {
  id: "lab-lost-update",
  question: "Why does an atomic increment preserve both updates?",
  options: [
    "Each UPDATE increments the current locked row",
    "The last request always has the larger increment",
    "Wrapping a stale replacement value in BEGIN and COMMIT is enough",
  ],
  answer: 0,
  explanation:
    "The row lock serializes conflicting updates. The waiting UPDATE increments the updated row after the first commits. It does not reuse a replacement value computed from an earlier client-side read. This prevents lost updates, but does not make retries idempotent.",
};
export const deadlockQuiz = {
  id: "lab-deadlock",
  question: "What should you retry after a deadlock aborts a transaction?",
  options: [
    "Restart the whole transaction with a bounded retry",
    "Retry only the SQL statement that was waiting",
    "Keep the aborted transaction’s staged debit",
  ],
  answer: 0,
  explanation:
    "A deadlock victim loses its transaction’s uncommitted changes and locks. Start a fresh transaction for the entire business operation with bounded retries. Consistent lock ordering prevents this circular wait; retrying helps recover an abort but does not prevent deadlocks.",
};
export const labQuiz = {
  id: "lab-payment",
  question: "Why does the protected version produce only one business effect?",
  options: [
    "The unique key and both writes commit together",
    "The outbox delivers messages exactly once",
    "The callbacks are delayed by a random amount",
  ],
  answer: 0,
  explanation:
    "Atomic commit keeps the idempotency record, ledger, and outbox consistent. A duplicate key prevents the second business write. Outbox delivery can still be repeated, so consumers also need idempotency.",
};

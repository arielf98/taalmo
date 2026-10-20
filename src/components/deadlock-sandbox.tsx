"use client";
import { useLocale, localizedFlowLabels } from "@/lib/locale";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  Position,
  ReactFlow,
  type Node,
  type Edge,
} from "@xyflow/react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Database,
  FlaskConical,
  GitBranch,
  Info,
  LockKeyhole,
  Play,
  RotateCcw,
  ShieldCheck,
  SkipForward,
  Square,
  Terminal,
} from "lucide-react";
import { advance, createSimulation, runToEnd } from "@/lib/simulation/engine";
import {
  deadlockScenario,
  deadlockCycle,
  waitForEdges,
  type DeadlockConfig,
  type DeadlockState,
  type TransactionId,
} from "@/lib/simulation/deadlock";
import { deadlockQuiz, pathHref } from "@/content/lessons";
import { useProgress } from "@/lib/progress";
import { Badge, Workspace } from "./shell";
import { Button } from "./ui/button";
import { Quiz } from "./quiz";
const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value / 100,
  );
const heldRows = (state: DeadlockState, id: TransactionId) =>
  (["X", "Y"] as const)
    .filter((account) => state.locks[account] === id)
    .join(", ") || "none";
const stagedValues = (state: DeadlockState, id: TransactionId) =>
  Object.entries(state.transactions[id].staged)
    .map(([account, value]) => `${account}: ${money(value)}`)
    .join(" · ") || "none";

export function DeadlockSandbox() {
  const { t } = useLocale();

  const [mode, setMode] = useState<DeadlockConfig["mode"]>("opposite");
  const [victim, setVictim] = useState<TransactionId>("B");
  const [retryVictim, setRetryVictim] = useState(false);
  return (
    <Workspace wide>
      <div className="breadcrumb">
        <Link href={pathHref}>{t("Database Transactions")}</Link>
        <ChevronRight size={13} />
        <Link href="/lessons/deadlock">{t("Deadlock")}</Link>
        <ChevronRight size={13} />
        {t("Sandbox")}
      </div>
      <div className="sandbox-heading">
        <div>
          <div className="inline-meta">
            <Badge>
              <FlaskConical size={12} />
              {t(" INTERACTIVE LAB")}
            </Badge>
            <span className="small muted">{t("Experiment 03")}</span>
          </div>
          <h1>{t("Two locks. A circular wait.")}</h1>
          <p>
            {t(
              "A transfers $10 from X to Y. B transfers $20 from Y to X. Who gets the next lock?",
            )}
          </p>
        </div>
        <Link className="text-link small" href="/lessons/deadlock">
          <BookOpen size={16} />
          {t("Back to lesson")}
        </Link>
      </div>
      <div className="simulation-notice">
        <Info size={16} />
        <span>
          {t(
            "A deterministic two-transaction model, not a PostgreSQL server. Victim selection is a teaching control; real database victim selection and detection timing are not simulated.",
          )}
        </span>
      </div>
      <div className="experiment-config">
        <div>
          <span className="control-label">{t("LOCK STRATEGY")}</span>
          <div className="mode-toggle light">
            <button
              aria-pressed={mode === "opposite"}
              onClick={() => setMode("opposite")}
            >
              <AlertTriangle size={15} />
              {t(" Opposite order")}
            </button>
            <button
              aria-pressed={mode === "ordered"}
              onClick={() => setMode("ordered")}
            >
              <ShieldCheck size={15} />
              {t(" Consistent order")}
            </button>
          </div>
        </div>
        <label className="amount-control">
          <span className="control-label">{t("DEADLOCK VICTIM")}</span>
          <select
            value={victim}
            disabled={mode === "ordered"}
            onChange={(e) => setVictim(e.target.value as TransactionId)}
          >
            <option value="A">{t("Transaction A")}</option>
            <option value="B">{t("Transaction B")}</option>
          </select>
        </label>
        <label
          className={`failure-control ${mode === "ordered" ? "disabled" : ""}`}
        >
          <input
            type="checkbox"
            disabled={mode === "ordered"}
            checked={mode === "opposite" && retryVictim}
            onChange={(e) => setRetryVictim(e.target.checked)}
          />
          <span>
            {t("Retry the aborted transaction once")}
            <small>
              {t("Restart the full transaction after the survivor commits")}
            </small>
          </span>
        </label>
      </div>
      <DeadlockExperiment
        key={`${mode}-${victim}-${retryVictim}`}
        config={{
          mode,
          victim,
          retryVictim: mode === "opposite" && retryVictim,
        }}
      />
    </Workspace>
  );
}
function WaitForGraph({
  state,
  selected,
  onSelect,
}: {
  state: DeadlockState;
  selected: TransactionId;
  onSelect: (id: TransactionId) => void;
}) {
  const { t } = useLocale();

  const cycle = deadlockCycle(state).length > 0;
  const nodes: Node[] = (["A", "B"] as const).map((id, index) => ({
    id,
    position: { x: index * 350, y: index * 120 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    draggable: false,
    ariaLabel: t("Inspect transaction {0}", [id]),
    className: `system-node ${selected === id ? "node-selected" : ""}`,
    data: {
      label: (
        <div className="node-content">
          <div className="node-icon">
            <LockKeyhole size={23} />
          </div>
          <strong>
            {t("Transaction ")}
            {id}
          </strong>
          <span>
            {t(state.transactions[id].status)}
            {t(" · attempt")} {state.transactions[id].attempt}
          </span>
          <small>
            {t("holds: ")}
            {t(heldRows(state, id))}
            <br />
            {t("waits for: ")}
            {state.transactions[id].waitingFor ?? t("none")}
          </small>
        </div>
      ),
    },
  }));
  const edges: Edge[] = waitForEdges(state).map((edge) => ({
    id: `${edge.from}-${edge.to}`,
    source: edge.from,
    target: edge.to,
    type: "default",
    ariaLabel: t("{0} waits for {1} on row {2}", [
      edge.from,
      edge.to,
      edge.account,
    ]),
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: cycle ? "#eda09a" : "#cbbd8b",
    },
    style: { stroke: cycle ? "#eda09a" : "#cbbd8b", strokeWidth: 2 },
  }));
  return (
    <div
      className="architecture"
      role="region"
      aria-label={t("Transaction wait-for graph")}
    >
      <ReactFlow
        ariaLabelConfig={localizedFlowLabels(t)}
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.22 }}
        minZoom={0.3}
        maxZoom={1.4}
        nodesConnectable={false}
        zoomOnScroll={false}
        panOnScroll
        onNodeClick={(_, node) => {
          if (node.id === "A" || node.id === "B") onSelect(node.id);
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={19}
          color="#385359"
          size={1}
        />
        <Controls showInteractive={false} />
      </ReactFlow>
      <div className="diagram-caption">
        <span className="status-dot" />
        {cycle
          ? t("CIRCULAR WAIT PRESENT")
          : t("ARROW = WAITING TRANSACTION → LOCK OWNER")}
      </div>
    </div>
  );
}
function DeadlockExperiment({ config }: { config: DeadlockConfig }) {
  const { t } = useLocale();

  const [sim, setSim] = useState(() =>
    createSimulation(deadlockScenario(config)),
  );
  const [playing, setPlaying] = useState(false);
  const [historyStep, setHistoryStep] = useState<number | null>(null);
  const [selected, setSelected] = useState<TransactionId>("A");
  const [raw, setRaw] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const { progress, experiment } = useProgress();
  const experimentId = `deadlock:${config.mode}` as const;
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      const next = advance(sim);
      setSim(next);
      if (next.result) {
        setPlaying(false);
        setSaveError(!experiment(experimentId));
      }
    }, 450);
    return () => clearTimeout(timer);
  }, [playing, sim, experiment, experimentId]);
  const view = sim.history[historyStep ?? sim.cursor];
  const state = view.state;
  const finished = sim.result !== null;
  const transaction = state.transactions[selected];
  const waits = waitForEdges(state);
  const cycle = deadlockCycle(state);
  const execute = (all: boolean) => {
    setPlaying(false);
    setHistoryStep(null);
    const next = all ? runToEnd(sim) : advance(sim);
    setSim(next);
    if (next.result) setSaveError(!experiment(experimentId));
  };
  const reset = () => {
    setPlaying(false);
    setHistoryStep(null);
    setSim(createSimulation(sim.scenario));
  };
  const replay = () => {
    setHistoryStep(null);
    setSim(createSimulation(sim.scenario));
    setPlaying(true);
  };
  const learnedBoth =
    progress.experiments.includes("deadlock:opposite") &&
    progress.experiments.includes("deadlock:ordered");
  const result = sim.result;
  const successful =
    result?.outcome === "safe" || result?.outcome === "recovered";
  return (
    <>
      <div className="lab-grid">
        <section className="system-workspace">
          <div className="panel-heading">
            <div>
              <GitBranch size={16} />
              <h2>{t("Wait-for graph")}</h2>
            </div>
            <Badge tone={cycle.length ? "amber" : "gray"}>
              {historyStep !== null
                ? t("HISTORY · STEP {0}", [historyStep])
                : cycle.length
                  ? t("A → B → A")
                  : t("LIVE STATE")}
            </Badge>
          </div>
          <WaitForGraph
            state={state}
            selected={selected}
            onSelect={setSelected}
          />
          <div className="execution-toolbar">
            <div className="run-controls">
              <Button
                onClick={() => execute(true)}
                disabled={finished || playing}
              >
                <Play size={15} fill="currentColor" />
                {t("Run simulation")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => execute(false)}
                disabled={finished || playing}
              >
                <SkipForward size={16} />
                {t("Step forward")}
              </Button>
              {playing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPlaying(false)}
                >
                  <Square size={14} />
                  {t("Pause")}
                </Button>
              )}
            </div>
            <div className="reset-controls">
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("Replay execution")}
                title={t("Replay execution")}
                onClick={replay}
                disabled={playing || sim.cursor === 0}
              >
                <Play size={17} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t("Reset experiment")}
                title={t("Reset experiment")}
                onClick={reset}
              >
                <RotateCcw size={17} />
              </Button>
            </div>
          </div>
          <div className="execution-progress">
            <div className="progress-track">
              <span
                style={{
                  width: `${(sim.cursor / sim.scenario.events.length) * 100}%`,
                }}
              />
            </div>
            <span>
              {sim.cursor} / {sim.scenario.events.length}
              {t(" events")}
            </span>
          </div>
          <div className="callback-strip">
            {(["A", "B"] as const).map((id) => (
              <div key={id}>
                <span className={`callback-tag callback-${id}`}>{id}</span>
                <span>
                  {t("Transaction ")}
                  {id}
                </span>
                <strong
                  className={`callback-status status-${state.transactions[id].status === "aborted" ? "failed" : state.transactions[id].status}`}
                >
                  {t(state.transactions[id].status)}
                </strong>
              </div>
            ))}
          </div>
          <div className="node-inspector">
            <div>
              <span className="eyebrow">
                <LockKeyhole size={14} />
                {t(" INSPECT: TRANSACTION ")}
                {selected}
              </span>
              <select
                aria-label={t("Inspect transaction")}
                value={selected}
                onChange={(e) => setSelected(e.target.value as TransactionId)}
              >
                <option value="A">{t("Transaction A")}</option>
                <option value="B">{t("Transaction B")}</option>
              </select>
            </div>
            <p>
              {t(
                "A moves $10 from X to Y; B moves $20 from Y to X. Pending changes are private to their transaction and disappear on rollback.",
              )}
            </p>
            <dl className="state-values">
              <div>
                <dt>{t("held row locks")}</dt>
                <dd>{t(heldRows(state, selected))}</dd>
              </div>
              <div>
                <dt>{t("waiting for row")}</dt>
                <dd>{transaction.waitingFor ?? t("none")}</dd>
              </div>
              <div>
                <dt>{t("uncommitted values")}</dt>
                <dd>{t(stagedValues(state, selected))}</dd>
              </div>
              <div>
                <dt>{t("attempt")}</dt>
                <dd>
                  {transaction.attempt} / {config.retryVictim ? 2 : 1}
                  {t(" maximum")}
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <section className="timeline-panel card">
          <div className="panel-heading">
            <div>
              <Terminal size={16} />
              <h2>{t("Execution timeline")}</h2>
            </div>
            <span className="small muted">{t("Logical order")}</span>
          </div>
          {sim.cursor === 0 ? (
            <div className="timeline-empty">
              <span className="feature-icon mint">
                <GitBranch size={23} />
              </span>
              <h3>{t("A wait is not always a deadlock.")}</h3>
              <p>
                {config.mode === "opposite"
                  ? t(
                      "Step until both transactions wait. Then inspect the cycle before the detector aborts a victim.",
                    )
                  : t(
                      "Observe B waiting for X while A can still proceed. A one-way wait does not form a cycle.",
                    )}
              </p>
              <span className="code-hint">
                {t("X = $100.00 · Y = $100.00")}
              </span>
            </div>
          ) : (
            <ol className="timeline-list">
              {sim.history.slice(1).map((snapshot) => (
                <li key={snapshot.step}>
                  <button
                    aria-label={t("Inspect step {0}: {1}", [
                      snapshot.step,
                      snapshot.event!.label,
                    ])}
                    aria-pressed={view.step === snapshot.step}
                    className={view.step === snapshot.step ? "selected" : ""}
                    onClick={() => setHistoryStep(snapshot.step)}
                  >
                    <span className="timeline-step">
                      {String(snapshot.step).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="timeline-item-title">
                        <strong>{t(snapshot.event!.label)}</strong>
                        <span
                          className={`callback-tag callback-${snapshot.event!.transaction}`}
                        >
                          {snapshot.event!.transaction}
                        </span>
                      </div>
                      <p>{t(snapshot.event!.detail)}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ol>
          )}
          {historyStep !== null && (
            <button
              className="return-live"
              onClick={() => setHistoryStep(null)}
            >
              {t("Return to current state ")}
              <ArrowRight size={14} />
            </button>
          )}
        </section>
      </div>
      <section className="state-section">
        <div className="section-heading compact">
          <div>
            <span className="eyebrow">
              {t("LOCKS, PENDING WRITES, AND COMMITTED EFFECTS")}
            </span>
            <h2>{t("Inspect the transaction boundary.")}</h2>
          </div>
          <div className="mode-toggle light small-tabs">
            <button aria-pressed={!raw} onClick={() => setRaw(false)}>
              <Database size={14} />
              {t("Records")}
            </button>
            <button aria-pressed={raw} onClick={() => setRaw(true)}>
              <Code2 size={15} />
              {t("Raw state")}
            </button>
          </div>
        </div>
        {historyStep !== null && (
          <p className="history-notice">
            <Info size={15} />
            {t("Inspecting step ")}
            {historyStep}
            {t(". Balances and locks show that historical snapshot.")}
          </p>
        )}
        {raw ? (
          <pre className="code-block raw-state">
            {JSON.stringify(state, null, 2)}
          </pre>
        ) : (
          <div className="state-grid">
            <div className="record-panel card">
              <div className="panel-heading">
                <div>
                  <Database size={17} />
                  <h3>{t("Accounts and row locks")}</h3>
                </div>
                <Badge tone="gray">{t("COMMITTED BALANCES")}</Badge>
              </div>
              <div className="table-scroll">
                <table>
                  <caption className="sr-only">
                    {t("Account balances and lock owners")}
                  </caption>
                  <thead>
                    <tr>
                      <th>{t("ROW")}</th>
                      <th>{t("BALANCE")}</th>
                      <th>{t("LOCK OWNER")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(["X", "Y"] as const).map((account) => (
                      <tr key={account}>
                        <td>{account}</td>
                        <td>{money(state.balances[account])}</td>
                        <td>{state.locks[account] ?? t("none")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                {t("Total across both accounts")}{" "}
                <strong>{money(state.balances.X + state.balances.Y)}</strong>
              </div>
            </div>
            <div className="record-panel card">
              <div className="panel-heading">
                <div>
                  <BookOpen size={17} />
                  <h3>{t("Committed transfers")}</h3>
                </div>
                <span className="record-count">{state.commits.length}</span>
              </div>
              <div className="table-scroll">
                <table>
                  <caption className="sr-only">
                    {t("Successfully committed transfers")}
                  </caption>
                  <thead>
                    <tr>
                      <th>{t("TX")}</th>
                      <th>{t("TRANSFER")}</th>
                      <th>{t("AMOUNT")}</th>
                      <th>{t("ATTEMPT")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.commits.map((commit) => (
                      <tr key={`${commit.transaction}-${commit.attempt}`}>
                        <td>{commit.transaction}</td>
                        <td>
                          {commit.from} → {commit.to}
                        </td>
                        <td>{money(commit.amount)}</td>
                        <td>{commit.attempt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!state.commits.length && (
                <p className="table-empty">
                  {t("No committed transfers yet.")}
                </p>
              )}
              <div className="table-footer">
                {t("Rollback keeps aborted transfers out of this table.")}
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="node-inspector card" style={{ marginTop: 20 }}>
        <span className="eyebrow">
          <GitBranch size={14} />
          {t(" CURRENT WAIT-FOR EDGES")}
        </span>
        <p>
          {waits.length
            ? waits
                .map((edge) =>
                  t("{0} → {1} (row {2})", [edge.from, edge.to, edge.account]),
                )
                .join(" · ")
            : t("No transaction currently waits for another lock owner.")}
        </p>
        <p>
          <strong>
            {cycle.length
              ? t("Circular wait: A → B → A. Neither transaction can proceed.")
              : waits.length
                ? t(
                    "Waiting, without a cycle. The lock owner can still proceed.",
                  )
                : t("No circular wait in this snapshot.")}
          </strong>
        </p>
        {state.detectedCycle.length > 0 && (
          <p className="small">
            {t("Detector recorded: ")}
            {state.detectedCycle.join(" → ")}
            {t(". Victim:")} {state.victim ?? t("not chosen yet")}
            {t(". This historical record remains after the cycle is resolved.")}
          </p>
        )}
      </section>
      {result && historyStep === null && (
        <section
          aria-live="polite"
          className={`result-card ${successful ? "result-safe" : "result-unsafe"}`}
        >
          <span className="result-icon">
            {successful ? (
              <ShieldCheck size={29} />
            ) : (
              <AlertTriangle size={29} />
            )}
          </span>
          <div>
            <span className="eyebrow">
              {t("EXPERIMENT RESULT · ")}
              {t(config.mode).toUpperCase()}
            </span>
            <h2>
              {result.outcome === "safe"
                ? t("Waiting, without a deadlock.")
                : result.outcome === "recovered"
                  ? t("Deadlock recovered. Both transfers committed.")
                  : result.outcome === "aborted"
                    ? t("Deadlock detected. One transaction aborted.")
                    : t("The experiment did not finish cleanly.")}
            </h2>
            <p>{t(result.explanation)}</p>
            <div className="result-checks">
              <span>
                <Check size={15} />
                {result.completed}
                {t(" of 2 transfers committed")}
              </span>
              <span>
                {result.conserved ? (
                  <Check size={15} />
                ) : (
                  <AlertTriangle size={15} />
                )}
                {t("Total balance: ")}
                {money(result.total)}
              </span>
            </div>
            {config.mode === "opposite" && (
              <p className="result-next">
                <ArrowRight size={16} />
                {t("Try")}{" "}
                {config.retryVictim
                  ? t("Consistent order to prevent the cycle.")
                  : t(
                      "one full retry, then Consistent order to prevent the cycle.",
                    )}
              </p>
            )}
          </div>
        </section>
      )}
      {saveError && (
        <p className="save-error" role="alert">
          {t(
            "Your browser could not save this experiment. Enable local storage to retain progress.",
          )}
        </p>
      )}
      <section className="lab-reflection">
        <div>
          <span className="eyebrow">
            {t("PREVENT THE CYCLE. RECOVER THE TRANSACTION.")}
          </span>
          <h2>{t("Choose one lock order.")}</h2>
          <p>
            {t(
              "Both transactions lock X before Y, even when a transfer starts from Y. One may wait, but that wait does not form a cycle in this model.",
            )}
          </p>
          <pre className="code-block">
            <code>
              {
                "BEGIN;\nSELECT id FROM accounts\nWHERE id = 'X' FOR UPDATE;\nSELECT id FROM accounts\nWHERE id = 'Y' FOR UPDATE;\n-- Apply both debit and credit here\nCOMMIT;"
              }
            </code>
          </pre>
          <p className="small">
            {t(
              "If a transaction is aborted, retry its entire business operation from the beginning, with a bounded policy. This model permits one retry after the survivor commits; it does not simulate timing, backoff, or real PostgreSQL victim selection.",
            )}
          </p>
          <Link className="text-link small" href="/lessons/deadlock">
            <ArrowLeft size={14} />
            {t("Revisit the concept")}
          </Link>
        </div>
        {learnedBoth ? (
          <Quiz {...deadlockQuiz} lab />
        ) : (
          <div className="quiz-unlock card">
            <ShieldCheck size={28} />
            <h3>{t("Compare a cycle with a one-way wait.")}</h3>
            <p>
              {t(
                "Finish Opposite order and Consistent order in this lab to unlock the final checkpoint.",
              )}
            </p>
            <div>
              <span>
                {progress.experiments.includes("deadlock:opposite") ? (
                  <Check size={15} />
                ) : (
                  <span className="empty-check" />
                )}{" "}
                {t("Opposite order")}
              </span>
              <span>
                {progress.experiments.includes("deadlock:ordered") ? (
                  <Check size={15} />
                ) : (
                  <span className="empty-check" />
                )}{" "}
                {t("Consistent order")}
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

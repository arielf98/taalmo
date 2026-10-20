"use client";
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
  const [mode, setMode] = useState<DeadlockConfig["mode"]>("opposite");
  const [victim, setVictim] = useState<TransactionId>("B");
  const [retryVictim, setRetryVictim] = useState(false);
  return (
    <Workspace wide>
      <div className="breadcrumb">
        <Link href={pathHref}>Database Transactions</Link>
        <ChevronRight size={13} />
        <Link href="/lessons/deadlock">Deadlock</Link>
        <ChevronRight size={13} />
        Sandbox
      </div>
      <div className="sandbox-heading">
        <div>
          <div className="inline-meta">
            <Badge>
              <FlaskConical size={12} /> INTERACTIVE LAB
            </Badge>
            <span className="small muted">Experiment 03</span>
          </div>
          <h1>Two locks. A circular wait.</h1>
          <p>
            A transfers $10 from X to Y. B transfers $20 from Y to X. Who gets
            the next lock?
          </p>
        </div>
        <Link className="text-link small" href="/lessons/deadlock">
          <BookOpen size={16} />
          Back to lesson
        </Link>
      </div>
      <div className="simulation-notice">
        <Info size={16} />
        <span>
          A deterministic two-transaction model, not a PostgreSQL server. Victim
          selection is a teaching control; real database victim selection and
          detection timing are not simulated.
        </span>
      </div>
      <div className="experiment-config">
        <div>
          <span className="control-label">LOCK STRATEGY</span>
          <div className="mode-toggle light">
            <button
              aria-pressed={mode === "opposite"}
              onClick={() => setMode("opposite")}
            >
              <AlertTriangle size={15} /> Opposite order
            </button>
            <button
              aria-pressed={mode === "ordered"}
              onClick={() => setMode("ordered")}
            >
              <ShieldCheck size={15} /> Consistent order
            </button>
          </div>
        </div>
        <label className="amount-control">
          <span className="control-label">DEADLOCK VICTIM</span>
          <select
            value={victim}
            disabled={mode === "ordered"}
            onChange={(e) => setVictim(e.target.value as TransactionId)}
          >
            <option value="A">Transaction A</option>
            <option value="B">Transaction B</option>
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
            Retry the aborted transaction once
            <small>
              Restart the full transaction after the survivor commits
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
  const cycle = deadlockCycle(state).length > 0;
  const nodes: Node[] = (["A", "B"] as const).map((id, index) => ({
    id,
    position: { x: index * 350, y: index * 120 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    draggable: false,
    ariaLabel: `Inspect transaction ${id}`,
    className: `system-node ${selected === id ? "node-selected" : ""}`,
    data: {
      label: (
        <div className="node-content">
          <div className="node-icon">
            <LockKeyhole size={23} />
          </div>
          <strong>Transaction {id}</strong>
          <span>
            {state.transactions[id].status} · attempt{" "}
            {state.transactions[id].attempt}
          </span>
          <small>
            holds: {heldRows(state, id)}
            <br />
            waits for: {state.transactions[id].waitingFor ?? "none"}
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
    ariaLabel: `${edge.from} waits for ${edge.to} on row ${edge.account}`,
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
      aria-label="Transaction wait-for graph"
    >
      <ReactFlow
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
          ? "CIRCULAR WAIT PRESENT"
          : "ARROW = WAITING TRANSACTION → LOCK OWNER"}
      </div>
    </div>
  );
}
function DeadlockExperiment({ config }: { config: DeadlockConfig }) {
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
              <h2>Wait-for graph</h2>
            </div>
            <Badge tone={cycle.length ? "amber" : "gray"}>
              {historyStep !== null
                ? `HISTORY · STEP ${historyStep}`
                : cycle.length
                  ? "A → B → A"
                  : "LIVE STATE"}
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
                Run simulation
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => execute(false)}
                disabled={finished || playing}
              >
                <SkipForward size={16} />
                Step forward
              </Button>
              {playing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPlaying(false)}
                >
                  <Square size={14} />
                  Pause
                </Button>
              )}
            </div>
            <div className="reset-controls">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Replay execution"
                title="Replay execution"
                onClick={replay}
                disabled={playing || sim.cursor === 0}
              >
                <Play size={17} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Reset experiment"
                title="Reset experiment"
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
              {sim.cursor} / {sim.scenario.events.length} events
            </span>
          </div>
          <div className="callback-strip">
            {(["A", "B"] as const).map((id) => (
              <div key={id}>
                <span className={`callback-tag callback-${id}`}>{id}</span>
                <span>Transaction {id}</span>
                <strong
                  className={`callback-status status-${state.transactions[id].status === "aborted" ? "failed" : state.transactions[id].status}`}
                >
                  {state.transactions[id].status}
                </strong>
              </div>
            ))}
          </div>
          <div className="node-inspector">
            <div>
              <span className="eyebrow">
                <LockKeyhole size={14} /> INSPECT: TRANSACTION {selected}
              </span>
              <select
                aria-label="Inspect transaction"
                value={selected}
                onChange={(e) => setSelected(e.target.value as TransactionId)}
              >
                <option value="A">Transaction A</option>
                <option value="B">Transaction B</option>
              </select>
            </div>
            <p>
              A moves $10 from X to Y; B moves $20 from Y to X. Pending changes
              are private to their transaction and disappear on rollback.
            </p>
            <dl className="state-values">
              <div>
                <dt>held row locks</dt>
                <dd>{heldRows(state, selected)}</dd>
              </div>
              <div>
                <dt>waiting for row</dt>
                <dd>{transaction.waitingFor ?? "none"}</dd>
              </div>
              <div>
                <dt>uncommitted values</dt>
                <dd>{stagedValues(state, selected)}</dd>
              </div>
              <div>
                <dt>attempt</dt>
                <dd>
                  {transaction.attempt} / {config.retryVictim ? 2 : 1} maximum
                </dd>
              </div>
            </dl>
          </div>
        </section>
        <section className="timeline-panel card">
          <div className="panel-heading">
            <div>
              <Terminal size={16} />
              <h2>Execution timeline</h2>
            </div>
            <span className="small muted">Logical order</span>
          </div>
          {sim.cursor === 0 ? (
            <div className="timeline-empty">
              <span className="feature-icon mint">
                <GitBranch size={23} />
              </span>
              <h3>A wait is not always a deadlock.</h3>
              <p>
                {config.mode === "opposite"
                  ? "Step until both transactions wait. Then inspect the cycle before the detector aborts a victim."
                  : "Observe B waiting for X while A can still proceed. A one-way wait does not form a cycle."}
              </p>
              <span className="code-hint">X = $100.00 · Y = $100.00</span>
            </div>
          ) : (
            <ol className="timeline-list">
              {sim.history.slice(1).map((snapshot) => (
                <li key={snapshot.step}>
                  <button
                    aria-label={`Inspect step ${snapshot.step}: ${snapshot.event!.label}`}
                    aria-pressed={view.step === snapshot.step}
                    className={view.step === snapshot.step ? "selected" : ""}
                    onClick={() => setHistoryStep(snapshot.step)}
                  >
                    <span className="timeline-step">
                      {String(snapshot.step).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="timeline-item-title">
                        <strong>{snapshot.event!.label}</strong>
                        <span
                          className={`callback-tag callback-${snapshot.event!.transaction}`}
                        >
                          {snapshot.event!.transaction}
                        </span>
                      </div>
                      <p>{snapshot.event!.detail}</p>
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
              Return to current state <ArrowRight size={14} />
            </button>
          )}
        </section>
      </div>
      <section className="state-section">
        <div className="section-heading compact">
          <div>
            <span className="eyebrow">
              LOCKS, PENDING WRITES, AND COMMITTED EFFECTS
            </span>
            <h2>Inspect the transaction boundary.</h2>
          </div>
          <div className="mode-toggle light small-tabs">
            <button aria-pressed={!raw} onClick={() => setRaw(false)}>
              <Database size={14} />
              Records
            </button>
            <button aria-pressed={raw} onClick={() => setRaw(true)}>
              <Code2 size={15} />
              Raw state
            </button>
          </div>
        </div>
        {historyStep !== null && (
          <p className="history-notice">
            <Info size={15} />
            Inspecting step {historyStep}. Balances and locks show that
            historical snapshot.
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
                  <h3>Accounts and row locks</h3>
                </div>
                <Badge tone="gray">COMMITTED BALANCES</Badge>
              </div>
              <div className="table-scroll">
                <table>
                  <caption className="sr-only">
                    Account balances and lock owners
                  </caption>
                  <thead>
                    <tr>
                      <th>ROW</th>
                      <th>BALANCE</th>
                      <th>LOCK OWNER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(["X", "Y"] as const).map((account) => (
                      <tr key={account}>
                        <td>{account}</td>
                        <td>{money(state.balances[account])}</td>
                        <td>{state.locks[account] ?? "none"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="table-footer">
                Total across both accounts{" "}
                <strong>{money(state.balances.X + state.balances.Y)}</strong>
              </div>
            </div>
            <div className="record-panel card">
              <div className="panel-heading">
                <div>
                  <BookOpen size={17} />
                  <h3>Committed transfers</h3>
                </div>
                <span className="record-count">{state.commits.length}</span>
              </div>
              <div className="table-scroll">
                <table>
                  <caption className="sr-only">
                    Successfully committed transfers
                  </caption>
                  <thead>
                    <tr>
                      <th>TX</th>
                      <th>TRANSFER</th>
                      <th>AMOUNT</th>
                      <th>ATTEMPT</th>
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
                <p className="table-empty">No committed transfers yet.</p>
              )}
              <div className="table-footer">
                Rollback keeps aborted transfers out of this table.
              </div>
            </div>
          </div>
        )}
      </section>
      <section className="node-inspector card" style={{ marginTop: 20 }}>
        <span className="eyebrow">
          <GitBranch size={14} /> CURRENT WAIT-FOR EDGES
        </span>
        <p>
          {waits.length
            ? waits
                .map(
                  (edge) => `${edge.from} → ${edge.to} (row ${edge.account})`,
                )
                .join(" · ")
            : "No transaction currently waits for another lock owner."}
        </p>
        <p>
          <strong>
            {cycle.length
              ? "Circular wait: A → B → A. Neither transaction can proceed."
              : waits.length
                ? "Waiting, without a cycle. The lock owner can still proceed."
                : "No circular wait in this snapshot."}
          </strong>
        </p>
        {state.detectedCycle.length > 0 && (
          <p className="small">
            Detector recorded: {state.detectedCycle.join(" → ")}. Victim:{" "}
            {state.victim ?? "not chosen yet"}. This historical record remains
            after the cycle is resolved.
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
              EXPERIMENT RESULT · {config.mode.toUpperCase()}
            </span>
            <h2>
              {result.outcome === "safe"
                ? "Waiting, without a deadlock."
                : result.outcome === "recovered"
                  ? "Deadlock recovered. Both transfers committed."
                  : result.outcome === "aborted"
                    ? "Deadlock detected. One transaction aborted."
                    : "The experiment did not finish cleanly."}
            </h2>
            <p>{result.explanation}</p>
            <div className="result-checks">
              <span>
                <Check size={15} />
                {result.completed} of 2 transfers committed
              </span>
              <span>
                {result.conserved ? (
                  <Check size={15} />
                ) : (
                  <AlertTriangle size={15} />
                )}
                Total balance: {money(result.total)}
              </span>
            </div>
            {config.mode === "opposite" && (
              <p className="result-next">
                <ArrowRight size={16} />
                Try{" "}
                {config.retryVictim
                  ? "Consistent order to prevent the cycle."
                  : "one full retry, then Consistent order to prevent the cycle."}
              </p>
            )}
          </div>
        </section>
      )}
      {saveError && (
        <p className="save-error" role="alert">
          Your browser could not save this experiment. Enable local storage to
          retain progress.
        </p>
      )}
      <section className="lab-reflection">
        <div>
          <span className="eyebrow">
            PREVENT THE CYCLE. RECOVER THE TRANSACTION.
          </span>
          <h2>Choose one lock order.</h2>
          <p>
            Both transactions lock X before Y, even when a transfer starts from
            Y. One may wait, but that wait does not form a cycle in this model.
          </p>
          <pre className="code-block">
            <code>
              {
                "BEGIN;\nSELECT id FROM accounts\nWHERE id = 'X' FOR UPDATE;\nSELECT id FROM accounts\nWHERE id = 'Y' FOR UPDATE;\n-- Apply both debit and credit here\nCOMMIT;"
              }
            </code>
          </pre>
          <p className="small">
            If a transaction is aborted, retry its entire business operation
            from the beginning, with a bounded policy. This model permits one
            retry after the survivor commits; it does not simulate timing,
            backoff, or real PostgreSQL victim selection.
          </p>
          <Link className="text-link small" href="/lessons/deadlock">
            <ArrowLeft size={14} />
            Revisit the concept
          </Link>
        </div>
        {learnedBoth ? (
          <Quiz {...deadlockQuiz} lab />
        ) : (
          <div className="quiz-unlock card">
            <ShieldCheck size={28} />
            <h3>Compare a cycle with a one-way wait.</h3>
            <p>
              Finish Opposite order and Consistent order in this lab to unlock
              the final checkpoint.
            </p>
            <div>
              <span>
                {progress.experiments.includes("deadlock:opposite") ? (
                  <Check size={15} />
                ) : (
                  <span className="empty-check" />
                )}{" "}
                Opposite order
              </span>
              <span>
                {progress.experiments.includes("deadlock:ordered") ? (
                  <Check size={15} />
                ) : (
                  <span className="empty-check" />
                )}{" "}
                Consistent order
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

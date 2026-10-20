"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  Info,
  Play,
  RotateCcw,
  Send,
  ShieldCheck,
  SkipForward,
  Square,
  Terminal,
  X,
} from "lucide-react";
import { createSimulation, advance, runToEnd } from "@/lib/simulation/engine";
import {
  paymentScenario,
  type Mode,
  type PaymentConfig,
} from "@/lib/simulation/payment";
import { useProgress } from "@/lib/progress";
import { labQuiz } from "@/content/lessons";
import { Architecture, nodeDescriptions } from "./architecture";
import { Workspace, Badge } from "./shell";
import { Button } from "./ui/button";
import { Quiz } from "./quiz";
const money = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    amount / 100,
  );

export function Sandbox() {
  const [mode, setMode] = useState<Mode>("unsafe");
  const [amount, setAmount] = useState(4900);
  const [failure, setFailure] = useState(false);
  return (
    <Workspace wide>
      <div className="breadcrumb">
        <Link href="/learn/database-transactions">Database Transactions</Link>
        <ChevronRight size={13} />
        <Link href="/lessons/duplicate-payment">
          Duplicate Payment Callback
        </Link>
        <ChevronRight size={13} />
        Sandbox
      </div>
      <div className="sandbox-heading">
        <div>
          <div className="inline-meta">
            <Badge>
              <FlaskConical size={12} /> INTERACTIVE LAB
            </Badge>
            <span className="small muted">Experiment 01</span>
          </div>
          <h1>One payment. Two callbacks.</h1>
          <p>
            A payment gateway retries the same notification. Can your system
            handle it?
          </p>
        </div>
        <Link className="text-link small" href="/lessons/duplicate-payment">
          <BookOpen size={16} />
          Back to lesson
        </Link>
      </div>
      <div className="simulation-notice">
        <Info size={16} />
        <span>
          This lab uses a deterministic, simulated database model. No real
          PostgreSQL server, payments, or measured runtime metrics.
        </span>
      </div>
      <div className="experiment-config">
        <div>
          <span className="control-label">PROCESSING MODE</span>
          <div className="mode-toggle light">
            <button
              aria-pressed={mode === "unsafe"}
              onClick={() => setMode("unsafe")}
            >
              <AlertTriangle size={15} /> Unsafe
            </button>
            <button
              aria-pressed={mode === "protected"}
              onClick={() => setMode("protected")}
            >
              <ShieldCheck size={15} /> Idempotent
            </button>
          </div>
        </div>
        <label className="amount-control">
          <span className="control-label">PAYMENT AMOUNT</span>
          <select
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          >
            <option value={4900}>$49.00 USD</option>
            <option value={9900}>$99.00 USD</option>
            <option value={14900}>$149.00 USD</option>
          </select>
        </label>
        <label
          className={`failure-control ${mode === "unsafe" ? "disabled" : ""}`}
        >
          <input
            type="checkbox"
            checked={mode === "protected" && failure}
            disabled={mode === "unsafe"}
            onChange={(e) => setFailure(e.target.checked)}
          />
          <span>
            Fail callback A before commit
            <small>
              {mode === "unsafe"
                ? "Available in idempotent mode"
                : "Observe rollback and callback B recovery"}
            </small>
          </span>
        </label>
      </div>
      <Experiment
        key={`${mode}-${amount}-${failure}`}
        config={{
          mode,
          amount,
          failBeforeCommit: mode === "protected" && failure,
        }}
      />
    </Workspace>
  );
}
function Experiment({ config }: { config: PaymentConfig }) {
  const [sim, setSim] = useState(() =>
    createSimulation(paymentScenario(config)),
  );
  const [playing, setPlaying] = useState(false);
  const [historyStep, setHistoryStep] = useState<number | null>(null);
  const [selectedNode, setSelectedNode] = useState("database");
  const [tab, setTab] = useState<"records" | "raw">("records");
  const [saveError, setSaveError] = useState(false);
  const { progress, experiment } = useProgress();
  const finished = sim.result !== null;
  const view =
    historyStep === null
      ? sim.history[sim.history.length - 1]
      : sim.history[historyStep];
  const state = view.state;
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      setSim((previous) => advance(previous));
      if (sim.cursor + 1 >= sim.scenario.events.length) setPlaying(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [playing, sim.cursor, sim.scenario.events.length]);
  // Persist only observed, completed experiments, including completion by stepping or replay.
  useEffect(() => {
    if (!sim.result) return;
    const ok = experiment(config.mode);
    if (!ok) window.dispatchEvent(new Event("taalmo-save-error"));
    // The completed run is the persistence trigger; the repository reads current progress at write time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sim.result, config.mode]);
  useEffect(() => {
    const listener = () => setSaveError(true);
    window.addEventListener("taalmo-save-error", listener);
    return () => window.removeEventListener("taalmo-save-error", listener);
  }, []);
  const reset = () => {
    setPlaying(false);
    setHistoryStep(null);
    setSim(createSimulation(paymentScenario(config)));
  };
  const run = () => {
    setPlaying(false);
    setHistoryStep(null);
    setSim((previous) => runToEnd(previous));
  };
  const replay = () => {
    setHistoryStep(null);
    setSim(createSimulation(paymentScenario(config)));
    setPlaying(true);
  };
  const learnedBoth =
    progress.experiments.includes("unsafe") &&
    progress.experiments.includes("protected");
  return (
    <>
      <div className="lab-grid">
        <section className="system-workspace">
          <div className="panel-heading">
            <div>
              <span className="status-dot" />
              <h2>System architecture</h2>
            </div>
            <Badge tone="gray">
              {historyStep === null
                ? "LIVE STATE"
                : `HISTORY · STEP ${historyStep}`}
            </Badge>
          </div>
          <Architecture
            state={state}
            active={view.event?.node}
            selected={selectedNode}
            onSelect={setSelectedNode}
          />
          <div className="execution-toolbar">
            <div className="run-controls">
              <Button onClick={run} disabled={finished || playing}>
                <Play size={15} fill="currentColor" />
                Run simulation
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setHistoryStep(null);
                  setSim((previous) => advance(previous));
                }}
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
                <span>Callback {id}</span>
                <strong
                  className={`callback-status status-${state.callbacks[id].status}`}
                >
                  {state.callbacks[id].status}
                </strong>
              </div>
            ))}
          </div>
          <div className="node-inspector">
            <div>
              <span className="eyebrow">
                <Database size={14} /> INSPECT:{" "}
                {selectedNode === "database"
                  ? "POSTGRESQL"
                  : selectedNode.toUpperCase()}
              </span>
              <select
                aria-label="Inspect system component"
                value={selectedNode}
                onChange={(e) => setSelectedNode(e.target.value)}
              >
                <option value="database">PostgreSQL</option>
                <option value="gateway">Payment Gateway</option>
                <option value="api">Backend API</option>
                <option value="ledger">Ledger</option>
                <option value="outbox">Transactional Outbox</option>
              </select>
            </div>
            <p>{nodeDescriptions[selectedNode]}</p>
            {selectedNode === "database" && (
              <dl className="state-values">
                <div>
                  <dt>processed</dt>
                  <dd>{String(state.processed)}</dd>
                </div>
                <div>
                  <dt>lock owner</dt>
                  <dd>{state.lockOwner ?? "none"}</dd>
                </div>
                <div>
                  <dt>unique key</dt>
                  <dd>{state.keys[0] ?? "not committed"}</dd>
                </div>
                <div>
                  <dt>staged transaction</dt>
                  <dd>{Object.keys(state.staged).join(", ") || "none"}</dd>
                </div>
              </dl>
            )}
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
                <Play size={22} />
              </span>
              <h3>Ready when you are.</h3>
              <p>
                Run the simulation or move one event at a time. Every state
                change will appear here.
              </p>
              <span className="code-hint">payment_id: pay_1042</span>
            </div>
          ) : (
            <ol className="timeline-list">
              {sim.history.slice(1).map((snapshot) => (
                <li key={snapshot.step}>
                  <button
                    className={view.step === snapshot.step ? "selected" : ""}
                    aria-label={`Inspect step ${snapshot.step}: ${snapshot.event!.label}`}
                    aria-pressed={view.step === snapshot.step}
                    onClick={() => setHistoryStep(snapshot.step)}
                  >
                    <span className="timeline-step">
                      {String(snapshot.step).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="timeline-item-title">
                        <strong>{snapshot.event!.label}</strong>
                        <span
                          className={`callback-tag callback-${snapshot.event!.callback}`}
                        >
                          {snapshot.event!.callback}
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
            <span className="eyebrow">NOTHING HIDDEN UNDER THE HOOD</span>
            <h2>Inspect the evidence.</h2>
          </div>
          <div className="mode-toggle light small-tabs">
            <button
              aria-pressed={tab === "records"}
              onClick={() => setTab("records")}
            >
              <Database size={14} />
              Records
            </button>
            <button aria-pressed={tab === "raw"} onClick={() => setTab("raw")}>
              <Code2 size={15} />
              Raw state
            </button>
          </div>
        </div>
        {historyStep !== null && (
          <p className="history-notice">
            <Info size={15} />
            Inspecting step {historyStep}. Tables show the state at that point
            in the execution.
          </p>
        )}
        {tab === "raw" ? (
          <pre className="code-block raw-state">
            {JSON.stringify(state, null, 2)}
          </pre>
        ) : (
          <div className="state-grid">
            <div className="record-panel card">
              <div className="panel-heading">
                <div>
                  <BookOpen size={17} />
                  <h3>Ledger entries</h3>
                </div>
                <span
                  data-testid="ledger-count"
                  className={`record-count ${state.ledger.length > 1 ? "danger-count" : ""}`}
                >
                  {state.ledger.length}
                </span>
              </div>
              <div className="table-scroll">
                <table>
                  <caption className="sr-only">
                    Committed ledger entries
                  </caption>
                  <thead>
                    <tr>
                      <th>ENTRY</th>
                      <th>PAYMENT</th>
                      <th>AMOUNT</th>
                      <th>VIA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.ledger.map((e) => (
                      <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.paymentId}</td>
                        <td>{money(e.amount)}</td>
                        <td>
                          <span
                            className={`callback-tag callback-${e.callback}`}
                          >
                            {e.callback}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!state.ledger.length && (
                <p className="table-empty">No committed entries yet.</p>
              )}
              <div className="table-footer">
                Total credited{" "}
                <strong>
                  {money(state.ledger.reduce((n, e) => n + e.amount, 0))}
                </strong>
              </div>
            </div>
            <div className="record-panel card">
              <div className="panel-heading">
                <div>
                  <Send size={17} />
                  <h3>Outbox events</h3>
                </div>
                <span className="record-count" data-testid="outbox-count">
                  {state.outbox.length}
                </span>
              </div>
              <div className="table-scroll">
                <table>
                  <caption className="sr-only">Committed outbox events</caption>
                  <thead>
                    <tr>
                      <th>EVENT</th>
                      <th>TYPE</th>
                      <th>VIA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.outbox.map((e) => (
                      <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.type}</td>
                        <td>
                          <span
                            className={`callback-tag callback-${e.callback}`}
                          >
                            {e.callback}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!state.outbox.length && (
                <p className="table-empty">No committed events yet.</p>
              )}
              <div className="table-footer">
                Delivery <span>Not simulated · pending publisher</span>
              </div>
            </div>
          </div>
        )}
      </section>
      <div aria-live="polite">
        {sim.result && historyStep === null && (
          <section
            className={`result-card ${sim.result.outcome === "safe" ? "result-safe" : "result-unsafe"}`}
          >
            <span className="result-icon">
              {sim.result.outcome === "safe" ? (
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
                {sim.result.outcome === "safe"
                  ? "One payment. One effect."
                  : "Duplicate payment detected"}
              </h2>
              <p>{sim.result.explanation}</p>
              <div className="result-checks">
                <span>
                  {state.ledger.length === 1 ? (
                    <Check size={15} />
                  ) : (
                    <X size={15} />
                  )}{" "}
                  One ledger entry
                </span>
                <span>
                  {state.outbox.length === 1 ? (
                    <Check size={15} />
                  ) : (
                    <X size={15} />
                  )}{" "}
                  One outbox event
                </span>
                <span>
                  {state.keys.length === 1 ? (
                    <Check size={15} />
                  ) : (
                    <X size={15} />
                  )}{" "}
                  Atomic idempotency key
                </span>
              </div>
              {config.mode === "unsafe" && (
                <p className="result-next">
                  <ArrowRight size={16} /> Switch to Idempotent above, then run
                  the same experiment.
                </p>
              )}
            </div>
          </section>
        )}
      </div>
      {saveError && (
        <p className="save-error" role="alert">
          Your browser could not save this experiment. Enable local storage to
          retain your progress.
        </p>
      )}
      <section className="lab-reflection">
        <div>
          <span className="eyebrow">MAKE THE UNDERSTANDING STICK</span>
          <h2>What changed?</h2>
          <p>
            Compare both processing modes, then explain why the protected
            version works.
          </p>
          <ul>
            <li>Where did the unsafe callbacks read the same old state?</li>
            <li>What happens to the competing unique-key insert?</li>
            <li>What survives when a transaction rolls back?</li>
          </ul>
          <Link className="text-link small" href="/lessons/duplicate-payment">
            <ArrowLeft size={14} /> Revisit the concept
          </Link>
        </div>
        {learnedBoth ? (
          <Quiz {...labQuiz} lab />
        ) : (
          <div className="quiz-unlock card">
            <ShieldCheck size={28} />
            <h3>Explore both sides first.</h3>
            <p>
              Complete an unsafe run and an idempotent run to unlock your final
              checkpoint.
            </p>
            <div>
              <span>
                {progress.experiments.includes("unsafe") ? (
                  <Check size={15} />
                ) : (
                  <span className="empty-check" />
                )}{" "}
                Unsafe experiment
              </span>
              <span>
                {progress.experiments.includes("protected") ? (
                  <Check size={15} />
                ) : (
                  <span className="empty-check" />
                )}{" "}
                Idempotent experiment
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

"use client";
import { useLocale } from "@/lib/locale";

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
import { labQuiz, pathHref } from "@/content/lessons";
import { Architecture, nodeDescriptions } from "./architecture";
import { Workspace, Badge } from "./shell";
import { Button } from "./ui/button";
import { Quiz } from "./quiz";
const money = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    amount / 100,
  );

export function Sandbox() {
  const { t } = useLocale();

  const [mode, setMode] = useState<Mode>("unsafe");
  const [amount, setAmount] = useState(4900);
  const [failure, setFailure] = useState(false);
  return (
    <Workspace wide>
      <div className="breadcrumb">
        <Link href={pathHref}>{t("Database Engineering")}</Link>
        <ChevronRight size={13} />
        <Link href="/lessons/duplicate-payment">
          {t("Duplicate Payment Callback")}
        </Link>
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
            <span className="small muted">{t("Experiment 01")}</span>
          </div>
          <h1>{t("One payment. Two callbacks.")}</h1>
          <p>
            {t(
              "A payment gateway retries the same notification. Can your system handle it?",
            )}
          </p>
        </div>
        <Link className="text-link small" href="/lessons/duplicate-payment">
          <BookOpen size={16} />
          {t("Back to lesson")}
        </Link>
      </div>
      <div className="simulation-notice">
        <Info size={16} />
        <span>
          {t(
            "This lab uses a deterministic, simulated database model. No real PostgreSQL server, payments, or measured runtime metrics.",
          )}
        </span>
      </div>
      <div className="experiment-config">
        <div>
          <span className="control-label">{t("PROCESSING MODE")}</span>
          <div className="mode-toggle light">
            <button
              aria-pressed={mode === "unsafe"}
              onClick={() => setMode("unsafe")}
            >
              <AlertTriangle size={15} />
              {t(" Unsafe")}
            </button>
            <button
              aria-pressed={mode === "protected"}
              onClick={() => setMode("protected")}
            >
              <ShieldCheck size={15} />
              {t(" Idempotent")}
            </button>
          </div>
        </div>
        <label className="amount-control">
          <span className="control-label">{t("PAYMENT AMOUNT")}</span>
          <select
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          >
            <option value={4900}>{t("$49.00 USD")}</option>
            <option value={9900}>{t("$99.00 USD")}</option>
            <option value={14900}>{t("$149.00 USD")}</option>
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
            {t("Fail callback A before commit")}
            <small>
              {mode === "unsafe"
                ? t("Available in idempotent mode")
                : t("Observe rollback and callback B recovery")}
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
  const { t } = useLocale();

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
              <h2>{t("System architecture")}</h2>
            </div>
            <Badge tone="gray">
              {historyStep === null
                ? t("LIVE STATE")
                : t("HISTORY · STEP {0}", [historyStep])}
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
                {t("Run simulation")}
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
                  {t("Callback ")}
                  {id}
                </span>
                <strong
                  className={`callback-status status-${state.callbacks[id].status}`}
                >
                  {t(state.callbacks[id].status)}
                </strong>
              </div>
            ))}
          </div>
          <div className="node-inspector">
            <div>
              <span className="eyebrow">
                <Database size={14} />
                {t(" INSPECT:")}{" "}
                {selectedNode === "database"
                  ? t("POSTGRESQL")
                  : t(selectedNode).toUpperCase()}
              </span>
              <select
                aria-label={t("Inspect system component")}
                value={selectedNode}
                onChange={(e) => setSelectedNode(e.target.value)}
              >
                <option value="database">{t("PostgreSQL")}</option>
                <option value="gateway">{t("Payment Gateway")}</option>
                <option value="api">{t("Backend API")}</option>
                <option value="ledger">{t("Ledger")}</option>
                <option value="outbox">{t("Transactional Outbox")}</option>
              </select>
            </div>
            <p>{t(nodeDescriptions[selectedNode])}</p>
            {selectedNode === "database" && (
              <dl className="state-values">
                <div>
                  <dt>{t("processed")}</dt>
                  <dd>{String(state.processed)}</dd>
                </div>
                <div>
                  <dt>{t("lock owner")}</dt>
                  <dd>{state.lockOwner ?? t("none")}</dd>
                </div>
                <div>
                  <dt>{t("unique key")}</dt>
                  <dd>{state.keys[0] ?? t("not committed")}</dd>
                </div>
                <div>
                  <dt>{t("staged transaction")}</dt>
                  <dd>{Object.keys(state.staged).join(", ") || t("none")}</dd>
                </div>
              </dl>
            )}
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
                <Play size={22} />
              </span>
              <h3>{t("Ready when you are.")}</h3>
              <p>
                {t(
                  "Run the simulation or move one event at a time. Every state change will appear here.",
                )}
              </p>
              <span className="code-hint">{t("payment_id: pay_1042")}</span>
            </div>
          ) : (
            <ol className="timeline-list">
              {sim.history.slice(1).map((snapshot) => (
                <li key={snapshot.step}>
                  <button
                    className={view.step === snapshot.step ? "selected" : ""}
                    aria-label={t("Inspect step {0}: {1}", [
                      snapshot.step,
                      snapshot.event!.label,
                    ])}
                    aria-pressed={view.step === snapshot.step}
                    onClick={() => setHistoryStep(snapshot.step)}
                  >
                    <span className="timeline-step">
                      {String(snapshot.step).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="timeline-item-title">
                        <strong>{t(snapshot.event!.label)}</strong>
                        <span
                          className={`callback-tag callback-${snapshot.event!.callback}`}
                        >
                          {snapshot.event!.callback}
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
              {t("NOTHING HIDDEN UNDER THE HOOD")}
            </span>
            <h2>{t("Inspect the evidence.")}</h2>
          </div>
          <div className="mode-toggle light small-tabs">
            <button
              aria-pressed={tab === "records"}
              onClick={() => setTab("records")}
            >
              <Database size={14} />
              {t("Records")}
            </button>
            <button aria-pressed={tab === "raw"} onClick={() => setTab("raw")}>
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
            {t(". Tables show the state at that point in the execution.")}
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
                  <h3>{t("Ledger entries")}</h3>
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
                    {t("Committed ledger entries")}
                  </caption>
                  <thead>
                    <tr>
                      <th>{t("ENTRY")}</th>
                      <th>{t("PAYMENT")}</th>
                      <th>{t("AMOUNT")}</th>
                      <th>{t("VIA")}</th>
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
                <p className="table-empty">{t("No committed entries yet.")}</p>
              )}
              <div className="table-footer">
                {t("Total credited")}{" "}
                <strong>
                  {money(state.ledger.reduce((n, e) => n + e.amount, 0))}
                </strong>
              </div>
            </div>
            <div className="record-panel card">
              <div className="panel-heading">
                <div>
                  <Send size={17} />
                  <h3>{t("Outbox events")}</h3>
                </div>
                <span className="record-count" data-testid="outbox-count">
                  {state.outbox.length}
                </span>
              </div>
              <div className="table-scroll">
                <table>
                  <caption className="sr-only">
                    {t("Committed outbox events")}
                  </caption>
                  <thead>
                    <tr>
                      <th>{t("EVENT")}</th>
                      <th>{t("TYPE")}</th>
                      <th>{t("VIA")}</th>
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
                <p className="table-empty">{t("No committed events yet.")}</p>
              )}
              <div className="table-footer">
                {t("Delivery ")}
                <span>{t("Not simulated · pending publisher")}</span>
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
                {t("EXPERIMENT RESULT · ")}
                {t(config.mode).toUpperCase()}
              </span>
              <h2>
                {sim.result.outcome === "safe"
                  ? t("One payment. One effect.")
                  : t("Duplicate payment detected")}
              </h2>
              <p>{t(sim.result.explanation)}</p>
              <div className="result-checks">
                <span>
                  {state.ledger.length === 1 ? (
                    <Check size={15} />
                  ) : (
                    <X size={15} />
                  )}{" "}
                  {t("One ledger entry")}
                </span>
                <span>
                  {state.outbox.length === 1 ? (
                    <Check size={15} />
                  ) : (
                    <X size={15} />
                  )}{" "}
                  {t("One outbox event")}
                </span>
                <span>
                  {state.keys.length === 1 ? (
                    <Check size={15} />
                  ) : (
                    <X size={15} />
                  )}{" "}
                  {t("Atomic idempotency key")}
                </span>
              </div>
              {config.mode === "unsafe" && (
                <p className="result-next">
                  <ArrowRight size={16} />
                  {t(
                    " Switch to Idempotent above, then run the same experiment.",
                  )}
                </p>
              )}
            </div>
          </section>
        )}
      </div>
      {saveError && (
        <p className="save-error" role="alert">
          {t(
            "Your browser could not save this experiment. Enable local storage to retain your progress.",
          )}
        </p>
      )}
      <section className="lab-reflection">
        <div>
          <span className="eyebrow">{t("MAKE THE UNDERSTANDING STICK")}</span>
          <h2>{t("What changed?")}</h2>
          <p>
            {t(
              "Compare both processing modes, then explain why the protected version works.",
            )}
          </p>
          <ul>
            <li>
              {t("Where did the unsafe callbacks read the same old state?")}
            </li>
            <li>{t("What happens to the competing unique-key insert?")}</li>
            <li>{t("What survives when a transaction rolls back?")}</li>
          </ul>
          <Link className="text-link small" href="/lessons/duplicate-payment">
            <ArrowLeft size={14} />
            {t(" Revisit the concept")}
          </Link>
        </div>
        {learnedBoth ? (
          <Quiz {...labQuiz} lab />
        ) : (
          <div className="quiz-unlock card">
            <ShieldCheck size={28} />
            <h3>{t("Explore both sides first.")}</h3>
            <p>
              {t(
                "Complete an unsafe run and an idempotent run to unlock your final checkpoint.",
              )}
            </p>
            <div>
              <span>
                {progress.experiments.includes("unsafe") ? (
                  <Check size={15} />
                ) : (
                  <span className="empty-check" />
                )}{" "}
                {t("Unsafe experiment")}
              </span>
              <span>
                {progress.experiments.includes("protected") ? (
                  <Check size={15} />
                ) : (
                  <span className="empty-check" />
                )}{" "}
                {t("Idempotent experiment")}
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

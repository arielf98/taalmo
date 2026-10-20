"use client";
import { useLocale, localizedFlowLabels } from "@/lib/locale";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
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
  Info,
  Play,
  RotateCcw,
  Server,
  ShieldCheck,
  SkipForward,
  Square,
  Terminal,
} from "lucide-react";
import { advance, createSimulation, runToEnd } from "@/lib/simulation/engine";
import {
  lostUpdateScenario,
  type LostUpdateConfig,
  type LostUpdateState,
  type RequestId,
} from "@/lib/simulation/lost-update";
import { lostUpdateQuiz, pathHref } from "@/content/lessons";
import { useProgress } from "@/lib/progress";
import { Badge, Workspace } from "./shell";
import { Button } from "./ui/button";
import { Quiz } from "./quiz";
const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value / 100,
  );

export function LostUpdateSandbox() {
  const { t } = useLocale();

  const [mode, setMode] = useState<LostUpdateConfig["mode"]>("unsafe");
  const [order, setOrder] = useState<LostUpdateConfig["order"]>("A-first");
  const [initialBalance, setInitialBalance] = useState(10000);
  return (
    <Workspace wide>
      <div className="breadcrumb">
        <Link href={pathHref}>{t("Database Transactions")}</Link>
        <ChevronRight size={13} />
        <Link href="/lessons/lost-update">{t("Lost Update")}</Link>
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
            <span className="small muted">{t("Experiment 02")}</span>
          </div>
          <h1>{t("Two updates. One missing change.")}</h1>
          <p>
            {t(
              "Request A adds $20. Request B adds $30. Will both changes survive?",
            )}
          </p>
        </div>
        <Link className="text-link small" href="/lessons/lost-update">
          <BookOpen size={16} />
          {t("Back to lesson")}
        </Link>
      </div>
      <div className="simulation-notice">
        <Info size={16} />
        <span>
          {t(
            "This deterministic simulation models same-row updates at Read Committed. Balances use integer cents; no real PostgreSQL server, money movement, or measured runtime performance is involved.",
          )}
        </span>
      </div>
      <div className="experiment-config">
        <div>
          <span className="control-label">{t("UPDATE STRATEGY")}</span>
          <div className="mode-toggle light">
            <button
              aria-pressed={mode === "unsafe"}
              onClick={() => setMode("unsafe")}
            >
              <AlertTriangle size={15} />
              {t(" Unsafe")}
            </button>
            <button
              aria-pressed={mode === "atomic"}
              onClick={() => setMode("atomic")}
            >
              <ShieldCheck size={15} />
              {t(" Atomic increment")}
            </button>
          </div>
        </div>
        <label className="amount-control">
          <span className="control-label">{t("INITIAL BALANCE")}</span>
          <select
            value={initialBalance}
            onChange={(e) => setInitialBalance(Number(e.target.value))}
          >
            <option value={10000}>{t("$100.00 USD")}</option>
            <option value={20000}>{t("$200.00 USD")}</option>
          </select>
        </label>
        <label className="amount-control">
          <span className="control-label">{t("WRITE ORDER")}</span>
          <select
            value={order}
            onChange={(e) =>
              setOrder(e.target.value as LostUpdateConfig["order"])
            }
          >
            <option value="A-first">{t("A then B")}</option>
            <option value="B-first">{t("B then A")}</option>
          </select>
        </label>
      </div>
      <LostUpdateExperiment
        key={`${mode}-${order}-${initialBalance}`}
        config={{
          mode,
          order,
          initialBalance,
          increments: { A: 2000, B: 3000 },
        }}
      />
    </Workspace>
  );
}
function LostUpdateDiagram({
  state,
  selected,
  onSelect,
  active,
}: {
  state: LostUpdateState;
  selected: string;
  onSelect: (id: string) => void;
  active?: RequestId;
}) {
  const { t } = useLocale();

  const requests: Node[] = (["A", "B"] as const).map((id, index) => ({
    id,
    position: { x: 0, y: index * 230 },
    sourcePosition: Position.Right,
    draggable: false,
    ariaLabel: t("Inspect request {0}", [id]),
    className: `system-node ${selected === id ? "node-selected" : ""}`,
    data: {
      label: (
        <div className="node-content">
          <div className="node-icon node-icon-api">
            <Server size={23} />
          </div>
          <strong>
            {t("Request ")}
            {id}
          </strong>
          <span>
            {t("Add ")}
            {id === "A" ? "$20.00" : "$30.00"}
          </span>
          <small>
            {t(state.requests[id].status)}
            <br />
            {t("read:")}{" "}
            {state.requests[id].readBalance === null
              ? t("not read")
              : money(state.requests[id].readBalance)}
          </small>
        </div>
      ),
    },
  }));
  const row: Node = {
    id: "row",
    position: { x: 320, y: 115 },
    targetPosition: Position.Left,
    draggable: false,
    ariaLabel: t("Inspect account row"),
    className: `system-node ${selected === "row" ? "node-selected" : ""}`,
    data: {
      label: (
        <div className="node-content">
          <div className="node-icon">
            <Database size={23} />
          </div>
          <strong>{t("Account row")}</strong>
          <span>
            {t("Committed balance: ")}
            {money(state.balance)}
          </span>
          <small>
            {state.lockOwner
              ? t("Lock held by {0}", [state.lockOwner])
              : t("No row lock held")}
          </small>
        </div>
      ),
    },
  };
  const edges: Edge[] = (["A", "B"] as const).map((id) => ({
    id: `${id}-row`,
    source: id,
    target: "row",
    type: "smoothstep",
    animated: active === id,
    label: t("request {0}", [id]),
    style: { stroke: active === id ? "#9de9d8" : "#637a7b", strokeWidth: 1.5 },
    labelStyle: { fill: "#b7c9c4", fontSize: 11 },
    labelBgStyle: { fill: "#172d35" },
  }));
  return (
    <div
      className="architecture"
      role="region"
      aria-label={t("Interactive account update architecture")}
    >
      <ReactFlow
        ariaLabelConfig={localizedFlowLabels(t)}
        nodes={[...requests, row]}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.3}
        maxZoom={1.4}
        zoomOnScroll={false}
        panOnScroll
        nodesConnectable={false}
        onNodeClick={(_, node) => onSelect(node.id)}
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="#385359"
          gap={19}
          size={1}
        />
        <Controls showInteractive={false} />
      </ReactFlow>
      <div className="diagram-caption">
        <span className="status-dot" />
        {t(" SIMULATED ENVIRONMENT")}
      </div>
    </div>
  );
}
function LostUpdateExperiment({ config }: { config: LostUpdateConfig }) {
  const { t } = useLocale();

  const [sim, setSim] = useState(() =>
    createSimulation(lostUpdateScenario(config)),
  );
  const [playing, setPlaying] = useState(false);
  const [historyStep, setHistoryStep] = useState<number | null>(null);
  const [selected, setSelected] = useState("row");
  const [raw, setRaw] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const { progress, experiment } = useProgress();
  const experimentId = `lost-update:${config.mode}` as const;
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
  const expected =
    config.initialBalance + config.increments.A + config.increments.B;
  const execute = (all: boolean) => {
    setHistoryStep(null);
    setPlaying(false);
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
    progress.experiments.includes("lost-update:unsafe") &&
    progress.experiments.includes("lost-update:atomic");
  const request =
    selected === "A" || selected === "B" ? state.requests[selected] : null;
  return (
    <>
      <div className="lab-grid">
        <section className="system-workspace">
          <div className="panel-heading">
            <div>
              <span className="status-dot" />
              <h2>{t("Concurrent account updates")}</h2>
            </div>
            <Badge tone="gray">
              {historyStep === null
                ? t("LIVE STATE")
                : t("HISTORY · STEP {0}", [historyStep])}
            </Badge>
          </div>
          <LostUpdateDiagram
            state={state}
            selected={selected}
            onSelect={setSelected}
            active={view.event?.request}
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
                  {t("Request ")}
                  {id}
                </span>
                <strong
                  className={`callback-status status-${state.requests[id].status}`}
                >
                  {t(state.requests[id].status)}
                </strong>
              </div>
            ))}
          </div>
          <div className="node-inspector">
            <div>
              <span className="eyebrow">
                <Database size={14} />
                {t(" INSPECT:")}{" "}
                {selected === "row"
                  ? t("ACCOUNT ROW")
                  : t("REQUEST {0}", [selected])}
              </span>
              <select
                aria-label={t("Inspect system component")}
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value="row">{t("Account row")}</option>
                <option value="A">{t("Request A")}</option>
                <option value="B">{t("Request B")}</option>
              </select>
            </div>
            <p>
              {selected === "row"
                ? t(
                    "Only committed writes change the shared balance below. In atomic mode a waiting request cannot increment the row until the current lock owner commits.",
                  )
                : t(
                    "Compare the value this request read with the current committed balance. A replacement computed from an old read can discard another request’s increment.",
                  )}
            </p>
            <dl className="state-values">
              <div>
                <dt>{t("committed balance")}</dt>
                <dd>{money(state.balance)}</dd>
              </div>
              <div>
                <dt>{t("lock owner")}</dt>
                <dd>{state.lockOwner ?? t("none")}</dd>
              </div>
              {request && (
                <>
                  <div>
                    <dt>
                      {t("value read by ")}
                      {selected}
                    </dt>
                    <dd>
                      {request.readBalance === null
                        ? t("not read")
                        : money(request.readBalance)}
                    </dd>
                  </div>
                  <div>
                    <dt>
                      {request.status === "staged"
                        ? t("uncommitted balance")
                        : t("calculated replacement")}
                    </dt>
                    <dd>
                      {request.proposedBalance === null
                        ? t("not calculated")
                        : money(request.proposedBalance)}
                    </dd>
                  </div>
                </>
              )}
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
                <Play size={22} />
              </span>
              <h3>{t("Watch the overlap.")}</h3>
              <p>
                {t(
                  "Step through both requests. Compare their read values before either writes.",
                )}
              </p>
              <span className="code-hint">{t("account_id: acct_01")}</span>
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
                          className={`callback-tag callback-${snapshot.event!.request}`}
                        >
                          {snapshot.event!.request}
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
              {t("READS, WRITES, AND WHAT SURVIVES")}
            </span>
            <h2>{t("Follow the balance.")}</h2>
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
            {t(". These are historical values.")}
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
                  <h3>{t("Shared account")}</h3>
                </div>
                <Badge tone="gray">{t("acct_01")}</Badge>
              </div>
              <dl className="balance-summary">
                <div>
                  <dt>{t("Current committed balance")}</dt>
                  <dd>{money(state.balance)}</dd>
                </div>
                <div>
                  <dt>{t("Expected after both increments")}</dt>
                  <dd>{money(expected)}</dd>
                </div>
              </dl>
              <div className="table-footer">
                {t("Initial balance ")}
                <strong>{money(config.initialBalance)}</strong>
              </div>
            </div>
            <div className="record-panel card">
              <div className="panel-heading">
                <div>
                  <BookOpen size={17} />
                  <h3>{t("Committed writes")}</h3>
                </div>
                <span className="record-count">{state.writes.length}</span>
              </div>
              <div className="table-scroll">
                <table>
                  <caption className="sr-only">
                    {t("Committed account updates")}
                  </caption>
                  <thead>
                    <tr>
                      <th>{t("REQUEST")}</th>
                      <th>{t("BEFORE")}</th>
                      <th>{t("AFTER")}</th>
                      <th>{t("INTENDED ADD")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.writes.map((write) => (
                      <tr key={write.request}>
                        <td>
                          <span
                            className={`callback-tag callback-${write.request}`}
                          >
                            {write.request}
                          </span>
                        </td>
                        <td>{money(write.before)}</td>
                        <td>{money(write.after)}</td>
                        <td>+{money(write.increment)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {!state.writes.length && (
                <p className="table-empty">{t("No committed writes yet.")}</p>
              )}
              <div className="table-footer">
                {t("Two successful writes can still lose an update.")}
              </div>
            </div>
          </div>
        )}
      </section>
      {sim.result && historyStep === null && (
        <section
          aria-live="polite"
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
                ? t("Both updates preserved.")
                : t("An update was lost.")}
            </h2>
            <p>
              <strong>
                {t("Expected ")}
                {money(sim.result.expected)}
                {t(". Actual")} {money(sim.result.actual)}.
              </strong>
              {sim.result.lostAmount > 0 &&
                t(" Missing increment: {0}.", [money(sim.result.lostAmount)])}
            </p>
            <p>{t(sim.result.explanation)}</p>
            {config.mode === "unsafe" && (
              <p className="result-next">
                <ArrowRight size={16} />
                {t(
                  "Reverse the write order, then try Atomic increment and compare.",
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
          <span className="eyebrow">{t("FROM REPLACEMENT TO OPERATION")}</span>
          <h2>{t("Let the database do the addition.")}</h2>
          <p>
            {t(
              "An atomic UPDATE changes the current row. A stale replacement just repeats a calculation made earlier.",
            )}
          </p>
          <pre className="code-block">
            <code>
              {config.mode === "atomic"
                ? "BEGIN ISOLATION LEVEL READ COMMITTED;\nUPDATE accounts\nSET balance_cents = balance_cents + 2000\nWHERE id = 'acct_01';\nCOMMIT;"
                : `-- Client previously read ${config.initialBalance}\nUPDATE accounts\nSET balance_cents = ${config.initialBalance + config.increments.A}\nWHERE id = 'acct_01';`}
            </code>
          </pre>
          <p className="small">
            {t(
              "Conceptual SQL for request A. Atomic increments prevent lost updates; deduplicating retries is a separate problem.",
            )}
          </p>
          <Link className="text-link small" href="/lessons/lost-update">
            <ArrowLeft size={14} />
            {t("Revisit the concept")}
          </Link>
        </div>
        {learnedBoth ? (
          <Quiz {...lostUpdateQuiz} lab />
        ) : (
          <div className="quiz-unlock card">
            <ShieldCheck size={28} />
            <h3>{t("Explore both update strategies.")}</h3>
            <p>
              {t(
                "Finish an unsafe run and an atomic increment run in this lab to unlock the final checkpoint.",
              )}
            </p>
            <div>
              <span>
                {progress.experiments.includes("lost-update:unsafe") ? (
                  <Check size={15} />
                ) : (
                  <span className="empty-check" />
                )}{" "}
                {t("Unsafe experiment")}
              </span>
              <span>
                {progress.experiments.includes("lost-update:atomic") ? (
                  <Check size={15} />
                ) : (
                  <span className="empty-check" />
                )}{" "}
                {t("Atomic increment experiment")}
              </span>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

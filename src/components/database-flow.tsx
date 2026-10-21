"use client";

import { useId, useState } from "react";
import {
  Background,
  Controls,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type Node,
} from "@xyflow/react";
import {
  databaseFlows,
  type DatabaseFlowTopic,
} from "@/content/database/flows";
import { Button } from "./ui/button";
import styles from "./database-flow.module.css";

const topics: { id: DatabaseFlowTopic; label: string }[] = [
  { id: "overview", label: "Alur dasar" },
  { id: "relations", label: "Relasi tabel" },
  { id: "query", label: "Cara query bekerja" },
];

export function DatabaseFlowExplorer({ topic }: { topic?: DatabaseFlowTopic }) {
  const [selectedTopic, setSelectedTopic] = useState<DatabaseFlowTopic>("overview");
  const activeTopic = topic ?? selectedTopic;
  const titleId = useId();
  return (
    <section
      className={`card ${styles.explorer}`}
      lang="id"
      aria-labelledby={titleId}
    >
      <span className="eyebrow">PAHAMI LEWAT ALUR VISUAL</span>
      <h2 id={titleId}>{databaseFlows[activeTopic].title}</h2>
      {!topic && (
        <div
          className={styles.actions}
          role="group"
          aria-label="Pilih topik diagram"
        >
          {topics.map((item) => (
            <Button
              key={item.id}
              variant={activeTopic === item.id ? "default" : "outline"}
              aria-pressed={activeTopic === item.id}
              onClick={() => setSelectedTopic(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      )}
      <DatabaseFlowWalkthrough key={activeTopic} topic={activeTopic} />
    </section>
  );
}

function DatabaseFlowWalkthrough({ topic }: { topic: DatabaseFlowTopic }) {
  const [step, setStep] = useState(0);
  const detailId = useId();
  const flow = databaseFlows[topic];
  const activeStep = flow.steps[step];
  const nodes: Node[] = flow.steps.map((item, index) => ({
    id: String(index),
    position: {
      x: (index < 3 ? index : 5 - index) * 275,
      y: index < 3 ? 0 : 180,
    },
    sourcePosition:
      index === 2 ? Position.Bottom : index > 2 ? Position.Left : Position.Right,
    targetPosition:
      index === 3 ? Position.Top : index > 3 ? Position.Right : Position.Left,
    className: index === step ? "node-active" : "",
    data: {
      label: (
        <button
          type="button"
          className={`nodrag nopan ${styles.nodeButton}`}
          aria-pressed={index === step}
          aria-controls={detailId}
        >
          <span className={styles.number}>{index + 1}</span>
          <strong>{item.title}</strong>
          <span>{item.subtitle}</span>
        </button>
      ),
    },
  }));
  const edges: Edge[] = flow.steps.slice(1).map((item, index) => ({
    id: `${index}-${index + 1}`,
    source: String(index),
    target: String(index + 1),
    type: "smoothstep",
    label: item.connection,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#a1dfc8" },
    style: { stroke: "#a1dfc8", strokeWidth: step === index + 1 ? 3 : 1.5 },
    labelStyle: { fill: "#e4eeea", fontSize: 12 },
    labelBgStyle: { fill: "#172d35" },
  }));
  return (
    <>
      <p>{flow.description}</p>
      <p className="small muted">
        Klik kotak untuk membaca penjelasan, atau ikuti tombol langkah di bawah.
        Diagram bisa digeser dan diperbesar; daftar langkah juga bisa dipakai
        dengan keyboard.
      </p>
      <div
        className={`architecture ${styles.diagram}`}
        role="region"
        aria-label={flow.title}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={(_, node) => setStep(Number(node.id))}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          minZoom={0.3}
          maxZoom={1.5}
          nodesDraggable={false}
          nodesConnectable={false}
          nodesFocusable={false}
          edgesFocusable={false}
          elementsSelectable={false}
          deleteKeyCode={null}
          zoomOnScroll={false}
          preventScrolling={false}
          ariaLabelConfig={{
            "controls.ariaLabel": "Kontrol diagram",
            "controls.zoomIn.ariaLabel": "Perbesar diagram",
            "controls.zoomOut.ariaLabel": "Perkecil diagram",
            "controls.fitView.ariaLabel": "Tampilkan seluruh diagram",
          }}
        >
          <Background color="#385359" gap={19} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <ol className={styles.steps} aria-label="Langkah diagram">
        {flow.steps.map((item, index) => (
          <li key={item.title}>
            <button
              type="button"
              aria-current={index === step ? "step" : undefined}
              aria-controls={detailId}
              onClick={() => setStep(index)}
            >
              {index + 1}. {item.title}
            </button>
          </li>
        ))}
      </ol>
      <div id={detailId} className={styles.detail} role="status" aria-atomic="true">
        <span className="eyebrow">
          LANGKAH {step + 1} DARI {flow.steps.length}
        </span>
        <h3>{activeStep.title}</h3>
        <p>{activeStep.explanation}</p>
        <pre className={styles.example} tabIndex={0} aria-label="Contoh data langkah ini">
          <code>{activeStep.example}</code>
        </pre>
      </div>
      <div
        className={styles.actions}
        role="group"
        aria-label="Navigasi langkah diagram"
      >
        <Button
          variant="outline"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          Sebelumnya
        </Button>
        <Button
          disabled={step === flow.steps.length - 1}
          onClick={() => setStep(step + 1)}
        >
          Berikutnya
        </Button>
        <Button variant="ghost" onClick={() => setStep(0)}>
          Ulangi
        </Button>
      </div>
      {flow.sql && (
        <details className={styles.sql}>
          <summary>Lihat SQL lengkap untuk diagram ini</summary>
          <pre className={styles.example} tabIndex={0} aria-label="Query lengkap diagram">
            <code>{flow.sql}</code>
          </pre>
        </details>
      )}
      <p className={`small muted ${styles.note}`}>{flow.note}</p>
    </>
  );
}

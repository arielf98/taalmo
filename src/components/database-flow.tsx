"use client";

import { Fragment, useId, useState } from "react";
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
  type FlowTable,
} from "@/content/database/flows";
import { schoolSchema } from "@/content/database/schema";
import { localizedFlowLabels, useLocale } from "@/lib/locale";
import { Button } from "./ui/button";
import styles from "./database-flow.module.css";

const topics: { id: DatabaseFlowTopic; label: string }[] = [
  { id: "overview", label: "Alur dasar" },
  { id: "relations", label: "Relasi tabel" },
  { id: "query", label: "Cara query bekerja" },
];

export function DatabaseFlowExplorer({ topic }: { topic?: DatabaseFlowTopic }) {
  const { locale, t } = useLocale();
  const [selectedTopic, setSelectedTopic] =
    useState<DatabaseFlowTopic>("overview");
  const activeTopic = topic ?? selectedTopic;
  const titleId = useId();
  return (
    <section
      className={`card ${styles.explorer}`}
      lang={locale}
      aria-labelledby={titleId}
    >
      <span className="eyebrow">{t("PAHAMI LEWAT VISUAL")}</span>
      <h2 id={titleId}>{t(databaseFlows[activeTopic].title)}</h2>
      {!topic && (
        <div
          className={styles.actions}
          role="group"
          aria-label={t("Pilih topik diagram")}
        >
          {topics.map((item) => (
            <Button
              key={item.id}
              variant={activeTopic === item.id ? "default" : "outline"}
              aria-pressed={activeTopic === item.id}
              onClick={() => setSelectedTopic(item.id)}
            >
              {t(item.label)}
            </Button>
          ))}
        </div>
      )}
      {activeTopic === "relations" ? (
        <DatabaseRelationships />
      ) : (
        <DatabaseFlowWalkthrough key={activeTopic} topic={activeTopic} />
      )}
    </section>
  );
}

function DatabaseRelationships() {
  const { t } = useLocale();
  const flow = databaseFlows.relations;
  return (
    <>
      <p>{t(flow.description)}</p>
      <figure className={styles.schema}>
        <figcaption>{t("Struktur tabel School Finance · UML/ERD")}</figcaption>
        <div
          className={styles.schemaScroll}
          role="region"
          aria-label={t(
            "Diagram struktur tabel dan relasi; geser untuk melihat seluruh tabel",
          )}
          tabIndex={0}
        >
          <div className={styles.entities}>
            {schoolSchema.map((table) => (
              <Fragment key={table.name}>
                <div className={styles.entity}>
                  <table>
                    <caption>school.{table.name}</caption>
                    <thead>
                      <tr>
                        <th scope="col">{t("Kunci")}</th>
                        <th scope="col">{t("Kolom")}</th>
                        <th scope="col">{t("Tipe data")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.columns.map((column) => (
                        <tr key={column.name}>
                          <td>
                            {column.key && (
                              <span className={styles.key}>{column.key}</span>
                            )}
                          </td>
                          <th scope="row"><code>{column.name}</code></th>
                          <td><code>{column.type}</code></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {table.columns
                    .filter((column) => column.references)
                    .map((column) => (
                      <p className={styles.reference} key={column.name}>
                        <code>{column.name}</code> FK → <code>{column.references}</code>
                      </p>
                    ))}
                </div>
                {table.relationship && (
                  <div
                    className={styles.relationship}
                    role="img"
                    aria-label={t(table.relationship.description)}
                  >
                    <code aria-hidden="true">{table.relationship.column}</code>
                    <div className={styles.relationshipLine} aria-hidden="true">
                      <span>1</span>
                      <span>0..N</span>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
        <p className="small muted">
          {t(
            "PK = identitas unik baris; FK = referensi ke tabel lain. 1 = tepat satu; 0..N = nol atau banyak. Semua kolom wajib terisi kecuali paid_at (NULL). Diagram ini merangkum kolom dan relasi, bukan seluruh constraint SQL.",
          )}
        </p>
      </figure>
      {schoolSchema.map((table) =>
        table.relationship && (
          <p key={table.name}>{t(table.relationship.description)}</p>
        ),
      )}
      {flow.steps.map((item) => (
        <section className={styles.relationExample} key={item.title}>
          <h3>{t(item.title)}</h3>
          <p>{t(item.explanation)}</p>
          {item.table && <DatabaseExampleTable table={item.table} />}
        </section>
      ))}
      <p className={`small muted ${styles.note}`}>{t(flow.note)}</p>
    </>
  );
}

function DatabaseExampleTable({ table }: { table: FlowTable }) {
  const { t } = useLocale();
  return (
    <div
      className={styles.tableScroll}
      role="region"
      aria-label={t(table.caption)}
      tabIndex={0}
    >
      <table className={styles.dataTable}>
        <caption>{t(table.caption)}</caption>
        <thead>
          <tr>
            {table.columns.map((column) => (
              <th scope="col" key={column}>{t(column)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, index) => (
            <tr key={index}>
              {row.map((value, cell) => <td key={cell}>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DatabaseFlowWalkthrough({
  topic,
}: {
  topic: Exclude<DatabaseFlowTopic, "relations">;
}) {
  const { t } = useLocale();
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
      index === 2
        ? Position.Bottom
        : index > 2
          ? Position.Left
          : Position.Right,
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
          <strong>{t(item.title)}</strong>
          <span>{t(item.subtitle)}</span>
        </button>
      ),
    },
  }));
  const edges: Edge[] = flow.steps.slice(1).map((item, index) => ({
    id: `${index}-${index + 1}`,
    source: String(index),
    target: String(index + 1),
    type: "smoothstep",
    label: item.connection ? t(item.connection) : undefined,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#a1dfc8" },
    style: { stroke: "#a1dfc8", strokeWidth: step === index + 1 ? 3 : 1.5 },
    labelStyle: { fill: "#e4eeea", fontSize: 12 },
    labelBgStyle: { fill: "#172d35" },
  }));
  return (
    <>
      <p>{t(flow.description)}</p>
      <p className="small muted">
        {t(
          "Klik kotak untuk membaca penjelasan, atau ikuti tombol langkah di bawah. Diagram bisa digeser dan diperbesar; daftar langkah juga bisa dipakai dengan keyboard.",
        )}
      </p>
      <div
        className={`architecture ${styles.diagram}`}
        role="region"
        aria-label={t(flow.title)}
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
          ariaLabelConfig={localizedFlowLabels(t)}
        >
          <Background color="#385359" gap={19} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <ol className={styles.steps} aria-label={t("Langkah diagram")}>
        {flow.steps.map((item, index) => (
          <li key={item.title}>
            <button
              type="button"
              aria-current={index === step ? "step" : undefined}
              aria-controls={detailId}
              onClick={() => setStep(index)}
            >
              {index + 1}. {t(item.title)}
            </button>
          </li>
        ))}
      </ol>
      <div
        id={detailId}
        className={styles.detail}
        role="status"
        aria-atomic="true"
      >
        <span className="eyebrow">
          {t("LANGKAH {0} DARI {1}", [step + 1, flow.steps.length])}
        </span>
        <h3>{t(activeStep.title)}</h3>
        <p>{t(activeStep.explanation)}</p>
        {activeStep.table && <DatabaseExampleTable table={activeStep.table} />}
        {activeStep.example && (
          <pre
            className={styles.example}
            tabIndex={0}
            aria-label={t("Contoh data langkah ini")}
          >
            <code>{t(activeStep.example)}</code>
          </pre>
        )}
      </div>
      <div
        className={styles.actions}
        role="group"
        aria-label={t("Navigasi langkah diagram")}
      >
        <Button
          variant="outline"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          {t("Sebelumnya")}
        </Button>
        <Button
          disabled={step === flow.steps.length - 1}
          onClick={() => setStep(step + 1)}
        >
          {t("Berikutnya")}
        </Button>
        <Button variant="ghost" onClick={() => setStep(0)}>
          {t("Ulangi")}
        </Button>
      </div>
      {flow.sql && (
        <details className={styles.sql}>
          <summary>{t("Lihat SQL lengkap untuk diagram ini")}</summary>
          <pre
            className={styles.example}
            tabIndex={0}
            aria-label={t("Query lengkap diagram")}
          >
            <code>{flow.sql}</code>
          </pre>
        </details>
      )}
      <p className={`small muted ${styles.note}`}>{t(flow.note)}</p>
    </>
  );
}

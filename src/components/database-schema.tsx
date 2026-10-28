"use client";

import type { SchemaTable } from "@/content/database/schema";
import type { ModelDiagram } from "@/content/database/modeling-schemas";
import { useLocale } from "@/lib/locale";
import styles from "./database-flow.module.css";

export function DatabaseSchemaTable({
  table,
  prefix,
}: {
  table: SchemaTable;
  prefix: string;
}) {
  const { t } = useLocale();
  return (
    <div className={styles.entity}>
      <table>
        <caption>{prefix}.{table.name}</caption>
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
                {column.key && <span className={styles.key}>{column.key}</span>}
              </td>
              <th scope="row"><code>{column.name}</code></th>
              <td><code>{column.type}</code></td>
            </tr>
          ))}
        </tbody>
      </table>
      {table.columns.filter((column) => column.references).map((column) => (
        <p className={styles.reference} key={column.name}>
          <code>{column.name}</code> FK → <code>{column.references}</code>
        </p>
      ))}
    </div>
  );
}

export function DatabaseModelDiagram({ diagram }: { diagram: ModelDiagram }) {
  const { t } = useLocale();
  return (
    <figure className={styles.schema}>
      <figcaption>{t(diagram.title)}</figcaption>
      {diagram.relations.map((relation) => (
        <div key={`${relation.parent.name}-${relation.child.name}`}>
          <div
            className={styles.schemaScroll}
            role="region"
            aria-label={t(relation.description)}
            tabIndex={0}
          >
            <div className={`${styles.entities} ${styles.modelPair}`}>
              <DatabaseSchemaTable table={relation.parent} prefix="pg_temp" />
              <div
                className={styles.relationship}
                role="img"
                aria-label={t(relation.description)}
              >
                <code aria-hidden="true">{relation.foreignKey}</code>
                <div className={styles.relationshipLine} aria-hidden="true">
                  <span>1</span>
                  <span>{relation.childCardinality ?? "0..N"}</span>
                </div>
              </div>
              <DatabaseSchemaTable table={relation.child} prefix="pg_temp" />
            </div>
          </div>
          <p>{t(relation.description)}</p>
        </div>
      ))}
      <p className="small muted">{t(diagram.note)}</p>
    </figure>
  );
}

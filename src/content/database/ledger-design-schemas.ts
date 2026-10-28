import type { ModelDiagram } from "./modeling-schemas";
import type { SchemaTable } from "./schema";

const accounts: SchemaTable = {
  name: "lesson_ledger_accounts",
  columns: [
    { name: "merchant_id", type: "INTEGER", key: "PK" },
    { name: "account_id", type: "INTEGER", key: "PK" },
    { name: "currency", type: "TEXT", key: "PK" },
  ],
};
const transfers: SchemaTable = {
  name: "lesson_ledger_transfers",
  columns: [
    { name: "merchant_id", type: "INTEGER", key: "PK" },
    { name: "business_key", type: "TEXT", key: "PK" },
    { name: "currency", type: "TEXT" },
    { name: "payload_fingerprint", type: "TEXT" },
  ],
};
const entries: SchemaTable = {
  name: "lesson_ledger_entries",
  columns: [
    { name: "merchant_id", type: "INTEGER", key: "PK/FK" },
    { name: "business_key", type: "TEXT", key: "PK/FK" },
    { name: "line_no", type: "INTEGER", key: "PK" },
    { name: "account_id", type: "INTEGER", key: "FK" },
    { name: "currency", type: "TEXT", key: "FK" },
    { name: "amount", type: "BIGINT" },
  ],
};
const outbox: SchemaTable = {
  name: "lesson_ledger_outbox",
  columns: [
    { name: "merchant_id", type: "INTEGER", key: "PK/FK" },
    { name: "business_key", type: "TEXT", key: "PK/FK" },
    { name: "event_kind", type: "TEXT" },
  ],
};
const audit: SchemaTable = {
  name: "lesson_ledger_audit",
  columns: [
    { name: "merchant_id", type: "INTEGER", key: "PK/FK" },
    { name: "business_key", type: "TEXT", key: "PK/FK" },
    { name: "actor_id", type: "TEXT" },
    { name: "action", type: "TEXT" },
  ],
};

export const ledgerDesignLessonSchemas: Partial<Record<string, ModelDiagram>> = {
  l9m01l02: {
    title: "Payment Ledger · struktur dan batas constraint",
    note: "Semua kolom NOT NULL. Kolom bertanda PK membentuk satu key composite per tabel. Dua FK entry membawa merchant dan currency bersama identitas transfer/akun. UNIQUE transfer juga mencakup (merchant_id, business_key, currency). CHECK line_no dan PK membatasi maksimal dua entry, tetapi tidak memaksa minimal dua. Outbox/audit maksimal satu per transfer. Relasi tidak membuktikan balancing, intent, saldo, authorization atau append-only policy.",
    relations: [
      { parent: transfers, child: entries, foreignKey: "(merchant_id, business_key, currency)", childCardinality: "0..2", description: "Satu transfer mempunyai 0..2 entry menurut DDL. Setiap entry merujuk tepat satu transfer pada merchant/currency sama; writer wajib memastikan dua entry lengkap saat posted." },
      { parent: accounts, child: entries, foreignKey: "(merchant_id, account_id, currency)", description: "Satu akun mempunyai 0..N entry. Setiap entry merujuk tepat satu akun pada merchant/currency sama; FK tidak memeriksa hak akses atau kecukupan saldo." },
      { parent: transfers, child: outbox, foreignKey: "(merchant_id, business_key)", childCardinality: "0..1", description: "Satu transfer mempunyai 0..1 outbox. PK child membatasi satu marker transfer_posted; writer atomik wajib membentuknya. Ini tidak menjamin satu kali delivery." },
      { parent: transfers, child: audit, foreignKey: "(merchant_id, business_key)", childCardinality: "0..1", description: "Satu transfer mempunyai 0..1 audit posting. Marker ini belum merupakan audit keamanan lengkap atau tahan manipulasi; writer atomik wajib memasangkannya." },
    ],
  },
};

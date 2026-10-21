interface SchemaColumn {
  name: string;
  type: string;
  key?: "PK" | "FK";
  references?: string;
}

interface SchemaTable {
  name: string;
  columns: SchemaColumn[];
  relationship?: { column: string; description: string };
}

export const schoolSchema: SchemaTable[] = [
  {
    name: "students",
    columns: [
      { name: "student_id", type: "BIGINT", key: "PK" },
      { name: "full_name", type: "TEXT" },
      { name: "grade", type: "TEXT" },
      { name: "is_active", type: "BOOLEAN" },
      { name: "enrolled_at", type: "DATE" },
    ],
    relationship: {
      column: "student_id",
      description: "Satu siswa dapat memiliki nol atau banyak tagihan. Setiap tagihan wajib merujuk tepat satu siswa.",
    },
  },
  {
    name: "invoices",
    columns: [
      { name: "invoice_id", type: "BIGINT", key: "PK" },
      {
        name: "student_id",
        type: "BIGINT",
        key: "FK",
        references: "students.student_id",
      },
      { name: "period_month", type: "DATE" },
      { name: "due_date", type: "DATE" },
      { name: "amount", type: "NUMERIC(12,2)" },
    ],
    relationship: {
      column: "invoice_id",
      description: "Satu tagihan dapat memiliki nol atau banyak pembayaran. Setiap pembayaran wajib merujuk tepat satu tagihan.",
    },
  },
  {
    name: "payments",
    columns: [
      { name: "payment_id", type: "BIGINT", key: "PK" },
      {
        name: "invoice_id",
        type: "BIGINT",
        key: "FK",
        references: "invoices.invoice_id",
      },
      { name: "amount", type: "NUMERIC(12,2)" },
      { name: "status", type: "TEXT" },
      { name: "paid_at", type: "TIMESTAMPTZ NULL" },
    ],
  },
];

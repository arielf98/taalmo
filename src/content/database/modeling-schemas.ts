import type { SchemaTable } from "./schema";

export interface ModelDiagram {
  title: string;
  note: string;
  relations: {
    parent: SchemaTable;
    child: SchemaTable;
    foreignKey: string;
    description: string;
  }[];
}

const orders: SchemaTable = {
  "name": "lesson_orders",
  "columns": [
    {
      "name": "order_id",
      "type": "BIGINT",
      "key": "PK"
    },
    {
      "name": "state",
      "type": "TEXT"
    },
    {
      "name": "created_at",
      "type": "TIMESTAMPTZ"
    }
  ]
};

const items: SchemaTable = {
  "name": "lesson_order_items",
  "columns": [
    {
      "name": "order_item_id",
      "type": "BIGINT",
      "key": "PK"
    },
    {
      "name": "order_id",
      "type": "BIGINT",
      "key": "FK",
      "references": "lesson_orders.order_id"
    },
    {
      "name": "sku",
      "type": "TEXT"
    },
    {
      "name": "quantity",
      "type": "INTEGER"
    },
    {
      "name": "unit_price",
      "type": "NUMERIC(12,2)"
    }
  ]
};

const payments: SchemaTable = {
  "name": "lesson_payments",
  "columns": [
    {
      "name": "payment_id",
      "type": "BIGINT",
      "key": "PK"
    },
    {
      "name": "order_id",
      "type": "BIGINT",
      "key": "FK",
      "references": "lesson_orders.order_id"
    },
    {
      "name": "amount",
      "type": "NUMERIC(12,2)"
    },
    {
      "name": "status",
      "type": "TEXT"
    },
    {
      "name": "paid_at",
      "type": "TIMESTAMPTZ NULL"
    }
  ]
};

const refunds: SchemaTable = {
  "name": "lesson_refunds",
  "columns": [
    {
      "name": "refund_id",
      "type": "BIGINT",
      "key": "PK"
    },
    {
      "name": "payment_id",
      "type": "BIGINT",
      "key": "FK",
      "references": "lesson_payments.payment_id"
    },
    {
      "name": "amount",
      "type": "NUMERIC(12,2)"
    },
    {
      "name": "status",
      "type": "TEXT"
    }
  ]
};

const students: SchemaTable = {
  "name": "lesson_students",
  "columns": [
    {
      "name": "student_id",
      "type": "BIGINT",
      "key": "PK"
    },
    {
      "name": "full_name",
      "type": "TEXT"
    }
  ]
};

const guardians: SchemaTable = {
  "name": "lesson_guardians",
  "columns": [
    {
      "name": "guardian_id",
      "type": "BIGINT",
      "key": "PK"
    },
    {
      "name": "full_name",
      "type": "TEXT"
    }
  ]
};

const links: SchemaTable = {
  "name": "lesson_student_guardians",
  "columns": [
    {
      "name": "student_id",
      "type": "BIGINT",
      "key": "PK/FK",
      "references": "lesson_students.student_id"
    },
    {
      "name": "guardian_id",
      "type": "BIGINT",
      "key": "PK/FK",
      "references": "lesson_guardians.guardian_id"
    },
    {
      "name": "relationship",
      "type": "TEXT"
    }
  ]
};

export const databaseLessonSchemas: Partial<Record<string, ModelDiagram>> = {
  l3m01l01: {
    title: "Commerce · identitas dan relasi UML/ERD",
    note: "PK = identitas unik; FK = referensi wajib; 1 = tepat satu; 0..N = nol atau banyak. Semua kolom wajib terisi kecuali paid_at. Tabel yang tampil kembali adalah entity yang sama, bukan salinan data. Garis menyatakan relasi, bukan urutan proses; batas refund dan lifecycle belum seluruhnya dijaga constraint.",
    relations: [
      { parent: orders, child: items, foreignKey: "order_id", description: "Satu order memiliki 0..N item. Setiap item wajib merujuk tepat satu order; syarat minimal satu item saat confirmed belum dijaga oleh FK." },
      { parent: orders, child: payments, foreignKey: "order_id", description: "Satu order memiliki 0..N percobaan payment. Setiap payment wajib merujuk tepat satu order; percobaan gagal tetap mempunyai identitas sendiri." },
      { parent: payments, child: refunds, foreignKey: "payment_id", description: "Satu payment memiliki 0..N refund. Setiap refund wajib merujuk tepat satu payment; FK ini belum memastikan payment berhasil atau membatasi total refund." },
    ],
  },
  l3m01l02: {
    title: "Siswa–wali · N:M melalui junction UML/ERD",
    note: "Dua kolom PK/FK bersama-sama membentuk satu primary key pasangan. Setiap hubungan wajib mempunyai siswa dan wali, tetapi tiap siswa atau wali boleh belum mempunyai hubungan. Semua kolom wajib terisi. Tabel junction diulang untuk memperlihatkan kedua foreign key; ini tetap satu tabel, bukan dua salinan.",
    relations: [
      { parent: students, child: links, foreignKey: "student_id", description: "Satu siswa memiliki 0..N baris hubungan wali. Setiap baris junction wajib merujuk tepat satu siswa." },
      { parent: guardians, child: links, foreignKey: "guardian_id", description: "Satu wali memiliki 0..N baris hubungan siswa. Setiap baris junction wajib merujuk tepat satu wali; dua relasi 1:N ini membentuk N:M siswa–wali." },
    ],
  },
};

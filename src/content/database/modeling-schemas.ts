import { typesConstraintsLessonSchemas } from "./types-constraints-schemas";
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

const nfInvoices: SchemaTable = {
  "name": "lesson_nf_invoices",
  "columns": [
    {
      "name": "invoice_id",
      "type": "BIGINT",
      "key": "PK"
    },
    {
      "name": "amount",
      "type": "NUMERIC(12,2)"
    }
  ]
};

const nfPayments: SchemaTable = {
  "name": "lesson_nf_payments",
  "columns": [
    {
      "name": "payment_id",
      "type": "BIGINT",
      "key": "PK"
    },
    {
      "name": "invoice_id",
      "type": "BIGINT",
      "key": "FK",
      "references": "lesson_nf_invoices.invoice_id"
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

const nfCustomers: SchemaTable = {
  "name": "lesson_nf_customers",
  "columns": [
    {
      "name": "customer_id",
      "type": "BIGINT",
      "key": "PK"
    },
    {
      "name": "full_name",
      "type": "TEXT"
    }
  ]
};

const nfProducts: SchemaTable = {
  "name": "lesson_nf_products",
  "columns": [
    {
      "name": "sku",
      "type": "TEXT",
      "key": "PK"
    },
    {
      "name": "product_name",
      "type": "TEXT"
    }
  ]
};

const nfOrders: SchemaTable = {
  "name": "lesson_nf_orders",
  "columns": [
    {
      "name": "order_id",
      "type": "BIGINT",
      "key": "PK"
    },
    {
      "name": "customer_id",
      "type": "BIGINT",
      "key": "FK",
      "references": "lesson_nf_customers.customer_id"
    }
  ]
};

const nfItems: SchemaTable = {
  "name": "lesson_nf_order_items",
  "columns": [
    {
      "name": "order_id",
      "type": "BIGINT",
      "key": "PK/FK",
      "references": "lesson_nf_orders.order_id"
    },
    {
      "name": "line_no",
      "type": "INTEGER",
      "key": "PK"
    },
    {
      "name": "sku",
      "type": "TEXT",
      "key": "FK",
      "references": "lesson_nf_products.sku"
    },
    {
      "name": "quantity",
      "type": "INTEGER"
    },
    {
      "name": "unit_price_at_order",
      "type": "NUMERIC(12,2)"
    }
  ]
};

const cacheOrders: SchemaTable = {
  "name": "lesson_cache_orders",
  "columns": [
    {
      "name": "order_id",
      "type": "BIGINT",
      "key": "PK"
    },
    {
      "name": "cached_total",
      "type": "NUMERIC(12,2) NULL"
    }
  ]
};

const cacheItems: SchemaTable = {
  "name": "lesson_cache_items",
  "columns": [
    {
      "name": "order_id",
      "type": "BIGINT",
      "key": "PK/FK",
      "references": "lesson_cache_orders.order_id"
    },
    {
      "name": "line_no",
      "type": "INTEGER",
      "key": "PK"
    },
    {
      "name": "quantity",
      "type": "INTEGER"
    },
    {
      "name": "unit_price_at_order",
      "type": "NUMERIC(12,2)"
    }
  ]
};

export const databaseLessonSchemas: Partial<Record<string, ModelDiagram>> = {
  ...typesConstraintsLessonSchemas,
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
  l3m02l01: {
    title: "1NF · invoice dan payment sebagai baris beridentitas",
    note: "Semua kolom wajib terisi. PK payment menjaga satu identitas; FK invoice wajib menjaga satu pemilik. Satu invoice boleh belum memiliki payment. Daftar string legacy tidak menjadi sumber relasi pada desain baru.",
    relations: [
      { parent: nfInvoices, child: nfPayments, foreignKey: "invoice_id", description: "Satu invoice memiliki 0..N payment; setiap payment wajib merujuk tepat satu invoice pada kebijakan contoh." },
    ],
  },
  l3m02l02: {
    title: "Normalisasi order · pemilik setiap fakta",
    note: "Semua kolom wajib terisi. Pada item, order_id dan line_no bersama-sama menjadi PK; order_id juga FK. Harga transaksi tetap di item, sedangkan nama customer dan product adalah fakta saat ini. Tabel berulang pada pasangan garis tetap satu entity yang sama.",
    relations: [
      { parent: nfCustomers, child: nfOrders, foreignKey: "customer_id", description: "Satu customer memiliki 0..N order; setiap order wajib mempunyai tepat satu customer. Customer tanpa order tetap dapat disimpan." },
      { parent: nfOrders, child: nfItems, foreignKey: "order_id", description: "Satu order memiliki 0..N item; setiap item wajib merujuk tepat satu order. Composite PK menentukan baris di dalam order." },
      { parent: nfProducts, child: nfItems, foreignKey: "sku", description: "Satu product dapat dipakai 0..N item transaksi; setiap item wajib merujuk tepat satu SKU. Harga yang disepakati tetap milik item, bukan ditentukan SKU saja." },
    ],
  },
  l3m02l03: {
    title: "Data turunan · cached_total dan sumber item",
    note: "Hanya cached_total yang boleh NULL. PK/FK menjaga identitas dan referensi, tetapi tidak otomatis menyinkronkan SUM item ke cache. Nol item memberi total canonical nol; cache NULL berarti salinan belum tersedia, bukan total nol yang sudah diketahui.",
    relations: [
      { parent: cacheOrders, child: cacheItems, foreignKey: "order_id", description: "Satu order memiliki 0..N item sumber total; setiap item wajib merujuk tepat satu order. Garis FK bukan mekanisme pembaruan cached_total." },
    ],
  },
};

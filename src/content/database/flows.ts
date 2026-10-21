export type DatabaseFlowTopic = "overview" | "relations" | "query";

interface FlowStep {
  title: string;
  subtitle: string;
  explanation: string;
  example: string;
  connection?: string;
}

interface DatabaseFlow {
  title: string;
  description: string;
  note: string;
  sql?: string;
  steps: FlowStep[];
}

export const databaseLessonFlowTopics: Partial<Record<string, DatabaseFlowTopic>> = {
  l0m01l01: "relations",
  l0m01l02: "relations",
  l0m01l03: "relations",
  l0m02l01: "query",
  l0m02l02: "overview",
  l1m03l01: "relations",
  l1m03l02: "relations",
  l1m03l03: "relations",
};

export const databaseFlows: Record<DatabaseFlowTopic, DatabaseFlow> = {
  overview: {
    title: "Dari klik sampai hasil database",
    description: "Ikuti permintaan bendahara yang ingin melihat tagihan Bima. Setiap kotak adalah satu bagian dari perjalanan data.",
    note: "Ilustrasi baca data, bukan koneksi ke database sungguhan. Aplikasi mengirim SQL melalui backend; PostgreSQL memilih cara membaca data.",
    steps: [
      {
        title: "Pengguna",
        subtitle: "Meminta daftar tagihan",
        explanation: "Bendahara memilih Bima pada aplikasi sekolah. Pada tahap ini, pengguna menyampaikan kebutuhan, belum membaca tabel database secara langsung.",
        example: "Tampilkan tagihan milik Bima Pratama (student_id = 2).",
      },
      {
        title: "Aplikasi / backend",
        subtitle: "Memeriksa permintaan",
        connection: "permintaan",
        explanation: "Backend memeriksa hak akses dan masukan, lalu menyiapkan query. Nilai masukan dikirim sebagai parameter, bukan digabung langsung ke teks SQL.",
        example: "Parameter permintaan: student_id = 2\nQuery: SELECT invoice_id, amount\n       FROM school.invoices\n       WHERE student_id = $1\n       ORDER BY invoice_id;\nNilai parameter $1: 2",
      },
      {
        title: "SQL",
        subtitle: "Menyatakan data yang diminta",
        connection: "query + parameter",
        explanation: "SQL menjelaskan kolom dan baris yang diinginkan. SELECT memilih kolom, FROM menyebut tabel, WHERE membatasi siswa, dan ORDER BY memastikan urutan hasil.",
        example: "Ambil invoice_id dan amount dari invoices,\nhanya untuk student_id = 2, urutkan menurut invoice_id.",
      },
      {
        title: "PostgreSQL",
        subtitle: "Membaca baris yang sesuai",
        connection: "baca data",
        explanation: "Database merencanakan dan menjalankan query. Bima memiliki invoice 103 dan 104. Membaca tagihan tidak mengubah data dan belum memberi tahu apakah tagihan sudah lunas.",
        example: "invoice_id | student_id | amount\n103        | 2          | 450000.00\n104        | 2          | 450000.00",
      },
      {
        title: "Hasil ke pengguna",
        subtitle: "Backend mengembalikan data",
        connection: "hasil query",
        explanation: "PostgreSQL mengembalikan hasil ke backend. Backend membentuk respons dan aplikasi menampilkan dua tagihan. Untuk menghitung sisa tagihan, aplikasi perlu memperhitungkan pembayaran sukses juga.",
        example: "Tagihan 103: Rp450.000\nTagihan 104: Rp450.000\nHasil SELECT ini hanya berisi invoice_id dan amount.",
      },
    ],
  },
  relations: {
    title: "Bagaimana tabel saling terhubung?",
    description: "Telusuri siswa → tagihan → pembayaran. Panah menunjukkan hubungan satu-ke-banyak, bukan urutan menjalankan SQL.",
    note: "Contoh ini mengambil sebagian data School Finance. Foreign key pada tabel anak merujuk kunci tabel induk; hubungan tabel sendiri tidak memindahkan atau menggandakan data.",
    steps: [
      {
        title: "students · siswa",
        subtitle: "Satu baris per siswa",
        explanation: "student_id adalah primary key: identitas unik setiap siswa. Nama Bima disimpan sekali di students. Beberapa tagihan dapat merujuk identitas yang sama tanpa menyalin namanya.",
        example: "student_id | full_name\n2          | Bima Pratama",
      },
      {
        title: "invoices · tagihan",
        subtitle: "Satu siswa → banyak tagihan",
        connection: "student_id · 1 → N",
        explanation: "student_id di invoices adalah foreign key ke students. Invoice 103 dan 104 sama-sama milik siswa 2. Foreign key memastikan siswa yang dirujuk ada, bukan membatasi satu siswa hanya memiliki satu tagihan.",
        example: "invoice_id | student_id | amount\n103        | 2          | 450000.00\n104        | 2          | 450000.00",
      },
      {
        title: "payments · pembayaran",
        subtitle: "Satu tagihan → banyak pembayaran",
        connection: "invoice_id · 1 → N",
        explanation: "invoice_id di payments merujuk invoices. Tagihan 103 dibayar dalam dua cicilan sukses: 250.000 + 200.000 = 450.000. JOIN ke payments menghasilkan dua baris untuk tagihan 103; menjumlah amount tagihan setelah JOIN mentah akan menghitungnya dua kali. Pembayaran 205 masih pending sehingga tagihan 104 belum dianggap lunas.",
        example: "payment_id | invoice_id | amount    | status\n203        | 103        | 250000.00 | succeeded\n204        | 103        | 200000.00 | succeeded\n205        | 104        | 450000.00 | pending",
      },
    ],
  },
  query: {
    title: "Dari baris sumber menjadi hasil query",
    description: "Contoh pendamping: hitung jumlah tagihan Alya dan Bima. Lihat bagaimana bentuk data berubah pada setiap langkah logis.",
    note: "Ini urutan logis untuk memahami query contoh, bukan execution plan PostgreSQL. Optimizer dapat memilih strategi fisik berbeda dengan hasil yang sama. SQL di sini tidak dieksekusi.",
    sql: "SELECT s.full_name, COUNT(i.invoice_id) AS invoice_count\nFROM school.students AS s\nJOIN school.invoices AS i ON i.student_id = s.student_id\nWHERE s.student_id IN (1, 2)\nGROUP BY s.student_id, s.full_name\nORDER BY s.student_id;",
    steps: [
      {
        title: "FROM + JOIN",
        subtitle: "Pasangkan siswa dan tagihan",
        explanation: "JOIN memasangkan student_id yang sama di students dan invoices. Dari seed lengkap, terbentuk 10 baris: satu per tagihan. Nama siswa boleh muncul berulang karena satu siswa memiliki beberapa tagihan.",
        example: "Cuplikan dari 10 baris hasil JOIN:\nstudent_id | full_name    | invoice_id\n1          | Alya Putri   | 101\n1          | Alya Putri   | 102\n2          | Bima Pratama | 103\n2          | Bima Pratama | 104\n… enam tagihan siswa lain",
      },
      {
        title: "WHERE",
        subtitle: "Saring baris yang dibutuhkan",
        connection: "10 baris",
        explanation: "WHERE mempertahankan hanya student_id 1 dan 2. Sekarang ada empat baris. Baris siswa lain tidak masuk hasil query ini; data aslinya tetap tersimpan.",
        example: "student_id | full_name    | invoice_id\n1          | Alya Putri   | 101\n1          | Alya Putri   | 102\n2          | Bima Pratama | 103\n2          | Bima Pratama | 104",
      },
      {
        title: "GROUP BY",
        subtitle: "Kumpulkan per siswa",
        connection: "4 baris",
        explanation: "GROUP BY membentuk satu grup per identitas siswa. Kita mengelompokkan dengan student_id dan full_name agar dua siswa yang kebetulan bernama sama tetap terpisah.",
        example: "Grup siswa 1 · Alya Putri: invoice 101, 102\nGrup siswa 2 · Bima Pratama: invoice 103, 104",
      },
      {
        title: "COUNT + SELECT",
        subtitle: "Hitung dan pilih kolom hasil",
        connection: "2 grup",
        explanation: "COUNT(i.invoice_id) menghitung tagihan di setiap grup. SELECT menampilkan nama dan hasil hitungan sebagai invoice_count. Keduanya memiliki dua tagihan. Pembayaran tidak ikut di-JOIN agar hitungan tidak bertambah karena cicilan.",
        example: "full_name    | invoice_count\nAlya Putri   | 2\nBima Pratama | 2\nUrutan baris belum dijamin pada tahap ini.",
      },
      {
        title: "ORDER BY",
        subtitle: "Tetapkan urutan hasil",
        connection: "2 baris hasil",
        explanation: "ORDER BY s.student_id mengurutkan grup siswa 1 sebelum siswa 2. Kolom pengurutan ini boleh dipakai karena termasuk dalam GROUP BY, walaupun tidak ditampilkan di SELECT.",
        example: "1. Alya Putri   | 2 tagihan\n2. Bima Pratama | 2 tagihan",
      },
      {
        title: "Hasil akhir",
        subtitle: "Satu baris per siswa",
        connection: "hasil terurut",
        explanation: "Dari 10 baris JOIN, filter menyisakan empat baris, lalu pengelompokan menghasilkan dua baris ringkasan. Ini menghitung jumlah tagihan, bukan jumlah pembayaran atau total rupiah.",
        example: "full_name    | invoice_count\nAlya Putri   | 2\nBima Pratama | 2",
      },
    ],
  },
};

# Taalmo — Database Zero to Master

**Versi 1.0 — Blueprint kurikulum implementasi**  
**Bahasa:** Indonesia | **Engine:** PostgreSQL | **Rekomendasi:** 42 minggu, 8–12 jam/minggu  
**Cakupan:** 10 level · 40 modul · 120 lesson yang harus diisi materi lengkap oleh Codex.

## Outcome akhir
Murid bukan hanya bisa membuat query. Mereka mampu menjaga invariants, membuktikan query correctness, mengamati concurrency, mengoptimasi berdasarkan execution plan, memulihkan database, dan mempertahankan keputusan arsitektur.

## Instructional flow

1. **Diagnostic optional.** Jalur pemula dimulai dari L0. Jalur berpengalaman boleh melakukan diagnostic untuk melewati penjelasan dasar, tetapi tidak boleh melewati safety assessment wajib.
2. **Problem → Concept → Example → Interactive → Edge case → Explain.** Setiap lesson wajib lengkap, bukan placeholder.
3. **Gating by mastery.** Lesson tuntas hanya setelah aktivitas wajib benar. Modul pass jika semua lab benar + checkpoint ≥80%. Level pass jika seluruh modul pass + assessment level ≥85% dan semua tes integritas kritis lulus.
4. **Retry loop.** Kesalahan memicu umpan balik khusus penyebab, penjelasan konsep, hint bertingkat, dan varian kasus saat retry.
5. **Capstone & defense.** Bukti harus dikumpulkan (SQL/migrations/tests/EXPLAIN/runbooks/ADR). Waktu rekomendasi, tidak mengunci berdasarkan pekan.

## Rubrik penilaian
| Aspek | Bobot |
|---|---:|
| Data correctness & integrity | 30% |
| Transaction safety & concurrency | 25% |
| Performance & scalability | 20% |
| Reliability & recovery | 15% |
| Technical reasoning & trade-offs | 10% |

## Bentuk lesson standar

Setiap lesson harus mempunyai: learning objective yang terukur, narasi pengajaran Indonesia yang benar-benar membahas konsep, analogi yang tidak menyesatkan, 1 worked example (SQL PostgreSQL runnable jika relevan), minimal 2 pertanyaan konsep dengan jawaban dan pembahasan, 1 interactive task dengan validasi deterministik, minimal 2 edge cases, 3 hint bertingkat, refleksi/pertanyaan "mengapa" dan rekomendasi next step. Contoh jawaban disembunyikan hingga murid mencoba.

## Level dan daftar materi lengkap

### L0 — Foundation & Database Mindset (minggu 1–2)

**Tujuan:** Memahami data relasional dan menggunakan lingkungan latihan dengan aman.  
**Domain lab:** School Finance.

#### L0M01 — Cara Berpikir Relasional

*Kompetensi modul:* Memahami perbedaan data, relasi, schema, query, dan DBMS.  
*Prerequisite:* none

- **L0M01L01 · Dari spreadsheet ke database** (concept_and_check, 50 menit)  
  **Teach:** Satu tabel datar menyulitkan pembaruan data yang berulang; relasi memisahkan entitas secara eksplisit.  
  **Praktik:** Identifikasi duplikasi dalam data siswa–tagihan dan pisahkan menjadi tabel siswa dan invoice.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Identifikasi duplikasi dalam data siswa–tagihan dan pisahkan menjadi tabel siswa dan invoice.
- **L0M01L02 · Tabel, baris, kolom, dan tipe data** (guided_lab, 70 menit)  
  **Teach:** Tipe data membatasi representasi; primary key mengidentifikasi sebuah record secara stabil.  
  **Praktik:** Pilih tipe data untuk biaya SPP, tanggal jatuh tempo, nomor telepon, serta jelaskan alasannya.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Pilih tipe data untuk biaya SPP, tanggal jatuh tempo, nomor telepon, serta jelaskan alasannya.
- **L0M01L03 · Relasi dan integritas referensial** (scenario_challenge, 100 menit)  
  **Teach:** Foreign key melindungi hubungan antar-entitas dan bukan sekadar penghubung JOIN.  
  **Praktik:** Gambar relasi students, invoices, dan payments; prediksi dampak menghapus parent row.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Gambar relasi students, invoices, dan payments; prediksi dampak menghapus parent row.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L0M02 — Mental Model Eksekusi SQL

*Kompetensi modul:* Memahami bagaimana query dibaca dan bagaimana berlatih dengan aman.  
*Prerequisite:* l0m01

- **L0M02L01 · Apa itu SQL dan PostgreSQL** (concept_and_check, 50 menit)  
  **Teach:** SQL bersifat deklaratif: kita menyatakan hasil, database menentukan strategi eksekusi.  
  **Praktik:** Bandingkan spesifikasi hasil query dengan cara prosedural melakukan iterasi baris.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Bandingkan spesifikasi hasil query dengan cara prosedural melakukan iterasi baris.
- **L0M02L02 · Query sederhana pertama** (guided_lab, 70 menit)  
  **Teach:** SELECT, FROM, dan alias membentuk proyeksi data dari sebuah relation.  
  **Praktik:** Jalankan SELECT pertama pada dataset siswa dan tampilkan kolom yang diperlukan.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Jalankan SELECT pertama pada dataset siswa dan tampilkan kolom yang diperlukan.
- **L0M02L03 · Lingkungan latihan aman** (scenario_challenge, 100 menit)  
  **Teach:** Transaksi dan database latihan terpisah mencegah perubahan tidak sengaja ke data penting.  
  **Praktik:** Buat schema lab, jalankan query baca, dan lakukan ROLLBACK pada eksperimen tulis.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Buat schema lab, jalankan query baca, dan lakukan ROLLBACK pada eksperimen tulis.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

**Stage certification:** checkpoint semua modul + ujian level ≥85% + semua invariant kritis lulus.

### L1 — SQL Fundamentals (minggu 3–6)

**Tujuan:** Mampu mengambil, menggabungkan, mengagregasi, dan memodifikasi data secara benar.  
**Domain lab:** School Finance.

#### L1M01 — Membaca dan Memfilter Data

*Kompetensi modul:* Mengekstrak record sesuai predikat bisnis.  
*Prerequisite:* l0m02

- **L1M01L01 · SELECT dan proyeksi kolom** (concept_and_check, 50 menit)  
  **Teach:** SELECT * sering buruk sebagai kontrak API karena membawa kolom tak diperlukan.  
  **Praktik:** Tampilkan nama siswa dan tanggal masuk tanpa mengekspos metadata lainnya.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tampilkan nama siswa dan tanggal masuk tanpa mengekspos metadata lainnya.
- **L1M01L02 · WHERE, operator, dan boolean** (guided_lab, 70 menit)  
  **Teach:** AND, OR, NOT, serta tanda kurung menentukan himpunan hasil.  
  **Praktik:** Cari siswa aktif pada jenjang SD dengan kombinasi kriteria yang tepat.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Cari siswa aktif pada jenjang SD dengan kombinasi kriteria yang tepat.
- **L1M01L03 · NULL dan three-valued logic** (scenario_challenge, 100 menit)  
  **Teach:** NULL bukan 0 atau string kosong; = NULL tidak menghasilkan TRUE.  
  **Praktik:** Cari pembayaran yang paid_at-nya belum ada menggunakan IS NULL dan jelaskan NOT IN dengan NULL.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Cari pembayaran yang paid_at-nya belum ada menggunakan IS NULL dan jelaskan NOT IN dengan NULL.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L1M02 — Menyusun Hasil Query

*Kompetensi modul:* Mengubah hasil query menjadi output yang tepat dan stabil.  
*Prerequisite:* l1m01

- **L1M02L01 · ORDER BY dan LIMIT** (concept_and_check, 50 menit)  
  **Teach:** LIMIT tanpa order deterministik tidak menjamin urutan hasil konsisten.  
  **Praktik:** Ambil lima invoice terbaru dengan tie-breaker ID.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Ambil lima invoice terbaru dengan tie-breaker ID.
- **L1M02L02 · Ekspresi, CASE, dan COALESCE** (guided_lab, 70 menit)  
  **Teach:** CASE memetakan kondisi bisnis; COALESCE memilih fallback untuk nilai NULL.  
  **Praktik:** Tampilkan status overdue dan jumlah pembayaran yang belum tercatat sebagai nol.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tampilkan status overdue dan jumlah pembayaran yang belum tercatat sebagai nol.
- **L1M02L03 · String, date, dan cast** (scenario_challenge, 100 menit)  
  **Teach:** Casting mengubah tipe dengan risiko invalid input dan kehilangan presisi.  
  **Praktik:** Format bulan tagihan dan lakukan filter rentang tanggal tanpa mengubah kolom menjadi teks.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Format bulan tagihan dan lakukan filter rentang tanggal tanpa mengubah kolom menjadi teks.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L1M03 — JOIN dan Kardinalitas

*Kompetensi modul:* Menggabungkan tabel tanpa salah membaca multiplicity.  
*Prerequisite:* l1m02

- **L1M03L01 · INNER JOIN dan kunci relasi** (concept_and_check, 50 menit)  
  **Teach:** JOIN bekerja dengan predikat, bukan sekadar nama kolom yang mirip.  
  **Praktik:** Tampilkan invoice dan siswa pemiliknya menggunakan foreign key.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tampilkan invoice dan siswa pemiliknya menggunakan foreign key.
- **L1M03L02 · LEFT JOIN dan baris hilang** (guided_lab, 70 menit)  
  **Teach:** Filter di WHERE pada sisi kanan LEFT JOIN dapat mengubah hasil seolah INNER JOIN.  
  **Praktik:** Temukan siswa tanpa invoice tanpa menghilangkan hasil NULL dari sisi invoice.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Temukan siswa tanpa invoice tanpa menghilangkan hasil NULL dari sisi invoice.
- **L1M03L03 · One-to-many dan double counting** (scenario_challenge, 100 menit)  
  **Teach:** Join beberapa relasi one-to-many dapat menggandakan nilai agregasi.  
  **Praktik:** Perbaiki laporan total tagihan yang membesar setelah join pembayaran dan diskon.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Perbaiki laporan total tagihan yang membesar setelah join pembayaran dan diskon.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L1M04 — Aggregation dan Grouping

*Kompetensi modul:* Menghitung ringkasan tanpa mengorbankan ketepatan.  
*Prerequisite:* l1m03

- **L1M04L01 · COUNT, SUM, AVG, dan DISTINCT** (concept_and_check, 50 menit)  
  **Teach:** COUNT(*) dan COUNT(column) berbeda bila ada NULL; DISTINCT mengubah multiplicity.  
  **Praktik:** Hitung invoice dan invoice belum dibayar per kelas.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Hitung invoice dan invoice belum dibayar per kelas.
- **L1M04L02 · GROUP BY dan HAVING** (guided_lab, 70 menit)  
  **Teach:** WHERE memfilter sebelum agregasi, HAVING sesudah pengelompokan.  
  **Praktik:** Temukan kelas dengan total tunggakan di atas ambang tertentu.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Temukan kelas dengan total tunggakan di atas ambang tertentu.
- **L1M04L03 · Conditional aggregation** (scenario_challenge, 100 menit)  
  **Teach:** SUM CASE atau FILTER dapat membuat beberapa metrik dalam satu grouping.  
  **Praktik:** Buat ringkasan billed, paid, dan outstanding per bulan tanpa double counting.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Buat ringkasan billed, paid, dan outstanding per bulan tanpa double counting.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L1M05 — Mengubah Data dengan Aman

*Kompetensi modul:* Memodifikasi baris secara terkontrol dan memahami constraints.  
*Prerequisite:* l1m04

- **L1M05L01 · INSERT dan RETURNING** (concept_and_check, 50 menit)  
  **Teach:** DEFAULT dan RETURNING mempermudah integrasi tanpa bergantung pada ID buatan aplikasi.  
  **Praktik:** Tambahkan siswa dan ambil ID yang dibuat server.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tambahkan siswa dan ambil ID yang dibuat server.
- **L1M05L02 · UPDATE, DELETE, dan WHERE** (guided_lab, 70 menit)  
  **Teach:** UPDATE/DELETE tanpa filter bisa mengubah banyak baris; preview dan transaksi mengurangi risiko.  
  **Praktik:** Ubah status satu invoice dalam transaksi dan buktikan rollback memulihkannya.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Ubah status satu invoice dalam transaksi dan buktikan rollback memulihkannya.
- **L1M05L03 · PK, FK, UNIQUE, CHECK** (scenario_challenge, 100 menit)  
  **Teach:** Constraint database adalah garis pertahanan ketika validasi aplikasi terlewat.  
  **Praktik:** Coba memasukkan invoice dengan nominal negatif dan foreign key tak valid; jelaskan penolakannya.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Coba memasukkan invoice dengan nominal negatif dan foreign key tak valid; jelaskan penolakannya.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

**Stage certification:** checkpoint semua modul + ujian level ≥85% + semua invariant kritis lulus.

### L2 — SQL Problem Solving (minggu 7–10)

**Tujuan:** Mampu menyelesaikan pertanyaan analitis kompleks dengan SQL yang benar.  
**Domain lab:** School Finance.

#### L2M01 — Subquery dan Set Thinking

*Kompetensi modul:* Memilih bentuk query yang tepat untuk masalah himpunan.  
*Prerequisite:* l1m05

- **L2M01L01 · Subquery, EXISTS, dan IN** (concept_and_check, 50 menit)  
  **Teach:** EXISTS menyatakan keberadaan; NOT EXISTS aman untuk anti-join saat NULL ada.  
  **Praktik:** Temukan siswa yang belum pernah membayar menggunakan NOT EXISTS.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Temukan siswa yang belum pernah membayar menggunakan NOT EXISTS.
- **L2M01L02 · CTE dan keterbacaan** (guided_lab, 70 menit)  
  **Teach:** CTE menguraikan query kompleks menjadi langkah logis; bukan jaminan lebih cepat.  
  **Praktik:** Pisahkan tagihan dan pembayaran teragregasi ke CTE lalu hitung tunggakan.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Pisahkan tagihan dan pembayaran teragregasi ke CTE lalu hitung tunggakan.
- **L2M01L03 · UNION, INTERSECT, EXCEPT** (scenario_challenge, 100 menit)  
  **Teach:** Operasi set memiliki semantik distinct; UNION ALL mempertahankan duplikasi.  
  **Praktik:** Bandingkan daftar siswa yang membayar di dua bulan berbeda.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Bandingkan daftar siswa yang membayar di dua bulan berbeda.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L2M02 — Window Functions

*Kompetensi modul:* Menganalisis baris dengan konteks tanpa menghilangkan detail.  
*Prerequisite:* l2m01

- **L2M02L01 · OVER, PARTITION BY, ORDER BY** (concept_and_check, 50 menit)  
  **Teach:** Window function mempertahankan baris sementara agregasi GROUP BY mereduksinya.  
  **Praktik:** Tambahkan total pembayaran per siswa di setiap baris pembayaran.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tambahkan total pembayaran per siswa di setiap baris pembayaran.
- **L2M02L02 · ROW_NUMBER, RANK, dan DENSE_RANK** (guided_lab, 70 menit)  
  **Teach:** Tie membuat rank berbeda dari nomor urut; ORDER BY deterministik diperlukan.  
  **Praktik:** Peringkat 3 siswa dengan pembayaran tertinggi per kelas.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Peringkat 3 siswa dengan pembayaran tertinggi per kelas.
- **L2M02L03 · LAG, LEAD, dan running total** (scenario_challenge, 100 menit)  
  **Teach:** Window frame memengaruhi kumulatif; LAG membantu membandingkan urutan waktu.  
  **Praktik:** Tunjukkan selisih pembayaran bulanan dan saldo berjalan per siswa.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tunjukkan selisih pembayaran bulanan dan saldo berjalan per siswa.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L2M03 — Analitik Waktu dan Laporan

*Kompetensi modul:* Membangun laporan bisnis yang benar terhadap periode dan NULL.  
*Prerequisite:* l2m02

- **L2M03L01 · Rentang tanggal dan timezone** (concept_and_check, 50 menit)  
  **Teach:** Half-open interval >= start AND < end mengurangi bug akhir hari dan timestamp.  
  **Praktik:** Hitung penerimaan bulan tertentu tanpa kehilangan pembayaran pada akhir bulan.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Hitung penerimaan bulan tertentu tanpa kehilangan pembayaran pada akhir bulan.
- **L2M03L02 · Deret waktu dan bulan kosong** (guided_lab, 70 menit)  
  **Teach:** Generate_series dapat membangun kalender laporan termasuk periode tanpa transaksi.  
  **Praktik:** Buat laporan bulanan 12 bulan lengkap walau beberapa bulan tak ada transaksi.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Buat laporan bulanan 12 bulan lengkap walau beberapa bulan tak ada transaksi.
- **L2M03L03 · Outstanding dan aging buckets** (scenario_challenge, 100 menit)  
  **Teach:** Aging menghitung selisih jatuh tempo dengan tanggal acuan yang konsisten.  
  **Praktik:** Klasifikasikan tunggakan menjadi 0–30, 31–60, dan >60 hari.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Klasifikasikan tunggakan menjadi 0–30, 31–60, dan >60 hari.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L2M04 — Kebenaran Hasil Query

*Kompetensi modul:* Membuktikan SQL menghasilkan data yang tepat bukan sekadar terlihat benar.  
*Prerequisite:* l2m03

- **L2M04L01 · Bag semantics dan duplikasi** (concept_and_check, 50 menit)  
  **Teach:** SQL umumnya memperlakukan hasil sebagai multiset; DISTINCT bukan solusi semua join salah.  
  **Praktik:** Uji apakah laporan menduplikasi invoice ketika memiliki beberapa pembayaran.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Uji apakah laporan menduplikasi invoice ketika memiliki beberapa pembayaran.
- **L2M04L02 · Anti-join, NULL, dan edge case** (guided_lab, 70 menit)  
  **Teach:** Kasus nol data, missing relation, dan NULL harus punya expected behavior.  
  **Praktik:** Bandingkan NOT IN vs NOT EXISTS pada dataset yang memuat NULL.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Bandingkan NOT IN vs NOT EXISTS pada dataset yang memuat NULL.
- **L2M04L03 · Uji query dan checkpoint SQL** (scenario_challenge, 100 menit)  
  **Teach:** Query diuji dengan expected rows, bukan dinilai dari string SQL identik.  
  **Praktik:** Selesaikan report outstanding dengan tes untuk partial payment, no payment, dan overpayment yang ditolak.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Selesaikan report outstanding dengan tes untuk partial payment, no payment, dan overpayment yang ditolak.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

**Stage certification:** checkpoint semua modul + ujian level ≥85% + semua invariant kritis lulus.

### L3 — Data Modeling & Schema Evolution (minggu 11–14)

**Tujuan:** Mampu menerjemahkan aturan bisnis menjadi skema yang tangguh dan berevolusi.  
**Domain lab:** Commerce.

#### L3M01 — Domain Modeling

*Kompetensi modul:* Mengonversi persyaratan bisnis menjadi hubungan data yang jelas.  
*Prerequisite:* l2m04

- **L3M01L01 · Entities, attributes, dan lifecycle** (concept_and_check, 50 menit)  
  **Teach:** Entity berbeda dari event; atribut mendeskripsikan state yang tepat.  
  **Praktik:** Uraikan domain order, order_item, payment, dan refund dalam ERD.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Uraikan domain order, order_item, payment, dan refund dalam ERD.
- **L3M01L02 · Cardinality dan optionality** (guided_lab, 70 menit)  
  **Teach:** Kardinalitas 1:1, 1:N, N:M punya konsekuensi constraint dan join.  
  **Praktik:** Modelkan banyak siswa–wali serta hubungan many-to-many lewat junction table.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Modelkan banyak siswa–wali serta hubungan many-to-many lewat junction table.
- **L3M01L03 · Business invariant sebelum tabel** (scenario_challenge, 100 menit)  
  **Teach:** Pola tabel yang tampak nyaman belum tentu menjaga aturan domain.  
  **Praktik:** Tuliskan 8 invariant untuk pembayaran sekolah sebelum memilih schema.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tuliskan 8 invariant untuk pembayaran sekolah sebelum memilih schema.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L3M02 — Normalization dan Trade-off

*Kompetensi modul:* Menghindari anomaly dan memilih denormalization dengan alasan.  
*Prerequisite:* l3m01

- **L3M02L01 · Functional dependency dan 1NF** (concept_and_check, 50 menit)  
  **Teach:** Atomicity data perlu dinilai menurut operasi domain dan dependency.  
  **Praktik:** Perbaiki tabel invoice yang menyimpan daftar ID pembayaran dalam satu string.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Perbaiki tabel invoice yang menyimpan daftar ID pembayaran dalam satu string.
- **L3M02L02 · 2NF, 3NF, dan BCNF praktis** (guided_lab, 70 menit)  
  **Teach:** Dependency yang tidak tepat menyebabkan update anomaly, delete anomaly, insertion anomaly.  
  **Praktik:** Normalisasi tabel order besar dan tunjukkan anomali sebelum/sesudah.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Normalisasi tabel order besar dan tunjukkan anomali sebelum/sesudah.
- **L3M02L03 · Denormalization dan derived data** (scenario_challenge, 100 menit)  
  **Teach:** Duplikasi terkontrol harus memiliki sumber kebenaran dan mekanisme sinkronisasi.  
  **Praktik:** Rancang kolom cached_total dengan strategi invalidation dan reconcile.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Rancang kolom cached_total dengan strategi invalidation dan reconcile.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L3M03 — Tipe dan Constraint Lanjutan

*Kompetensi modul:* Mewujudkan aturan domain pada tingkat database.  
*Prerequisite:* l3m02

- **L3M03L01 · Natural vs surrogate keys** (concept_and_check, 50 menit)  
  **Teach:** ID surrogate memudahkan relasi; business key tetap sering memerlukan UNIQUE.  
  **Praktik:** Tentukan key invoice_number, student_id, dan payment_reference dengan alasan.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tentukan key invoice_number, student_id, dan payment_reference dengan alasan.
- **L3M03L02 · CHECK, composite UNIQUE, dan FK** (guided_lab, 70 menit)  
  **Teach:** Composite uniqueness sering mewakili invariant seperti satu invoice per siswa per periode.  
  **Praktik:** Tambahkan constraint untuk invoice unik per student+period dan amount nonnegatif.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tambahkan constraint untuk invoice unik per student+period dan amount nonnegatif.
- **L3M03L03 · Numeric, timestamps, dan uang** (scenario_challenge, 100 menit)  
  **Teach:** NUMERIC cocok untuk nilai moneter desimal; timestamptz mewakili waktu absolut.  
  **Praktik:** Perbaiki schema uang dari FLOAT menjadi NUMERIC dan gunakan UTC untuk payment event.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Perbaiki schema uang dari FLOAT menjadi NUMERIC dan gunakan UTC untuk payment event.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L3M04 — Perubahan Skema yang Aman

*Kompetensi modul:* Mengembangkan model tanpa mengunci semua penulis data.  
*Prerequisite:* l3m03

- **L3M04L01 · Migration dan schema versioning** (concept_and_check, 50 menit)  
  **Teach:** Schema evolution harus reversible atau memiliki rollback plan yang realistis.  
  **Praktik:** Ubah field status invoice dan tuliskan migrasi forward + strategi rollback.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Ubah field status invoice dan tuliskan migrasi forward + strategi rollback.
- **L3M04L02 · Expand–migrate–contract** (guided_lab, 70 menit)  
  **Teach:** Perubahan backward-compatible memungkinkan deploy bertahap antarversi aplikasi.  
  **Praktik:** Tambahkan kolom not null pada tabel yang sudah memiliki data dengan backfill aman.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tambahkan kolom not null pada tabel yang sudah memiliki data dengan backfill aman.
- **L3M04L03 · Data quality dan reconciliation** (scenario_challenge, 100 menit)  
  **Teach:** Migrations harus memvalidasi jumlah record, constraint, dan relasi setelah perubahan.  
  **Praktik:** Bandingkan checksum/agregat sebelum dan sesudah backfill alamat siswa.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Bandingkan checksum/agregat sebelum dan sesudah backfill alamat siswa.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

**Stage certification:** checkpoint semua modul + ujian level ≥85% + semua invariant kritis lulus.

### L4 — Transactions & Concurrency (minggu 15–19)

**Tujuan:** Menjaga invariant ketika transaksi simultan dan kegagalan terjadi.  
**Domain lab:** Payment Ledger.

#### L4M01 — ACID dan Transaction Boundary

*Kompetensi modul:* Membuat operasi bisnis atomik dan mendesain transaction scope.  
*Prerequisite:* l3m04

- **L4M01L01 · Atomicity dan durability** (concept_and_check, 50 menit)  
  **Teach:** Commit menandai unit perubahan atomik; rollback membatalkan operasi tak sukses.  
  **Praktik:** Transfer dana antar-rekening di dua UPDATE dalam satu transaksi.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Transfer dana antar-rekening di dua UPDATE dalam satu transaksi.
- **L4M01L02 · Consistency dan invariants** (guided_lab, 70 menit)  
  **Teach:** Consistency berarti aplikasi+constraint mempertahankan invariant, bukan jaminan semua logic oleh engine.  
  **Praktik:** Tuliskan invariant total saldo sebelum dan sesudah transfer.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tuliskan invariant total saldo sebelum dan sesudah transfer.
- **L4M01L03 · Transaction boundary dan error** (scenario_challenge, 100 menit)  
  **Teach:** Transaksi panjang menambah contention; kegagalan pada commit dapat menuntut rekonsiliasi.  
  **Praktik:** Simulasikan error di langkah kedua dan buktikan tidak ada transfer parsial.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Simulasikan error di langkah kedua dan buktikan tidak ada transfer parsial.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L4M02 — Isolation dan MVCC

*Kompetensi modul:* Membedakan snapshot visibility dari mekanisme locking.  
*Prerequisite:* l4m01

- **L4M02L01 · Isolation levels PostgreSQL** (concept_and_check, 50 menit)  
  **Teach:** READ COMMITTED dan REPEATABLE READ berbeda pada snapshot; SERIALIZABLE perlu retry.  
  **Praktik:** Jalankan dua session membaca data yang diperbarui di tengah transaksi.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Jalankan dua session membaca data yang diperbarui di tengah transaksi.
- **L4M02L02 · MVCC snapshots** (guided_lab, 70 menit)  
  **Teach:** Versi baris memungkinkan reader dan writer berinteraksi tanpa memblokir semua operasi.  
  **Praktik:** Amati baris yang terlihat sebelum dan setelah commit di dua session.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Amati baris yang terlihat sebelum dan setelah commit di dua session.
- **L4M02L03 · SELECT FOR UPDATE dan row lock** (scenario_challenge, 100 menit)  
  **Teach:** Row-level lock melindungi konflik tertentu; locking yang tidak perlu mengurangi throughput.  
  **Praktik:** Buat dua worker mengubah saldo baris sama dan amati waiting.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Buat dua worker mengubah saldo baris sama dan amati waiting.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L4M03 — Concurrency Anomalies

*Kompetensi modul:* Mendeteksi race condition dan membuktikan perbaikannya.  
*Prerequisite:* l4m02

- **L4M03L01 · Lost update dan atomic UPDATE** (concept_and_check, 50 menit)  
  **Teach:** Read-modify-write di aplikasi rentan; UPDATE ... WHERE memungkinkan kondisi atomik.  
  **Praktik:** Perbaiki debit bersamaan dengan UPDATE balance=balance-amount WHERE balance>=amount.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Perbaiki debit bersamaan dengan UPDATE balance=balance-amount WHERE balance>=amount.
- **L4M03L02 · Write skew dan phantom** (guided_lab, 70 menit)  
  **Teach:** Invariant lintas baris bisa rusak meskipun update terjadi pada row berbeda.  
  **Praktik:** Buktikan write skew aturan minimal satu dokter piket dan perbaiki dengan desain/serializable.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Buktikan write skew aturan minimal satu dokter piket dan perbaiki dengan desain/serializable.
- **L4M03L03 · Deadlock, timeout, dan retry** (scenario_challenge, 100 menit)  
  **Teach:** Lock ordering konsisten dan retry bounded mengurangi kegagalan operasi.  
  **Praktik:** Ciptakan deadlock deterministik lalu susun strategi retry untuk deadlock SQLSTATE 40P01.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Ciptakan deadlock deterministik lalu susun strategi retry untuk deadlock SQLSTATE 40P01.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L4M04 — Payments dan Idempotency

*Kompetensi modul:* Menangani request duplikat, callback, dan result uncertainty.  
*Prerequisite:* l4m03

- **L4M04L01 · Idempotency key dan unique guard** (concept_and_check, 50 menit)  
  **Teach:** Key unik memberi identitas operasi; pemeriksaan lalu insert tanpa constraint tetap race.  
  **Praktik:** Proses dua callback paralel untuk reference sama dan buktikan hanya satu efek.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Proses dua callback paralel untuk reference sama dan buktikan hanya satu efek.
- **L4M04L02 · Ledger vs mutable balance** (guided_lab, 70 menit)  
  **Teach:** Ledger append-only menyediakan audit; saldo dapat direkonsiliasi dari posting yang valid.  
  **Praktik:** Buat jurnal debit-kredit serta query yang memastikan total posting nol.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Buat jurnal debit-kredit serta query yang memastikan total posting nol.
- **L4M04L03 · Exactly-once effect sebagai tujuan** (scenario_challenge, 100 menit)  
  **Teach:** Jaringan bisa mengirim ulang; kombinasi constraint dan transaksi memberi efek sekali secara terukur.  
  **Praktik:** Simulasikan respons hilang setelah commit kemudian ulangi request tanpa double charge.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Simulasikan respons hilang setelah commit kemudian ulangi request tanpa double charge.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L4M05 — Reliable Side Effects

*Kompetensi modul:* Menghubungkan commit DB dengan event eksternal yang tidak atomik.  
*Prerequisite:* l4m04

- **L4M05L01 · Transactional outbox** (concept_and_check, 50 menit)  
  **Teach:** Menyimpan event outbox dalam transaksi yang sama menghindari gap antara commit dan enqueue.  
  **Praktik:** Simpan pembayaran serta outbox event dalam satu commit.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Simpan pembayaran serta outbox event dalam satu commit.
- **L4M05L02 · Worker retry dan deduplication** (guided_lab, 70 menit)  
  **Teach:** At-least-once delivery butuh consumer idempotent dan backoff yang wajar.  
  **Praktik:** Simulasikan pengiriman WA gagal lalu diproses ulang tanpa notifikasi ganda semaksimal yang dapat dijamin.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Simulasikan pengiriman WA gagal lalu diproses ulang tanpa notifikasi ganda semaksimal yang dapat dijamin.
- **L4M05L03 · Concurrency certification** (scenario_challenge, 100 menit)  
  **Teach:** Uji multisesi adalah evidence; happy-path test tidak membuktikan concurrency safety.  
  **Praktik:** Jalankan 100 debit paralel, periksa saldo akhir dan jumlah transaksi sukses.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Jalankan 100 debit paralel, periksa saldo akhir dan jumlah transaksi sukses.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

**Stage certification:** checkpoint semua modul + ujian level ≥85% + semua invariant kritis lulus.

### L5 — Performance Engineering (minggu 20–24)

**Tujuan:** Mengukur, menjelaskan, dan memperbaiki performa berdasarkan evidence.  
**Domain lab:** Commerce + Analytics.

#### L5M01 — Membaca Query Planner

*Kompetensi modul:* Mengukur biaya sesungguhnya dan memahami planner estimates.  
*Prerequisite:* l4m05

- **L5M01L01 · EXPLAIN dan operator plan** (concept_and_check, 50 menit)  
  **Teach:** Seq Scan, Index Scan, Hash Join, Nested Loop, Sort punya trade-off berbeda.  
  **Praktik:** Baca dua execution plan untuk query customer orders.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Baca dua execution plan untuk query customer orders.
- **L5M01L02 · EXPLAIN ANALYZE BUFFERS** (guided_lab, 70 menit)  
  **Teach:** Actual rows, loops, timing, shared hit/read membantu membedakan CPU dan I/O.  
  **Praktik:** Profil query lambat, catat baseline p50/p95 dari beberapa run.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Profil query lambat, catat baseline p50/p95 dari beberapa run.
- **L5M01L03 · Statistics dan estimates** (scenario_challenge, 100 menit)  
  **Teach:** Planner bergantung pada statistik distribusi; estimates buruk dapat memilih join salah.  
  **Praktik:** Bandingkan plan sebelum dan sesudah ANALYZE pada data skew.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Bandingkan plan sebelum dan sesudah ANALYZE pada data skew.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L5M02 — Index Design

*Kompetensi modul:* Memilih indeks untuk workload, bukan menambahkan indeks ke semua kolom.  
*Prerequisite:* l5m01

- **L5M02L01 · B-tree dan selectivity** (concept_and_check, 50 menit)  
  **Teach:** B-tree mengoptimalkan pencarian/urut tertentu; lookup sangat tidak selektif dapat memilih seq scan.  
  **Praktik:** Bandingkan query filter status populer vs invoice_id spesifik.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Bandingkan query filter status populer vs invoice_id spesifik.
- **L5M02L02 · Composite, covering, dan partial** (guided_lab, 70 menit)  
  **Teach:** Urutan key, INCLUDE, dan predicate menentukan manfaat indeks.  
  **Praktik:** Rancang indeks untuk filter student_id dan sort due_date pada invoice belum lunas.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Rancang indeks untuk filter student_id dan sort due_date pada invoice belum lunas.
- **L5M02L03 · Index cost dan write amplification** (scenario_challenge, 100 menit)  
  **Teach:** Index mempercepat baca tertentu dengan biaya storage dan write maintenance.  
  **Praktik:** Ukur perbedaan insert throughput dan ukuran DB sebelum/sesudah beberapa indeks.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Ukur perbedaan insert throughput dan ukuran DB sebelum/sesudah beberapa indeks.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L5M03 — Joins, Sorts, dan Rewrite

*Kompetensi modul:* Memperbaiki query bermasalah sambil menjaga kesetaraan hasil.  
*Prerequisite:* l5m02

- **L5M03L01 · Hash join vs nested loop vs merge** (concept_and_check, 50 menit)  
  **Teach:** Ukuran input dan indeks mempengaruhi pemilihan algoritma join.  
  **Praktik:** Bandingkan join kecil ke besar dan besar ke besar tanpa memaksa setting global.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Bandingkan join kecil ke besar dan besar ke besar tanpa memaksa setting global.
- **L5M03L02 · Sort, spill, dan work_mem** (guided_lab, 70 menit)  
  **Teach:** Sort besar dapat spill disk; tuning memory perlu memperhatikan koneksi paralel.  
  **Praktik:** Temukan Sort Method pada EXPLAIN dan uji peningkatan lokal session yang terbatas.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Temukan Sort Method pada EXPLAIN dan uji peningkatan lokal session yang terbatas.
- **L5M03L03 · Rewrite dan hasil ekuivalen** (scenario_challenge, 100 menit)  
  **Teach:** Pre-aggregation atau EXISTS kadang menghindari multiplicity dan kerja berlebih.  
  **Praktik:** Optimasi laporan outstanding tanpa mengubah output terhadap dataset edge-case.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Optimasi laporan outstanding tanpa mengubah output terhadap dataset edge-case.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L5M04 — Large Data Strategies

*Kompetensi modul:* Menghadapi peningkatan ukuran tabel dengan disiplin pengukuran.  
*Prerequisite:* l5m03

- **L5M04L01 · Skala data dan distribusi skew** (concept_and_check, 50 menit)  
  **Teach:** Data 1 juta baris dengan 1% tenant dominan memiliki perilaku berbeda dari distribusi merata.  
  **Praktik:** Generate dataset besar secara reproducible dengan variasi skew.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Generate dataset besar secara reproducible dengan variasi skew.
- **L5M04L02 · Keyset vs offset pagination** (guided_lab, 70 menit)  
  **Teach:** Offset besar makin mahal dan bisa tidak stabil ketika data berubah.  
  **Praktik:** Implementasikan seek pagination berdasar created_at dan id.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Implementasikan seek pagination berdasar created_at dan id.
- **L5M04L03 · Batch writes dan contention** (scenario_challenge, 100 menit)  
  **Teach:** Batch terlalu besar memanjangkan lock dan lonjakan WAL; terlalu kecil menambah overhead.  
  **Praktik:** Uji 3 ukuran batch insert dan analisis throughput serta rollback.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Uji 3 ukuran batch insert dan analisis throughput serta rollback.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L5M05 — Workload Tuning Clinic

*Kompetensi modul:* Menilai perbaikan secara sistematis dan mempertimbangkan regresi.  
*Prerequisite:* l5m04

- **L5M05L01 · Baseline dan metodologi benchmark** (concept_and_check, 50 menit)  
  **Teach:** Warm cache, sampling, concurrency, dan data volume mempengaruhi interpretasi angka.  
  **Praktik:** Rancang benchmark dengan jumlah run, ukuran dataset dan p95 latency.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Rancang benchmark dengan jumlah run, ukuran dataset dan p95 latency.
- **L5M05L02 · Pool, transactions, dan N+1** (guided_lab, 70 menit)  
  **Teach:** Bottleneck bisa berada pada round-trip, ORM, atau pool bukan SQL tunggal.  
  **Praktik:** Bandingkan 100 SELECT per invoice dengan satu query teragregasi.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Bandingkan 100 SELECT per invoice dengan satu query teragregasi.
- **L5M05L03 · Performance certification** (scenario_challenge, 100 menit)  
  **Teach:** Optimasi harus benar, terukur, dan mampu menjelaskan trade-off.  
  **Praktik:** Kurangi p95 query lambat dengan target terukur dan sertakan EXPLAIN before/after.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Kurangi p95 query lambat dengan target terukur dan sertakan EXPLAIN before/after.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

**Stage certification:** checkpoint semua modul + ujian level ≥85% + semua invariant kritis lulus.

### L6 — PostgreSQL Internals (minggu 25–28)

**Tujuan:** Memahami mekanisme penyimpanan, MVCC, WAL, dan housekeeping.  
**Domain lab:** PostgreSQL Lab.

#### L6M01 — Physical Storage dan Buffering

*Kompetensi modul:* Mengerti lapisan page, heap tuple, dan cache.  
*Prerequisite:* l5m05

- **L6M01L01 · Heap pages dan tuple** (concept_and_check, 50 menit)  
  **Teach:** Row PostgreSQL tersimpan sebagai tuple di pages; update dapat menghasilkan versi baru.  
  **Praktik:** Bandingkan ukuran tabel setelah insert dan update massal di lab.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Bandingkan ukuran tabel setelah insert dan update massal di lab.
- **L6M01L02 · Shared buffers dan OS cache** (guided_lab, 70 menit)  
  **Teach:** Data dapat dilayani cache, sehingga benchmarking disk perlu interpretasi cache hit.  
  **Praktik:** Bandingkan buffer hits/reads di EXPLAIN repeated run.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Bandingkan buffer hits/reads di EXPLAIN repeated run.
- **L6M01L03 · TOAST dan data lebar** (scenario_challenge, 100 menit)  
  **Teach:** Nilai besar dapat disimpan out-of-line dan berpengaruh pada storage dan I/O.  
  **Praktik:** Bandingkan ukuran rows kecil dan teks panjang memakai pg_column_size.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Bandingkan ukuran rows kecil dan teks panjang memakai pg_column_size.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L6M02 — WAL dan Durability

*Kompetensi modul:* Mengamati apa yang dibutuhkan untuk crash recovery.  
*Prerequisite:* l6m01

- **L6M02L01 · Write-ahead logging** (concept_and_check, 50 menit)  
  **Teach:** WAL mencatat perubahan sebelum data pages menjadi durable; bukan sekadar audit log aplikasi.  
  **Praktik:** Amati pertumbuhan statistik WAL pada operasi insert dalam sandbox.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Amati pertumbuhan statistik WAL pada operasi insert dalam sandbox.
- **L6M02L02 · Checkpoint dan fsync** (guided_lab, 70 menit)  
  **Teach:** Checkpoint membatasi kebutuhan redo setelah crash; durability bergantung konfigurasi dan storage.  
  **Praktik:** Bandingkan dampak checkpoint berdasarkan metrik tanpa menonaktifkan durability di production.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Bandingkan dampak checkpoint berdasarkan metrik tanpa menonaktifkan durability di production.
- **L6M02L03 · Crash recovery mental model** (scenario_challenge, 100 menit)  
  **Teach:** Setelah crash, committed changes direcover, operasi belum commit tidak boleh tampak.  
  **Praktik:** Prediksi hasil dua transaksi berbeda status commit dalam failure simulator.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Prediksi hasil dua transaksi berbeda status commit dalam failure simulator.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L6M03 — Vacuum, Bloat, dan Autovacuum

*Kompetensi modul:* Memahami lifecycle row versions dan pemeliharaannya.  
*Prerequisite:* l6m02

- **L6M03L01 · Dead tuples dan vacuum** (concept_and_check, 50 menit)  
  **Teach:** UPDATE/DELETE menghasilkan row versions yang tidak langsung dibuang karena MVCC.  
  **Praktik:** Lakukan update massal dan amati statistik dead tuples sebelum/sesudah vacuum.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Lakukan update massal dan amati statistik dead tuples sebelum/sesudah vacuum.
- **L6M03L02 · Long transactions dan bloat** (guided_lab, 70 menit)  
  **Teach:** Transaksi lama bisa menahan pembersihan dan memperburuk storage.  
  **Praktik:** Simulasikan reader lama lalu amati penundaan reclaim dalam lab terisolasi.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Simulasikan reader lama lalu amati penundaan reclaim dalam lab terisolasi.
- **L6M03L03 · Autovacuum dan freeze** (scenario_challenge, 100 menit)  
  **Teach:** Autovacuum menjaga kesehatan tabel dan mencegah masalah transaction ID wraparound.  
  **Praktik:** Baca pg_stat_user_tables dan buat rekomendasi pemeliharaan tanpa tuning sembrono.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Baca pg_stat_user_tables dan buat rekomendasi pemeliharaan tanpa tuning sembrono.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L6M04 — Observability Engine

*Kompetensi modul:* Menghubungkan metric internal dengan penyebab insiden.  
*Prerequisite:* l6m03

- **L6M04L01 · pg_stat_activity dan waits** (concept_and_check, 50 menit)  
  **Teach:** Wait_event membantu membedakan lock wait, I/O wait, dan query aktif.  
  **Praktik:** Cari blocker dan waiter pada dua transaksi di lab.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Cari blocker dan waiter pada dua transaksi di lab.
- **L6M04L02 · Statistics views dan query patterns** (guided_lab, 70 menit)  
  **Teach:** Metrik cumulative perlu dipahami periode pengamatannya dan normalisasi query.  
  **Praktik:** Temukan tabel dengan scan berlebih dan hipotesis index yang bisa diuji.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Temukan tabel dengan scan berlebih dan hipotesis index yang bisa diuji.
- **L6M04L03 · Diagnose without guessing** (scenario_challenge, 100 menit)  
  **Teach:** Diagnosis dimulai dari gejala, data, dan hipotesis yang bisa difalsifikasi.  
  **Praktik:** Tulis incident report untuk lonjakan latency dengan tiga bukti terukur.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tulis incident report untuk lonjakan latency dengan tiga bukti terukur.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

**Stage certification:** checkpoint semua modul + ujian level ≥85% + semua invariant kritis lulus.

### L7 — Production & Reliability (minggu 29–32)

**Tujuan:** Menerapkan perubahan, observability, backup, recovery, dan keamanan.  
**Domain lab:** Production Simulator.

#### L7M01 — Schema Releases & Online Changes

*Kompetensi modul:* Mempertahankan kompatibilitas aplikasi ketika schema berubah.  
*Prerequisite:* l6m04

- **L7M01L01 · Migration ordering dan rollback** (concept_and_check, 50 menit)  
  **Teach:** DDL bisa mengambil lock; backfill harus punya strategy cutover dan recovery.  
  **Praktik:** Rancang penambahan kolom non-null pada tabel 10 juta rows.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Rancang penambahan kolom non-null pada tabel 10 juta rows.
- **L7M01L02 · Backfill terkontrol** (guided_lab, 70 menit)  
  **Teach:** Batch backfill + progress marker memungkinkan resume tanpa lock panjang.  
  **Praktik:** Buat pseudocode batch yang idempotent dan checkpoint.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Buat pseudocode batch yang idempotent dan checkpoint.
- **L7M01L03 · Deployment runbook** (scenario_challenge, 100 menit)  
  **Teach:** Runbook mencakup preflight, monitoring, go/no-go, dan rollback.  
  **Praktik:** Susun runbook deploy skema invoice_status dengan versi aplikasi lama+baru.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Susun runbook deploy skema invoice_status dengan versi aplikasi lama+baru.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L7M02 — Backup, Restore, dan PITR

*Kompetensi modul:* Membedakan punya backup dengan mampu recover.  
*Prerequisite:* l7m01

- **L7M02L01 · Backup strategy dan RPO/RTO** (concept_and_check, 50 menit)  
  **Teach:** RPO membatasi kehilangan data tolerabel; RTO membatasi lama pemulihan.  
  **Praktik:** Pilih backup dan WAL archiving untuk dua target RPO/RTO berbeda.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Pilih backup dan WAL archiving untuk dua target RPO/RTO berbeda.
- **L7M02L02 · Restore dan verification** (guided_lab, 70 menit)  
  **Teach:** Backup valid bila benar-benar bisa direstore dan dicek integritasnya.  
  **Praktik:** Restore database staging dari backup lab lalu verifikasi sampel dan counts.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Restore database staging dari backup lab lalu verifikasi sampel dan counts.
- **L7M02L03 · Point-in-Time Recovery** (scenario_challenge, 100 menit)  
  **Teach:** PITR memungkinkan pemulihan ke titik waktu sebelumnya bila base backup dan WAL lengkap.  
  **Praktik:** Simulasikan accidental delete dan recover ke waktu tepat sebelum insiden.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Simulasikan accidental delete dan recover ke waktu tepat sebelum insiden.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L7M03 — Replication dan Failover

*Kompetensi modul:* Menilai freshness data dan konsekuensi pergantian primary.  
*Prerequisite:* l7m02

- **L7M03L01 · Streaming replication dan lag** (concept_and_check, 50 menit)  
  **Teach:** Replica async dapat tertinggal; read-your-writes tidak otomatis terjamin.  
  **Praktik:** Jelaskan hasil read pada replica ketika commit primary baru terjadi.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Jelaskan hasil read pada replica ketika commit primary baru terjadi.
- **L7M03L02 · Failover dan split-brain** (guided_lab, 70 menit)  
  **Teach:** Promosi replica dan fencing diperlukan untuk menghindari dua primary yang menerima write.  
  **Praktik:** Buat urutan insiden primary failure dan langkah validasi setelah failover.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Buat urutan insiden primary failure dan langkah validasi setelah failover.
- **L7M03L03 · Read replicas dan consistency** (scenario_challenge, 100 menit)  
  **Teach:** Mengarahkan semua read ke replica dapat menghasilkan data stale yang tidak sesuai domain.  
  **Praktik:** Pilih endpoint read untuk dashboard, saldo, dan status pembayaran beserta alasannya.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Pilih endpoint read untuk dashboard, saldo, dan status pembayaran beserta alasannya.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L7M04 — Operational Security & Incidents

*Kompetensi modul:* Mengurangi blast radius saat konfigurasi atau operasi salah.  
*Prerequisite:* l7m03

- **L7M04L01 · Least privilege dan secret hygiene** (concept_and_check, 50 menit)  
  **Teach:** Akun aplikasi tidak seharusnya superuser dan credential tidak boleh masuk log.  
  **Praktik:** Buat matriks hak akses readonly, writer, migrator, dan admin.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Buat matriks hak akses readonly, writer, migrator, dan admin.
- **L7M04L02 · Connection limits dan pooling** (guided_lab, 70 menit)  
  **Teach:** Koneksi DB memerlukan memori; pool harus disesuaikan workload dan transaksi.  
  **Praktik:** Hitung budget connection pada 4 instance aplikasi dan simulasi pool exhaustion.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Hitung budget connection pada 4 instance aplikasi dan simulasi pool exhaustion.
- **L7M04L03 · Incident response game day** (scenario_challenge, 100 menit)  
  **Teach:** Mitigasi mengikuti bukti dan tujuan layanan, bukan langsung restart semua komponen.  
  **Praktik:** Tangani skenario blocked writes, backup gagal, dan lag replica dengan runbook.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tangani skenario blocked writes, backup gagal, dan lag replica dengan runbook.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

**Stage certification:** checkpoint semua modul + ujian level ≥85% + semua invariant kritis lulus.

### L8 — Database Architecture & Scaling (minggu 33–36)

**Tujuan:** Membuat keputusan scaling dan arsitektur berdasarkan trade-off.  
**Domain lab:** Platform-scale.

#### L8M01 — Caching & Consistency Trade-offs

*Kompetensi modul:* Mengurangi load baca tanpa mengorbankan kontrak data.  
*Prerequisite:* l7m04

- **L8M01L01 · Cache-aside dan TTL** (concept_and_check, 50 menit)  
  **Teach:** Cache mengubah freshness data; invalidation bergantung domain.  
  **Praktik:** Desain cache jumlah produk yang bisa menerima delay vs saldo yang harus segar.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Desain cache jumlah produk yang bisa menerima delay vs saldo yang harus segar.
- **L8M01L02 · Read models & CQRS** (guided_lab, 70 menit)  
  **Teach:** Memisahkan model baca dan tulis dapat membantu skala tetapi menambah sinkronisasi.  
  **Praktik:** Rancang projection outstanding invoice yang eventually consistent.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Rancang projection outstanding invoice yang eventually consistent.
- **L8M01L03 · Consistency contracts** (scenario_challenge, 100 menit)  
  **Teach:** Setiap API perlu menjelaskan jaminan freshness, ordering, dan failure behavior.  
  **Praktik:** Tuliskan kontrak konsistensi untuk dashboard, ledger, dan notifikasi.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tuliskan kontrak konsistensi untuk dashboard, ledger, dan notifikasi.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L8M02 — Partitioning, Sharding, dan Tenant

*Kompetensi modul:* Memilih skala data dengan cost/benefit dan operasi nyata.  
*Prerequisite:* l8m01

- **L8M02L01 · Partitioning lokal PostgreSQL** (concept_and_check, 50 menit)  
  **Teach:** Partition pruning efektif hanya pada filter yang cocok dengan partition key.  
  **Praktik:** Rancang partisi bulanan transaksi dan uji query per bulan.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Rancang partisi bulanan transaksi dan uji query per bulan.
- **L8M02L02 · Sharding dan routing key** (guided_lab, 70 menit)  
  **Teach:** Sharding membuat cross-shard transaksi, query, dan rebalance lebih kompleks.  
  **Praktik:** Pilih shard key tenant_id dan jelaskan hot tenant problem.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Pilih shard key tenant_id dan jelaskan hot tenant problem.
- **L8M02L03 · Multi-tenancy & isolation** (scenario_challenge, 100 menit)  
  **Teach:** Pilihan database-per-tenant, schema-per-tenant, row-level tenancy berbeda operasionalnya.  
  **Praktik:** Bandingkan 3 strategi untuk platform sekolah multi-cabang.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Bandingkan 3 strategi untuk platform sekolah multi-cabang.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L8M03 — Distributed Data Systems

*Kompetensi modul:* Memahami failure dan consistency pada sistem tersebar.  
*Prerequisite:* l8m02

- **L8M03L01 · Replication consistency** (concept_and_check, 50 menit)  
  **Teach:** Strong vs eventual consistency adalah keputusan kontrak, bukan penilaian mutlak baik/buruk.  
  **Praktik:** Modelkan kapan status pembayaran dapat tertunda antar-service.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Modelkan kapan status pembayaran dapat tertunda antar-service.
- **L8M03L02 · Distributed transactions & saga** (guided_lab, 70 menit)  
  **Teach:** 2PC dan saga menghadapi latensi, failure, dan kompensasi yang berbeda.  
  **Praktik:** Rancang alur order-payment-inventory tanpa klaim atomic commit lintas semua service.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Rancang alur order-payment-inventory tanpa klaim atomic commit lintas semua service.
- **L8M03L03 · Retries, ordering, dan duplicates** (scenario_challenge, 100 menit)  
  **Teach:** At-least-once message delivery menuntut dedup dan event ordering di konsumen.  
  **Praktik:** Buat desain consumer yang menolak event versi lama.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Buat desain consumer yang menolak event versi lama.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L8M04 — Choosing the Right Data Store

*Kompetensi modul:* Menggunakan teknologi sesuai query dan consistency needs.  
*Prerequisite:* l8m03

- **L8M04L01 · OLTP vs OLAP** (concept_and_check, 50 menit)  
  **Teach:** Skema dan pola akses transaksi berbeda dengan beban kerja analitik kolumnar.  
  **Praktik:** Rancang pipeline dari PostgreSQL OLTP ke warehouse tanpa mengganggu transaksi.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Rancang pipeline dari PostgreSQL OLTP ke warehouse tanpa mengganggu transaksi.
- **L8M04L02 · Document, key-value, graph, search** (guided_lab, 70 menit)  
  **Teach:** Model data dan query harus menjadi alasan memilih mesin yang berbeda.  
  **Praktik:** Pilih storage untuk catalog dokumen, session token, graph relasi, dan full-text search.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Pilih storage untuk catalog dokumen, session token, graph relasi, dan full-text search.
- **L8M04L03 · Architecture decision record** (scenario_challenge, 100 menit)  
  **Teach:** ADR mengukur trade-off cost, ops, correctness, scale, dan reversibility.  
  **Praktik:** Pertahankan keputusan PostgreSQL tunggal vs microservice shards berdasarkan requirement.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Pertahankan keputusan PostgreSQL tunggal vs microservice shards berdasarkan requirement.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

**Stage certification:** checkpoint semua modul + ujian level ≥85% + semua invariant kritis lulus.

### L9 — Master Capstone (minggu 37–42)

**Tujuan:** Mendesain, membangun, menguji, memulihkan, dan mempertahankan sebuah sistem data.  
**Domain lab:** Payment Ledger.

#### L9M01 — Capstone: Design the Ledger

*Kompetensi modul:* Mengumpulkan kebutuhan dan menyiapkan desain payment ledger yang bisa diuji.  
*Prerequisite:* l8m04

- **L9M01L01 · Requirements & invariants** (concept_and_check, 50 menit)  
  **Teach:** Fungsional, nonfungsional, consistency, dan acceptance tests harus eksplisit.  
  **Praktik:** Tulis spesifikasi pembayaran dengan satu juta riwayat transaksi dan callback berulang.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Tulis spesifikasi pembayaran dengan satu juta riwayat transaksi dan callback berulang.
- **L9M01L02 · Schema, constraints & migrations** (guided_lab, 70 menit)  
  **Teach:** Desain transaksi mencakup ledger, idempotency, outbox, audit, dan key bisnis.  
  **Praktik:** Implementasikan migration dan constraints dengan fixture edge cases.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Implementasikan migration dan constraints dengan fixture edge cases.
- **L9M01L03 · API transaction boundary** (scenario_challenge, 100 menit)  
  **Teach:** Transaction boundary harus meliputi semua perubahan atomik yang membentuk efek pembayaran.  
  **Praktik:** Rancang pseudo API untuk debit, credit, duplicate callback, dan reconciliation.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Rancang pseudo API untuk debit, credit, duplicate callback, dan reconciliation.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L9M02 — Capstone: Load and Failure Testing

*Kompetensi modul:* Mengukur dan merusak sistem sebelum dinyatakan layak.  
*Prerequisite:* l9m01

- **L9M02L01 · Concurrency & idempotency attack** (concept_and_check, 50 menit)  
  **Teach:** Stress test harus menunjukkan invariant bertahan bukan hanya server tetap 200 OK.  
  **Praktik:** Jalankan 300 request/detik target dengan 5% callback duplikat; rekonsiliasi seluruh efek.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Jalankan 300 request/detik target dengan 5% callback duplikat; rekonsiliasi seluruh efek.
- **L9M02L02 · Query tuning & scale rehearsal** (guided_lab, 70 menit)  
  **Teach:** Target p95 disepakati dari baseline; perubahan harus dibuktikan benchmark repeated run.  
  **Praktik:** Optimasi riwayat transaksi besar, sertakan before/after EXPLAIN dan bukti output setara.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Optimasi riwayat transaksi besar, sertakan before/after EXPLAIN dan bukti output setara.
- **L9M02L03 · Backup & failure drill** (scenario_challenge, 100 menit)  
  **Teach:** Kegagalan koneksi/primary/data deletion menguji recovery and incident response.  
  **Praktik:** Simulasikan ketidakpastian commit, restore ke titik waktu, dan laporan RPO/RTO tercapai/tidak.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Simulasikan ketidakpastian commit, restore ke titik waktu, dan laporan RPO/RTO tercapai/tidak.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

#### L9M03 — Capstone: Master Defense

*Kompetensi modul:* Menyampaikan bukti dan trade-off sebagai engineer senior.  
*Prerequisite:* l9m02

- **L9M03L01 · Threat model & security review** (concept_and_check, 50 menit)  
  **Teach:** Hak akses, input validation, audit trail, dan secret rotation dinilai berlapis.  
  **Praktik:** Presentasikan threat model untuk data pembayaran dan mitigasinya.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Presentasikan threat model untuk data pembayaran dan mitigasinya.
- **L9M03L02 · Architecture defense** (guided_lab, 70 menit)  
  **Teach:** Pilihan teknik harus cocok dengan constraints dan biaya operasional.  
  **Praktik:** Pertahankan desain di hadapan reviewer yang menantang pilihan index, isolation, dan replication.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Pertahankan desain di hadapan reviewer yang menantang pilihan index, isolation, dan replication.
- **L9M03L03 · Final rubric & postmortem** (scenario_challenge, 100 menit)  
  **Teach:** Mastery menuntut correctness, reliability, pengukuran, serta kemampuan belajar dari error.  
  **Praktik:** Kumpulkan dokumentasi, kode, pengujian otomatis, metrics, incident postmortem, dan ADR.  
  **Reflection:** Jelaskan alasan solusi latihan ini benar, lalu sebutkan setidaknya satu kondisi ketika pendekatan tersebut gagal atau kurang tepat: Kumpulkan dokumentasi, kode, pengujian otomatis, metrics, incident postmortem, dan ADR.
**Checkpoint modul:** lab wajib lulus; quiz ≥80%; pembahasan alasan & edge case.

**Stage certification:** checkpoint semua modul + ujian level ≥85% + semua invariant kritis lulus.

## Milestone produk yang dikerjakan murid

| Level | Output konkret |
|---|---|
| L0 | Model relasional dan query pertama |
| L1 | School Finance SQL Reports |
| L2 | School Financial Analytics + edge-case SQL tests |
| L3 | ERD dan migrasi commerce yang aman |
| L4 | Payment ledger dengan idempotency, outbox, dan concurrency tests |
| L5 | Performance dossier berisi benchmark serta EXPLAIN before/after |
| L6 | PostgreSQL internals investigation report |
| L7 | Production runbook + verified restore/PITR drill |
| L8 | Architecture Decision Record yang membandingkan alternatif |
| L9 | Payment system master capstone dan defense |

## Contoh lesson standar yang sudah ditulis lengkap

### L1M01L03 — NULL dan Three-valued Logic

**Tujuan:** setelah lesson ini murid dapat menjelaskan mengapa `col = NULL` tidak mengembalikan baris, menggunakan `IS NULL`/`IS NOT NULL`, dan menganalisis jebakan `NOT IN` jika hasil subquery mengandung NULL.

**Hook:** Tim finance melaporkan invoice belum dibayar. Query `WHERE paid_at = NULL` menghasilkan nol baris walau beberapa pembayaran belum tercatat. Apa yang salah?

**Konsep:** Di SQL, NULL menandakan nilai tidak diketahui/tidak ada. Ekspresi `x = NULL` dievaluasi menjadi UNKNOWN, bukan TRUE, bahkan ketika x juga NULL. Filter `WHERE` hanya melewatkan baris yang evaluasinya TRUE. Gunakan `IS NULL` untuk menguji apakah nilai tidak tersedia. Nilai NULL juga mempengaruhi AND, OR, agregasi, JOIN, dan subquery. Jangan menyamakan NULL dengan angka nol atau string kosong.

**Worked example (PostgreSQL):**
```sql
SELECT payment_id, invoice_id, paid_at
FROM school.payments
WHERE paid_at IS NULL
ORDER BY payment_id;
```
Query di atas mencari pembayaran yang timestamp pelunasannya belum dicatat; untuk *invoice belum terbayar*, gunakan sumber kebenaran tagihan dan agregasi payment yang berhasil, bukan mengasumsikan setiap invoice punya payment record.

**Guided activity:** Prediksi hasil `SELECT NULL = NULL AS comparison, NULL IS NULL AS missing;` lalu eksekusi untuk melihat `comparison = NULL (UNKNOWN)` dan `missing = TRUE`.

**Challenge:** Temukan invoice tanpa pembayaran berstatus `succeeded` menggunakan `NOT EXISTS` dan tabel `school.invoices`, `school.payments`. Jangan menganggap `payments.paid_at IS NULL` ekuivalen dengan invoice unpaid. Tes edge case: invoice tanpa payment sama sekali; invoice yang hanya punya payment failed/pending; invoice yang dibayar sebagian.

**Concept question A:** Apakah `NULL = NULL` bernilai TRUE? **Jawaban:** Tidak, hasilnya UNKNOWN. **Alasan:** NULL bukan nilai biasa untuk operasi persamaan.

**Concept question B:** Mengapa `NOT IN (subquery)` bisa menghasilkan nol baris jika subquery mengandung NULL? **Jawaban:** Perbandingan dengan NULL menghasilkan UNKNOWN sehingga predikat tidak menjadi TRUE untuk baris yang tidak cocok. Gunakan NOT EXISTS jika maksudnya anti-join dan korelasi benar.

**Hints:** (1) pikirkan invoice yang tidak memiliki *matching successful payment*; (2) gunakan `NOT EXISTS (SELECT 1 FROM school.payments p WHERE p.invoice_id = i.invoice_id AND p.status = ... )`; (3) tinjau worked solution setelah satu upaya.

**Feedback salah umum:** `paid_at IS NULL` bisa menemukan draft payment tetapi tidak menemukan invoice yang tidak punya payment row; join/predicate perlu mencerminkan definisi status bisnis.

**Checkpoint refleksi:** Bedakan invoice yang *belum memiliki pembayaran sukses* dengan invoice yang *masih punya outstanding balance*. Apa efek cicilan terhadap dua definisi itu?

**Catatan untuk Codex:** Lesson contoh ini adalah golden standard minimal untuk kedalaman isi. Setiap lesson lainnya harus authored pada tingkat kedalaman sebanding, dengan aktivitas yang sesuai jenis materi, tidak sekadar menyalin template.

## Exercise contracts & sandbox

1. SQL read-only challenge: eksekusi pada schema dataset khusus, gunakan batas waktu/rows, validasi hasil berdasarkan row-set dengan semantik order jika ORDER BY diwajibkan. Tidak mengandalkan string equality dari query.
2. SQL mutation lesson: database ephemeral milik tiap upaya; reset dari fixture sehingga INSERT/UPDATE tidak mencemari murid lain.
3. Transaction interleaving: dua atau lebih session yang dikendalikan lab runner, assert invariant dari database setelah selesai; jangan menilai hanya dari HTTP response.
4. Schema design & architecture: rubrik manual/semi-otomatis terstruktur, bukan klaim hasil tunggal.
5. Query performance: bandingkan kesetaraan output dulu, kemudian pengukuran berulang dengan dataset dan lingkungan tetap.
6. Disaster drills: hanya pada instance sandbox terpisah dengan audit, batas resource, dan clean-up. Tidak menjalankan destructive SQL pada shared/production database.

## Status paket
Blueprint ini menjelaskan seluruh 120 lesson (konsep + praktik + objective) dan satu lesson lengkap sebagai acuan. Isi narasi lengkap, contoh SQL untuk semua lesson, soal/answer key, test fixtures, dan validator lainnya **harus dihasilkan Codex dan diaudit** saat implementasi ke repo. File JSON adalah katalog pembuat konten, bukan materi siap publish 120 lesson.


# CODEX MASTER PROMPT — TAALMO DATABASE ZERO TO MASTER

Kamu bertindak sebagai **Senior Curriculum Architect + Database Systems Engineer + Instructional Designer + Full-stack Engineer** untuk Taalmo, platform belajar interaktif yang **SUDAH BERJALAN**.

## Tujuan utama
Tambahkan satu learning path berkualitas production bernama **"Database Zero to Master"** (bahasa Indonesia, PostgreSQL) ke aplikasi eksisting: dari murid yang belum tahu database hingga sanggup mengatasi query correctness, schema modeling, concurrency, optimization, PostgreSQL internals, production recovery, dan keputusan database architecture.

**PENTING: platform interaktifnya sudah ada. JANGAN membuat aplikasi baru, mengganti stack, menulis ulang router/auth/DB, atau mendesain ulang seluruh UI.** Pekerjaanmu adalah memasukkan konten, alur belajar, validasi, dan fitur minimal yang benar-benar belum tersedia, mengikuti pola dalam repository.

## File sumber otoritatif
1. `curriculum-blueprint.json` — 10 level, 40 modul, 120 lesson terurut beserta teaching point, latihan, prerequisite, dan gating.
2. `KURIKULUM_DATABASE_ZERO_TO_MASTER.md` — tujuan instruksional, learning flow, rubrik, dan contoh lesson lengkap (golden standard).
3. `school_finance_seed.sql` — contoh dataset deterministik sebagai basis latihan SQL awal; adaptasikan bila repo memiliki fixture/data-model sendiri.

Ketiganya harus kamu baca utuh sebelum implementasi. Jangan hanya menghasilkan halaman dengan judul lesson dari blueprint: kamu **WAJIB menulis materi belajar sebenarnya untuk setiap lesson**.

## Tahap 0 — Audit repository (wajib sebelum coding)
1. Pelajari struktur repo, framework, existing content schema, API, lesson player, progress tracking, quiz & lab engine, auth, i18n, tests, seeds, migrations, and existing content.
2. Buat tabel mapping: kebutuhan kurikulum → kemampuan platform eksisting → yang perlu ditambahkan. Reuse sepenuhnya komponen/type yang sudah ada, bukan membangun parallel content engine.
3. Periksa bagaimana authoring lesson/quiz, SQL sandbox, versioning content, hasil jawaban, score, prerequisite, dan deploy dilakukan.
4. Jika suatu exercise type belum didukung, pilih fallback pedagogis yang paling cocok menggunakan komponen existing; bila harus menambah type baru, buat perubahan terkecil, backwards-compatible, diuji.
5. Tulis rencana implementasi singkat dalam `docs/database-path-implementation.md` (atau folder docs yang ada), lalu **langsung implementasikan** tanpa meminta konfirmasi untuk detail yang dapat disimpulkan.

## Struktur path wajib
Gunakan struktur `Learning Path → Level → Module → Lesson → Activity → Assessment` dan hubungan prerequisite sesuai JSON.
- Satu root path bernama Database Zero to Master.
- 10 level L0–L9; 40 modul; 120 lesson, urutan persis mengikuti blueprint.
- Identitas stabil: `l0m01l01`, `l0m01l02`, ... hingga `l9m03l03`; jangan buat ID berubah antar-seed/deploy.
- URL slug mengikuti pola repo; content berbahasa Indonesia, istilah teknis English bila berguna.
- Estimated duration per lesson; progress dan resume per user.
- Optional diagnostic untuk learner berpengalaman. Melewati penjelasan pemula boleh, tetapi tidak melewati integrity / safety check wajib.
- Rekomendasi durasi 42 minggu hanya metadata. **Jangan mengunci akses berdasarkan kalender atau memaksa menunggu 1 minggu.**

## Konten wajib setiap lesson (bukan outline atau placeholder)
Setiap dari 120 lesson harus punya:
1. Hook berbasis masalah nyata (mengapa lesson ini penting).
2. Tujuan terukur ("setelah lesson mampu ...").
3. Materi konseptual yang substantif dan akurat, dalam paragraf penjelasan Indonesia. Termasuk intuisi, batasan, dan common misconception. Jangan generate tulisan generik yang sama berulang.
4. Contoh worked example dengan input-output yang masuk akal. SQL yang diberikan harus valid pada PostgreSQL dan konsisten dengan fixture/migration terkait.
5. Minimal **2 concept questions** berisi options (jika pilihan), correct answer, pembahasan jawaban benar, dan feedback opsi salah.
6. Minimal **1 aktivitas interaktif** dari engine yang sudah ada: SQL editor, prediksi output, drag/diagram ERD, query debugger, transaksi dua sesi, query plan, failure simulator, atau keputusan arsitektur. Tidak semua lesson perlu jenis UI baru.
7. Prompt praktik, starter SQL/state, dataset/simulator setup, reference solution (disimpan aman di server bila diperlukan), deterministic validator / testing rubric, dan minimal dua edge cases.
8. Tiga tingkat hint: nudge konsep → arahan operasional → solusi dengan pembahasan setelah upaya. Jangan tampilkan solusi sebelum berusaha.
9. Reflection question, feedback salah yang spesifik, dan navigasi ke next lesson.
10. Metadata konsep, tags, difficulty, estimated minutes, prerequisites, content version.

Untuk lesson mengenai teori sistem (misal WAL, saga, replication), gunakan simulasi/prediksi interleaving/analisis skenario dengan evaluasi grounded. Jangan menempelkan terminal SQL palsu yang tidak mungkin membuktikan kompetensi.

**Golden example:** baca section `L1M01L03 — NULL dan Three-valued Logic` di Markdown. Itu standar minimum kedalaman materi; lesson lain harus punya kualitas sebanding dan tidak hanya hasil templating.

## Pedagogi dan flow pengalaman belajar
- Urutan setiap lesson: `Problem → Learn → Worked Example → Try → Break/Edge Case → Explain Why → Complete`.
- Tidak dapat mark complete hanya dengan scroll atau tombol Next jika aktivitas wajib belum selesai.
- Quiz per lesson: minimal dua concept checks, explanation setelah submit.
- Modul unlock jika modul prerequisite lulus. Modul selesai jika seluruh mandatory labs passed dan checkpoint score ≥80%.
- Level selesai jika semua modul lulus, assessment level ≥85%, semua critical correctness/integrity checks lolos.
- Retake unlimited dengan variasi soal/dataset agar tidak sekadar menghafal.
- Hint progresif; kesalahan mengarah ke remedial sesuai konsep.
- Jangan block eksplorasi teori lain secara berlebihan; gate berlaku untuk sertifikasi/progres resmi.
- Progress user terikat dengan stable lesson ID dan version; seeding konten tidak mereset kemajuan.
- Idempotent import/seed: upsert IDs, tidak menduplikasi lesson. Jangan destructive migration untuk data pengguna.

## Skenario kontinu (hindari latihan SQL lepas-lepas)
A. **School Finance** (L0–L2): students, invoices, payments; pertanyaan tunggakan, cicilan, NULL, joins, 12-month reporting. Gunakan `school_finance_seed.sql` atau adaptasi fixture eksisting dengan expected result yang tervalidasi.
B. **Commerce** (L3, L5): orders, order_items, discounts, refunds; ERD, functional dependency, safe migrations, explain plan, N+1, pagination.
C. **Payment Ledger** (L4, L9): accounts, payment_requests, transfers, ledger_entries, outbox; ACID, locks, duplicate callbacks, crash around commit, reconciliation.
D. **Production Simulator** (L6–L8): pages/WAL/vacuum, locks, PITR, replica staleness, migration, sharding trade-offs. Hanya dalam isolasi aman.

## Ketentuan teknis dan validasi exercise
- Existing exercise/player components always win. Build adapter from blueprint to repo's content format.
- Semua SQL examples dijalankan/di-test terhadap PostgreSQL target repo (atau tambahkan test fixtures terisolasi). **Jangan berasumsi SQLite dan PostgreSQL identik.**
- Read-only SQL: limit waktu, memory/rows, permissions; bandingkan *semantik hasil* bukan string query. Honor ordering only when exercise demands ordering.
- DML/DDL: ephemeral database/schema per attempt, sanitized fixture/reset, least privilege, never execute student SQL on shared production data. Verify project already has safe runner; if not, do not expose unsafe execution—provide deterministic simulator/fallback until isolated runner available.
- Concurrency: tests harus assert state DB & invariant setelah interleaving, termasuk duplicate requests, retries, partial failure. Pelajaran tentang SERIALIZABLE mencakup retry serialization_failure (40001); deadlocks mencakup 40P01.
- Performance: correctness before speed; benchmark repeated runs with fixed data, capture query plan and methodology. Jangan janji benchmark threshold universal.
- Recovery drill: ONLY disposable sandbox with explicit reset; do not run deletion/cluster settings against production.
- For answer keys, avoid leaking hidden expected answer to client when grading is server-side.
- Semua fitur baru harus accessible dan mobile friendly menggunakan style/design system yang sudah ada.

## Implementasi bertahap tanpa berhenti di skeleton
Phase 1: Audit repo, content contract/schema mapping, feature-gap assessment, docs.
Phase 2: Register path, 10 levels, 40 modules, 120 canonical lesson records and prerequisites.
Phase 3: **AUTHOR AND IMPLEMENT complete learning content for all 120 lessons** with unique explanations, runnable examples, quizzes and activity specs, following learning flow.
Phase 4: Create/reuse fixtures, solution validators, checkpoint and stage assessments, progress/resume state, module gates; integrate minimal missing features.
Phase 5: Integration tests, SQL correctness tests, accessibility + broken-content audit, screenshots if supported, doc content editing workflow.

Jika pekerjaan terlalu besar untuk satu eksekusi Codex: tetap buat slice vertical end-to-end **L0–L1 (7 modul / 21 lessons)** dalam kualitas publishable, sekaligus import struktur level lain sebagai `draft` **BUKAN `published`**, lalu buat checklist konkret semua lesson tersisa dan lanjutkan lesson per modul sampai seluruhnya siap. **Jangan diam-diam mengklaim seluruh kurikulum selesai bila baru metadata.**

## Acceptance criteria (Definition of Done)
- [ ] 10 levels, 40 modules, 120 lessons, stable IDs, prerequisites dan urutan benar; belum lengkap ditandai draft.
- [ ] Untuk setiap lesson yang published: body substantif, accurate worked example, >=2 graded concept checks, >=1 interactive activity, feedback, hints, edge-case validators, reflection.
- [ ] Semua lesson di level published memiliki dataset/simulator state yang benar-benar tersedia dan valid.
- [ ] User dapat menyelesaikan lesson dan lanjut/resume dengan benar.
- [ ] Gate module 80%, gate level 85%, mandatory integrity tests enforce.
- [ ] Idempotent content import tidak membuat duplikasi dan tidak menghapus progress.
- [ ] Test grade SQL berbasis output/semantik, bukan teks SQL yang sama.
- [ ] Concurrent mutation tidak dapat memengaruhi data pengguna lain.
- [ ] Existing pages/features tetap berfungsi dan build/test/lint berjalan sesuai repo.
- [ ] Ada content audit script: missing activities/questions, broken prerequisites, duplicate IDs, SQL fixtures/solutions mismatch, unpublished lesson reachable via published path, dead-end navigation.
- [ ] Dokumentasi authoring + cara menambah modul, lesson, fixture, question and validator.

## Perintah pengerjaan
Sekarang baca struktur repo dan ketiga file paket, petakan format konten yang saat ini sudah didukung, lalu **lakukan perubahan nyata pada codebase**. Jangan berhenti pada proposal/README/pseudocode. Pilih perubahan minimum yang membuat learning path dapat dimainkan dan seluruh konten terkelola. Di akhir, berikan ringkasan perubahan file, perintah untuk seed/test, jumlah actual published vs draft, hasil tes, dan keterbatasan yang masih ada.

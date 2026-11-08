# Roadmap

## Current MVP

- Distinctive landing page with a runnable product preview.
- Local learning dashboard, path, activity, recommendations, and milestones.
- Three transaction introductions and knowledge checkpoints.
- Complete Duplicate Payment Callback sandbox: unsafe/protected modes, step/run/reset/replay, historical state, node inspection, committed records, rollback recovery, result evaluation, final quiz.
- Complete Lost Update sandbox: stale reads and unsafe replacements versus row-locked atomic increments, configurable write order and initial balance, step/run/reset/replay, historical state, record inspection, and a separate final quiz.
- Complete Deadlock sandbox: two-transaction wait-for graph, opposite/consistent lock ordering, staged debit rollback, configurable victim, one bounded whole-transaction retry, and a dedicated final quiz.
- English/Indonesian interface, all published database curriculum content, catalog metadata, quizzes, simulation explanations, guided diagram labels, and activity dates; a device-local language preference preserves learning state. Server metadata stays English.
- A compact `/sandbox` overview lists the three catalog-backed transaction labs, their scenarios, explored-mode counts and lab completion, with lesson/simulator links in English and Indonesian. Header Sandbox and the completed transaction-dashboard revisit action open the overview.
- Device-local progress for six milestones, light/dark themes, responsive layout. Existing tests come from the initial MVP; follow the no-test policy in `AGENTS.md` for subsequent work.

## Database Engineering — database curriculum

The unified path `/learn/database-engineering` registers 10 levels, 40 modules and 120 canonical IDs. L0–L9 provide all 120 published bilingual lessons across 40 modules; no canonical lessons remain draft. Worked results, concept checks, practice variants/edge cases, hints, reflection and versioned progress use the existing player. Only L0–L2M01 have historical executed SQL evidence; later additions have source/diff review only. Practice predicts authored outcomes; the website does not execute learner SQL.

## Canonical authoring complete; executed capstone evidence remains separate

L9M01–L9M03 cover ledger design, load/failure evidence interpretation and master defense in nine bilingual lessons. All 40 modules are authored; the existing L9 assessment is now available under normal publication/prerequisite/mastery gates. Critical checks still apply. This is completion of authored prediction learning, not proof that a learner built, tested, recovered or defended an operational payment system.

No next canonical authoring module remains. Future real-capstone work would need a separately agreed scope, isolated environment, authorization to execute checks, durable artifacts and human review. Current evidence after L2M01 remains source/diff review only. No load, EXPLAIN, security review execution, restore, migration, merge or deployment was performed. The Sandbox overview below is now implemented by source/diff review; other product ideas remain optional.

## Sandbox overview — 29 October 2026

The compact overview uses the existing labs/lessons catalog and read-only browser progress. A completed lesson does not complete a lab, and exploring both modes remains separate from passing the final checkpoint. Existing routes, simulation engines, IDs, storage and mastery rules are unchanged. No new dependency or persistence write was added.

Review scope is source/diff only. No tests, manual/browser checks, lint, typecheck or build were run. The next optional item, accessibility/browser coverage, requires explicit authorization to execute checks under AGENTS.md. Further product changes below still need concrete scope.

## Cybersecurity Math — rilis fondasi 7 November 2026

Pengguna menyetujui desain jalur lengkap bertahap untuk matematika cybersecurity dari pemula sampai expert track. [Kebutuhan/desain](superpowers/specs/2026-11-07-cybersecurity-math-design.md), [kurikulum 10 level/40 modul/120 lesson target](../curriculum/cybersecurity-math/README.md), dan [backlog implementasi](cybersecurity-math-tasks.md) tersedia. Commit dokumen awal `9d96ed4` sudah dipush. Menu header/sidebar dan kartu dashboard kini menuju `/learn/cybersecurity-math`; CURRENT PATH menampilkan progres jalur aktif.

Rilis CM-01 mengimplementasikan player enam langkah, visual kelompok/garis bilangan/quotient-remainder beserta tabel setara, tiga lesson L0M01 bilingual, dua variasi latihan plus edge case per lesson, hint/feedback, dua set checkpoint lesson/modul, task/rubrik, resume dan progres lokal terpisah dari database. Parser memvalidasi evidence aktif dan mempertahankan JSON versi lama secara pasif; preview terkunci tidak menulis progres resmi, retake mempertahankan snapshot kelulusan, dan kegagalan write memakai fallback memori dengan pemberitahuan.

CM-01 disimpan/push sebagai `1e6f108`. L0M02/CM-02a kemudian menambahkan tiga lesson pecahan, desimal/persentase, dan poin vs perubahan relatif, dengan visual bagian sama besar/rate, jawaban pecahan eksak serta desimal koma/titik, dua set checkpoint dan task/rubrik. UI checkpoint dipakai oleh kedua modul; navigasi mengarahkan peserta ke checkpoint modul yang masih wajib sebelum melanjutkan. Validasi restore mengikuti batas input yang sama; hasil visual yang dibulatkan ditandai pendekatan, dan baseline nol tidak dibagi.

L0M03/CM-02b menambahkan tiga lesson rasio senilai, laju/waktu, serta bit/byte/kB/KiB. Tabel interaktif memperlihatkan scaling kedua besaran, waktu dari target/laju hipotetis, dan konversi unit; zero rate dan zero work dibedakan tanpa pembagian nol. Semua lesson/modul bilingual memiliki latihan/edge cases/hints, dua set checkpoint, task dan rubrik; tidak mengklaim rate sebagai benchmark.

L0M03 dipush sebagai `d55524a`. CM-02c (8 November 2026) kemudian menambahkan L0M04: negatif/jarak absolut, pembulatan/estimasi, pangkat. Slider dan SVG garis bilangan, tabel batas bawah/terdekat/atas, dan perkalian faktor berulang mengajar konsep dengan input terbatas. Parser menerima posisi negatif hanya pada bounds yang sesuai. Dua set assessment L0 × 13 soal terpisah mencakup keempat modul plus pembanding per-akun/total; seluruh checkpoint modul, semua jawaban, nilai ≥85% dan semua critical wajib. Record level memakai ID versioned, menyimpan snapshot/riwayat bantuan, dan membuka progres resmi level berikutnya hanya setelah assessment lulus; tidak mempublikasikan L1 draft.

L0 lengkap dipush sebagai `89f5ce2`. CM-03a menambahkan L1M01 (tiga lesson variabel, persamaan dan pertidaksamaan/budget integer) dengan visual penjumlahan berlabel dan model biaya fiktif 40+3x. Semua unsur lesson, dua set checkpoint lesson/modul dan task/rubrik tersedia. Badge mengikuti level, dan alur L0→L1 mensyaratkan assessment L0; tautan prasyarat tidak memutar pengguna ke modul yang sudah lulus.

CM-03a dipush sebagai `ee2b95f`. CM-03b menambahkan L1M02 dengan tiga lesson fungsi/domain/range, grafik linear dan kemiringan, serta komposisi/invers. Visual menampilkan domain/range yang eksplisit, sampel waktu integer dengan sumbu/unit dan tabel, serta tahap komposisi dan langkah invers. Input di luar domain, rate nol, fungsi konstan tanpa invers unik, dan reciprocal dibedakan. Dua set checkpoint lesson/modul dan task/rubrik tersedia.

CM-03b dipush sebagai `566815c`. CM-03c menambahkan L1M03: aturan pangkat, linear vs eksponensial, serta ruang string. Visual faktor, grafik/tabel sampel dan pohon prefix kecil menyatakan domain, unit/skala, kasus nol/alfabet tunggal serta perbedaan hitungan dari asumsi pemilihan seragam/independen. Dua set checkpoint lesson/modul dan task/rubrik tersedia.

CM-03c dipush sebagai `d8cd89c`. CM-03d melengkapi L1M04 dengan logaritma/invers, bit label vs tebakan dan mean/worst pencarian, visual domain/rate yang terbatas, checkpoint/task dan assessment L1 dua set × 15 soal. Model seragam tanpa pengulangan, unit dan batas rate hipotetis dinyatakan; record dan gate level memakai engine yang sama.

**Status authoring: 24 lesson published, 96 draft; L0 dan L1 lengkap.** Assessment L0 dan L1 tersedia; L2–L9 dan capstone belum terbit. Berikutnya CM-04a/L2M01 (biner, heksadesimal, signedness/overflow). Source/diff review termasuk reviewer terpisah; tidak menjalankan test, browser/manual check, lint, typecheck, build, atau contoh. Tidak ada merge/deploy.

## Later learning improvements

- Expand meaningful accessibility checks and Safari/Firefox/mobile browser coverage.
- Distinguish reading completion from checkpoint mastery if the product needs both.
- Add more scheduling choices only when they teach a specific concept; keep runs reproducible.

## Production considerations, when needed

- Authentication and PostgreSQL-backed per-user progress, with migrations and recovery from local progress.
- Content editing/versioning, reviewed educational accuracy, operational monitoring, backups, and deployment policy.
- A real PostgreSQL adapter only if server experiments become a product requirement; isolate workloads, bound resources, and prevent arbitrary code execution by default.
- Real payment integrations would separately require verified gateway signatures, amount/currency reconciliation, authorization, audit controls, and operational idempotency. This educational model is not a payment handler to deploy.

No authentication, paid APIs, AI, Docker, real payment calls, or production infrastructure are included in the MVP.

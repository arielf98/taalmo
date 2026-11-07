# Backlog — menu Matematika untuk Cybersecurity

Diperbarui 8 November 2026. Status: **CM-01, CM-02a–CM-02c dan CM-03a diimplementasikan; L0 lengkap dan L1M01 terbit; CM-03b dan seterusnya belum selesai**.

[Kebutuhan/desain](superpowers/specs/2026-11-07-cybersecurity-math-design.md) · [Kurikulum dan task pelajar](../curriculum/cybersecurity-math/README.md)

Dokumen ini berisi task pengembangan; task yang dikerjakan **pelajar** terdapat per modul dalam kurikulum. Pengguna memilih jalur lengkap bertahap dan menyetujui dokumen desain serta mulai implementasi menu/tiga lesson L0M01 pada 7 November 2026.

## Aturan pengerjaan dan definisi selesai

Urutan: dokumen → fondasi produk + satu modul lengkap → sisa L0 → L1–L9 per modul → penutupan. Setiap pekerjaan adalah unit yang selesai utuh, kemudian source/diff review, commit singkat, dan langsung push ke remote branch yang sedang dikerjakan. Jangan merge, deploy, force-push, atau menyertakan perubahan pengguna yang tidak terkait.

Tidak membuat unit test; tidak menjalankan test apa pun, pengujian manual/browser, lint, typecheck, build, audit, atau eksekusi contoh. Acceptance criteria tetap harus ditelusuri melalui pembacaan source/diff; status runtime tetap **belum diverifikasi**. Izin menjalankan pemeriksaan memerlukan permintaan eksplisit pengguna dan bukan syarat terselubung untuk melanjutkan authoring.

Satu modul selesai hanya jika tiga lesson bilingual, visual/interaksi, worked example, dua variasi latihan per lesson, edge case, hint, feedback, checkpoint lesson/modul, transfer task/rubrik, prasyarat/progres, dan dokumentasi lengkap. Assessment level diterbitkan setelah empat modulnya lengkap. Jangan membuat stub lalu menandai published.

## CM-00 — kebutuhan dan review desain

- [x] Tinjau shell, dashboard, katalog, player database, locale, dan parser progres.
- [x] Tulis kebutuhan produk, cakupan, pilihan pendekatan, kontrak lesson, dan batas klaim expert.
- [x] Tulis blueprint 120 lesson, 40 learner task, rubrik, dan storyboard pemula.
- [x] Tulis backlog terurut beserta penerimaan dan dependency.
- [x] Selesaikan builder review; pertegas batas expert, preview di luar urutan, serta retake tanpa jalan buntu.
- [x] Persetujuan pengguna atas dokumen desain.

Penerimaan: AC02–AC05 tercakup dalam dokumen; implementer tidak harus menebak jalur, bentuk materi, batas tutor AI, atau cara melindungi progres database. Commit dokumentasi tidak berarti implementasi disetujui atau menu tersedia.

## CM-01 — rilis fondasi yang bisa dipelajari

Dependency: CM-00 disetujui. Satu unit rilis meliputi fondasi dan **L0M01 lengkap**; jangan berhenti pada kartu kosong.

- [x] Baca panduan Next.js lokal yang relevan sebelum menulis routing/komponen.
- [x] Definisikan katalog matematika, namespace `cm-…`, versi, status publikasi, prasyarat, dan tipe konten yang tidak membawa field SQL.
- [x] Daftarkan seluruh target sebagai metadata draft; publish hanya lesson yang kontennya lengkap.
- [x] Implementasikan `/learn/cybersecurity-math` dan route lesson; guard 404 untuk ID tidak dikenal/draft.
- [x] Tambah satu menu header/sidebar serta kartu dashboard, active state turunan dan CURRENT PATH kontekstual.
- [x] Buat player langkah pendek: prediksi, eksplorasi, penjelasan, contoh, latihan, hint, transfer, refleksi, checkpoint, dan resume; preview terkunci tidak menulis progres resmi.
- [x] Buat penyimpanan terpisah, parser input/storage tervalidasi, penanganan gagal simpan, status bantuan, serta snapshot kelulusan.
- [x] Gunakan ulang Button/Badge/Workspace dan pola locale/tema yang sesuai; numeric question khusus karena Quiz lama memakai pilihan, tanpa menambah dependency.
- [x] Tulis seluruh tiga lesson `cm-l0m01l01`–`l03`, task dan checkpoint modul, dua set soal, visual kelompok/garis bilangan, serta Indonesia–Inggris.
- [x] Review seluruh caller/link, parser/write path, markup, CSS mobile, perhitungan tertulis, dan pasangan terjemahan melalui source/diff; reviewer terpisah dan perbaikan temuan penting.
- [x] Perbarui README, arsitektur, roadmap, jumlah published/draft, dan batas evidence. Commit/push mengikuti aturan delivery; lihat Git history dan laporan akhir untuk hasilnya.

Penerimaan: AC01–AC12 untuk scope fondasi; jumlah published tiga dan draft 117 jika blueprint belum berubah. `taalmo.progress.v1` tidak ditulis oleh jalur matematika. Checkpoint terbit terpisah dari task teks siap direview. Tidak mengklaim rilis sudah diuji pada browser.

## CM-02 — L0 lengkap

Dependency: CM-01.

- [x] CM-02a: `cm-l0m02` — pecahan, desimal, persentase, relative change; visual kisi/batang dan task 30/200, dua set checkpoint lesson/modul, grader pecahan/desimal dan source/diff review terpisah.
- [x] CM-02b: `cm-l0m03` — tiga lesson bilingual rasio/rate/unit, visual tabel interaktif, guard zero-rate/zero-target, konversi waktu/bit/byte/kB/KiB, dua set checkpoint dan task/rubrik.
- [x] CM-02c: `cm-l0m04` — tiga lesson bilingual negatif/jarak, estimasi/pembulatan, pangkat; visual/latihan/hint/task dan dua set checkpoint modul. Dua set assessment L0 masing-masing 13 item diterbitkan dengan semua modul sebagai prasyarat, ≥85% dan semua critical benar.

Penerimaan: masing-masing subtask memenuhi definisi modul selesai dan punya commit/push sendiri. L0 menyediakan start dari nol tanpa assumed algebra. Total target published setelah L0: 12.

## CM-03 — L1 aljabar dan pertumbuhan

Dependency: CM-02; kerjakan/commit/push tiap modul sebelum berikutnya.

- [x] CM-03a: `cm-l1m01` — tiga lesson bilingual variabel/substitusi, persamaan dua sisi, pertidaksamaan/budget integer, visual dan dua set checkpoint lesson/modul serta task/rubrik. Navigasi antarlevel mengarah ke assessment L0 bila perlu.
- [ ] CM-03b: `cm-l1m02` — fungsi, domain, grafik, komposisi/inverse.
- [ ] CM-03c: `cm-l1m03` — pangkat, linear vs eksponensial, ruang pilihan.
- [ ] CM-03d: `cm-l1m04` — log₂, worst/average search, asumsi distribusi; assessment L1.

Penerimaan: sumbu dan unit jelas, log tidak menerima domain tidak sah, model seragam dinyatakan, rate tidak dianggap benchmark. Target kumulatif 24 lesson.

## CM-04 — L2 representasi dan penalaran

Dependency: CM-03.

- [ ] CM-04a: `cm-l2m01` — biner/hex, signedness, overflow; visual toggle bit.
- [ ] CM-04b: `cm-l2m02` — truth table, bitwise, mask, De Morgan.
- [ ] CM-04c: `cm-l2m03` — himpunan, relasi, fungsi, bijeksi.
- [ ] CM-04d: `cm-l2m04` — kuantor, proof, counterexample, induksi/invariant; assessment L2.

Penerimaan: lebar bit dan interpretasi eksplisit; kontrol keyboard setara interaksi visual; pembuktian tidak dinilai benar hanya karena teks tidak kosong. Target 36 lesson.

## CM-05 — L3 peluang dan informasi

Dependency: CM-04.

- [ ] CM-05a: `cm-l3m01` — counting, permutasi/kombinasi, inklusi–eksklusi/pigeonhole.
- [ ] CM-05b: `cm-l3m02` — ruang sampel, conditional probability, independensi.
- [ ] CM-05c: `cm-l3m03` — distribusi diskret, ekspektasi, binomial/geometrik, variansi.
- [ ] CM-05d: `cm-l3m04` — Shannon/min-entropy, bias, birthday/collision; assessment L3.

Penerimaan: peluang di [0,1], distribusi menjumlah satu, kasus p=0/p=1 dijelaskan, syarat pendekatan tidak tersembunyi. Target 48 lesson.

## CM-06 — L4 statistik deteksi

Dependency: CM-05.

- [ ] CM-06a: `cm-l4m01` — sampel/bias, ringkasan data, quantile/variasi.
- [ ] CM-06b: `cm-l4m02` — Bayes dan natural frequencies, contoh 90 TP/495 FP.
- [ ] CM-06c: `cm-l4m03` — confusion matrix, metrik/threshold, ROC/PR dan denominator nol.
- [ ] CM-06d: `cm-l4m04` — interval, hipotesis, multiple comparisons, drift/causal limits; assessment L4.

Penerimaan: data seluruhnya sintetis, undefined metric tidak menjadi 0 tanpa penjelasan, rate/precision dibedakan, sample size dan asumsi tercantum. Target 60 lesson.

## CM-07 — L5 modular dan teori bilangan

Dependency: CM-06.

- [ ] CM-07a: `cm-l5m01` — prima, GCD, extended Euclid/Bézout.
- [ ] CM-07b: `cm-l5m02` — congruence, operasi, inverse, negatif.
- [ ] CM-07c: `cm-l5m03` — modular exponentiation, Fermat/Euler, orde.
- [ ] CM-07d: `cm-l5m04` — CRT, non-coprime consistency, rekonstruksi; assessment L5.

Penerimaan: modulus valid, batas iterasi/parameter, pembagian nol dan inverse tidak ada ditangani; nilai eksak tidak melewati safe integer tanpa bigint yang benar. Target 72 lesson.

## CM-08 — L6 graf dan linear algebra

Dependency: CM-07.

- [ ] CM-08a: `cm-l6m01` — graf, BFS/reachability, cycle/cut dengan graf sintetis tetap.
- [ ] CM-08b: `cm-l6m02` — vektor, norm, dot product/proyeksi, feature scale.
- [ ] CM-08c: `cm-l6m03` — matriks, eliminasi, rank, basis/inverse.
- [ ] CM-08d: `cm-l6m04` — linear system modulo/GF(2), parity/Hamming; assessment L6.

Penerimaan: dimensi dan domain operasi eksplisit, zero vector/singular system punya feedback, adjacency list/teks setara graf. Tidak ada graph editor universal. Target 84 lesson.

## CM-09 — L7 kriptografi klasik

Dependency: CM-08.

- [ ] CM-09a: `cm-l7m01` — confidentiality, OTP, reuse/pseudorandomness.
- [ ] CM-09b: `cm-l7m02` — hash properties, birthday work, MAC.
- [ ] CM-09c: `cm-l7m03` — parameter RSA kecil, derivasi, raw RSA limits.
- [ ] CM-09d: `cm-l7m04` — DH/discrete log, public/private values, authentication/KDF; assessment L7.

Penerimaan: toy label, batas domain, rate/asumsi, OTP reuse dan DH authentication menjadi critical checks; tidak menerima secret pengguna atau membuat crypto service. Target 96 lesson.

## CM-10 — L8 aljabar, ECC, dan keamanan

Dependency: CM-09.

- [ ] CM-10a: `cm-l8m01` — grup/subgroup, ring/field/zero divisor.
- [ ] CM-10b: `cm-l8m02` — polynomial division, irreducibility, GF(2^m), AES structure.
- [ ] CM-10c: `cm-l8m03` — finite-field ECC, infinity, addition/doubling/scalar multiplication.
- [ ] CM-10d: `cm-l8m04` — signatures, security games/advantage, nonce/subgroup; assessment L8 dan rubrik proof.

Penerimaan: field polynomial diajarkan sebelum operasi, titik valid/invalid/infinity ditangani, input dibatasi, proof belum direview tidak otomatis disebut benar. Target 108 lesson.

## CM-11 — L9 complexity dan post-quantum

Dependency: CM-10.

- [ ] CM-11a: `cm-l9m01` — bit complexity, negligible probability, reduction/asumsi.
- [ ] CM-11b: `cm-l9m02` — lattice basis/norm, close vectors, LWE/noise kecil.
- [ ] CM-11c: `cm-l9m03` — quotient ring/module, KEM/failure probability, ML-KEM konseptual; baca publikasi dan errata NIST terkini saat authoring.
- [ ] CM-11d: `cm-l9m04` — portofolio, counterexample, pembelaan/review; assessment L9 dan rubrik capstone.

Penerimaan: reductions berarah benar, model 2D bukan bukti keamanan, KEM/signature tidak tertukar, sumber bertanggal, tidak ada klaim standar produksi sudah diimplementasikan. Target 120 lesson.

## CM-12 — penutupan dan pelaporan

Dependency: CM-11.

- [ ] Baca ulang keterlacakan AC01–AC12 terhadap file/konten yang benar-benar ada.
- [ ] Cocokkan lesson/module/assessment terbit, terjemahan, task/rubrik, link/prasyarat, versi, dan hitungan progres melalui source/diff.
- [ ] Pastikan tidak ada published stub, dead link ke draft, atau badge review independen palsu.
- [ ] Dokumentasikan storage lokal, batas concurrent tab, ekspor manual portofolio, dan perbedaan checkpoint/capstone.
- [ ] Perbarui roadmap/status authoring dengan commit serta bukti review; commit/push penutupan.
- [ ] Laporkan bagian yang belum diverifikasi atau belum direview manusia secara eksplisit.

Penerimaan: seluruh materi disepakati selesai di-author tanpa menyamakan source review dengan runtime verification atau sertifikasi. Tidak ada merge/deploy tersirat.

## Evidence saat ini

| Bagian | Status |
| --- | --- |
| Pilihan pengguna | Jalur lengkap bertahap |
| Kebutuhan, kurikulum, learner task, backlog | Ditulis; builder review selesai dan desain disetujui |
| Persetujuan desain detail | Disetujui 7 November 2026 |
| Menu/routing/player/progres matematika | CM-01 diimplementasikan, source/diff review |
| Lesson matematika published | 15/120 target; L0 lengkap dan L1M01 terbit, 105 draft |
| Assessment level matematika | Dua set L0 × 13 soal tersedia; L1–L9 belum terbit |
| Pengujian/runtime/build/lint/typecheck | Tidak dilakukan sesuai AGENTS.md |
| Review capstone oleh manusia | Belum ada peserta/artefak/review |

Commit `9d96ed4` (dokumen) dan `1e6f108` (CM-01) sudah dipush ke origin/main setelah izin eksplisit pengguna. Pengguna juga mengizinkan push seluruh commit roadmap matematika berikutnya ke arielf98/taalmo branch main.

CM-02a dipush sebagai `28eba62`, CM-02b sebagai `d55524a`, CM-02c/L0 lengkap sebagai `89f5ce2`. Berikutnya CM-03b/L1M02: input/output/domain/range, fungsi linear dan grafik, komposisi/inverse sederhana. Sisa L1, L2–L9 serta capstone belum selesai; materi authored tidak diklaim terverifikasi runtime.

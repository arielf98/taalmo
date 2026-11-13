# Evidence menjalankan aplikasi — 13 November 2026

Pengguna meminta melanjutkan pekerjaan dan memastikan aplikasi bisa dijalankan. Izin ini mencakup build/startup dan pemeriksaan route aplikasi pada pekerjaan ini; unit test tidak dibuat atau dijalankan. Evidence modul terdahulu tetap source/diff sebagaimana saat dikerjakan.

Lingkungan: macOS ARM64, Node v24.13.1, npm 11.14.1. Paket Next dikunci `16.4.2` di `package-lock.json`.

## Pemulihan dependency lokal

Build awal berhenti sebelum kompilasi aplikasi: direktori `@next/swc-darwin-arm64` hanya memiliki metadata/README, tanpa `next-swc.darwin-arm64.node`. Metadata paket dan lockfile menunjuk versi 16.4.2 untuk platform ini. Pemulihan akhir memakai `npm ci --include=optional --ignore-scripts --no-audit --no-fund` agar seluruh dependency sesuai lockfile; manifest/lockfile tidak diubah. [Dokumentasi resmi SWC](https://nextjs.org/docs/messages/failed-loading-swc) menjelaskan kebutuhan binary sesuai sistem dan instalasi optional dependency.

## Pemeriksaan

Setelah compiler pulih, build mengungkap koma yang hilang pada `src/content/database/l5-tuning.json:48`. File tersebut sudah bermasalah pada HEAD sebelum pekerjaan ini. Perbaikan satu karakter disimpan/push terpisah sebagai `dfb25e3`; isi materi tidak diubah.

| Pemeriksaan | Hasil teramati |
| --- | --- |
| Versi terpasang setelah `npm ci` | Next dan SWC darwin-arm64 sama-sama 16.4.2; manifest/lockfile tidak berubah |
| `npm run build` pada hasil final | Exit 0; kompilasi dan tahap TypeScript berhasil; 167 halaman dihasilkan, termasuk 30 lesson matematika published |
| `npm run start -- --port 3100` | Next16.4.2 ready pada `http://127.0.0.1:3100`, bound hanya localhost |
| HTTP `/`, `/dashboard`, `/learn/cybersecurity-math`, `/learn/database-engineering` | Masing-masing 200 |
| HTTP lesson `cm-l2m01l01`, `cm-l2m02l01`, `cm-l2m02l02`, `cm-l2m02l03` di bawah `/learn/cybersecurity-math/` | Masing-masing 200 |
| HTTP draft `cm-l2m03l01` | 404; tidak dipublikasikan menjadi lesson kosong |
| Browser lesson bitwise, mode preview | Eksplorasi bisa dibuka; x=6,m=2 memberi AND2/OR6/XOR4 dan membuka pengamatan |
| Keyboard pada tombol bit | Space mengubah x6 menjadi x4, hasil ikut berubah dan pertanyaan pengamatan kembali tertutup |
| Browser x=2,m=6 | AND2, OR6, XOR4; any1/all0. NOT4=13, left1=4, right1=1 |

Server produksi lokal dibiarkan berjalan untuk ditinjau pengguna. Untuk menjalankan ulang, gunakan Node24, `npm ci`, `npm run build`, lalu `npm run start -- --port 3100` (pilih port kosong jika sudah dipakai). Perubahan kode memerlukan build baru dan restart server produksi.

## Batas cakupan

Ini pemeriksaan build/startup/route dan beberapa interaksi browser, bukan suite unit/E2E atau penilaian kebenaran seluruh lesson/assessment/task. Unit test tidak dibuat/dijalankan; suite E2E, lint dan audit tidak dijalankan. Tidak ada SQL, benchmark, merge atau deploy. Pengujian browser dilakukan dalam preview dan tidak menghasilkan kelulusan peserta. Perubahan awal pengguna pada `next-env.d.ts` dipulihkan persis setelah Next selesai membuat tipe route; file itu tidak dimasukkan commit.

## Lanjutan CM-04c — himpunan/relasi

Build setelah L2M03 exit 0, termasuk TypeScript dan 170 halaman statis (33 lesson matematika). Server Next16.4.2 restart pada localhost:3100, ready74ms. HTTP `/`, jalur matematika dan ketiga lesson `cm-l2m03l01`–`l03` masing-masing 200; draft `cm-l2m04l01` tetap 404. Di browser preview, mapping u→x,v→y dengan C={x,y} menampilkan injektif/onto/bijektif Ya dan 0 tujuan terlewat. Memperluas C menjadi {x,y,z} mempertahankan panah, mengubah onto/bijektif menjadi Tidak dan menutup pengamatan. Memilih z saat C={x,y} ditandai bukan fungsi sah tanpa mengubah C otomatis. Mengembalikan v→y membuka pengamatan lagi. Ini smoke check kontrol mapping, bukan pemeriksaan end-to-end seluruh checkpoint atau progres resmi; visual sets/relation ditinjau source. `next-env.d.ts` pengguna dipulihkan persis.

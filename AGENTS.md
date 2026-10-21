<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Aturan kerja proyek

- Jangan menjalankan test apa pun, termasuk unit test, integration test, E2E, browser/UI test, dan pengujian manual. Instruksi ini hanya dapat diubah oleh permintaan eksplisit pengguna.
- Jangan membuat atau menambahkan unit test. Jangan memperluas suite test sebagai bagian implementasi.
- Tinjau perubahan melalui pembacaan kode dan diff. Jangan menjalankan lint, typecheck, atau build sebagai pengganti test tanpa permintaan eksplisit pengguna.
- Setiap satu pekerjaan yang selesai wajib diakhiri dengan Git commit berpesan singkat dan jelas.
- Commit hanya file yang relevan dengan pekerjaan tersebut. Jangan memasukkan perubahan pengguna atau pekerjaan lain yang belum selesai.
- Jangan push, merge, atau deploy kecuali pengguna memintanya.
- Pada laporan akhir, sebutkan commit yang dibuat serta nyatakan bahwa test tidak dijalankan sesuai instruksi pengguna.

## Visualisasi materi Database Engineering

- Pilih bentuk visual sesuai materi agar mudah dipahami pemula; jangan memaksakan semua visual menggunakan React Flow.
- Untuk struktur tabel dan hubungan antartabel, gunakan diagram bergaya UML/ERD dengan nama tabel, kolom, tipe data, penanda primary key (PK) dan foreign key (FK), serta garis relasi dan kardinalitas yang jelas. Jangan menyajikan struktur tabel sebagai urutan langkah proses.
- Gunakan React Flow ketika perlu menunjukkan alur proses, seperti perjalanan request, tahapan query, atau transaksi. Relasi antartabel sendiri bukan alur proses.
- Tampilkan contoh isi tabel dan hasil query sebagai tabel data yang mudah dibaca, dengan penjelasan teks pendamping.

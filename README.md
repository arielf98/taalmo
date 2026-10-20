# taalmo.

**Make learning come alive.**

Taalmo adalah platform belajar software engineering melalui penjelasan singkat, contoh interaktif, dan eksperimen sistem yang dapat diinspeksi.

**Learn → Experiment → Break → Fix → Understand.**

## Menjalankan secara lokal

Gunakan Node.js 24 LTS (`.nvmrc` tersedia) dan npm. Versi Node lain yang didukung tercantum di `package.json`.

```sh
nvm use
npm ci
npm run dev
```

Jika tidak menggunakan nvm, pastikan Node.js 24 sudah aktif sebelum menjalankan npm. Buka alamat lokal yang dicetak Next.js, biasanya http://127.0.0.1:3000. Jika port tersebut terpakai, Next.js memilih port berikutnya.

Tidak memerlukan `.env`, database, akun, API key, Docker, atau layanan berbayar. Koneksi internet diperlukan saat mengunduh dependency; aplikasi tidak memanggil API eksternal.

## Fitur yang tersedia

- Landing page dengan preview simulator yang bisa dijalankan.
- Dashboard, learning path Database Engineering, progres, aktivitas, dan rekomendasi belajar.
- Lesson Lost Update, Duplicate Payment Callback, dan Deadlock, masing-masing dengan contoh interleaving dan checkpoint.
- Lab Lost Update: mode unsafe dan atomic increment, pilihan urutan penulisan serta saldo awal, run/step/reset/replay, histori, inspector, dan kuis akhir.
- Lab Duplicate Payment Callback: mode unsafe dan idempotent, run/step/reset/replay, histori, inspector, ledger, transactional outbox, dan opsi rollback sebelum commit.
- Kuis akhir lab yang terbuka setelah kedua mode selesai dieksplorasi.
- Progres lokal, tema terang/gelap, serta layout desktop, tablet, dan mobile.

Dua lab tersedia: Lost Update dan Duplicate Payment Callback. Deadlock masih berupa pengantar dan checkpoint dengan status lab belum tersedia. Path memiliki lima milestone: tiga checkpoint lesson dan dua checkpoint lab. Progres payment lama tetap dipertahankan.

## Alur belajar pertama

1. Buka **Learn → Explore path → Duplicate Payment Callback**.
2. Ikuti contoh langkah demi langkah dan jawab checkpoint.
3. Pilih **Launch sandbox**, jalankan **Unsafe**, lalu inspeksi dua ledger entry untuk satu pembayaran.
4. Ganti ke **Idempotent** dan jalankan ulang untuk melihat atomic commit.
5. Pilih event pada timeline untuk menelusuri state historis.
6. Coba kegagalan sebelum commit untuk melihat rollback dan pemulihan callback kedua.
7. Jawab kuis akhir; progres tersimpan pada browser dan origin yang sama.

## Mencoba Lost Update

Buka **Learn → Explore path → Lost Update → Launch sandbox**, atau langsung ke `/sandbox/lost-update`. Jalankan Unsafe: A dan B membaca saldo yang sama, lalu penulisan kedua menghilangkan increment pertama. Balik Write order untuk mengamati perubahan yang hilang. Pada Atomic increment, request kedua menunggu row lock dan memakai saldo yang sudah diperbarui, sehingga kedua increment tersimpan.

Progres eksperimen Lost Update terpisah dari payment. Kuis akhir baru terbuka setelah kedua strategi pada lab ini diselesaikan.

## Struktur proyek

```text
src/app/                    Halaman App Router, metadata, dan CSS responsif
src/components/             UI learning, sandbox, diagram, dan kuis
src/components/ui/          Komponen UI dasar
src/content/lessons.ts      Konten lesson dan checkpoint berbahasa Inggris
src/lib/simulation/         Engine event deterministik, payment, dan Lost Update
src/lib/progress.ts         Penyimpanan serta validasi progres lokal
docs/                       Arsitektur, penulisan skenario, dan roadmap
AGENTS.md                   Aturan kerja agen pada repositori
```

Stack: Next.js App Router, React, strict TypeScript, Tailwind CSS, Button bergaya shadcn dengan Radix Slot/CVA, Lucide, dan React Flow. State interaktif cukup memakai React; tidak ada dependency state management tambahan.

## Aturan pengerjaan

Ikuti [AGENTS.md](AGENTS.md):

- Jangan menjalankan test apa pun dan jangan menambahkan unit test.
- Peninjauan perubahan dilakukan melalui pembacaan kode dan diff. Lint, typecheck, atau build juga tidak dijalankan tanpa permintaan eksplisit pengguna.
- Setiap pekerjaan selesai harus diakhiri dengan Git commit yang hanya memuat perubahan terkait.
- Jangan push, merge, atau deploy tanpa permintaan pengguna.

Repositori memiliki test dari implementasi awal. Keberadaannya tidak memberikan izin untuk menjalankannya pada pekerjaan lanjutan.

## Keterbatasan

- Database adalah model simulasi, bukan server PostgreSQL. Tidak ada SQL nyata, pembayaran nyata, atau arbitrary code execution.
- Urutan event deterministik; waktu playback hanya untuk presentasi dan bukan metrik performa database.
- Transactional outbox dimodelkan sampai penyimpanan event. Publisher, retry pengiriman, dan consumer tidak disimulasikan. Ini bukan jaminan exactly-once message delivery.
- Progres tersimpan di browser ini saja. Menghapus storage menghapus progres; private browsing atau storage yang diblokir dapat menghalangi penyimpanan.
- Tidak ada autentikasi, sinkronisasi lintas perangkat, atau infrastruktur produksi.
- Antarmuka awal berbahasa Inggris; konten lesson dipisahkan dari komponen untuk memudahkan lokalisasi berikutnya.

Audit dependency pada 20 Oktober 2026 menemukan nol advisory produksi dan lima temuan high pada rantai tooling ESLint khusus development. Ini merupakan hasil pemeriksaan sebelumnya, bukan audit baru. Rincian tersedia pada histori pekerjaan.

## Dokumentasi lanjutan

- [Arsitektur](docs/architecture.md)
- [Engine simulasi dan penambahan skenario](docs/simulation-engine.md)
- [Roadmap](docs/roadmap.md)

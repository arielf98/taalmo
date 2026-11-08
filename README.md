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

## Database Engineering

Satu jalur tersedia melalui dashboard atau `/learn/database-engineering`, menggabungkan kurikulum database dan praktik transaksi yang sebelumnya terpisah. Tautan lama `/learn/database-transactions` dan `/learn/database-zero-to-master` diarahkan ke jalur ini.

Bagian SQL/database memakai paket sumber Database Zero to Master dengan **10 level, 40 modul, dan 120 lesson; seluruh lesson L0–L9 sudah authored/published, tanpa draft canonical.** Materi Indonesia–Inggris mencakup penjelasan, worked example PostgreSQL, tabel hasil, concept checks dengan feedback, variasi latihan, edge cases, hint, dan refleksi. Struktur tabel memakai UML/ERD; alur proses memakai React Flow bila sesuai. L9 menyatukan desain Payment Ledger, interpretasi evidence beban/recovery, threat model, defense arsitektur dan rubrik/postmortem. Seluruhnya memakai latihan prediksi/desain: tidak ada API ledger, load generator, benchmark, migrasi, restore atau security drill nyata yang dijalankan. Assessment L9 tersedia melalui gate mastery yang sudah ada. Materi setelah L2M01 ditinjau melalui source dan diff saja; SQL serta runtime belum diverifikasi sesuai aturan proyek.

Kelulusan lesson memerlukan aktivitas dan pemeriksaan wajib, bukan scroll atau Next. Modul memerlukan checkpoint ≥80%; level ≥85% dan seluruh pemeriksaan kritis lulus. Teori published tetap dapat dijelajahi; prasyarat berlaku untuk progres resmi. Progres per versi dan resume memakai penyimpanan browser yang sama tanpa mengubah milestone lab lama. Retake mempertahankan kelulusan terdahulu.

Aktivitas saat ini memakai prediksi deterministik, **belum menjalankan SQL pengguna**. Ini merupakan fallback aman karena platform belum memiliki runner SQL terisolasi. Penilaian formatif berlangsung di client; belum ada sertifikasi terproteksi, akun, atau sinkronisasi lintas perangkat. Tidak ada seed database aplikasi: konten diimpor statis berdasarkan stable ID.

Lihat [rencana dan evidence](docs/database-path-implementation.md), [panduan authoring dan validasi](docs/database-path-authoring.md), serta [status authoring dan gap evidence](docs/database-path-remaining.md).

## Matematika untuk Cybersecurity

Menu **Cybersecurity Math / Matematika Cybersecurity** di header, sidebar, dan kartu dashboard menuju `/learn/cybersecurity-math`. Jalur memiliki peta **10 level, 40 modul, dan 120 lesson target** dari numerasi sampai expert track matematika kriptografi. Saat ini **27 lesson terbit: seluruh L0 dan L1 (masing-masing 12 lesson/4 modul), serta L2M01 (3 lesson)**. Sebanyak 93 lesson berikutnya masih **Direncanakan**, tanpa tautan lesson kosong.

Pola belajar: prediksi → visual yang bisa diubah → penjelasan dan worked example → dua variasi latihan serta kasus batas → penerapan/refleksi → checkpoint. Lesson dan kontrol tersedia dalam Indonesia–Inggris. Angka latihan seluruhnya fiktif; pembelajaran matematika ini tidak menjalankan serangan, menguji target, atau menghasilkan kriptografi produksi.

L0M01 menyediakan visual kelompok, garis bilangan, serta quotient/remainder dengan tabel setara; jawaban angka, tiga hint, dua set checkpoint lesson, checkpoint modul ≥80% dengan semua soal kritis benar, dan task tertulis berubrik. Lesson memerlukan pengamatan dan latihan benar, refleksi terisi, serta seluruh soal checkpoint benar tanpa membuka solusi checkpoint pada percobaan itu. Catatan transfer opsional dan tidak dinilai otomatis. Riwayat bantuan/soal yang pernah dilihat ditampilkan. Retake tetap tersedia dan mempertahankan snapshot kelulusan sebelumnya.

L0M02 menambahkan visual bagian sama besar dan perubahan persentase, jawaban pecahan pembilang–penyebut yang diperiksa dengan perkalian silang eksak, desimal koma/titik, dan toleransi pembulatan yang dijelaskan. Penyebut nol ditolak; baseline nol menampilkan perubahan relatif tidak terdefinisi. Dua set checkpoint serta task/rubrik modul tersedia. Sesudah lesson terakhir, tombol lanjut mengarah ke checkpoint modul yang belum lulus sebelum modul berikutnya.

L0M03 menambahkan perbandingan senilai, laju hipotetis dan konversi waktu, serta bit/byte dan kB/KiB. Visual tabel interaktif memisahkan unit dan asumsi; target positif pada laju nol ditandai tidak tercapai, sedangkan target kosong tidak membutuhkan pemrosesan. Setiap lesson/modul tetap memiliki latihan, hint, dua set checkpoint, dan task berubrik.

L0M04 mengajarkan negatif dan jarak absolut melalui garis bilangan/slider, pembulatan nonnegatif dengan aturan setengah naik, kisaran estimasi, serta pangkat melalui perkalian berulang. Model mengecualikan 0^0. Empat modul masing-masing mempunyai dua set checkpoint dan task/rubrik. Assessment L0 menyediakan **dua set × 13 soal** lintas semua modul, termasuk pasangan tambahan per akun vs total, memerlukan seluruh checkpoint modul, semua jawaban terisi, nilai ≥85%, dan seluruh soal kritis benar. Retake mempertahankan kelulusan dan mencatat bantuan; membuka solusi mengharuskan percobaan set lain.

L1M01 menambahkan variabel/substitusi, persamaan dengan operasi sama pada kedua sisi, dan pertidaksamaan anggaran integer. Visual penjumlahan memakai label variabel, sedangkan model 40+3x≤budget memeriksa biaya tetap, batas integer, dan pilihan x+1. Anggaran di bawah biaya tetap tidak sama dengan maksimum nol. Seluruh materi bilingual, dengan dua set checkpoint dan task/rubrik modul.

L1M02 mengajarkan fungsi/domain/range, grafik linear dengan nilai awal dan kemiringan, serta komposisi/invers. Visual tabel menolak input di luar domain; grafik memakai sampel menit utuh dan sumbu/unit eksplisit; model dua tahap memperlihatkan urutan operasi serta invers yang berbeda dari kebalikan pecahan. Kasus fungsi konstan dan invers tidak unik ikut dinilai. Tersedia dua set checkpoint lesson/modul, hint, feedback dan task/rubrik.

L1M03 menambahkan aturan pangkat, perbandingan pertumbuhan linear/eksponensial dan ruang string. Grafik/tabel membedakan tambahan tetap dari faktor tetap, termasuk input awal ketika linear lebih besar. Pohon prefix menampilkan maksimal dua posisi dan menghitung seluruh kelanjutannya. Hitungan a^panjang dibedakan dari pemilihan simbol seragam/independen; panjang nol dan alphabet satu simbol bukan rekomendasi secret. Semua tahap, dua set checkpoint dan task/rubrik tersedia.

L1M04 menambahkan logaritma sebagai invers pangkat, bit pilihan/pembelahan seimbang dan biaya enumerasi. Visual dua arah pangkat/log, tabel pembelahan dan mean/worst membedakan bit label dari tebakan kecocokan. Model pencarian menetapkan target seragam di daftar, tanpa pengulangan, rate hipotetis tetap dan tanpa overhead/paralelisme. Rate nol ditandai tidak dapat selesai, bukan nol detik. Seluruh tahap, dua set checkpoint dan task/rubrik tersedia.

L2M01 mengajarkan nilai tempat biner/desimal, hex per kelompok empat bit, serta signedness/overflow. Visual delapan bit memakai tombol keyboard dengan bobot, tabel setara dan hasil live. Byte yang sama dapat dibaca unsigned 0…255 atau two’s complement −128…127. Model wrap memisahkan jumlah matematika, pola low-eight-bit dan overflow signed/unsigned; perilaku bahasa/API nyata memerlukan kontraknya sendiri. Tiga lesson memiliki seluruh tahap bilingual, dua set checkpoint lesson/modul dan task/rubrik.

Lesson terbit boleh dibaca sebagai preview sebelum prasyarat lulus; preview tidak menulis jawaban, resume, atau kelulusan resmi. L1M01 memerlukan assessment L0; navigasi prasyarat/lanjut mengarah ke assessment itu bila belum lulus. Assessment L1 kini memiliki dua set × 15 soal yang mencakup seluruh 12 lesson serta domain log, distribusi dan mean/worst; perlu seluruh modul lulus, semua jawaban terisi, ≥85% dan semua critical benar. Task teks berstatus draf/siap direview; teks terisi atau checkpoint otomatis tidak membuktikan argumen benar maupun review independen. L2M01 memerlukan assessment L1. L2M02–M04, L3–L9, expert track dan capstone masih direncanakan; assessment L2 belum terbit.

Progres matematika memakai key browser **`taalmo.cybersecurity-math.progress.v1`**, terpisah dari `taalmo.progress.v1` milik database/lab. Resume menyimpan langkah dan jawaban yang sudah diperiksa; teks angka yang belum diperiksa perlu dimasukkan ulang setelah refresh. Kegagalan write menampilkan pemberitahuan dan mempertahankan pekerjaan dalam memori tab; refresh/penutupan tab dapat menghilangkan pekerjaan itu. Perubahan serentak di beberapa tab bisa saling menimpa; salin catatan penting ke luar browser. Tidak ada akun, sinkronisasi perangkat, tutor AI, atau layanan review manusia.

Lihat [kebutuhan/desain yang disetujui](docs/superpowers/specs/2026-11-07-cybersecurity-math-design.md), [kurikulum dan task pelajar](curriculum/cybersecurity-math/README.md), [backlog implementasi](docs/cybersecurity-math-tasks.md), serta [panduan authoring](docs/cybersecurity-math-authoring.md). Review implementasi melalui source/diff saja; test, browser/manual check, lint, typecheck, build, dan contoh komputasi tidak dijalankan sesuai AGENTS.md.

## Fitur yang tersedia

- Landing page dengan preview simulator yang bisa dijalankan.
- Dashboard, jalur Database Engineering dan Matematika Cybersecurity, progres terpisah, aktivitas transaksi, dan rekomendasi belajar.
- Ringkasan `/sandbox` untuk memilih tiga lab, melihat mode yang telah dijelajahi serta status checkpoint lab, dan membuka lesson atau simulator. Menu Sandbox mengarah ke ringkasan ini.
- Lesson Lost Update, Duplicate Payment Callback, dan Deadlock, masing-masing dengan contoh interleaving dan checkpoint.
- Lab Deadlock: wait-for graph, mode urutan lock berlawanan/konsisten, pilihan transaksi korban, rollback perubahan pending, dan satu retry penuh.
- Lab Lost Update: mode unsafe dan atomic increment, pilihan urutan penulisan serta saldo awal, run/step/reset/replay, histori, inspector, dan kuis akhir.
- Lab Duplicate Payment Callback: mode unsafe dan idempotent, run/step/reset/replay, histori, inspector, ledger, transactional outbox, dan opsi rollback sebelum commit.
- Kuis akhir lab yang terbuka setelah kedua mode selesai dieksplorasi.
- Pilihan bahasa Inggris–Indonesia untuk seluruh 120 lesson kurikulum published, katalog, diagram alur, antarmuka, lesson transaksi, kuis, timeline, dan penjelasan simulasi. ID lesson, urutan jawaban, SQL, expected result dan progres tidak berubah saat bahasa diganti.
- Progres lokal, tema terang/gelap, serta layout desktop, tablet, dan mobile.

Bagian praktik transaksi memiliki tiga lesson dan tiga lab: Lost Update, Duplicate Payment Callback, dan Deadlock. Ringkasan Database Engineering menggabungkan **123 lesson tersedia dan 3 lab**, atau 126 milestone aktivitas. Tidak ada lesson database canonical yang masih draft. Kelulusan modul/level tetap mengikuti assessment masing-masing, terpisah dari persentase aktivitas. ID lesson, milestone transaksi, versi konten, dan data progres browser dipertahankan tanpa migrasi.

## Alur belajar pertama

1. Buka **Learn → Explore path → Transaction Labs → Duplicate Payment Callback**.
2. Ikuti contoh langkah demi langkah dan jawab checkpoint.
3. Pilih **Launch sandbox**, jalankan **Unsafe**, lalu inspeksi dua ledger entry untuk satu pembayaran.
4. Ganti ke **Idempotent** dan jalankan ulang untuk melihat atomic commit.
5. Pilih event pada timeline untuk menelusuri state historis.
6. Coba kegagalan sebelum commit untuk melihat rollback dan pemulihan callback kedua.
7. Jawab kuis akhir; progres tersimpan pada browser dan origin yang sama.

## Mencoba Lost Update

Buka **Learn → Explore path → Lost Update → Launch sandbox**, atau langsung ke `/sandbox/lost-update`. Jalankan Unsafe: A dan B membaca saldo yang sama, lalu penulisan kedua menghilangkan increment pertama. Balik Write order untuk mengamati perubahan yang hilang. Pada Atomic increment, request kedua menunggu row lock dan memakai saldo yang sudah diperbarui, sehingga kedua increment tersimpan.

Progres eksperimen Lost Update terpisah dari payment. Kuis akhir baru terbuka setelah kedua strategi pada lab ini diselesaikan.

## Mencoba Deadlock

Buka **Learn → Explore path → Deadlock → Launch sandbox**, atau `/sandbox/deadlock`. Pada **Opposite order**, A menahan X dan menunggu Y, sementara B menahan Y dan menunggu X. Telusuri snapshot untuk melihat siklus A → B → A, lalu rollback korban dan pelepasan lock. Pilih korban A atau B untuk membandingkan state yang bertahan.

Aktifkan **Retry the aborted transaction once** untuk memulai ulang seluruh transaksi korban sesudah survivor commit. Pada **Consistent order**, kedua transaksi selalu mengunci X sebelum Y; B dapat menunggu tanpa membentuk siklus. Kuis akhir memakai progres khusus Deadlock, terpisah dari dua lab lainnya.

## Pilihan bahasa

Gunakan pemilih **English / Indonesia** di header. Pilihan disimpan pada `taalmo.locale.v1` di browser dan origin yang sama; perubahan bahasa di tab lain ikut diterapkan. Jika storage diblokir, pilihan tetap aktif pada tab saat ini tetapi mungkin tidak bertahan setelah refresh.

Bahasa tidak mengubah ID lesson/lab, progres `taalmo.progress.v1`, jawaban kuis yang sedang dipilih, atau state simulasi. Tanggal aktivitas mengikuti bahasa pilihan. Saldo pada lab transaksi tetap memakai USD; contoh School Finance memakai rupiah. SQL, raw state, nama produk, dan identifier teknis dipertahankan. Konten awal dari server dan metadata halaman berbahasa Inggris, lalu preferensi browser diterapkan sesudah hydration; belum ada URL khusus bahasa.

## Struktur proyek

```text
src/app/                    Halaman App Router, metadata, dan CSS responsif
src/components/             UI learning, sandbox, diagram, dan kuis
src/components/ui/          Komponen UI dasar
src/content/lessons.ts       Konten sumber lesson dan checkpoint berbahasa Inggris
src/content/database/        Adapter blueprint, 120 lesson published, dan metadata canonical
src/lib/curriculum.ts        Aturan kelulusan dan assessment kurikulum
src/content/messages/       Kamus terjemahan Inggris dan Indonesia
src/content/messages.ts     Pemilihan terjemahan dan interpolasi teks
src/lib/locale.tsx          Preferensi bahasa lokal dan lang dokumen
src/lib/simulation/         Engine event deterministik, payment, Lost Update, Deadlock
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
- Setelah review dan commit pekerjaan selesai, langsung push lalu lanjutkan roadmap tanpa menunggu pesan pengguna; ulangi sampai pekerjaan selesai atau kapasitas sesi habis.
- Jangan merge, deploy, atau force-push tanpa permintaan eksplisit pengguna.

Master prompt Database Zero to Master secara eksplisit mengizinkan validasi SQL, test integrasi, lint/typecheck/build untuk pekerjaan kurikulum tersebut; ini bukan izin umum untuk pekerjaan berikutnya. Tidak ada unit test baru.

Repositori memiliki test dari implementasi awal. Keberadaannya tidak memberikan izin untuk menjalankannya pada pekerjaan lanjutan.

## Keterbatasan

- Database adalah model simulasi, bukan server PostgreSQL. Tidak ada SQL nyata, pembayaran nyata, atau arbitrary code execution.
- Urutan event deterministik; waktu playback hanya untuk presentasi dan bukan metrik performa database. Deadlock memakai dua transaksi dan dua row; pemilihan korban adalah kontrol pengajaran, bukan algoritme pemilihan korban PostgreSQL. Retry dibatasi satu kali setelah survivor commit, tanpa simulasi backoff atau timeout.
- Transactional outbox dimodelkan sampai penyimpanan event. Publisher, retry pengiriman, dan consumer tidak disimulasikan. Ini bukan jaminan exactly-once message delivery.
- Progres tersimpan di browser ini saja. Menghapus storage menghapus progres; private browsing atau storage yang diblokir dapat menghalangi penyimpanan.
- Tidak ada autentikasi, sinkronisasi lintas perangkat, atau infrastruktur produksi.
- Bahasa awal server dan metadata tetap Inggris. Terjemahan serta layout sesudah pergantian bahasa belum diverifikasi di runtime sesuai aturan tanpa test.

Audit dependency pada 20 Oktober 2026 menemukan nol advisory produksi dan lima temuan high pada rantai tooling ESLint khusus development. Ini merupakan hasil pemeriksaan sebelumnya, bukan audit baru. Rincian tersedia pada histori pekerjaan.

## Dokumentasi lanjutan

- [Arsitektur](docs/architecture.md)
- [Engine simulasi dan penambahan skenario](docs/simulation-engine.md)
- [Roadmap](docs/roadmap.md)

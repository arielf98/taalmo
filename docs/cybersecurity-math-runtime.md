# Evidence menjalankan aplikasi — 13–14 November 2026

Pengguna meminta melanjutkan pekerjaan dan memastikan aplikasi bisa dijalankan. Izin ini mencakup build/startup dan pemeriksaan route aplikasi pada pekerjaan ini; unit test tidak dibuat atau dijalankan. Evidence modul terdahulu tetap source/diff sebagaimana saat dikerjakan.

Catatan ini memuat riwayat pemeriksaan per modul. Hasil terbaru ada pada bagian CM-06b: 54 lesson/191 halaman build; entri jumlah sebelumnya merekam keadaan saat modul tersebut selesai.

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

## Lanjutan CM-04d — L2 lengkap

Build final setelah perbaikan review exit0: kompilasi/TypeScript berhasil dan173halaman dihasilkan (36lesson matematika). Server Next16.4.2 restart localhost:3100, ready71ms. HTTP `/`, `/dashboard`, jalur database/matematika dan ketiga lesson `cm-l2m04l01`–`l03` masing-masing200; draft `cm-l3m01l01`404. Browser preview invariant: N4/i3 memberi S6/sisa1 dan membuka pengamatan; i5 ditandai tidak terjangkau dan menutupnya; N0/i0 memberi S0/sisa0/exit. Mengganti bahasa ke Indonesia mempertahankan kontrol dan menampilkan penjelasan terjemahan. Browser kuantor: N0/k3 menampilkan ∀P benar,∃P salah,tanpa saksi/pelanggar; N5/k3 menampilkan dua pelanggar4,5 dan membuka pengamatan. Tidak menulis progres resmi. Visual paritas dan assessment2×16 ditinjau source; tidak diuji kelulusan lengkap di browser. `next-env.d.ts` dipulihkan persis. Unit/E2E/lint/audit tidak dijalankan.

## Lanjutan CM-05a — kombinatorika

Build final setelah review dan perbaikan penjelasan N=0 exit 0: kompilasi/TypeScript berhasil, 176 halaman dihasilkan (39 lesson matematika). Startup Next16.4.2 localhost:3100 ready72ms. HTTP `/`, `/dashboard`, jalur database/matematika dan ketiga lesson `cm-l3m01l01`–`l03` masing-masing200; draft `cm-l3m02l01`404.

Browser preview pada n5 tanpa ulang menampilkan seluruh20 penugasan ketua–wakil; mengganti ke tim menampilkan10 hasil dan menutup pengamatan. n1 menampilkan0 pilihan pasangan. Visual pigeonhole N5/M2 menampilkan isi kotak{1,3,5}/{2,4}, maksimum3, ceil(5/2)=3 dan collision pasti; N3/M3 menjelaskan collision tidak dijamin tetapi mungkin pada mapping lain. N0 menampilkan semua kotak kosong, maksimum0 dan tanpa pasangan collision. Pemeriksaan awal menemukan paragraf kapasitas positif masih tampil pada N0; paragraph diberi branch kasus kosong, lalu build/restart/browser ulang mengonfirmasi penjelasan N0 yang benar. Screenshot lokal `/tmp/taalmo-counting-2026-11-13.jpg` menunjukkan kotak/tabel/batas.

Ini pemeriksaan kontrol representatif, bukan seluruh alur kelulusan, semua perangkat/browser atau review bukti peserta. Visual sum/product ditinjau source; tidak dijalankan sebagai suite. Unit test tidak dibuat/dijalankan; E2E/lint/audit tidak dijalankan sesuai batas pengguna. Tidak ada merge/deploy. Server lokal dibiarkan berjalan; `next-env.d.ts` awal pengguna dipulihkan persis, tidak di-commit.

## Lanjutan CM-05b — peluang dasar, 14 November

Build final setelah perbaikan review exit0: kompilasi/TypeScript berhasil dan179halaman dihasilkan (42lesson matematika). Startup Next16.4.2 localhost:3100 ready89ms. HTTP utama,dashboard,jalur database/matematika dan tiga lesson `cm-l3m02l01`–`l03` masing-masing200; draft `cm-l3m03l01`404.

Browser preview mode iid N16: daun1/256,15/256,15/256,225/256,total1,minimal satu sukses31/256 dan pengamatan terbuka. N1 iid: HH1,cabang pertama gagal0,conditional pada cabang itu tidak terdefinisi,hasil sukses1; N1 dua berbeda:strategi ditandai tidak tersedia. Browser conditional dengan B dikosongkan: P(B)=0/4,P(A∩B)=0/4,P(A|B) tidak terdefinisi,sedangkan P(B|A)=0/1 pada A tidak kosong. Tidak ada progres resmi ditulis. Visual tiket/semua checkpoint ditinjau source,belum diuji kelulusan lengkap. Bukti gambar lokal `/tmp/taalmo-probability-2026-11-14.jpg`. `next-env.d.ts` pengguna dipulihkan persis;unit/E2E/lint/audit tidak dijalankan.

## Lanjutan CM-05c — peubah acak, 14 November

Build final exit0,kompilasi/TypeScript berhasil dan182halaman dihasilkan(45lesson matematika). Startup Next16.4.2 localhost:3100 ready72ms. HTTP utama,jalur database/matematika dan tiga lesson `cm-l3m03l01`–`l03` masing-masing200; draft `cm-l3m04l01`404.

Browser preview geometrik p1/4,h4: bobot64,48,36,27,81 dibagi256,total1,mean4,Var12,ekor81/256;pengamatan terbuka. p0 menampilkan seluruh massa di bucket tail,tanpa mean berhingga/variansi biasa; p1 menampilkan T1 pasti,mean1,Var0. Histogram sumbu tetap0…1 terlihat beserta bucket T>4. Browser binomial n0,p0: satu baris k0 berbobot1,total1,mean0,tanpa0^0. Bukti gambar lokal `/tmp/taalmo-random-variables-2026-11-14.jpg`. Tidak ada progres resmi ditulis. Visual distribusi/seluruh checkpoint ditinjau source;belum ada alur kelulusan lengkap atau review argumen manusia. `next-env.d.ts` dipulihkan persis;unit/E2E/lint/audit tidak dijalankan.

## Lanjutan CM-05d — L3 lengkap, 14 November

Build final exit0,kompilasi/TypeScript berhasil dan185halaman dihasilkan(48lesson matematika). Startup Next16.4.2 localhost:3100 ready72ms. HTTP utama,dashboard,jalur database/matematika dan tiga lesson `cm-l3m04l01`–`l03` masing-masing200;draft `cm-l4m01l01`404.

Browser preview Shannon:uniform H2,bias4/2/1/1 H14/8=7/4 dan pengamatan terbuka;deterministik dengan simbol p0 terpilih memberi H0,kontribusi0 dan log0 tidak dievaluasi. Birthday N8/q3:collision176/512,fixed-target169/512,λ3/8,upper3/8,pendekatan/lower≈0.31271. q0 memberi kedua peluang0/1 dan tanpa pasangan;N1/q2 memberi collision1 dan menghentikan produk pada faktor0 tanpa faktor negatif. Screenshot lokal `/tmp/taalmo-entropy-2026-11-14.jpg` menunjukkan tabel/hasil/bound. Tidak ada progres resmi ditulis.

Visual min-entropy serta assessment L3 dua set × 18 ditinjau source,belum diuji alur kelulusan lengkap di browser. Kunci seluruh36soal level dan28checkpoint lesson/modul ditinjau terpisah sebagai authoring,bukan eksekusi suite. `next-env.d.ts` awal pengguna dipulihkan persis. Unit test tidak dibuat/dijalankan,E2E/lint/audit tidak dijalankan. Tidak ada merge/deploy;server localhost dibiarkan berjalan.

## Lanjutan CM-06a — ringkasan data,14 November

Build final exit0,kompilasi/TypeScript berhasil dan188halaman dihasilkan(51lesson matematika). Startup Next16.4.2 localhost:3100 ready70ms. HTTP utama,dashboard,jalur database/matematika dan tiga lesson `cm-l4m01l01`–`l03` masing-masing200;draft `cm-l4m02l01`404.

Browser preview standardisasi μ6/σ2/x10:total kuadrat16,populasiVar4,sampels²16/3,z2 dan pengamatan terbuka. μ10/σ0/x10 menampilkan z tidak terdefinisi,bukan0;pengamatan tertutup. Browser summary1,1,2,2,24:mean6,median2,P25=1,P75=2,IQR1,fence−0.5/3.5 dan24 ditandai;data n0 membuat seluruh ringkasan/fence tidak terdefinisi. Dot plot fixed0…30ms terlihat dengan marker berbeda untuk flag dan garis mean/median. Bukti gambar lokal `/tmp/taalmo-summaries-2026-11-14.jpg`. Tidak menulis progres resmi.

Visual sampling/seluruh checkpoint ditinjau source,belum ada alur kelulusan lengkap atau review argumen peserta. `next-env.d.ts` pengguna dipulihkan persis. Unit test tidak dibuat/dijalankan,E2E/lint/audit tidak dijalankan;tidak ada merge/deploy. Server localhost dibiarkan berjalan.

## Lanjutan CM-06b — Bayes/base rate,14 November

Build final selesai: kompilasi/TypeScript berhasil dan191halaman dihasilkan(54lesson matematika). Server produksi lokal aktif pada localhost:3100. HTTP utama,dashboard,jalur database/matematika dan tiga lesson `cm-l4m02l01`–`l03` masing-masing200;draft `cm-l4m03l01`404.

Browser preview natural frequencies N10000/prior1% memberi TP90/FN10/FP495/TN9405,posterior90/585=2/13≈15.38%. Skala2 menggandakan semua sel dan mempertahankan posterior. Tabel tanpa alert memberi posterior tidak terdefinisi sementara TPR/FPR0 tetap sah. Base rate2%/FPR5% memberi TP180/FP490/posterior18/67≈26.87%;FPR0 memberi posterior1 tetapi FN20 tetap terlewat. Grafik dan tabel titik terlihat. Bukti gambar `/tmp/taalmo-bayes-2026-11-14.jpg`. Tidak ada progres resmi ditulis.

Review source terpisah selesai tanpa temuan penting. Seluruh checkpoint/task ditinjau source,belum ada alur kelulusan lengkap atau review jawaban peserta. `next-env.d.ts` pengguna dipulihkan persis. Unit test tidak dibuat/dijalankan,E2E/lint/audit tidak dijalankan;tidak ada merge/deploy. Server lokal dibiarkan berjalan.

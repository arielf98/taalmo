# Kebutuhan dan desain — Matematika untuk Cybersecurity

Tanggal: 7 November 2026. Status: **draf desain untuk persetujuan; belum diimplementasikan**.

Pengguna memilih **jalur lengkap bertahap**: kebutuhan dan task sampai tingkat expert, kemudian implementasi per level dengan lesson interaktif yang lengkap. Ukuran kurikulum, aturan penilaian, dan keputusan teknis di bawah merupakan usulan perancang; belum merupakan persetujuan pengguna atas desain ini.

Dokumen pendamping:

- [Kurikulum dan task pelajar](../../../curriculum/cybersecurity-math/README.md).
- [Backlog implementasi](../../cybersecurity-math-tasks.md).

## 1. Tujuan dan hasil belajar

Tambahkan satu jalur belajar **Matematika untuk Cybersecurity / Cybersecurity Math** di Taalmo untuk orang yang ingin memasuki cybersecurity dan perlu membangun kemampuan matematika dari awal. Pengalaman mengajar mengikuti prinsip yang diminta pengguna dari Brilliant: pertanyaan kecil, eksplorasi visual, petunjuk bertahap, feedback yang menjelaskan kesalahan, dan penerapan konsep. Penulisan, soal, ilustrasi, dan antarmuka dibuat untuk Taalmo.

Peserta tidak perlu sudah memahami matematika SMA, coding, networking, atau kriptografi. L0 mengajarkan kembali operasi, pecahan, persentase, satuan, dan notasi; istilah cybersecurity diperkenalkan ketika pertama dipakai. Jalur lanjutan tidak boleh melompati prasyarat matematis.

Hasil yang dituju:

1. Menghitung dan menjelaskan bit, ruang kemungkinan, tingkat pertumbuhan, dan estimasi biaya percobaan.
2. Membaca aturan logika, permission, himpunan, graf, dan representasi data keamanan.
3. Menafsirkan peluang, entropy, false positive, Bayes, dan statistik deteksi dengan asumsi yang benar.
4. Menurunkan perhitungan modular, RSA/Diffie–Hellman kecil, finite field, serta operasi kurva eliptik sebagai model belajar.
5. Membaca argumen keamanan, membedakan asumsi dari bukti, dan menjelaskan pengantar lattice serta post-quantum.
6. Menghasilkan capstone analisis matematis yang menyertakan langkah, asumsi, contoh tandingan, serta keterbatasan.

**Arti expert:** L8–L9 adalah expert track dalam matematika yang relevan untuk cybersecurity. Lulus kuis lokal tidak memberi sertifikasi profesi atau membuktikan keahlian riset. Capstone tertulis dan pembuktian memerlukan review manusia sebelum diklaim telah dinilai secara independen. Matematika ini melengkapi pembelajaran networking, sistem operasi, secure coding, dan praktik keamanan yang tetap terpisah.

## 2. Pendekatan dan keputusan

| Pendekatan | Kelebihan | Konsekuensi |
| --- | --- | --- |
| Jalur lengkap bertahap, player matematika terfokus | Memakai shell, tema, bahasa, dan UI Taalmo; interaksi bisa sesuai matematika; setiap rilis punya materi utuh | Perlu katalog serta penyimpanan progres matematika tersendiri |
| Ubah player database menjadi mesin semua mata pelajaran | Satu engine untuk seluruh kursus | Refactor besar pada SQL, assessment, parser, dan progres yang sudah dipakai; belum diperlukan |
| Halaman daftar materi dan kuis saja | Cepat untuk katalog | Tidak memenuhi cara mengajar visual dan eksplorasi yang diminta |

Pilihan pengguna: **jalur lengkap bertahap**. Usulan teknis perancang: player matematika terfokus, tanpa refactor mesin database. Desain spesifik ini menunggu persetujuan.

Brilliant saat ditinjau juga menawarkan tutor AI dan pembelajaran adaptif. Kesamaan yang diusulkan di sini adalah **pola mengajar interaktif dengan soal/feedback yang ditulis sebelumnya**, bukan kesetaraan fitur tutor AI. Tutor percakapan, API berbayar, akun, leaderboard, monetisasi, dan sinkronisasi perangkat tidak termasuk versi ini. Jika tutor AI termasuk maksud pengguna, cakupan dan kebutuhan privasinya harus disepakati terpisah.

## 3. Menu dan perjalanan pengguna

### Pintu masuk

- Satu menu khusus **Cybersecurity Math** pada header dan sidebar workspace, menuju `/learn/cybersecurity-math`. Teks Indonesia: **Matematika Cybersecurity**.
- Satu kartu jalur pada dashboard, berdampingan dengan kartu Database Engineering, dengan jumlah lesson **yang sudah terbit**, progres matematika, dan tombol Mulai/Lanjutkan.
- Rute lesson terpisah: `/learn/cybersecurity-math/[lessonId]`.
- Pada halaman matematika dan lesson turunannya, bagian CURRENT PATH menampilkan jalur matematika beserta progresnya. Di halaman lain, perilaku Database Engineering dipertahankan.
- Navigasi aktif berlaku juga pada lesson turunan. Di layar sempit, menu boleh membungkus mengikuti pola aplikasi dan harus tetap bisa dicapai; jangan membuat menu khusus yang hanya ada di desktop.

### Halaman jalur

Urutan informasi: tujuan yang ramah pemula → Mulai dari nol/Lanjutkan → progres lesson terbit → peta 10 level → modul dan lesson → task/checkpoint → capstone serta batas klaim kelulusan.

Setiap level menampilkan prasyarat, tujuan, relevansi keamanan, jumlah lesson terbit/rencana, dan status. Lesson yang belum ditulis bertanda **Direncanakan**, tanpa tautan kosong, tanpa tombol launch, dan tidak menambah denominator progres terbit. Jumlah 120 merupakan target kurikulum, bukan jumlah lesson yang sudah tersedia.

### Sesi pertama

1. Pengguna memilih Mulai dari nol; diagnosis awal tidak wajib dan belum diperlukan pada rilis pertama.
2. Lesson pertama dimulai dengan masalah hitungan nyata yang dapat dipahami tanpa istilah teknis.
3. Pengguna menjawab prediksi, memanipulasi visual, dan membaca feedback.
4. Setelah latihan wajib serta checkpoint benar, lesson tercatat selesai dan menawarkan lesson berikutnya.
5. Pengguna dapat berhenti dan melanjutkan dari langkah terakhir di perangkat yang sama.

Teori yang terbit boleh dibaca di luar urutan. Kelulusan resmi mensyaratkan prasyarat; tombol terkunci menjelaskan modul yang perlu diselesaikan, bukan hanya menampilkan ikon gembok. Tidak ada calendar gating atau timer wajib.

## 4. Kontrak cara mengajar

Satu lesson berfokus pada satu konsep utama. Perkiraan 10–20 menit untuk dasar dan 20–40 menit untuk lanjutan adalah panduan editorial, bukan target waktu lulus. Task pembuktian/capstone boleh memerlukan beberapa sesi.

Setiap lesson yang terbit wajib memiliki:

1. **Hook:** masalah keamanan kecil dan semua istilah yang diperlukan.
2. **Prediksi awal:** satu soal untuk mengungkap intuisi, tidak mengurangi nilai mastery.
3. **Eksplorasi:** minimal satu visual yang berubah sesuai input; learner melakukan aksi bermakna dan menjawab pertanyaan tentang akibatnya. Sekadar menekan Next tidak cukup.
4. **Penjelasan pendek:** definisi, intuisi, rumus bila diperlukan, dan arti tiap simbol. Jangan membuka lesson dengan dinding rumus.
5. **Worked example:** perhitungan langkah demi langkah, unit, intermediate values, dan alasan setiap langkah.
6. **Latihan:** minimal dua variasi parameter, satu edge case/miskonsepsi, serta feedback per jawaban salah. Sebagian harus berupa jawaban angka atau tabel, bukan seluruhnya pilihan ganda.
7. **Tiga hint:** arah pemikiran → langkah antara → solusi dijelaskan. Membuka solusi menandai latihan sebagai dibantu; percobaan checkpoint berikutnya memakai set setara yang lain. Riwayat bantuan tetap ditampilkan, tanpa memblokir pembelajaran setelah kedua set pernah dilihat.
8. **Transfer task:** terapkan konsep pada konteks berbeda dari worked example; rubrik dan bukti yang harus ditulis tersedia.
9. **Refleksi:** satu pertanyaan “mengapa” atau “kapan asumsi ini gagal”; input kosong tidak menyelesaikan lesson. Teks refleksi tidak otomatis dianggap bukti kebenaran matematis.
10. **Checkpoint:** minimal tiga item yang dijawab pengguna, jawaban/penjelasan tersimpan, dan setidaknya satu miskonsepsi kritis bila relevan. Riwayat bantuan serta soal yang pernah dilihat dibedakan dari percobaan tanpa bantuan pada set baru.

Bahasa Indonesia dan Inggris wajib lengkap untuk lesson yang diterbitkan: narasi, simbol yang dijelaskan, pertanyaan, hint, feedback, label visual, task, dan rubrik. Pergantian bahasa tidak mengubah ID, urutan pilihan, jawaban, angka contoh, maupun progres. Materi advanced tetap didefinisikan dengan bahasa pemula sebelum istilah formal digunakan.

### Bentuk visual

| Konsep | Bentuk yang digunakan | Aksi pelajar |
| --- | --- | --- |
| Hitungan, pecahan, rasio | Garis bilangan, blok pecahan, tabel unit | Ubah jumlah/unit dan prediksi hasil |
| Biner/hex/bitmask | Kotak bit dan bobot posisi, tabel konversi | Toggle bit; jelaskan nilai dan mask |
| Logika/himpunan | Truth table, diagram himpunan | Ubah input/rule dan cari contoh tandingan |
| Pangkat/log/biaya | Tabel dan grafik dengan sumbu berlabel | Ubah panjang/kardinalitas, bandingkan pertumbuhan |
| Peluang/Bayes | Pohon peluang, kisi frekuensi, confusion matrix | Ubah base rate dan baca precision |
| Modular/Euclid | Jam modulo dan tabel pembagian | Telusuri sisa, koefisien, dan inverse |
| Graf | Graf node/edge beserta daftar adjacency | Pilih lintasan/akses; bandingkan keterjangkauan |
| Matriks/field/ECC | Grid matriks, koefisien polinomial, titik finite field | Operasi langkah demi langkah pada parameter kecil |
| Protokol | Urutan pesan Alice–Bob dan tabel nilai | Bedakan nilai publik/privat serta autentikasi |
| Lattice/noise | Kisi 2D, basis, vektor, interval noise | Ubah basis/noise dan jelaskan decoding/error |

Pakai HTML/CSS/SVG dan kontrol native untuk visual kecil; React Flow hanya bila graf/alur memang terbantu olehnya. Semua visual memiliki penjelasan teks atau tabel yang setara, kontrol keyboard, label, feedback `aria-live`, serta tampilan yang tidak mengandalkan warna saja. Dukung tema terang/gelap, reduced motion, dan lebar kecil tanpa scroll horizontal halaman.

## 5. Kurikulum, task, dan assessment

Target editorial: **10 level, 40 modul, 120 lesson**, dengan tiga lesson dan satu transfer task per modul. Daftar lengkap ada di [kurikulum](../../../curriculum/cybersecurity-math/README.md). Empat modul per level merupakan ukuran awal yang boleh dipecah bila kedalaman materi membutuhkannya; jangan memangkas penjelasan agar mengejar angka.

| Level | Fokus | Bukti akhir level |
| --- | --- | --- |
| L0 | Numerasi dari nol | Worksheet rasio, unit, dan anggaran percobaan |
| L1 | Aljabar, fungsi, pangkat, logaritma | Jelaskan ruang pencarian dan sensitivitas asumsi |
| L2 | Representasi bit, logika, himpunan, pembuktian | Evaluasi permission dan koreksi argumen keliru |
| L3 | Kombinatorika, peluang, entropy | Analisis secret buatan dan collision |
| L4 | Statistik, Bayes, deteksi | Laporan confusion matrix dan base-rate effect |
| L5 | Teori bilangan dan modular | Derivasi inverse, CRT, dan modular exponentiation |
| L6 | Graf dan aljabar linear | Analisis akses dan sistem persamaan kecil |
| L7 | Fondasi kriptografi klasik | Bandingkan OTP, hash/MAC, RSA/DH model kecil |
| L8 | Struktur aljabar, finite field, ECC, argumen keamanan | Operasi field/kurva dan telaah argumen protokol |
| L9 | Complexity, lattice, post-quantum, capstone | Portofolio analisis dan pembelaan tertulis |

Urutan default linear antarmodul. L0–L6 menyediakan fondasi lintas pekerjaan keamanan; L7–L9 memperdalam jalur kriptografi. Selesaikan prasyarat terbit sebelum milestone resmi berikutnya, tetapi baca teori kapan saja. Materi calculus mendalam, analisis side-channel tingkat riset, pairings, dan implementasi standar produksi merupakan studi lanjutan di luar cakupan awal, bukan prasyarat tersembunyi.

Aturan usulan:

- Lesson: eksplorasi wajib, latihan wajib benar, refleksi terisi, dan seluruh tiga item checkpoint benar pada percobaan yang tidak membuka solusi checkpoint; kesempatan mencoba ulang tidak dibatasi. Membuka solusi mengharuskan memulai percobaan checkpoint baru, bukan memblokir lesson permanen. Riwayat bantuan/soal yang pernah dilihat tetap melekat pada bukti kelulusan formatif.
- Modul: ketiga lesson lulus dan checkpoint terpisah minimal lima item dengan nilai ≥80%, semua item dijawab, serta seluruh item kritis benar.
- Level: seluruh modul lulus dan assessment terpisah minimal sepuluh item dengan nilai ≥85%, semua item dijawab, serta seluruh item kritis benar. Soal tidak sekadar menyalin jawaban worked example.
- Minimal dua set checkpoint setara ditulis untuk lesson/modul/level; setelah solusi dibuka, retake beralih ke set lain. Setelah keduanya pernah dilihat, pengguna tetap boleh retake dan mendapat progres formatif dengan label **soal pernah dilihat**; tidak perlu menunggu konten baru. Jangan menyebutnya assessment independen/terproteksi. Kelulusan sebelumnya tetap disimpan beserta riwayat bantuan.
- Unlock resmi: L0M01 tidak memiliki prasyarat. Di dalam modul, lesson berikutnya memerlukan lesson sebelumnya lulus. Modul berikutnya memerlukan checkpoint modul sebelumnya lulus; modul pertama level berikutnya juga memerlukan assessment level sebelumnya lulus. Assessment modul terbuka setelah ketiga lesson lulus; assessment level setelah keempat modul lulus. Prasyarat yang belum terbit menutup progres resmi, tetapi bukan akses baca teori yang sudah terbit.
- Pada lesson published yang masih terkunci, pengguna boleh membaca dan mencoba interaksi sebagai preview. Tampilkan alasan terkunci serta tautan prasyarat; jawaban preview hanya berada di state halaman dan tidak disimpan sebagai draft/checkpoint/resume resmi. Tidak ada kelulusan tertunda yang otomatis aktif kemudian. Setelah prasyarat terpenuhi, pengguna memulai percobaan resmi pada lesson itu.
- Transfer task teks dan proof menggunakan rubrik serta status **belum dikerjakan / draf / siap direview**. Pengguna dapat menandai siap direview, tetapi tidak dapat membuat badge “direview independen”. Tidak ada layanan reviewer dalam rilis ini.
- Status task tertulis dan review capstone tidak mengunci lesson, modul, atau assessment otomatis berikutnya. Kesiapan capstone dicatat terpisah; penyelesaian checkpoint otomatis seluruh jalur tidak mengubahnya menjadi kelulusan capstone.
- Kelulusan otomatis dan progres lesson ditampilkan terpisah dari readiness capstone/review manusia. Pada L8–L9, badge hanya **checkpoint selesai**, bukan **expert tersertifikasi**.
- Retake tidak menghapus snapshot kelulusan yang sudah sah pada versi yang sama. Pembaruan materi memakai versi baru; histori versi lama tidak dihapus atau otomatis disetarakan.

## 6. Batas matematika dan keamanan contoh

- Gunakan data sintetis, secret fiktif, dan angka kecil yang jelas berlabel **model pembelajaran**. Jangan meminta password, private key, token, log pribadi, atau target nyata dari pengguna.
- Tidak ada scanner, koneksi target, cracking service, arbitrary code execution, atau API kriptografi produksi dalam fitur ini.
- Selalu bedakan encoding, encryption, hashing, dan authentication. Jelaskan perbedaan collision, preimage, dan second preimage.
- `alphabetSize^length` dan `length × log2(alphabetSize)` hanya berlaku untuk model karakter independen seragam. Jangan menerapkannya sebagai skor entropy password buatan manusia.
- Perkiraan waktu pencarian harus mencantumkan distribusi, jumlah percobaan, rate hipotetis, satuan, dan apakah rata-rata atau kasus terburuk. Angka tersebut bukan benchmark perangkat atau jaminan keamanan.
- Raw RSA kecil tanpa padding adalah alat pengajaran, bukan desain enkripsi aman. DH tanpa autentikasi tidak mencegah man-in-the-middle. OTP memerlukan kunci acak, sepanjang pesan, rahasia, dan tidak dipakai ulang.
- Bedakan finite-field ECC dari kurva kontinu. Inverse tidak selalu ada, pembagian nol ditolak, dan point at infinity diperkenalkan sebelum pengecualian operasi titik.
- Statistik deteksi membedakan korelasi/kausalitas, sample/population, serta asumsi independensi. Dataset contoh tidak mengukur efektivitas produk nyata.
- LWE/noise kecil dan visual 2D tidak mengimplementasikan ML-KEM. KEM bukan enkripsi pesan langsung atau digital signature. Klaim PQC harus menyebut asumsi, status sumber, dan batas model.

## 7. Integrasi dengan kode yang ada

Temuan source review: `src/components/shell.tsx` mengatur header/sidebar/CURRENT PATH; `src/components/learning.tsx` merender dashboard; `src/components/database-learning.tsx` berisi player yang bergantung pada SQL dan katalog database. `src/lib/curriculum.ts` mengimpor katalog database langsung, dan parser `src/lib/progress.ts` hanya menerima ID database `l…`. Memasukkan ID matematika ke penyimpanan ini akan ditolak parser atau berpotensi bertabrakan jika memakai ID lama.

Usulan implementasi terkecil:

| Bagian | Perubahan yang diperlukan |
| --- | --- |
| Routing | Halaman jalur dan lesson khusus matematika; server metadata, validasi lesson terbit, 404 untuk ID tidak dikenal/draft; ikuti dokumentasi Next.js lokal |
| Navigasi | Tambah menu header/sidebar, active state untuk rute turunan, kartu dashboard, CURRENT PATH kontekstual |
| Konten | Katalog baru `src/content/cybersecurity-math/`, ID `cm-l0m01l01`, versi materi, status draft/published, bilingual, prasyarat dan rubrik |
| Player | Komponen matematika terfokus; gunakan kembali Workspace, Button, Badge, Quiz bila kontraknya sesuai; jangan memaksa worked example ke `sql`/`starterSql` |
| Visual | Hanya interaksi yang dibutuhkan modul yang sedang dikerjakan, tanpa framework visual universal |
| Progres | Repository/hook matematika terpisah dengan key `taalmo.cybersecurity-math.progress.v1`; tidak mengubah/menyalin/mereset `taalmo.progress.v1` |
| Bahasa | Gunakan `useLocale` dan kamus yang sudah ada, tambahkan kamus khusus konten matematika; tidak membuat pengaturan bahasa lain |
| CSS | Gunakan token/pola card yang ada, CSS module khusus bila perlu; perhatikan header mobile dengan tambahan menu |
| Dokumen | README, arsitektur, roadmap, panduan authoring, dan backlog diperbarui sesuai apa yang benar-benar sudah terbit |
| Test/fixture/config | Tidak menambah atau menjalankan test; tidak menambah dependency, script, seed, API, atau konfigurasi layanan baru |

### Progres dan input

Record menyimpan content version, attempt/set soal, jawaban terstruktur, eksplorasi yang sudah dilakukan, bantuan/solusi yang dibuka, refleksi/task draft, step terakhir, dan snapshot kelulusan. Perangkat/origin yang sama saja; UI menjelaskan kegagalan menyimpan, storage diblokir, serta risiko kehilangan progres jika storage dihapus. Sinkronisasi event antartab mengikuti pola yang sudah ada; penggabungan concurrent write lintas tab tidak dijanjikan dan batasnya harus tertulis.

Parser hanya menerima ID, versi, step, exercise, dan pilihan yang terdaftar; validasi struktur, bilangan finite, integer aman/rentang, panjang teks, dan daftar nilai yang diperbolehkan. Storage rusak kembali ke state aman tanpa menganggap pengguna lulus. Nilai kelulusan dihitung dari jawaban dan aturan konten, bukan percaya flag `passed` dari storage. Refleksi dibatasi 6.000 karakter dan task draft 20.000 karakter per modul; simpan teks biasa, bukan HTML.

Tidak memakai `eval`, parser ekspresi umum, HTML dari input, atau loop tak terbatas. Lesson dasar memakai integer kecil dan pembanding numerik eksplisit. Jawaban desimal memiliki toleransi pembulatan yang dijelaskan. Pecahan menerima pasangan pembilang/penyebut, menolak penyebut nol, dan membandingkan nilai secara tepat di rentang aman. Modul modular lanjut memakai `bigint` bila diperlukan; serialisasi memakai string desimal tervalidasi, dan batas parameter/jumlah iterasi ditentukan per aktivitas agar UI tidak membeku. Notasi tampilan dan angka eksak dipisah dari format locale. Pembagian modular, inverse yang tidak ada, input kosong, negatif, dan batas maksimum punya feedback yang jelas.

## 8. Tahapan rilis dan kelengkapan

1. **Dokumen:** kebutuhan, peta seluruh kurikulum, task learner, backlog, review desain, lalu persetujuan.
2. **Rilis fondasi:** menu/kartu/rute, katalog seluruh target bertanda draft, player dan progres terpisah, tiga lesson L0M01 lengkap, checkpoint modul, visual dasar, bahasa, dan dokumentasi. Menu belum disebut tersedia sebelum tahap ini benar-benar diimplementasikan.
3. **L0 lengkap:** L0M02–M04 serta assessment L0. Setelah itu authoring berurutan L1 sampai L9, satu modul lengkap per pekerjaan.
4. **Penutupan:** capstone, rubrik review, keterlacakan seluruh kebutuhan, dan status nyata publikasi/evidence. Halaman jalur selalu jujur tentang materi yang masih draft.

Satu modul selesai hanya bila tiga lesson, task, visual yang relevan, hint, feedback, variasi, edge case, checkpoint, terjemahan, aturan progres, dan dokumentasi lengkap. Setiap pekerjaan selesai ditinjau melalui kode/diff, di-commit dengan file terkait saja, lalu langsung push. Jangan mengurangi kedalaman untuk menyelesaikan lebih banyak modul.

## 9. Acceptance criteria

| ID | Syarat penerimaan | Bukti review yang diminta |
| --- | --- | --- |
| AC01 | Menu, kartu, active state dan CURRENT PATH menjangkau jalur/lesson matematika | Telusuri seluruh caller/link melalui source dan diff |
| AC02 | Pemula dapat mulai tanpa asumsi matematika/coding tersembunyi | Review lesson L0 serta daftar istilah/prasyarat |
| AC03 | Lesson mengajar lewat aktivitas, visual, feedback dan transfer | Cocokkan setiap lesson terbit dengan 10 unsur kontrak authoring |
| AC04 | Ada peta newbie–expert yang jujur tentang publikasi | Review 10 level, 40 modul, 120 judul target, status dan denominator |
| AC05 | Ada learner task dan backlog implementasi terpisah | Review task/rubrik per modul dan dependency backlog |
| AC06 | Progres DB/lab lama tidak berubah akibat belajar matematika | Review seluruh write/parser matematika; key lama tidak ditulis |
| AC07 | Mastery berasal dari bukti checkpoint/prasyarat, bukan visit/scroll | Review penyimpanan jawaban, assisted state, evaluasi dan retake |
| AC08 | Indonesia–Inggris, keyboard, label, feedback, tema, dan layout kecil tercakup | Review pasangan teks, markup dan CSS; belum merupakan bukti aksesibilitas/runtime |
| AC09 | Perhitungan benar, terikat rentang, asumsi dan unit eksplisit | Derivasi manual di materi, review source dan edge cases; tanpa menjalankan contoh |
| AC10 | Latihan model tidak dipasarkan sebagai kriptografi produksi/sertifikasi | Review label, feedback kritis dan rubrik capstone |
| AC11 | Draft/ID tidak dikenal tak membuka lesson kosong | Review katalog, generateStaticParams dan guard route |
| AC12 | Tiap pekerjaan lengkap punya commit/push dan evidence jujur | Catat commit, status push, scope review, dan pekerjaan yang belum selesai |

Kebijakan proyek tetap berlaku: **tidak membuat unit test; tidak menjalankan test, pengujian manual/browser, lint, typecheck, build, audit script, atau eksekusi contoh** tanpa permintaan eksplisit pengguna. Syarat perilaku di atas adalah target implementasi; pembacaan kode/diff tidak membuktikan perilaku runtime. Tidak ada merge atau deploy.

## 10. Keputusan yang diserahkan kepada implementer

Nama file komponen, pemecahan CSS module, detail ilustrasi, pilihan SVG vs HTML per aktivitas, dan urutan internal hook boleh diputuskan saat implementasi. Gunakan dependency yang terpasang; tidak perlu library rumus baru untuk pelajaran dasar. Ukuran/rentang tiap visual harus dinyatakan pada kontrak aktivitas dan worked example sebelum implementasinya.

Yang memerlukan perubahan desain: tutor AI, akun/backend, runner kode, sertifikasi, layanan reviewer, pengecekan runtime yang sekarang dilarang, serta pengurangan kedalaman atau penggantian jalur lengkap menjadi katalog saja.

## 11. Referensi dan batas evidence

Ditinjau 7 November 2026. Referensi dipakai untuk arah pedagogi/cakupan, bukan disalin menjadi lesson:

- [Brilliant](https://brilliant.org/): halaman resminya menjelaskan pertanyaan penuntun, interaksi visual, hint, assessment, dan progres; situs saat ini juga menawarkan tutor AI. Desain Taalmo memilih pengajaran interaktif authored, bukan implementasi seluruh fitur Brilliant.
- [MIT 6.042J — Mathematics for Computer Science](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/): dasar struktur diskret, pembuktian, graf, modular, counting, dan peluang. Urutan 10 level di sini merupakan rancangan Taalmo.
- [Boneh–Shoup — A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/): rujukan cakupan kriptografi simetris/publik, signatures, ECC, lattice, dan protokol; tidak berarti peserta pemula langsung siap membaca buku graduate.
- [NIST FIPS 203](https://csrc.nist.gov/pubs/fips/203/final): sumber primer ML-KEM dan hubungan dengan Module Learning with Errors. Halaman resmi memiliki catatan potensi pembaruan; authoring L9 wajib membaca publikasi serta errata terkini sebelum menulis detail standar.

Review dokumen ini mencakup kebutuhan dan pembacaan sumber aplikasi. Belum ada menu baru, lesson matematika terbit, perhitungan yang dieksekusi, hasil test, atau bukti runtime.

## 12. Hasil builder review

Review oleh subagent pembaca desain menemukan dua batas yang perlu dibuat tegas; keduanya diselesaikan sebagai usulan perancang untuk disetujui bersama dokumen ini:

1. **Batas expert:** lingkup awal adalah matematika cybersecurity dengan pendalaman kriptografi, bukan seluruh matematika riset keamanan. Bagian 1 dan 5 menyatakan hasil, materi lanjutan, serta topik di luar cakupan secara eksplisit. Penambahan calculus/optimisasi mendalam, matematika ML, atau side-channel riset memerlukan perluasan desain; tidak diasumsikan sudah disepakati.
2. **Belajar di luar urutan:** akses baca/interaksi preview diizinkan, tetapi penyimpanan checkpoint/resume resmi menunggu prasyarat; tidak ada kelulusan tertunda. Aturan ini ditambahkan pada bagian 5.

Review juga menegaskan bahwa dua set soal tidak boleh menghasilkan jalan buntu setelah solusi pernah dibuka; aturan retake di bagian 4–5 mempertahankan akses belajar dan menyimpan provenance bantuan. Builder review selesai; persetujuan pengguna atas desain detail masih menunggu.

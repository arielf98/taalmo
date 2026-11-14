# Kebutuhan dan desain — Matematika untuk Cybersecurity

Dibuat 7 November, diperbarui 14 November 2026. Status: **desain disetujui pengguna; CM-01 sampai CM-04 serta CM-05a–CM-05c diimplementasikan; L0/L1/L2 lengkap dan L3M01–M03 terbit dengan review source/diff**.

Pengguna memilih **jalur lengkap bertahap** dan pada 7 November 2026 menyetujui dokumen desain ini serta memulai implementasi menu dan tiga lesson L0M01. Pengguna juga mengizinkan push dokumen ke GitHub arielf98/taalmo branch main. Ukuran kurikulum, aturan penilaian, dan keputusan teknis di bawah merupakan usulan perancang yang tercakup dalam persetujuan desain.

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

Pilihan pengguna: **jalur lengkap bertahap**. Usulan teknis perancang yang disetujui: player matematika terfokus, tanpa refactor mesin database.

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

Pada review desain awal, menu dan lesson matematika belum diimplementasikan. Status rilis sesudah persetujuan dicatat pada bagian 13; tidak ada perhitungan yang dieksekusi, hasil test, atau bukti runtime.

## 12. Hasil builder review

Review oleh subagent pembaca desain menemukan dua batas yang perlu dibuat tegas; keduanya diselesaikan sebagai usulan perancang untuk disetujui bersama dokumen ini:

1. **Batas expert:** lingkup awal adalah matematika cybersecurity dengan pendalaman kriptografi, bukan seluruh matematika riset keamanan. Bagian 1 dan 5 menyatakan hasil, materi lanjutan, serta topik di luar cakupan secara eksplisit. Penambahan calculus/optimisasi mendalam, matematika ML, atau side-channel riset memerlukan perluasan desain; tidak diasumsikan sudah disepakati.
2. **Belajar di luar urutan:** akses baca/interaksi preview diizinkan, tetapi penyimpanan checkpoint/resume resmi menunggu prasyarat; tidak ada kelulusan tertunda. Aturan ini ditambahkan pada bagian 5.

Review juga menegaskan bahwa dua set soal tidak boleh menghasilkan jalan buntu setelah solusi pernah dibuka; aturan retake di bagian 4–5 mempertahankan akses belajar dan menyimpan provenance bantuan. Builder review selesai; pengguna kemudian menyetujui desain dan memulai implementasi.

## 13. Status implementasi CM-01

Menu header/sidebar, kartu dashboard, CURRENT PATH kontekstual, route jalur/lesson, peta target bilingual, player, progres terpisah, dan tiga lesson L0M01 telah diimplementasikan. Tiga lesson terbit dan 117 target lain tetap draft. Lesson memiliki visual bermakna beserta tabel, worked example, dua variasi dan edge case, hint/feedback, transfer/refleksi, serta dua set checkpoint. Terdapat dua set checkpoint modul, task/rubrik dan penyimpanan draf modul. Belum ada assessment level, materi L0M02–L9, atau capstone terbit.

Review source oleh reviewer terpisah menghasilkan perbaikan parser fail-closed, histori versi pasif, sinkronisasi field jawaban, provenance bantuan/set soal, pemisahan preview/resmi, feedback antara, dan wrapping tombol. Keputusan penilaian diperjelas: draf transfer tidak wajib diisi untuk progres otomatis; refleksi tetap wajib, sesuai pemisahan task teks dari checkpoint. Parser dan masterynya tidak menilai kebenaran teks refleksi.

Kode hanya memakai grader integer dan tiga jenis visual yang diperlukan L0M01. Pecahan/desimal, bigint, visual modular, serta assessment level belum dibuat karena harus mengikuti modul yang membutuhkannya. Bukti saat ini source/diff review saja, tanpa test, manual/browser check, lint, typecheck, build, atau contoh yang dieksekusi. Tidak ada merge/deploy.

## 14. Lanjutan CM-02a — L0M02

Setelah rilis CM-01 `1e6f108` dipush, L0M02 menambahkan tiga lesson bilingual pecahan, desimal/persentase, dan perubahan relatif vs poin persentase. Status terkini **6 lesson terbit, 114 draft**. Terdapat dua task/rubrik modul dan dua set checkpoint per lesson/modul. Grader kini mendukung pasangan pecahan exact dengan penyebut positif serta desimal koma/titik yang dibatasi dan diberi toleransi eksplisit. Visual pecahan/persentase memiliki tabel, tanda pendekatan untuk pembulatan, dan proteksi baseline nol. Progress ID/versi L0M01 tetap sama; seluruh penilaian tetap formatif.

Navigasi akhir lesson menuju checkpoint modul yang belum lulus sebelum masuk modul berikutnya; preview menyebut checkpoint modul sebagai prasyarat bila itulah yang belum selesai. Review terpisah terhadap source/diff mencakup kompatibilitas jawaban lama, penyebut/input desimal, pembulatan, baseline nol, navigasi serta pengumuman visual. Tidak ada test atau eksekusi runtime. Pekerjaan berikutnya CM-02b/L0M03; assessment L0 dan materi sesudah L0M02 tetap belum terbit.

## 15. Lanjutan CM-02b — L0M03

Tiga lesson rasio/laju/unit ditambahkan dengan tabel eksplorasi bersatuan, dua variasi latihan dan edge case tiap lesson, tiga hint, feedback, worked steps, transfer/refleksi, serta dua set checkpoint lesson/modul dan task/rubrik. Perhitungan rate memakai model konstan hipotetis, bukan benchmark. Zero work dibedakan dari zero rate dengan target positif. Unit bytes memakai definisi eksplisit dan select yang tervalidasi; progress/storage kontrak lama dipertahankan.

Status kini **9 lesson published, 111 draft**; L0M04, assessment L0, dan level lanjutan belum terbit. Berikutnya CM-02c. Review tetap source/diff saja tanpa test, browser/manual check, lint, typecheck, build, audit, atau mengeksekusi contoh.

## 16. Lanjutan CM-02c — L0 selesai

L0M04 menambah tiga lesson bilingual negatif/jarak absolut, estimasi/pembulatan, serta pangkat dengan worked example, latihan/edge/hint, dua set checkpoint dan task/rubrik. Input signed memakai slider keyboard dan bounds yang sesuai; rounding nonnegatif memakai halfway naik, dan 0^0 dikecualikan. Seluruh L0 kini **12 lesson published, 108 draft**, empat checkpoint/task modul, serta assessment L0 dua set × 13 soal yang mencakup semua lesson dan pembanding per-akun/total serta memeriksa unit/nol/pangkat.

Assessment level memerlukan seluruh modul lulus, semua jawaban terisi, nilai aktual ≥85%, dan semua critical benar. ID/version, parsing flag/evidence, snapshot kelulusan, riwayat bantuan/set, solusi dan retake mengikuti model yang sama; grade level tidak disamakan dengan persentase aktivitas. L1 tetap draft, walaupun engine sekarang memiliki gate antarlevel berdasarkan assessment yang benar-benar terdaftar. Tidak ada sertifikasi atau review task otomatis. Berikutnya CM-03a/L1M01; evidence tetap source/diff, tanpa pemeriksaan runtime.

## 17. Lanjutan CM-03a — L1M01

Tiga lesson variabel/substitusi, persamaan dua sisi, dan pertidaksamaan/budget integer diterbitkan, lengkap dengan worked example, dua variasi/edge case, hint/feedback, dua set checkpoint lesson/modul serta task/rubrik. Label visual penjumlahan menjelaskan x dan konstanta; model budget 40+3x menunjukkan batas integer dan biaya tetap, termasuk kasus tidak ada solusi layak. Header dan navigasi mengikuti level serta membedakan assessment L0 dari checkpoint modul sebagai prasyarat.

Status kini **15 lesson published, 105 draft**, lima checkpoint/task modul, dan assessment L0 dua set × 13 soal. L1M01 memerlukan L0 lulus; assessment L1 tetap belum terbit sampai semua modul lengkap. Berikutnya CM-03b/L1M02. Evidence source/diff saja; tidak ada test, browser/manual check, lint, typecheck, build atau eksekusi contoh.

## 18. Lanjutan CM-03b — L1M02

Tiga lesson fungsi/domain/range, grafik linear/kemiringan dan komposisi/invers ditambahkan, dengan seluruh tahapan bilingual, dua set checkpoint lesson/modul serta task/rubrik. Tabel fungsi menolak input di luar domain dan membedakan range dari domain. Grafik N(t)=3+mt memperlihatkan nilai awal, rate dan sampel integer bersumbu/unit; garis putus-putus hanya penghubung sampel. Model komposisi f(x)=x+2 dan g(u)=3u menunjukkan kedua urutan, nilai antara dan pembatalan tahap terbalik. Domain integer nonnegatif lebih luas dari rentang kontrol; domain invers adalah range komposisi. Fungsi konstan, invers tidak unik dan perbedaan invers/reciprocal dijelaskan serta dinilai.

Status authoring menjadi **18 lesson published, 102 draft**, enam checkpoint/task modul dan assessment L0 dua set × 13 soal. Tidak ada perubahan ID/version lama, bentuk progres, grading atau route API. Assessment L1 belum terbit. Berikutnya CM-03c/L1M03. Evidence tetap source/diff; runtime belum diverifikasi.

## 19. Lanjutan CM-03c — L1M03

Tiga lesson aturan pangkat, pertumbuhan linear/eksponensial dan ruang string ditambahkan dengan seluruh tahap bilingual, hint/feedback, dua set checkpoint lesson/modul serta task/rubrik. Aturan pangkat dijelaskan melalui faktor dan syarat basis/domain; 0^0 tetap dikecualikan. Grafik 1+bn vs b^n memakai sampel putaran integer, sumbu/unit/skala, marker berbeda dan tabel setara. Model eksponensial tidak diklaim selalu lebih besar pada input awal. Pohon hanya menampilkan maksimal dua posisi; tabel mengakui seluruh kelanjutan yang tidak digambar, termasuk ε saat panjang nol. Syarat seluruh kombinasi dengan pengulangan dipisahkan dari asumsi pemilihan seragam/independen untuk peluang sama; angka bukan skor entropy password manusia.

Status authoring menjadi **21 lesson published, 99 draft**, tujuh checkpoint/task modul dan assessment L0 tetap dua set × 13 soal. Progress/versi lama, route dan grading tetap memakai kontrak yang sama; assessment L1 belum tersedia. Berikutnya CM-03d/L1M04 dan assessment L1. Evidence source/diff saja, runtime belum diverifikasi.

## 20. Lanjutan CM-03d — L1 lengkap

L1M04 menambah logaritma/invers pangkat, bit pilihan/pembelahan ideal dan mean/worst enumerasi, dengan seluruh tahap bilingual, dua set checkpoint lesson/modul dan task/rubrik. Log riil menolak argumen nonpositif dan basis satu; kontrol memakai pangkat eksak kecil. Pembelahan seimbang bukan satu tebakan kandidat; h>k ditandai di luar model. Search model memakai N positif, target seragam/pasti di daftar, urutan tetap/tanpa ulang, rate tetap hipotetis dan tanpa overhead/paralelisme. Mean (N+1)/2 berbeda dari worst N; rate nol tidak dibagi. Waktu mean adalah rata-rata kasus, bukan batas tiap kasus.

Assessment L1 dua set × 15 soal mencakup semua 12 lesson serta distribusi, mean/worst dan domain log. Semua modul wajib lulus, semua jawaban terisi, nilai aktual ≥85%, semua critical benar; solusi/retake/snapshot/histori memakai aturan yang sama. Task tertulis tidak otomatis dianggap benar. Status authoring **24 lesson published, 96 draft**, delapan checkpoint/task modul, L0 2×13 soal dan L1 2×15 soal. L2–L9 tetap draft. Berikutnya CM-04a/L2M01. Evidence source/diff saja; runtime belum diverifikasi, tidak ada merge/deploy.

## 21. Lanjutan CM-04a — L2M01

Tiga lesson nilai tempat biner/desimal, hexadecimal dan signedness/overflow ditambahkan dengan seluruh tahap bilingual, dua set checkpoint lesson/modul serta task/rubrik. Visual memakai delapan tombol bit dengan posisi, bobot, pressed state dan keyboard native; tabel memperlihatkan bobot atau kelompok empat bit. Signedness mengubah bobot tertinggi menjadi −128 tanpa mengubah pola. Model tambahan nonnegatif 0…15 mempertahankan delapan bit rendah, memisahkan jumlah matematika unsigned/signed, pola simpan, interpretasi hasil serta masing-masing overflow. Definisi sisa pembagian/modulo dijelaskan; model wrap tidak menjadi klaim perilaku semua bahasa/API.

Status authoring **27 lesson published, 93 draft**, sembilan checkpoint/task modul. L2M01 memerlukan assessment L1 untuk progres resmi, tetap bisa dipreview tanpa write resmi. Sisa L2, L3–L9 dan assessment L2 tetap draft; L0/L1 assessment, ID/version dan bentuk record lama tidak berubah. Berikutnya CM-04b/L2M02. Evidence source/diff saja; runtime belum diverifikasi.

## 22. Lanjutan CM-04b — L2M02 dan izin runtime

Tiga lesson truth table, bitwise/mask/shift dan predikat/De Morgan ditambahkan dengan seluruh tahap bilingual, dua set checkpoint lesson/modul dan task/rubrik. Visual Boolean membandingkan empat pasangan input dan kedua identitas, termasuk rewrite salah serta marker baris terpilih. Operasi unsigned empat bit memakai jarak shift satu, NOT4 terbatas dan pemeriksaan any/all yang berbeda pada mask kosong. Lesson bitwise memiliki tujuh latihan wajib agar setiap operator dan edge case tercakup. Model akses menetapkan persamaan keputusan secara eksplisit; contoh bukan sistem otorisasi produksi.

Status authoring **30 lesson published, 90 draft**, sepuluh checkpoint/task modul. L2M03–M04 dan assessment L2 belum terbit. Pada 13 November pengguna secara eksplisit meminta aplikasi dipastikan bisa dijalankan, sehingga build dan pemeriksaan startup/route kini diizinkan untuk pekerjaan ini; larangan membuat/menjalankan unit test tetap berlaku. Hasil aktual dicatat di [evidence runtime](../../cybersecurity-math-runtime.md). Berikutnya CM-04c/L2M03.

## 23. Lanjutan CM-04c — L2M03

Tiga lesson bilingual operasi himpunan, pasangan/relasi dan fungsi/bijeksi memiliki seluruh tahap, dua set checkpoint lesson/modul serta task/rubrik. Visual tombol anggota dan Venn skematis memakai universe terbatas; grid pasangan membedakan product dari relasi; panah/tabel menyatakan domain, codomain dan image. Relasi multi-output tetap sah sebagai relasi tetapi bukan fungsi total. Perubahan codomain mempertahankan panah, dapat mengubah onto; target di luar C ditandai tidak sah. Invers seluruh C dibedakan dari invers pada image. Kasus himpunan kosong, urutan pasangan, tabrakan dan tujuan tidak tercapai ikut dinilai.

Status **33 lesson published, 87 draft**, sebelas checkpoint/task modul; assessment L0/L1 tetap tersedia. L2M04/assessment L2 berikutnya. Tidak ada perubahan ID/version, storage, grader atau API route. Evidence runtime terbatas dicatat terpisah; bukan sertifikasi/review task manusia.

## 24. Lanjutan CM-04d — L2 lengkap

Tiga lesson bilingual kuantor/counterexample, bukti langsung/kontradiksi dan induksi/invariant memiliki seluruh tahap, dua set checkpoint lesson/modul serta task/rubrik. Domain, implikasi/converse/contrapositive, negasi kuantor dan domain kosong dinyatakan. Visual finite-table tidak mengklaim membuktikan semua integer; kartu simbolik memakai variabel sembarang. Tabel loop membedakan initialization/preservation/exit dan terminasi, update berurutan, kasus kosong serta keadaan i>N yang tidak terjangkau. Teks bukti tetap membutuhkan review manusia; jawaban numerik bukan bukti argumen tertulis telah sah.

Assessment L2 dua set × 16 mencakup semua12lesson dan guard wrap/urutan kuantor/contoh vs bukti/invariant vs terminasi; seluruh empat modul, semua jawaban, nilai aktual ≥85% dan semua critical wajib. Status **36 lesson published, 84 draft**, dua belas checkpoint/task modul, L0 2×13, L1 2×15 dan L2 2×16. Grader, storage, stable ID/version dan route API lama tidak berubah. L3–L9/capstone belum terbit; berikutnya CM-05a/L3M01. Evidence runtime terbatas tetap dicatat terpisah.

## 25. Lanjutan CM-05a — L3M01

Tiga lesson lengkap bilingual aturan penjumlahan/perkalian, permutasi/kombinasi serta inklusi–eksklusi/pigeonhole memiliki seluruh tahap, dua set checkpoint lesson/modul dan task/rubrik. Visual menampilkan seluruh pasangan dua daftar, semua tim/peran dua orang, kotak seimbang dan tabel setara. Cabang tidak seragam, tanpa pengulangan,0!,pilihan kosong,k>n,overlap dan batas ceil(N/M) dijelaskan. N<2 tidak memiliki pasangan collision; untuk2≤N≤M collision mungkin tetapi belum pasti. Contoh seimbang mencapai batas minimal maksimum, bukan klaim semua mapping sama atau seragam. Hitungan tidak menjadi peluang, penilaian keamanan atau algoritme serangan.

Status **39 lesson published, 81 draft**, tiga belas checkpoint/task modul. Assessment L0/L1/L2 tetap tersedia, L3 assessment belum terbit. L3 memerlukan assessment L2 untuk progres resmi; preview tetap tanpa write resmi. Storage/grader/route API/ID/version lama tidak berubah. Berikutnya CM-05b/L3M02; sisa L3–L9 dan capstone belum selesai. Evidence runtime terbatas dicatat terpisah.

## 26. Lanjutan CM-05b — L3M02

Tiga lesson bilingual ruang sampel/kejadian, komplemen/union/conditional dan independensi/dua percobaan memiliki seluruh tahap, dua set checkpoint lesson/modul serta task/rubrik. Visual tiket memberi bobot pada ID, bukan warna; Ω kosong tidak sah. Grid kejadian mengganti penyebut sesuai kondisi, menandai conditional berpeluang nol tidak terdefinisi. Pohon/tabel empat daun membedakan iid dengan ulang dari dua kandidat berbeda terhadap satu target tetap. Mode berbeda mensyaratkan N≥2; iid N1 memiliki conditional pada cabang gagal yang tidak terdefinisi tanpa membuat daun gabungan salah. Tidak ada random sampling/serangan nyata atau klaim distribusi secret manusia.

Status **42 lesson published, 78 draft**, empat belas checkpoint/task modul; assessment L0/L1/L2 tetap tersedia, L3 assessment belum terbit. ID/version/storage/grader/API route tetap. Berikutnya CM-05c/L3M03; evidence runnable-app terbatas dicatat terpisah dari source review dan dari pemeriksaan kelulusan lengkap.

## 27. Lanjutan CM-05c — L3M03

Tiga lesson bilingual distribusi/ekspektasi, Bernoulli/binomial dan geometrik/variansi memiliki seluruh tahap, dua set checkpoint lesson/modul dan task/rubrik. Peubah sebagai mapping, bobot ternormalisasi, mean berbobot/linearitas dan interpretasi mean dinyatakan. Binomial memerlukan n tetap, independensi dan p sama; koefisien menghitung pola dengan jumlah sukses sama. Endpoint n0/p0/p1 tidak memakai0^0. Geometrik menghitung percobaan termasuk sukses; grafik memberi bucket tail dan rumus mean/variansi support penuh. p0 tidak sukses, p1 konstan1, mean bukan deadline. Variansi menggunakan satuan kuadrat dan syarat ketergantungan berbeda dari linearitas mean.

Status **45 lesson published, 75 draft**, lima belas checkpoint/task modul. Assessment L0/L1/L2 tetap tersedia; assessment L3 belum terbit sampai L3M04 lengkap. Storage/grader/stable ID/version/route API lama tetap. Berikutnya CM-05d/L3M04 dan assessment L3. Evidence runtime terbatas dicatat terpisah, bukan pengesahan argumen peserta.

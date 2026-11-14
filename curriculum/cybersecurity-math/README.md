# Matematika untuk Cybersecurity — kurikulum dan task pelajar

Status 14 November 2026: **51 lesson bilingual terbit: seluruh L0,L1,L2 dan L3 (masing-masing 12 lesson dan empat checkpoint/task modul),ditambah L4M01 (tiga lesson/checkpoint/task modul); assessment L0 dua set × 13,L1 × 15,L2 × 16 dan L3 × 18 soal. Sebanyak 69 lesson berikutnya masih blueprint/draft**. Authoring ditinjau source/diff; build/startup,route dan contoh interaksi browser dicatat di [evidence runtime](../../docs/cybersecurity-math-runtime.md). Seluruh latihan/assessment belum diuji end-to-end.

Target: 10 level × 4 modul × 3 lesson = **120 lesson**, 40 transfer task, 40 checkpoint modul, 10 assessment level, dan satu capstone portofolio. Seluruh modul L0/L1/L2/L3 dan L4M01 masing-masing sudah memiliki task/rubrik serta dua set checkpoint modul; assessment L0/L1/L2/L3 tersedia, assessment L4–L9 dan capstone belum terbit. Jumlah keseluruhan adalah target authoring, bukan klaim konten sudah selesai. Kedalaman boleh menambah lesson; tidak boleh dikurangi untuk mempertahankan angka.

[Kebutuhan/desain](../../docs/superpowers/specs/2026-11-07-cybersecurity-math-design.md) · [Task implementasi](../../docs/cybersecurity-math-tasks.md)

## Cara menggunakan jalur

Mulai L0 tanpa prasyarat coding atau matematika SMA. Ikuti urutan lesson/modul dalam tabel: lesson memerlukan lesson sebelumnya dalam modul, modul memerlukan checkpoint modul sebelumnya, dan awal level baru memerlukan assessment level sebelumnya. L0M01 tidak memiliki prasyarat. Task tertulis/review manusia dicatat terpisah dan tidak memblokir progres checkpoint otomatis. Teori yang sudah terbit tetap boleh dibaca. Penamaan ID: `cm-l0m01` untuk modul, `cm-l0m01l01` sampai `cm-l0m01l03` untuk tiga lesson sesuai urutan di kolom lesson; `cm-l0` untuk assessment level. ID ini tidak memakai namespace lesson database.

Lesson published yang terkunci tetap dapat dibaca/dicoba sebagai preview tanpa menyimpan jawaban, resume, atau kelulusan resmi. Setelah prasyarat terpenuhi, mulai percobaan resmi; jawaban preview tidak berubah otomatis menjadi mastery.

L0–L6 memberi fondasi numerasi, analisis deteksi, representasi data, serta struktur diskret. L7–L9 memperdalam matematika kriptografi, bukan syarat untuk mulai semua pekerjaan cybersecurity. Teks Indonesia dan Inggris, worked example, hint, feedback, visual interaktif, serta variasi soal wajib tersedia sebelum suatu lesson disebut published.

Setiap transfer task menghasilkan jawaban tertulis berisi **input/asumsi → langkah → hasil/unit → alasan → keterbatasan atau contoh tandingan**. Rubrik bersama: ketepatan 0–4, langkah/penalaran 0–3, asumsi/batas 0–2, dan kejelasan 0–1. Nilai ≥8/10 serta tanpa kekeliruan kritis merupakan target review manusia; self-review tidak diberi label review independen. Checkpoint otomatis dan task tertulis ditampilkan terpisah.

## L0 — nyaman kembali dengan angka

Tujuan: dapat menghitung tanpa takut simbol, menjaga unit, dan menerangkan jawabannya. Prasyarat masuk: tidak ada. Semua istilah seperti percobaan login, byte, dan laju dikenalkan dari bahasa sehari-hari.

| Modul | Tiga lesson berurutan | Transfer task dan syarat jawaban |
| --- | --- | --- |
| cm-l0m01 — Bilangan dan operasi | 1. Menghitung kejadian dan membaca garis bilangan; 2. Penjumlahan, perkalian, dan kelompok percobaan; 3. Pembagian, sisa, serta urutan operasi | **TASK-L0M01:** Susun tabel empat akun dengan enam percobaan per akun; bandingkan dengan empat percobaan tambahan total. Hasil 24 vs 28, bukan 40; jelaskan beda “per akun” dan “total”. Visual: kelompok benda/garis bilangan. |
| cm-l0m02 — Pecahan dan persentase | 1. Bagian dari keseluruhan; 2. Desimal dan persentase; 3. Perubahan relatif vs selisih persentase | **TASK-L0M02:** Dari 200 kejadian, 30 perlu diperiksa. Hitung 15%; bandingkan rasio 10% menjadi 15% sebagai +5 poin persentase dan +50% relatif. Jelaskan denominator. Visual: kisi dan batang pecahan. |
| cm-l0m03 — Rasio, laju, dan unit | 1. Perbandingan senilai; 2. Kejadian per detik dan konversi waktu; 3. Bit, byte, serta prefiks desimal/biner | **TASK-L0M03:** Untuk rate hipotetis 20 percobaan/detik, hitung waktu 1.000 percobaan = 50 detik. Bedakan 1 kB = 1.000 byte dan 1 KiB = 1.024 byte serta 8 bit/byte. Visual: tabel unit. |
| cm-l0m04 — Estimasi dan membaca notasi | 1. Bilangan negatif dan jarak absolut; 2. Pembulatan, kisaran, dan orde besaran; 3. Pangkat sebagai perkalian berulang | **TASK-L0M04:** Bandingkan 10³ dan 2¹⁰, bedakan 2³ dari 2×3, lalu estimasi total kejadian dari rate yang diberi rentang. Tulis rentang, bukan presisi palsu. Visual: blok pangkat dan interval. |

Assessment L0: worksheet numerasi minimal sepuluh item mencakup seluruh modul, unit wajib, dan dua kasus “per objek vs total”. Salah unit merupakan item kritis.

Implementasi saat ini: dua set masing-masing 13 soal, setiap set mencakup seluruh 12 lesson serta satu kasus pembanding tambahan per akun vs total, dengan nol, sisa kelompok, unit waktu/byte, dan pangkat sebagai pemeriksaan kritis. Semua modul wajib lulus, seluruh item wajib dijawab, nilai ≥85%, dan semua critical benar. Kelulusan formatif terpisah dari review empat task tertulis; L1M01 terbuka untuk progres resmi setelah assessment ini lulus.

## L1 — aljabar dan pertumbuhan

Prasyarat: L0. Tujuan: memodelkan hubungan dan menilai asumsi ruang pencarian.

Status: L1M01 telah authored/published dengan tiga lesson, dua set checkpoint lesson/modul, visual substitusi/missing-addend serta budget, hint, feedback, task/rubrik. L1M02 juga telah authored/published: domain/range, grafik dan kemiringan, komposisi/invers; dua set checkpoint lesson/modul serta task/rubrik tersedia. L1M03 juga terbit dengan aturan pangkat, linear/eksponensial dan ruang string, dua set checkpoint lesson/modul, visual, hint/feedback serta task/rubrik. L1M04 kini terbit dengan logaritma, bit pilihan vs tebakan, mean/worst enumerasi; dua set checkpoint lesson/modul serta task/rubrik tersedia. Assessment L1 terbit dan menjadi prasyarat L2M01; L2 kini lengkap; L3 kini lengkap; L4M01 kini terbit;sisa L4 dan L5–L9 tetap draft.

| Modul | Tiga lesson berurutan | Transfer task dan syarat jawaban |
| --- | --- | --- |
| cm-l1m01 — Variabel dan persamaan | 1. Huruf sebagai nilai yang belum diketahui; 2. Menjaga kesetaraan saat memindah operasi; 3. Pertidaksamaan dan batas sumber daya | **TASK-L1M01:** Dengan biaya awal 40 dan 3 per kejadian, tentukan maksimum kejadian untuk budget 100: 20. Tunjukkan persamaan/pertidaksamaan dan mengapa hasil harus integer. Visual: timbangan dan tabel budget. |
| cm-l1m02 — Fungsi dan grafik | 1. Input, output, domain, dan range; 2. Fungsi linear dan kemiringan; 3. Komposisi serta fungsi inverse sederhana | **TASK-L1M02 (terbit):** Buat tabel/grafik N(t)=5+4t untuk domain {0,1,2,3} menit; sebut range, nilai awal, rate, invers dan syaratnya. Bandingkan kedua urutan f(x)=x+3 dan g(u)=2u pada x=4; turunkan invers dan periksa round-trip. Bedakan invers dari 1/hasil, input di luar domain, serta fungsi konstan tanpa invers unik. Visual: tabel domain/range, grafik bersumbu/unit, dua tahap komposisi/invers. |
| cm-l1m03 — Eksponensial | 1. Aturan pangkat dan pangkat nol; 2. Pertumbuhan linear vs eksponensial; 3. Ruang string dengan pilihan karakter | **TASK-L1M03 (terbit):** Untuk empat posisi dengan dua simbol dan semua kombinasi/pengulangan boleh, hitung 16 kemungkinan lalu 32 saat satu posisi ditambah. Bandingkan 2^n dengan 1+2n untuk n=0…6, tunjukkan aturan faktor, panjang nol dan kasus larangan pengulangan. Pisahkan hitungan kumpulan dari asumsi pemilihan seragam/independen serta klaim password manusia. Visual: pohon prefix terbatas, tabel kelanjutan, grafik/tabel pertumbuhan. |
| cm-l1m04 — Logaritma dan biaya pencarian | 1. Logaritma sebagai inverse pangkat; 2. log₂ dan jumlah bit pilihan; 3. Kasus terburuk, rata-rata, dan asumsi rate | **TASK-L1M04 (terbit):** Ruang 256 secret seragam di daftar memberi label 8 bit; enumerasi tanpa pengulangan memakai maksimal 256 dan mean 128,5 percobaan. Turunkan waktu pada rate hipotetis 4/detik, bedakan bit label/tebakan, dan ulangi N=1 serta r=0 secara terpisah. Tulis domain, unit, distribusi dan batas model. Visual: pangkat/log dua arah, pembelahan ideal, tabel mean/worst. |

Assessment L1 terbit: dua set × 15 soal mencakup seluruh 12 lesson ditambah distribusi, mean/worst dan domain log. Seluruh modul L1 wajib lulus, semua item dijawab, nilai aktual ≥85% dan semua critical benar. Teks task tidak otomatis dinilai. Menganggap password manusia selalu seragam atau bit label sebagai tebakan adalah miskonsepsi kritis. L2 kini lengkap; L3 kini lengkap; L4M01 kini terbit;sisa L4 dan L5–L9 tetap draft tanpa tautan lesson peluncuran.

## L2 — bit, logika, himpunan, dan bukti

Prasyarat: L1. Tujuan: memahami representasi data dan berargumen secara tepat.

Status: L2M01 telah authored/published, tiga lesson lengkap bilingual biner/desimal, hex, signedness/overflow dengan visual toggle delapan bit, dua set checkpoint lesson/modul dan task/rubrik. L2M02 juga terbit dengan truth table, operasi bit/mask empat bit, shift logis dan kedua hukum De Morgan; dua set checkpoint lesson/modul dan task/rubrik tersedia. L2M03 kini terbit dengan operasi himpunan, pasangan/relasi dan fungsi/bijeksi; dua set checkpoint lesson/modul serta task/rubrik tersedia. L2M04 kini terbit dengan kuantor/counterexample, bukti langsung/kontradiksi dan induksi/invariant; dua set checkpoint lesson/modul dan task/rubrik tersedia, beserta assessment L2.

| Modul | Tiga lesson berurutan | Transfer task dan syarat jawaban |
| --- | --- | --- |
| cm-l2m01 — Representasi bilangan | 1. Nilai tempat desimal dan biner; 2. Hexadecimal dan pengelompokan empat bit; 3. Unsigned, two's complement, serta overflow | **TASK-L2M01 (terbit):** Uraikan 13 = 1101₂ = 00001101₂ = 0D₁₆; buat tabel bobot, bandingkan 11111111₂ sebagai unsigned 255 dan signed two’s complement delapan bit −1. Untuk 127+1 dan raw 255+1, pisahkan hasil matematika, pola simpan serta overflow signed/unsigned pada model wrap. Sebut lebar, rentang, jumlah pola vs maksimum dan batas kontrak program nyata. Visual: toggle bit berbobot, tabel kelompok/interpretasi/wrap. |
| cm-l2m02 — Operasi bit dan logika | 1. AND, OR, NOT dan truth table; 2. XOR, shift, dan mask; 3. Predikat gabungan serta hukum De Morgan | **TASK-L2M02 (terbit):** Evaluasi 0110 AND 0010; bandingkan any/all pada x=2,m=6 dan mask kosong. Buat tabel operator per bit, NOT4 dan kedua shift satu untuk x=9,m=3. Buktikan kedua hukum De Morgan dengan empat baris, beri counterexample rewrite salah, dan bedakan OR/XOR pada (1,1). Nyatakan lebar/domain serta batas model otorisasi fiktif. Visual: tabel Boolean, kotak bit sejajar dan tabel rewrite. |
| cm-l2m03 — Himpunan dan relasi | 1. Anggota, subset, union, dan intersection; 2. Cartesian product serta relasi; 3. Fungsi, injektif, surjektif, dan bijektif | **TASK-L2M03 (terbit):** Tulis product role×resource dan relasi satu-ke-banyak; hitung union, intersection, kedua difference serta complement C∖A dan C∖B daftar resource. Buat mapping bijektif dan tidak bijektif, lalu perluas codomain tanpa mengubah panah dan jelaskan image/onto/invers. Sertakan kasus kosong serta urutan pasangan. Visual: tombol anggota/Venn skematis, grid pasangan dan panah/tabel mapping. |
| cm-l2m04 — Membaca dan membuat bukti | 1. Implikasi, kuantor, dan contoh tandingan; 2. Bukti langsung serta kontradiksi; 3. Induksi dan invariant langkah | **TASK-L2M04 (terbit):** Bantah “semua kode panjang aman” dengan model generator yang selalu mengeluarkan kode sama; buktikan paritas jumlah dua bilangan genap, lalu jelaskan invariant loop penjumlahan. Contoh numerik saja bukan bukti universal. Visual: kartu argumen/langkah. |

Assessment L2 terbit: dua set × 16 soal meliputi seluruh 12 lesson serta wrap, urutan kuantor, sampel vs bukti dan invariant vs terminasi. Semua modul wajib lulus, seluruh soal dijawab, nilai aktual ≥85% dan semua critical benar. Bukti/task tertulis memerlukan review manusia; lulus fakta otomatis bukan pengesahan argumen. L3 kini lengkap; L4M01 kini terbit;sisa L4 dan L5–L9 tetap draft.

## L3 — menghitung kemungkinan dan ketidakpastian

Prasyarat: L2. Tujuan: membedakan banyaknya kemungkinan dari distribusinya.

Status: L3M01 terbit dengan tiga lesson lengkap bilingual aturan hitung, permutasi/kombinasi, inklusi–eksklusi/pigeonhole, dua set checkpoint lesson/modul dan task/rubrik. L3M02 kini terbit dengan ruang sampel, conditional dan independensi, dua set checkpoint lesson/modul serta task/rubrik. L3M03 terbit dengan distribusi/ekspektasi, Bernoulli/binomial dan geometrik/variansi, dua set checkpoint lesson/modul serta task/rubrik. L3M04 kini lengkap dengan Shannon/min-entropy serta collision/birthday bounds,dua set checkpoint lesson/modul dan task/rubrik. Assessment L3 juga terbit.

| Modul | Tiga lesson berurutan | Transfer task dan syarat jawaban |
| --- | --- | --- |
| cm-l3m01 — Kombinatorika | 1. Aturan penjumlahan dan perkalian; 2. Permutasi vs kombinasi; 3. Inklusi–eksklusi dan pigeonhole | **TASK-L3M01 (terbit):** Bandingkan memilih dua reviewer dari lima (10 cara) dengan memilih ketua dan wakil (20 cara), hitung cabang sensor dengan2,1,3 format serta union katalog8+6−3. Buktikan6 ID ke5 label pasti bertabrakan; beri mapping3 ID ke5 label dengan/tanpa collision dan jelaskan kasus kosong serta batas klaim. Visual: daftar semua alternatif/pasangan, tim/peran dan kotak seimbang beserta tabel. |
| cm-l3m02 — Peluang dasar | 1. Ruang sampel dan kejadian; 2. Komplemen, union, serta conditional probability; 3. Independensi dan percobaan berulang | **TASK-L3M02 (terbit):** Untuk satu tebakan secret seragam dari 16 pilihan, hitung 1/16; bandingkan dua tebakan berbeda tanpa pengulangan (2/16) dengan dua tebakan independen yang bisa berulang (1−(15/16)²). Visual: pohon peluang. |
| cm-l3m03 — Peubah acak dan ekspektasi | 1. Distribusi diskret dan expected value; 2. Bernoulli serta binomial; 3. Geometrik, variansi, dan batas interpretasi | **TASK-L3M03 (terbit):** Hitung distribusi jumlah keberhasilan dari tiga percobaan independen dengan p=1/2, E[X]=1,5, serta jelaskan mengapa nilai rata-rata tidak harus merupakan hasil satu percobaan. Visual: histogram diskret. |
| cm-l3m04 — Informasi dan entropy | 1. Informasi −log₂(p) dan Shannon entropy; 2. Min-entropy serta sumber bias; 3. Collision dan birthday approximation | **TASK-L3M04 (terbit):** Bandingkan secret dua bit seragam dengan empat simbol berprobabilitas 1/2,1/4,1/8,1/8; hitung Shannon entropy 2 vs 1,75 dan min-entropy 2 vs 1. Jelaskan syarat birthday approximation dan beda collision/preimage. Visual: distribusi dan pasangan collision. |

Assessment L3 terbit: dua set × 18 soal mencakup seluruh12lesson dan guard model,distribusi,korelasi,conditional nol,mean vs deadline dan collision bound. Wajib seluruh empat modul,semua jawaban,≥85% aktual dan semua critical benar. Model secret sintetis/distribusi eksplisit;eksak didahulukan dari pendekatan. Panjang saja tidak menentukan entropy,teks task tetap perlu review manusia. L4M01 kini terbit;sisa L4 dan L5–L9 tetap draft.

## L4 — statistik untuk memahami deteksi keamanan

Prasyarat: L3. Tujuan: membaca data tanpa menyamakan banyak alert dengan keberhasilan deteksi.

Status: L4M01 terbit dengan tiga lesson lengkap bilingual sampel/bias,mean/median/persentil/outlier serta variasi/standardisasi,dua set checkpoint lesson/modul dan task/rubrik. L4M02–M04 dan assessment L4 belum terbit.

| Modul | Tiga lesson berurutan | Transfer task dan syarat jawaban |
| --- | --- | --- |
| cm-l4m01 — Ringkasan data | 1. Populasi, sampel, dan bias pengambilan data; 2. Mean, median, quantile, dan outlier; 3. Variansi, simpangan baku, serta standardisasi | **TASK-L4M01 (terbit):** Ringkas dataset latensi sintetis 1,1,2,2,24; mean 6 dan median 2. Hitung P25/P75 nearest-rank,IQR/flag strict1,5IQR,variansi/SD populasi serta estimator sampel dan standardisasi24ms. Jelaskan bias pencatatan,data kosong/n1/SD0,pengaruh tail dan mengapa lima angka tidak membuktikan performa/insiden nyata. Visual: populasi/sampel,dot plot serta diagram SD dengan tabel setara. |
| cm-l4m02 — Bayes dan base rate | 1. Membalik conditional probability secara benar; 2. Bayes melalui frekuensi natural; 3. Base-rate fallacy pada alert | **TASK-L4M02:** Dari 10.000 event, 1% benar-benar bermasalah, true-positive rate 90%, false-positive rate 5%: TP=90, FN=10, FP=495, TN=9.405; precision=90/585≈15,38%. Jelaskan mengapa 90% bukan precision. Visual: kisi frekuensi. |
| cm-l4m03 — Mengukur classifier | 1. Confusion matrix dan accuracy; 2. Precision, recall, F1, dan denominator nol; 3. Threshold, ROC, PR curve, dan trade-off | **TASK-L4M03:** Bandingkan dua threshold dari tabel skor berlabel sintetis; hitung precision/recall, sebut biaya false negative/false positive, dan tangani metrik yang tidak terdefinisi. Visual: threshold slider dan matrix. |
| cm-l4m04 — Ketidakpastian dan inferensi | 1. Sampling distribution serta interval kepercayaan; 2. Hipotesis, p-value, dan multiple comparisons; 3. Korelasi, drift, dan batas kesimpulan kausal | **TASK-L4M04:** Kritik laporan “p<0,05 membuktikan detektor 95% benar”; sertakan ukuran sampel, efek yang diukur, interval, dan risiko pengujian berulang. Bandingkan dua dataset sintetis yang base rate-nya berubah. Visual: interval/tabel studi. |

Assessment L4: memo keputusan threshold berisi confusion matrix, asumsi biaya, dan keterbatasan data. Salah mengartikan conditional probability atau p-value termasuk kritis. Detail inferensi harus diajarkan sebelum dipakai untuk menilai task.

## L5 — teori bilangan dan aritmetika modular

Prasyarat: L4 untuk urutan resmi; konsep inti menggunakan L0–L3. Tujuan: menurunkan operasi yang menjadi dasar banyak model kriptografi.

| Modul | Tiga lesson berurutan | Transfer task dan syarat jawaban |
| --- | --- | --- |
| cm-l5m01 — Pembagian dan prima | 1. Divisibility, faktor, dan bilangan prima; 2. GCD dengan algoritme Euclid; 3. Extended Euclid serta identitas Bézout | **TASK-L5M01:** Tulis langkah GCD(30,21)=3 dan koefisien 3=3×21−2×30; beri contoh pasangan coprime. Visual: tabel hasil bagi/sisa. |
| cm-l5m02 — Dunia modulo | 1. Congruence dan kelas sisa; 2. Penjumlahan/perkalian serta normalisasi negatif; 3. Inverse modular dan persamaan linear | **TASK-L5M02:** Cari inverse 3 modulo 11 yaitu 4; jelaskan mengapa 6 tidak punya inverse modulo 12; normalisasikan −1 mod 11 menjadi 10. Pembagian modular bukan pembagian bilangan real. Visual: jam modulo dan tabel inverse. |
| cm-l5m03 — Pangkat modular | 1. Repeated squaring dan biaya operasi; 2. Fermat kecil dan Euler totient; 3. Orde elemen serta siklus pangkat | **TASK-L5M03:** Hitung 3⁵ mod 7=5 melalui repeated squaring; cari orde 3 modulo 7 yaitu 6; tulis prasyarat theorem yang digunakan. Visual: pohon pangkat dan siklus sisa. |
| cm-l5m04 — Sistem congruence | 1. Chinese Remainder Theorem coprime; 2. Modulus tidak coprime dan konsistensi; 3. Rekonstruksi serta verifikasi solusi | **TASK-L5M04:** Selesaikan x≡2 mod 3 dan x≡3 mod 5 sehingga x≡8 mod 15. Bandingkan sistem x≡0 mod 2 dan x≡1 mod 4 yang tidak konsisten. Visual: tabel kandidat/pertemuan kelas sisa. |

Assessment L5: derivasi modular dengan verifikasi hasil substitusi. Tidak memakai Fermat pada modulus komposit tanpa syarat, dan tidak mengklaim inverse selalu ada.

## L6 — graf, vektor, dan aljabar linear

Prasyarat: L5. Tujuan: memodelkan hubungan akses serta membangun dasar operasi field/lattice.

| Modul | Tiga lesson berurutan | Transfer task dan syarat jawaban |
| --- | --- | --- |
| cm-l6m01 — Graf dan jalur | 1. Vertex, edge, arah, dan bobot; 2. Reachability, BFS, dan shortest path sederhana; 3. Cycle, cut, dan pemodelan akses | **TASK-L6M01:** Dari graf akses sintetis lima node, tulis adjacency list, jalur yang dapat dicapai, dan edge yang perlu dihapus untuk memutus satu jalur tertentu. Jangan menganggap satu jalur putus berarti semua jalur putus. Visual: graf dan tabel. |
| cm-l6m02 — Vektor dan geometri | 1. Koordinat, penjumlahan, dan perkalian skalar; 2. Panjang, jarak, serta dot product; 3. Sudut, proyeksi, dan kemiripan fitur | **TASK-L6M02:** Hitung dot product (1,2)·(3,4)=11 dan norm (3,4)=5; jelaskan pengaruh skala fitur serta mengapa cosine similarity bukan probabilitas. Visual: panah vektor 2D. |
| cm-l6m03 — Matriks dan sistem linear | 1. Matriks sebagai tabel dan transformasi; 2. Perkalian matriks serta eliminasi Gauss; 3. Rank, basis, independensi, serta inverse | **TASK-L6M03:** Selesaikan x+y=3 dan x−y=1 menjadi (2,1), lalu bandingkan sistem dependent/tidak konsisten. Tunjukkan langkah row operation. Visual: grid dan garis persamaan. |
| cm-l6m04 — Linear algebra modular | 1. Operasi vektor/matriks modulo prima; 2. Sistem linear di GF(2); 3. Parity check, Hamming distance, serta batas error correction | **TASK-L6M04:** Selesaikan sistem dua persamaan di GF(2), hitung parity dari 1011, dan tunjukkan satu kesalahan yang terdeteksi serta dua perubahan bit yang luput dari parity tunggal. Visual: matrix XOR dan grid bit. |

Assessment L6: analisis graf akses dan worksheet linear; cantumkan domain real vs GF(2). Tidak menyamakan parity/checksum dengan autentikasi kriptografis.

## L7 — matematika kriptografi klasik

Prasyarat: L6, terutama XOR, peluang, dan modular. Tujuan: memahami apa yang dicapai algoritme model serta apa yang tidak dijaminnya.

| Modul | Tiga lesson berurutan | Transfer task dan syarat jawaban |
| --- | --- | --- |
| cm-l7m01 — Kerahasiaan dan randomness | 1. Encoding vs encryption dan model penyerang; 2. One-time pad serta perfect secrecy; 3. Penggunaan ulang kunci dan pseudorandomness | **TASK-L7M01:** Enkripsi pesan bit kecil dengan XOR, pulihkan pesan, lalu turunkan c₁ XOR c₂ = m₁ XOR m₂ saat pad sama dipakai ulang. Sebut seluruh syarat OTP, bukan hanya panjang key. Visual: baris bit sejajar. |
| cm-l7m02 — Hash dan autentikasi | 1. Preimage, second preimage, dan collision; 2. Birthday bound serta security bits; 3. MAC, hash berkunci, dan kebutuhan autentikasi | **TASK-L7M02:** Bandingkan skala kerja collision generik sekitar 2^(n/2) dengan preimage sekitar 2^n pada hash ideal n-bit; terangkan mengapa hash publik saja tidak mengautentikasi pesan. Jangan menyamakan model ideal dengan bukti implementasi aman. Visual: mapping kotak dan tabel properti. |
| cm-l7m03 — RSA sebagai model | 1. Faktorisasi dan pembentukan parameter kecil; 2. Mengapa round-trip RSA bekerja; 3. Determinisme raw RSA dan perlunya skema/padding | **TASK-L7M03:** Pakai p=5,q=11,n=55,φ=40,e=3,d=27 dan m=7; tunjukkan c=13 serta pemulihan m=7. Jelaskan batas message range dan mengapa raw RSA ini bukan enkripsi produksi. Visual: tabel modular dan urutan operasi. |
| cm-l7m04 — Diffie–Hellman dan secret bersama | 1. Discrete logarithm serta grup perkalian kecil; 2. Nilai publik/privat dan kesamaan shared secret; 3. Autentikasi, man-in-the-middle, dan pemisahan key derivation | **TASK-L7M04:** Dengan p=23,g=5,a=6,b=15, hitung A=8,B=19,shared secret=2. Petakan informasi publik/rahasia; jelaskan mengapa DH tanpa autentikasi bisa menyambungkan dua pihak ke perantara. Visual: alur Alice–Bob dan tabel. |

Assessment L7: laporan membandingkan confidentiality/integrity/authentication dan derivasi contoh. Label toy wajib; tidak menghasilkan key nyata, menghubungi target, atau mengimplementasikan TLS.

## L8 — struktur aljabar dan elliptic curves

Prasyarat: L7. Tujuan: menjembatani perhitungan konkret dengan struktur dan argumen keamanan.

| Modul | Tiga lesson berurutan | Transfer task dan syarat jawaban |
| --- | --- | --- |
| cm-l8m01 — Grup, ring, dan field | 1. Operasi, closure, identitas, dan inverse; 2. Grup cyclic, subgroup, serta orde; 3. Ring vs field dan zero divisor | **TASK-L8M01:** Bandingkan Z/7Z dan Z/8Z; tunjukkan 2×4=0 mod 8 sebagai zero divisor dan jelaskan mengapa modulus prima penting untuk field sisa. Hubungkan orde/subgroup ke contoh DH. Visual: tabel operasi. |
| cm-l8m02 — Polinomial dan finite fields | 1. Polinomial, koefisien, serta pembagian; 2. Irreducibility dan konstruksi GF(2^m); 3. Operasi field sebagai dasar struktur AES | **TASK-L8M02:** Gunakan GF(2³) dengan polynomial x³+x+1; kalikan elemen kecil dan reduksi langkah demi langkah. Bedakan reduksi polynomial dari integer mod 8; jelaskan bahwa visual ini bukan implementasi AES. Visual: koefisien bit dan tabel reduksi. |
| cm-l8m03 — Elliptic curve diskret | 1. Kurva finite field dan titik infinity; 2. Penjumlahan, doubling, serta kasus khusus; 3. Scalar multiplication, orde, dan discrete log | **TASK-L8M03:** Pada y²=x³+2x+2 di F₁₇, verifikasi P=(5,1) dan 2P=(6,3); jelaskan P+(−P)=O. Periksa denominator nol dan bedakan titik diskret dari garis kurva real. Visual: grid finite field. |
| cm-l8m04 — Signature dan argumen keamanan | 1. Signature vs encryption vs MAC; 2. Security game, adversary advantage, dan counterexample; 3. Nonce, validasi subgroup, serta batas argumen protokol | **TASK-L8M04:** Telaah protokol tanda tangan fiktif dengan nonce yang dipakai ulang melalui persamaan sederhana yang disediakan; tulis asumsi dan contoh kegagalan. Susun satu security game kecil tanpa mengklaim telah membuktikan protokol produksi. Visual: kartu game dan tabel pesan. |

Assessment L8: operasi field/kurva eksak plus proof sketch tertulis. Checkpoint otomatis terpisah dari review proof; argumentasi belum direview tidak diberi badge expert.

## L9 — membaca matematika keamanan lanjutan

Prasyarat: L8. Tujuan: membaca asumsi dan keterbatasan hasil tingkat lanjut, lalu mempertahankan analisis sendiri. Modul ini pengantar yang ketat menuju studi expert, bukan pengganti pendidikan/review riset.

| Modul | Tiga lesson berurutan | Transfer task dan syarat jawaban |
| --- | --- | --- |
| cm-l9m01 — Complexity dan reduction | 1. Input size, Big-O, serta algoritme probabilistik; 2. Negligible probability dan parameter keamanan; 3. Reduction, asumsi hardness, serta batas kesimpulan | **TASK-L9M01:** Bandingkan biaya polinomial terhadap panjang bit dengan biaya terhadap nilai n; tulis reduction sederhana dengan arah implikasi yang benar. Jelaskan mengapa “belum ditemukan algoritme cepat” bukan bukti absolut mustahil. Visual: tabel/grafik biaya dan kartu implikasi. |
| cm-l9m02 — Lattice dan noise | 1. Basis lattice serta kombinasi integer; 2. Short/close vectors dan perubahan basis; 3. LWE kecil, distribusi error, serta decoding intuitif | **TASK-L9M02:** Gambarkan lattice basis (2,0),(1,2), tunjukkan kombinasi integer, lalu telusuri contoh b=As+e mod q dengan matriks kecil yang disediakan. Bedakan noise dari corruption tanpa struktur; jangan menyatakan contoh kecil aman. Visual: kisi 2D dan tabel. |
| cm-l9m03 — Struktur post-quantum | 1. Polynomial quotient ring dan module sebagai perluasan vektor; 2. KEM, encapsulation/decapsulation, dan failure probability; 3. ML-KEM secara konseptual serta batas klaim quantum | **TASK-L9M03:** Petakan asumsi Module-LWE dan peran noise terhadap diagram KEM; bandingkan KEM dengan signature/enkripsi pesan. Telaah sumber NIST terkini dan errata, lalu nyatakan bagian yang disederhanakan. Tidak mengimplementasikan standar atau memilih parameter produksi. Visual: koefisien, alur pesan, dan matriks peran. |
| cm-l9m04 — Capstone dan pembelaan | 1. Menyusun model, asumsi, dan klaim; 2. Memeriksa perhitungan serta contoh tandingan; 3. Menulis portofolio, peer review, dan rencana studi lanjutan | **TASK-L9M04:** Gabungkan memo deteksi L4, derivasi kriptografi L7/L8, dan telaah PQC L9 menjadi satu portofolio dengan evidence dan keterbatasan. Status siap direview boleh dicatat lokal; review independen harus benar-benar dilakukan manusia di luar sistem. Visual: matriks klaim–bukti. |

Assessment L9: sepuluh atau lebih item otomatis lintas materi dan capstone terpisah. Lulus item otomatis tidak berarti proof/capstone telah direview.

## Capstone portofolio

Judul usulan: **“Apa yang dapat dan tidak dapat dijamin oleh matematika dalam sistem keamanan?”**

Artefak wajib:

1. **Memo deteksi:** dataset sintetis, confusion matrix, Bayes, biaya threshold, ketidakpastian, dan perubahan base rate.
2. **Worksheet kriptografi:** satu derivasi RSA/DH dan satu operasi field/ECC, seluruh intermediate values, syarat operasi, serta counterexample penggunaan salah.
3. **Catatan argumen:** satu klaim, definisi penyerang, asumsi, langkah proof sketch/reduction, dan batas yang belum terbukti.
4. **Telaah post-quantum:** apa itu KEM, peran lattice/noise, sumber primer bertanggal, dan mengapa model belajar tidak menetapkan keamanan implementasi.
5. **Refleksi:** miskonsepsi awal, koreksi dengan alasan, dan rencana pembelajaran cybersecurity di luar matematika.

Rubrik capstone: numerasi/derivasi 25, pemodelan peluang/statistik 20, ketepatan konsep kriptografi 20, penalaran/bukti/counterexample 20, sumber dan batas klaim 10, komunikasi 5. Target review ≥85/100 dan tidak ada kekeliruan kritis. Klaim OTP dapat dipakai ulang, hash publik sudah mengautentikasi pesan, raw RSA aman dipakai produksi, DH otomatis terautentikasi, atau parameter toy aman, harus diperbaiki sebelum review dinyatakan lulus.

Produk pertama hanya menyimpan draf teks dan checklist kesiapan secara lokal; tidak menyediakan unggahan file, reviewer, sertifikat, atau tombol untuk memberi diri sendiri status review independen. Simpan salinan portofolio di luar browser secara manual jika ingin mempertahankan artefaknya.

## Contoh rancangan satu lesson pemula

ID `cm-l0m01l02`: **Penjumlahan, perkalian, dan kelompok percobaan**. Ini storyboard, bukan konten published.

- **Hook:** “Ada empat akun latihan. Masing-masing menerima tiga percobaan masuk. Berapa total percobaan?” Kenalkan akun sebagai satu identitas masuk dan percobaan sebagai satu kejadian.
- **Prediksi:** 7 / 12 / 16. Jawaban 7 mendapat feedback “Kamu menjumlahkan jumlah kelompok dan isi kelompok; coba hitung tiga benda pada setiap kelompok.” Jawaban 16 menunjukkan asumsi empat isi per kelompok, bukan tiga.
- **Eksplorasi:** empat kelompok visual, masing-masing tiga penanda. Kontrol jumlah akun dan percobaan per akun memiliki input angka yang bisa dipakai keyboard. Tabel setara menunjukkan 3+3+3+3=12. Tugas aksi: ubah dari 4×3 menjadi 4×4, prediksi kenaikan total, lalu jelaskan kenaikan empat.
- **Penjelasan:** perkalian menghitung kelompok sama besar; 4×3 berarti empat kelompok berisi tiga. Jangan menyebut notasi sigma sebelum diajarkan.
- **Worked example:** tiga akun × lima percobaan/akun = lima belas percobaan; satuan akun saling menghapus dari model rate per akun. Tampilkan penjumlahan berulang terlebih dahulu.
- **Latihan A:** dua akun × enam percobaan = 12; **latihan B:** lima akun × dua = 10. Jawaban angka, bukan sekadar pilihan ganda.
- **Edge case:** empat akun × nol percobaan = nol; tidak menerima jawaban empat karena akun belum menerima kejadian.
- **Hint:** “Berapa kelompok?” → “Tulis jumlah tiap kelompok sebagai penjumlahan.” → “2×6=6+6=12; coba variasi lain untuk memeriksa pemahamanmu.”
- **Transfer:** empat akun × enam ditambah empat percobaan **total** = 28; bandingkan dengan empat percobaan tambahan **per akun** = 40.
- **Refleksi:** “Mengapa menambah satu percobaan pada tiap akun menambah empat pada total?”
- **Checkpoint set A:** 3×4=12; 5×0=0; 2×3+2=8 dengan tambahan total. Set B memakai 2×5=10; 7×0=0; 3×2+3=9. Feedback menyebut jenis kesalahan, bukan hanya benar/salah.

Lesson tidak selesai karena scroll, mengganti bahasa, mengubah slider tanpa menjawab akibatnya, atau mengisi sembarang flag completion. Status bantuan dipertahankan dan tidak disebut bukti assessment terproteksi. Setelah solusi checkpoint dibuka, ulangi pada set lain; jika keduanya pernah dilihat, retake tetap tersedia dan dapat memberi progres formatif dengan label soal pernah dilihat. Tidak ada jalan buntu yang mengharuskan menunggu soal baru.

## Daftar authoring untuk setiap modul

- [ ] Tiga lesson mengikuti kontrak kebutuhan; topik dan prerequisite tidak hanya berupa judul.
- [ ] Worked example dihitung langkah demi langkah di teks dan diberi unit/asumsi.
- [ ] Visual sesuai konsep, bermakna ketika input berubah, dan memiliki alternatif teks/tabel.
- [ ] Dua variasi latihan, edge case, tiga hint, feedback per miskonsepsi, serta checkpoint dengan riwayat bantuan tersedia untuk setiap lesson.
- [ ] Set checkpoint alternatif, checkpoint modul, dan kontribusi assessment level ditulis.
- [ ] Transfer task, rubrik, petunjuk bukti, dan batas penilaian otomatis tersedia.
- [ ] Indonesia–Inggris lengkap; ID, pilihan, dan angka konsisten.
- [ ] Range/validasi input, pembulatan, pembagian nol, dan batas operasi terdokumentasi.
- [ ] Semua miskonsepsi keamanan relevan ditandai kritis dengan penjelasan.
- [ ] Status publikasi, progres, resume, dokumentasi, commit, dan push diperbarui sesuai kenyataan.

Checklist ini untuk authoring/source review; bukan instruksi menjalankan test. Mengikuti AGENTS.md, tidak membuat unit test dan tidak menjalankan test, browser/manual check, lint, typecheck, build, audit, atau contoh komputasi.

## Referensi cakupan

- [MIT Mathematics for Computer Science](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/) untuk struktur diskret dan peluang.
- [Boneh–Shoup, A Graduate Course in Applied Cryptography](https://toc.cryptobook.us/) untuk peta kriptografi tingkat lanjut.
- [NIST FIPS 203](https://csrc.nist.gov/pubs/fips/203/final) untuk konsep ML-KEM; baca errata saat authoring L9.

Contoh, pembagian level, task, serta storyboard di dokumen ini merupakan rancangan Taalmo. Sumber di atas bukan bukti ketepatan setiap contoh; setiap modul masih memerlukan penulisan lengkap dan review derivasi sebelum diterbitkan.

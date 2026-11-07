import { copy, type Copy, type MathQuestion } from "./types";
import { foundation, foundationModuleChecks } from "./foundation";
import { fractions, fractionsModuleChecks, fractionsTask } from "./fractions";
import { measurements, measurementsModuleChecks, measurementsTask } from "./measurements";
const authored = { ...foundation, ...fractions, ...measurements };
const authoredModuleChecks: Partial<Record<string, [MathQuestion[], MathQuestion[]]>> = {
  "cm-l0m01": foundationModuleChecks, "cm-l0m02": fractionsModuleChecks, "cm-l0m03": measurementsModuleChecks,
};

export const mathPathHref = "/learn/cybersecurity-math";
export const mathVersion = "1.0.0";
export const mathTitle = copy("Matematika Cybersecurity", "Cybersecurity Math");

const outlines: { title: Copy; modules: { title: Copy; lessons: Copy[] }[] }[] = [
  { title: copy("Numerasi dari nol", "Numbers from zero"), modules: [
    { title: copy("Bilangan dan operasi", "Numbers and operations"), lessons: [copy("Menghitung kejadian", "Counting events"), copy("Perkalian sebagai kelompok", "Multiplication as groups"), copy("Pembagian, sisa, dan urutan operasi", "Division, remainders, and operation order")] },
    { title: copy("Pecahan dan persentase", "Fractions and percentages"), lessons: [copy("Bagian dari keseluruhan", "Parts of a whole"), copy("Desimal dan persentase", "Decimals and percentages"), copy("Perubahan relatif dan poin persentase", "Relative change and percentage points")] },
    { title: copy("Rasio, laju, dan unit", "Ratios, rates, and units"), lessons: [copy("Perbandingan senilai", "Proportional relationships"), copy("Kejadian per detik", "Events per second"), copy("Bit, byte, dan prefiks", "Bits, bytes, and prefixes")] },
    { title: copy("Estimasi dan notasi", "Estimation and notation"), lessons: [copy("Negatif dan jarak absolut", "Negative numbers and absolute distance"), copy("Pembulatan dan kisaran", "Rounding and ranges"), copy("Pangkat berulang", "Repeated multiplication and powers")] },
  ] },
  { title: copy("Aljabar dan pertumbuhan", "Algebra and growth"), modules: [
    { title: copy("Variabel dan persamaan", "Variables and equations"), lessons: [copy("Nilai yang belum diketahui", "Unknown values"), copy("Menjaga kesetaraan", "Preserving equality"), copy("Pertidaksamaan dan budget", "Inequalities and budgets")] },
    { title: copy("Fungsi dan grafik", "Functions and graphs"), lessons: [copy("Input, output, dan domain", "Inputs, outputs, and domains"), copy("Fungsi linear", "Linear functions"), copy("Komposisi dan inverse", "Composition and inverse functions")] },
    { title: copy("Eksponensial", "Exponential growth"), lessons: [copy("Aturan pangkat", "Exponent rules"), copy("Linear vs eksponensial", "Linear versus exponential"), copy("Ruang pilihan string", "String search spaces")] },
    { title: copy("Logaritma dan biaya pencarian", "Logarithms and search cost"), lessons: [copy("Inverse pangkat", "Inverting powers"), copy("log₂ dan bit pilihan", "log₂ and bits of choice"), copy("Rata-rata dan kasus terburuk", "Average and worst cases")] },
  ] },
  { title: copy("Bit, logika, dan bukti", "Bits, logic, and proofs"), modules: [
    { title: copy("Representasi bilangan", "Number representations"), lessons: [copy("Desimal dan biner", "Decimal and binary"), copy("Hexadecimal", "Hexadecimal"), copy("Signedness dan overflow", "Signedness and overflow")] },
    { title: copy("Operasi bit dan logika", "Bit operations and logic"), lessons: [copy("Truth table", "Truth tables"), copy("XOR, shift, dan mask", "XOR, shifts, and masks"), copy("Predikat dan De Morgan", "Predicates and De Morgan's laws")] },
    { title: copy("Himpunan dan relasi", "Sets and relations"), lessons: [copy("Operasi himpunan", "Set operations"), copy("Pasangan dan relasi", "Pairs and relations"), copy("Fungsi dan bijeksi", "Functions and bijections")] },
    { title: copy("Membaca dan membuat bukti", "Reading and writing proofs"), lessons: [copy("Kuantor dan counterexample", "Quantifiers and counterexamples"), copy("Bukti langsung dan kontradiksi", "Direct proof and contradiction"), copy("Induksi dan invariant", "Induction and invariants")] },
  ] },
  { title: copy("Peluang dan informasi", "Probability and information"), modules: [
    { title: copy("Kombinatorika", "Combinatorics"), lessons: [copy("Aturan hitung", "Counting rules"), copy("Permutasi dan kombinasi", "Permutations and combinations"), copy("Inklusi–eksklusi dan pigeonhole", "Inclusion–exclusion and pigeonhole")] },
    { title: copy("Peluang dasar", "Basic probability"), lessons: [copy("Ruang sampel", "Sample spaces"), copy("Conditional probability", "Conditional probability"), copy("Independensi", "Independence")] },
    { title: copy("Peubah acak", "Random variables"), lessons: [copy("Distribusi dan ekspektasi", "Distributions and expectations"), copy("Bernoulli dan binomial", "Bernoulli and binomial variables"), copy("Geometrik dan variansi", "Geometric variables and variance")] },
    { title: copy("Entropy", "Entropy"), lessons: [copy("Informasi dan Shannon entropy", "Information and Shannon entropy"), copy("Min-entropy dan bias", "Min-entropy and bias"), copy("Collision dan birthday bound", "Collisions and birthday bounds")] },
  ] },
  { title: copy("Statistik untuk deteksi", "Statistics for detection"), modules: [
    { title: copy("Ringkasan data", "Summarizing data"), lessons: [copy("Sampel dan bias", "Samples and bias"), copy("Mean, median, dan outlier", "Mean, median, and outliers"), copy("Variasi dan standardisasi", "Variation and standardization")] },
    { title: copy("Bayes dan base rate", "Bayes and base rates"), lessons: [copy("Membalik peluang bersyarat", "Reversing conditional probabilities"), copy("Frekuensi natural", "Natural frequencies"), copy("Base-rate fallacy", "The base-rate fallacy")] },
    { title: copy("Mengukur classifier", "Measuring classifiers"), lessons: [copy("Confusion matrix", "Confusion matrices"), copy("Precision, recall, dan F1", "Precision, recall, and F1"), copy("Threshold dan trade-off", "Thresholds and trade-offs")] },
    { title: copy("Ketidakpastian dan inferensi", "Uncertainty and inference"), lessons: [copy("Interval kepercayaan", "Confidence intervals"), copy("Hipotesis dan p-value", "Hypotheses and p-values"), copy("Drift dan kausalitas", "Drift and causality")] },
  ] },
  { title: copy("Teori bilangan dan modular", "Number theory and modular arithmetic"), modules: [
    { title: copy("Pembagian dan prima", "Divisibility and primes"), lessons: [copy("Faktor dan prima", "Factors and primes"), copy("GCD dan Euclid", "GCD and Euclid"), copy("Extended Euclid dan Bézout", "Extended Euclid and Bézout")] },
    { title: copy("Dunia modulo", "Modular worlds"), lessons: [copy("Congruence", "Congruence"), copy("Operasi dan negatif", "Operations and negative residues"), copy("Inverse modular", "Modular inverses")] },
    { title: copy("Pangkat modular", "Modular powers"), lessons: [copy("Repeated squaring", "Repeated squaring"), copy("Fermat dan Euler", "Fermat and Euler"), copy("Orde dan siklus", "Orders and cycles")] },
    { title: copy("Sistem congruence", "Congruence systems"), lessons: [copy("Chinese Remainder Theorem", "The Chinese Remainder Theorem"), copy("Modulus tidak coprime", "Non-coprime moduli"), copy("Rekonstruksi solusi", "Reconstructing solutions")] },
  ] },
  { title: copy("Graf dan aljabar linear", "Graphs and linear algebra"), modules: [
    { title: copy("Graf dan jalur", "Graphs and paths"), lessons: [copy("Node, edge, dan arah", "Vertices, edges, and direction"), copy("Reachability dan BFS", "Reachability and BFS"), copy("Cycle, cut, dan akses", "Cycles, cuts, and access")] },
    { title: copy("Vektor dan geometri", "Vectors and geometry"), lessons: [copy("Koordinat dan skalar", "Coordinates and scalars"), copy("Norm dan dot product", "Norms and dot products"), copy("Proyeksi dan kemiripan", "Projections and similarity")] },
    { title: copy("Matriks dan sistem linear", "Matrices and linear systems"), lessons: [copy("Matriks dan transformasi", "Matrices and transformations"), copy("Eliminasi Gauss", "Gaussian elimination"), copy("Rank, basis, dan inverse", "Rank, bases, and inverses")] },
    { title: copy("Linear algebra modular", "Modular linear algebra"), lessons: [copy("Vektor modulo prima", "Vectors modulo a prime"), copy("Sistem GF(2)", "Systems over GF(2)"), copy("Parity dan Hamming distance", "Parity and Hamming distance")] },
  ] },
  { title: copy("Kriptografi klasik", "Classical cryptography"), modules: [
    { title: copy("Kerahasiaan dan randomness", "Secrecy and randomness"), lessons: [copy("Encoding vs encryption", "Encoding versus encryption"), copy("One-time pad", "The one-time pad"), copy("Reuse dan pseudorandomness", "Reuse and pseudorandomness")] },
    { title: copy("Hash dan autentikasi", "Hashes and authentication"), lessons: [copy("Tiga properti hash", "Three hash properties"), copy("Birthday bound dan security bits", "Birthday bounds and security bits"), copy("MAC dan autentikasi", "MACs and authentication")] },
    { title: copy("RSA sebagai model", "RSA as a model"), lessons: [copy("Parameter kecil RSA", "Small RSA parameters"), copy("Mengapa round-trip bekerja", "Why the round trip works"), copy("Batas raw RSA", "The limits of raw RSA")] },
    { title: copy("Diffie–Hellman", "Diffie–Hellman"), lessons: [copy("Discrete logarithm", "Discrete logarithms"), copy("Publik, privat, dan secret bersama", "Public, private, and shared values"), copy("Autentikasi dan key derivation", "Authentication and key derivation")] },
  ] },
  { title: copy("Aljabar, ECC, dan argumen keamanan", "Algebra, ECC, and security arguments"), modules: [
    { title: copy("Grup, ring, dan field", "Groups, rings, and fields"), lessons: [copy("Operasi dan inverse", "Operations and inverses"), copy("Subgroup dan orde", "Subgroups and orders"), copy("Field dan zero divisor", "Fields and zero divisors")] },
    { title: copy("Polinomial dan finite fields", "Polynomials and finite fields"), lessons: [copy("Pembagian polinomial", "Polynomial division"), copy("Irreducibility dan GF(2^m)", "Irreducibility and GF(2^m)"), copy("Struktur field pada AES", "Field structure in AES")] },
    { title: copy("Elliptic curve diskret", "Discrete elliptic curves"), lessons: [copy("Kurva dan titik infinity", "Curves and the point at infinity"), copy("Addition dan doubling", "Addition and doubling"), copy("Scalar multiplication", "Scalar multiplication")] },
    { title: copy("Signature dan keamanan", "Signatures and security"), lessons: [copy("Signature, MAC, dan encryption", "Signatures, MACs, and encryption"), copy("Security game dan advantage", "Security games and advantage"), copy("Nonce dan validasi subgroup", "Nonces and subgroup validation")] },
  ] },
  { title: copy("Complexity, lattice, dan capstone", "Complexity, lattices, and the capstone"), modules: [
    { title: copy("Complexity dan reduction", "Complexity and reductions"), lessons: [copy("Input size dan Big-O", "Input size and Big-O"), copy("Negligible probability", "Negligible probability"), copy("Reduction dan hardness", "Reductions and hardness")] },
    { title: copy("Lattice dan noise", "Lattices and noise"), lessons: [copy("Basis dan kombinasi integer", "Bases and integer combinations"), copy("Short dan close vectors", "Short and close vectors"), copy("LWE kecil dan error", "Small LWE examples and error")] },
    { title: copy("Struktur post-quantum", "Post-quantum structures"), lessons: [copy("Quotient ring dan module", "Quotient rings and modules"), copy("KEM dan failure probability", "KEMs and failure probability"), copy("ML-KEM dan batas model", "ML-KEM and model limits")] },
    { title: copy("Capstone dan pembelaan", "Capstone and defense"), lessons: [copy("Model, asumsi, dan klaim", "Models, assumptions, and claims"), copy("Bukti dan counterexample", "Evidence and counterexamples"), copy("Portofolio dan review", "Portfolio and review")] },
  ] },
];

const levelContexts = [
  copy("Tujuan: hitung jumlah, rasio, dan unit dari nol. Kegunaan keamanan: membaca jumlah kejadian tanpa menyamakannya dengan jumlah akun atau serangan.", "Goal: learn counts, ratios, and units from zero. Security use: read event counts without confusing them with accounts or attacks."),
  copy("Tujuan: modelkan hubungan, pangkat, dan logaritma. Kegunaan keamanan: menjelaskan ruang pencarian dan biaya percobaan beserta asumsinya.", "Goal: model relationships, powers, and logarithms. Security use: explain search spaces and trial costs with their assumptions."),
  copy("Tujuan: pahami bit, himpunan, logika, dan bukti. Kegunaan keamanan: membaca mask permission, representasi data, dan menemukan aturan akses yang keliru.", "Goal: understand bits, sets, logic, and proofs. Security use: read permission masks and data representations, and find faulty access rules."),
  copy("Tujuan: hitung kemungkinan, peluang, dan entropy. Kegunaan keamanan: membedakan panjang secret dari ketidakpastian dan menafsirkan peluang collision.", "Goal: count possibilities and reason about probability and entropy. Security use: distinguish secret length from uncertainty and interpret collision chances."),
  copy("Tujuan: baca distribusi, Bayes, dan statistik inferensi. Kegunaan keamanan: menilai false positive, base rate, dan trade-off deteksi melalui data sintetis.", "Goal: read distributions, Bayes, and statistical inference. Security use: evaluate false positives, base rates, and detection trade-offs with synthetic data."),
  copy("Tujuan: turunkan GCD, inverse, pangkat, dan sistem congruence. Kegunaan keamanan: memahami perhitungan dasar model kriptografi berbasis bilangan.", "Goal: derive GCDs, inverses, powers, and congruence systems. Security use: understand arithmetic behind number-based cryptographic models."),
  copy("Tujuan: gunakan graf, vektor, matriks, dan GF(2). Kegunaan keamanan: memodelkan akses, relasi, fitur deteksi, dan batas parity/checksum.", "Goal: use graphs, vectors, matrices, and GF(2). Security use: model access, relationships, detection features, and parity/checksum limits."),
  copy("Tujuan: bedakan OTP, hash/MAC, RSA, dan DH beserta asumsi. Kegunaan keamanan: jelaskan confidentiality, integrity, authentication, dan risiko model tanpa proteksi tambahan.", "Goal: distinguish OTPs, hashes/MACs, RSA, and DH with their assumptions. Security use: explain confidentiality, integrity, authentication, and limits of unprotected models."),
  copy("Tujuan: lakukan operasi finite field/ECC dan baca security game. Kegunaan keamanan: telaah asumsi signature, nonce, serta contoh kegagalan argumen protokol.", "Goal: perform finite-field/ECC operations and read security games. Security use: examine signature assumptions, nonces, and counterexamples to protocol arguments."),
  copy("Tujuan: baca complexity, reduction, lattice, dan KEM secara konseptual. Kegunaan keamanan: memisahkan asumsi post-quantum dari jaminan implementasi, lalu menyusun capstone yang dapat direview.", "Goal: read complexity, reductions, lattices, and KEMs conceptually. Security use: separate post-quantum assumptions from implementation guarantees and build a reviewable capstone."),
];
export const mathLevels = outlines.map((level, levelIndex) => ({
  id: `cm-l${levelIndex}`, title: level.title, context: levelContexts[levelIndex],
  modules: level.modules.map((module, moduleIndex) => {
    const id = `cm-l${levelIndex}m${String(moduleIndex + 1).padStart(2, "0")}`;
    return {
      id, title: module.title, levelId: `cm-l${levelIndex}`,
      checks: authoredModuleChecks[id],
      lessons: module.lessons.map((title, lessonIndex) => {
        const lessonId = `${id}l${String(lessonIndex + 1).padStart(2, "0")}`;
        return { id: lessonId, title, moduleId: id, levelId: `cm-l${levelIndex}`, content: authored[lessonId] };
      }),
    };
  }),
}));
export const mathModules = mathLevels.flatMap((level) => level.modules);
export const mathLessons = mathModules.flatMap((module) => module.lessons);
export const publishedMathLessons = mathLessons.filter((lesson) => !!lesson.content);
export type MathLesson = (typeof mathLessons)[number];
export const mathLessonHref = (id: string) => `${mathPathHref}/${id}`;
export const mathRecordKey = (id: string) => `${id}@${mathVersion}`;
export function mathQuestions(id: string, attempt = 0) {
  return mathLessons.find((lesson) => lesson.id === id)?.content?.checkpoints[attempt % 2]
    ?? mathModules.find((module) => module.id === id)?.checks?.[attempt % 2]
    ?? [];
}

export const foundationTask = copy(
  "Empat akun masing-masing menerima enam percobaan. Buat tabel per akun; hitung 24 percobaan awal, 28 jika ditambah empat total, dan 40 jika ditambah empat per akun. Jelaskan perbedaan satuan, tunjukkan satu contoh kelompok kosong, lalu jelaskan berapa kelompok ukuran lima yang dibutuhkan untuk memproses 28 kejadian. Tulis langkah, hasil, asumsi, dan batas kesimpulan: jumlah percobaan belum membuktikan adanya serangan.",
  "Four accounts each receive six attempts. Make a per-account table; calculate 24 initial attempts, 28 after four extra in total, and 40 after four extra per account. Explain the units, show one empty-group example, then explain how many groups of size five are needed to process 28 events. Write your steps, result, assumptions, and limits: a count of attempts alone does not prove an attack.",
);

export const mathModuleTasks: Partial<Record<string, Copy>> = { "cm-l0m01": foundationTask, "cm-l0m02": fractionsTask, "cm-l0m03": measurementsTask };
export const mathModuleCheckDescriptions: Partial<Record<string, Copy>> = {
  "cm-l0m01": copy("Lulus tiga lesson dahulu. Jawab lima soal; perlu nilai minimal 80% dan semua soal kritis benar. Soal kritis mencakup nol, tambahan total, dan urutan operasi.", "Complete all three lessons first. Answer five questions; you need at least 80% and every critical question correct. Critical questions cover zero, additions to totals, and operation order."),
  "cm-l0m02": copy("Lulus tiga lesson dan checkpoint modul sebelumnya dahulu. Jawab lima soal, perlu minimal 80% dan semua soal kritis benar. Bedakan pecahan, angka persen, desimal, poin persentase, dan perubahan relatif.", "Complete the three lessons and the previous module checkpoint first. Answer five questions, requiring at least 80% and every critical question correct. Distinguish fractions, percentage numbers, decimals, percentage points, and relative change."),
  "cm-l0m03": copy("Selesaikan prasyarat dan tiga lesson modul ini. Lima soal memerlukan ≥80% dan seluruh soal kritis benar: waktu, detik/menit, kB/KiB, dan bit/byte. Unit tujuan dinyatakan pada tiap soal.", "Complete prerequisites and all three lessons. Five questions require ≥80% and every critical item correct: duration, seconds/minutes, kB/KiB, and bits/bytes. Each question states its target unit."),
};

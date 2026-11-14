import { copy, type Copy, type MathQuestion } from "./types";
import { foundation, foundationModuleChecks } from "./foundation";
import { fractions, fractionsModuleChecks, fractionsTask } from "./fractions";
import { measurements, measurementsModuleChecks, measurementsTask } from "./measurements";
import { numeracy, numeracyModuleChecks, numeracyTask } from "./numeracy";
import { l0Assessment } from "./l0-assessment";
import { algebra, algebraModuleChecks, algebraTask } from "./algebra";
import { functions, functionsModuleChecks, functionsTask } from "./functions";
import { growth, growthModuleChecks, growthTask } from "./growth";
import { logarithms, logarithmsModuleChecks, logarithmsTask } from "./logarithms";
import { l1Assessment } from "./l1-assessment";
import { representations, representationsModuleChecks, representationsTask } from "./representations";
import { logic, logicModuleChecks, logicTask } from "./logic";
import { sets, setsModuleChecks, setsTask } from "./sets";
import { proofs, proofsModuleChecks, proofsTask } from "./proofs";
import { l2Assessment } from "./l2-assessment";
import { counting, countingModuleChecks, countingTask } from "./counting";
import { probability, probabilityModuleChecks, probabilityTask } from "./probability";
import { randomVariables, randomVariablesModuleChecks, randomVariablesTask } from "./random-variables";
import { entropy, entropyModuleChecks, entropyTask } from "./entropy";
import { l3Assessment } from "./l3-assessment";
import { summaries, summariesModuleChecks, summariesTask } from "./summaries";
const authored = { ...foundation, ...fractions, ...measurements, ...numeracy, ...algebra, ...functions, ...growth, ...logarithms, ...representations, ...logic, ...sets, ...proofs, ...counting, ...probability, ...randomVariables, ...entropy, ...summaries };
const authoredModuleChecks: Partial<Record<string, [MathQuestion[], MathQuestion[]]>> = {
  "cm-l0m01": foundationModuleChecks, "cm-l0m02": fractionsModuleChecks, "cm-l0m03": measurementsModuleChecks,
  "cm-l0m04": numeracyModuleChecks,
  "cm-l1m01": algebraModuleChecks,
  "cm-l1m02": functionsModuleChecks,
  "cm-l1m03": growthModuleChecks,
  "cm-l1m04": logarithmsModuleChecks,
  "cm-l2m01": representationsModuleChecks,
  "cm-l2m02": logicModuleChecks,
  "cm-l2m03": setsModuleChecks,
  "cm-l2m04": proofsModuleChecks,
  "cm-l3m01": countingModuleChecks,
  "cm-l3m02": probabilityModuleChecks,
  "cm-l3m03": randomVariablesModuleChecks,
  "cm-l3m04": entropyModuleChecks,
  "cm-l4m01": summariesModuleChecks,
};
const authoredLevelChecks: Partial<Record<string, [MathQuestion[], MathQuestion[]]>> = { "cm-l0": l0Assessment, "cm-l1": l1Assessment, "cm-l2": l2Assessment, "cm-l3": l3Assessment };

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
  id: `cm-l${levelIndex}`, title: level.title, context: levelContexts[levelIndex], checks: authoredLevelChecks[`cm-l${levelIndex}`],
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
    ?? mathLevels.find((level) => level.id === id)?.checks?.[attempt % 2]
    ?? [];
}

export const foundationTask = copy(
  "Empat akun masing-masing menerima enam percobaan. Buat tabel per akun; hitung 24 percobaan awal, 28 jika ditambah empat total, dan 40 jika ditambah empat per akun. Jelaskan perbedaan satuan, tunjukkan satu contoh kelompok kosong, lalu jelaskan berapa kelompok ukuran lima yang dibutuhkan untuk memproses 28 kejadian. Tulis langkah, hasil, asumsi, dan batas kesimpulan: jumlah percobaan belum membuktikan adanya serangan.",
  "Four accounts each receive six attempts. Make a per-account table; calculate 24 initial attempts, 28 after four extra in total, and 40 after four extra per account. Explain the units, show one empty-group example, then explain how many groups of size five are needed to process 28 events. Write your steps, result, assumptions, and limits: a count of attempts alone does not prove an attack.",
);

export const mathModuleTasks: Partial<Record<string, Copy>> = { "cm-l0m01": foundationTask, "cm-l0m02": fractionsTask, "cm-l0m03": measurementsTask, "cm-l0m04": numeracyTask, "cm-l1m01": algebraTask, "cm-l1m02": functionsTask, "cm-l1m03": growthTask, "cm-l1m04": logarithmsTask, "cm-l2m01": representationsTask, "cm-l2m02": logicTask, "cm-l2m03": setsTask, "cm-l2m04": proofsTask, "cm-l3m01": countingTask, "cm-l3m02": probabilityTask, "cm-l3m03": randomVariablesTask, "cm-l3m04": entropyTask, "cm-l4m01": summariesTask };
export const mathModuleCheckDescriptions: Partial<Record<string, Copy>> = {
  "cm-l0m01": copy("Lulus tiga lesson dahulu. Jawab lima soal; perlu nilai minimal 80% dan semua soal kritis benar. Soal kritis mencakup nol, tambahan total, dan urutan operasi.", "Complete all three lessons first. Answer five questions; you need at least 80% and every critical question correct. Critical questions cover zero, additions to totals, and operation order."),
  "cm-l0m02": copy("Lulus tiga lesson dan checkpoint modul sebelumnya dahulu. Jawab lima soal, perlu minimal 80% dan semua soal kritis benar. Bedakan pecahan, angka persen, desimal, poin persentase, dan perubahan relatif.", "Complete the three lessons and the previous module checkpoint first. Answer five questions, requiring at least 80% and every critical question correct. Distinguish fractions, percentage numbers, decimals, percentage points, and relative change."),
  "cm-l0m03": copy("Selesaikan prasyarat dan tiga lesson modul ini. Lima soal memerlukan ≥80% dan seluruh soal kritis benar: waktu, detik/menit, kB/KiB, dan bit/byte. Unit tujuan dinyatakan pada tiap soal.", "Complete prerequisites and all three lessons. Five questions require ≥80% and every critical item correct: duration, seconds/minutes, kB/KiB, and bits/bytes. Each question states its target unit."),
  "cm-l0m04": copy("Selesaikan prasyarat dan ketiga lesson. Checkpoint memerlukan ≥80% dan seluruh soal kritis benar: bedakan jarak/perubahan, pembulatan/kapasitas, serta pangkat/perkalian biasa.", "Complete prerequisites and all three lessons. The checkpoint requires ≥80% and all critical items correct: distinguish distance/change, rounding/capacity, and powers/ordinary multiplication."),
  "cm-l1m01": copy("Selesaikan assessment L0 dan tiga lesson modul ini. Lima soal memerlukan ≥80% dan seluruh critical benar: substitusi, operasi dua sisi, batas integer, dan biaya tetap.", "Complete the L0 assessment and all three lessons in this module. Five questions require ≥80% and all critical items correct: substitution, operations on both sides, integer bounds, and fixed costs."),
  "cm-l1m02": copy("Selesaikan prasyarat dan ketiga lesson. Lima soal memerlukan ≥80% dan seluruh critical benar: domain/range, kemiringan dengan unit, urutan komposisi, dan invers fungsi yang bukan kebalikan pecahan.", "Complete prerequisites and all three lessons. Five questions require ≥80% and all critical items correct: domain/range, slope with units, composition order, and function inverse versus reciprocal."),
  "cm-l1m03": copy("Selesaikan prasyarat dan ketiga lesson. Lima soal memerlukan ≥80% dan seluruh critical benar: aturan pangkat, model pertumbuhan, ruang string/kasus batas, serta hitungan kemungkinan yang berbeda dari distribusi pemilihan manusia.", "Complete prerequisites and all three lessons. Five questions require ≥80% and all critical items correct: exponent rules, growth models, string spaces/edge cases, and possibility counts versus human selection distributions."),
  "cm-l1m04": copy("Selesaikan prasyarat dan ketiga lesson. Lima soal memerlukan ≥80% dan seluruh critical benar: log, bit label vs tebakan, mean/worst dengan unit, dan syarat distribusi/pengulangan. Angka rate hipotetis, bukan benchmark.", "Complete prerequisites and all three lessons. Five questions require ≥80% and all critical items correct: logs, label bits versus guesses, mean/worst with units, and distribution/repetition conditions. Rates are hypothetical, not benchmarks."),
  "cm-l2m01": copy("Selesaikan assessment L1 dan tiga lesson modul ini. Lima soal memerlukan ≥80% dan seluruh critical benar: bobot biner, lebar hex, signedness serta hasil model wrap signed/unsigned. Selalu baca lebar dan interpretasi yang dinyatakan.", "Complete the L1 assessment and all three lessons in this module. Five questions require ≥80% and all critical items correct: binary weights, hex width, signedness and signed/unsigned wrap-model results. Always read the stated width and interpretation."),
  "cm-l2m02": copy("Selesaikan prasyarat dan ketiga lesson. Lima soal memerlukan ≥80% dan seluruh critical benar: mask any/all, NOT/shift dengan lebar empat bit, serta rewrite De Morgan dan contoh tandingan. Kondisi/izin hanya model fiktif.", "Complete prerequisites and all three lessons. Five questions require ≥80% and all critical items correct: any/all masks, four-bit NOT/shifts, and De Morgan rewrites/counterexamples. Conditions/permissions are fictional models."),
  "cm-l2m03": copy("Selesaikan prasyarat dan ketiga lesson. Lima soal memerlukan ≥80% dan semua critical benar: pasangan berurutan, fungsi total, image/codomain, onto serta invers bijeksi. Relasi izin adalah model fiktif.", "Complete prerequisites and all three lessons. Five questions require ≥80% and every critical item correct: ordered pairs, total functions, image/codomain, onto and bijective inverses. Permission relations are fictional models."),
  "cm-l2m04": copy("Selesaikan prasyarat dan tiga lesson. Lima soal memerlukan ≥80% dan semua critical benar: implikasi, argumen umum vs sampel, basis/langkah induksi dan terminasi. Penilaian fakta otomatis tidak menyatakan bukti tertulis telah direview.", "Complete prerequisites and three lessons. Five questions require ≥80% and all critical items correct: implication, general arguments versus samples, induction base/step and termination. Automatic fact checks do not claim written proofs have been reviewed."),
  "cm-l3m01": copy("Selesaikan assessment L2 dan ketiga lesson. Lima soal memerlukan ≥80% dan semua critical benar: urutan/peran, tanpa pengulangan, overlap dan pigeonhole. Jumlah kemungkinan bukan peluang atau jaminan keamanan.", "Complete the L2 assessment and three lessons. Five questions require ≥80% and all critical items correct: order/roles, no reuse, overlap and pigeonhole. Possibility counts are neither probabilities nor security guarantees."),
  "cm-l3m02": copy("Selesaikan prasyarat dan tiga lesson. Lima soal memerlukan ≥80% dan semua critical benar: penyebut conditional, independensi vs disjoint, sampling ulang dan kasus nol. Distribusi/skema harus eksplisit; model tidak mengukur keamanan secret nyata.", "Complete prerequisites and three lessons. Five questions require ≥80% and all critical items correct: conditional denominators, independence versus disjointness, repeated sampling and zero cases. Distributions/schemes must be explicit; this model does not measure real-secret security."),
  "cm-l3m03": copy("Selesaikan prasyarat dan tiga lesson. Lima soal memerlukan ≥80% dan semua critical benar: bobot/mean, PMF binomial beserta syarat iid, konvensi geometrik dan variansi. Mean bukan batas kasus terburuk; teks task memerlukan review manusia.", "Complete prerequisites and three lessons. Five questions require ≥80% and all critical items correct: weights/means, binomial PMF and iid conditions, geometric convention and variance. Means are not worst-case bounds; written tasks require human review."),
  "cm-l3m04": copy("Selesaikan prasyarat dan tiga lesson. Lima soal memerlukan ≥80% dan semua critical benar: bobot informasi, min-entropy/pmax, korelasi dan collision eksak vs bound. Model tidak mengukur hash/password nyata; bukti teks perlu review manusia.", "Complete prerequisites and three lessons. Five questions require ≥80% and all critical items correct: information weights, min-entropy/pmax, correlation and exact collisions versus bounds. This model measures no real hash/password; written reasoning needs human review."),
  "cm-l4m01": copy("Selesaikan assessment L3 dan tiga lesson. Lima soal memerlukan ≥80% dan semua critical benar: median, cakupan sampel, pembagi variansi dan syarat z. Flag/score bukan bukti insiden; task teks tetap perlu review manusia.", "Complete the L3 assessment and three lessons. Five questions require ≥80% and all critical items correct: median, sample coverage, variance divisors and z conditions. Flags/scores are not incident evidence; written tasks still need human review."),
};

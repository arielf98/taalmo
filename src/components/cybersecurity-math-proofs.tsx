"use client";
import { useLocale } from "@/lib/locale";
import { mathVisualBounds, type MathLessonContent } from "@/content/cybersecurity-math/types";
import styles from "./cybersecurity-math.module.css";

export function MathProofVisual({ activity, value, onChange }: {
  activity: MathLessonContent["exploration"]; value: [number, number]; onChange: (value: [number, number]) => void;
}) {
  const { locale } = useLocale();
  const id = locale === "id", [a, b] = value;
  const yesNo = (answer: boolean) => answer ? (id ? "Benar" : "True") : (id ? "Salah" : "False");
  const quantifiers = activity.kind === "quantifiers", parity = activity.kind === "parity-proof";
  const labels = quantifiers ? ["N", "k"] : parity ? ["a", "b"] : ["N", "i"];
  const bounds = mathVisualBounds[activity.kind];
  return <section className={styles.visual} aria-label={id ? "Model argumen terbatas" : "Bounded argument model"}>
    <h3>{quantifiers ? (id ? "Cari saksi atau pelanggar" : "Find witnesses or violations") : parity ? (id ? "Contoh angka dan alasan umum" : "Numeric examples and general reasons") : (id ? "Keadaan di batas loop" : "States at the loop boundary")}</h3>
    <p>{activity.instruction[locale]}</p>
    <div className={styles.controls}>{labels.map((label, index) => <label key={label}>{label}<input type="number" min={bounds[index][0]} max={bounds[index][1]} step={1} value={value[index]} onChange={(event) => {
      if (!event.target.value.trim()) return;
      const next = Number(event.target.value), [min, max] = bounds[index];
      if (Number.isInteger(next) && next >= min && next <= max) onChange(index === 0 ? [next, b] : [a, next]);
    }} /></label>)}</div>
    {quantifiers ? <>
      <p>{id ? "Domain tepat" : "Exact domain"} D={a === 0 ? "∅" : `{${Array.from({ length: a }, (_, n) => n + 1).join(", ")}}`}; P(n): n≤{b}. {id ? "Seluruh domain tabel ini diperiksa; ini bukan sampel semua integer." : "This table exhausts its declared domain; it is not a sample proving all integers."}</p>
      <table><caption>{id ? "Saksi ∃P dan counterexample ∀P" : "Witnesses for ∃P and counterexamples to ∀P"}</caption><thead><tr><th scope="col">n</th><th scope="col">P(n)</th><th scope="col">{id ? "Peran" : "Role"}</th></tr></thead><tbody>{Array.from({ length: a }, (_, n) => n + 1).map((n) => <tr key={n}><th scope="row">{n}</th><td>{yesNo(n <= b)}</td><td>{n <= b ? (id ? "Saksi ∃P; bukan pelanggar" : "Witness for ∃P; no violation") : (id ? "Counterexample ∀P; saksi ∃¬P" : "Counterexample to ∀P; witness for ∃¬P")}</td></tr>)}{a === 0 && <tr><td colSpan={3}>{id ? "Tidak ada anggota; tidak ada saksi/pelanggar." : "No members; no witnesses/violations."}</td></tr>}</tbody></table>
      <p className={styles.result} aria-live="polite">∀P: {yesNo(a <= b)}; ∃P: {yesNo(a > 0 && b >= 1)}; ¬∀P=∃¬P: {yesNo(a > b)}; {id ? "counterexample" : "counterexamples"}: {Math.max(0, a - b)}</p>
      <p className={styles.muted}>{id ? "D kosong: ∀P benar secara vakum dan ∃P salah. Tidak ada klaim bahwa pemeriksaan keamanan nyata telah berhasil. Ubah domain, maka kebenaran klaim dapat berubah." : "Empty D: ∀P is vacuously true and ∃P false. This does not claim real security checks succeeded. Changing the domain can change the claim's truth."}</p>
    </> : parity ? <>
      <table><caption>{id ? "Contoh terpilih — bukan bukti seluruh integer" : "Selected example — not a proof for all integers"}</caption><thead><tr><th scope="col">{id ? "Bagian" : "Part"}</th><th scope="col">{id ? "Nilai" : "Value"}</th></tr></thead><tbody><tr><th scope="row">m=2a</th><td>{2 * a}</td></tr><tr><th scope="row">n=2b</th><td>{2 * b}</td></tr><tr><th scope="row">c=a+b</th><td>{a + b}</td></tr><tr><th scope="row">m+n=2c</th><td>{2 * a + 2 * b}=2×({a + b})</td></tr><tr><th scope="row">2a−(2b+1)</th><td>{2 * a - (2 * b + 1)} ≠ 0</td></tr></tbody></table>
      <p className={styles.result} aria-live="polite">{id ? "Contoh" : "Example"}: ({2 * a})+({2 * b})={2 * (a + b)}=2×({a + b}); {id ? "saksi integer c" : "integer witness c"}={a + b}.</p>
      <ol><li>{id ? "Bukti langsung UMUM: ambil a, b integer sembarang. m=2a, n=2b, maka m+n=2(a+b); a+b integer. Jadi jumlah genap, termasuk negatif dan nol." : "GENERAL direct proof: take arbitrary integers a, b. m=2a, n=2b, so m+n=2(a+b); a+b is an integer. Thus the sum is even, including negatives and zero."}</li><li>{id ? "Kontradiksi UMUM: andaikan t genap sekaligus ganjil. t=2r=2s+1 memberi 2(r−s)=1. Ini mustahil karena r−s integer, bukan 1/2. Jadi genap dan ganjil tidak dapat sekaligus berlaku." : "GENERAL contradiction: suppose t is both even and odd. t=2r=2s+1 gives 2(r−s)=1. Impossible because r−s is an integer, not 1/2. Thus even and odd cannot both hold."}</li></ol>
      <p className={styles.muted}>{id ? "Kartu umum tidak bergantung nilai kontrol. Tabel hanya ilustrasi; mencoba semua nilai kontrol tidak mencakup integer tak hingga. Model integer matematika ini tidak menjamin bebas overflow mesin." : "The general cards do not depend on control values. The table only illustrates; exhausting the controls does not cover infinitely many integers. This mathematical-integer model does not guarantee machine-overflow safety."}</p>
    </> : <>
      <p>{id ? "Model matematika, bukan runner kode" : "Mathematical model, not a code runner"}: i=0; S=0; while i&lt;N: i←i+1; S←S+i. {id ? "Invariant dinilai pada awal/akhir tiap iterasi: 0≤i≤N dan S=i(i+1)/2." : "Invariant checked at each iteration boundary: 0≤i≤N and S=i(i+1)/2."}</p>
      <table><caption>{id ? "Semua keadaan batas yang terjangkau (* terpilih)" : "All reachable boundary states (* selected)"}</caption><thead><tr><th scope="col">i</th><th scope="col">S</th><th scope="col">i(i+1)/2</th><th scope="col">N−i</th><th scope="col">i&lt;N</th></tr></thead><tbody>{Array.from({ length: a + 1 }, (_, i) => <tr key={i} aria-current={i === b ? "true" : undefined}><th scope="row">{i === b ? "* " : ""}{i}</th><td>{Array.from({ length: i }, (_, index) => index + 1).reduce((sum, term) => sum + term, 0)}</td><td>{i * (i + 1) / 2}</td><td>{a - i}</td><td>{yesNo(i < a)}</td></tr>)}</tbody></table>
      <p className={styles.result} aria-live="polite">{b > a ? (id ? `i=${b}>N=${a}: keadaan tidak terjangkau; invariant batas gagal. Tidak diperlakukan sebagai hasil loop.` : `i=${b}>N=${a}: unreachable state; the bound invariant fails. Not treated as a loop result.`) : `i=${b}, S=${b * (b + 1) / 2}; ${id ? "sisa langkah" : "remaining steps"}=${a - b}; ${b === a ? (id ? "exit, i=N" : "exit, i=N") : (id ? "guard benar, lanjut satu langkah" : "guard true, advance one step")}`}</p>
      <ol><li>{id ? "Initialization: i=S=0 memenuhi rumus dan batas, termasuk N=0." : "Initialization: i=S=0 satisfies the formula and bounds, including N=0."}</li><li>{id ? "Preservation: 0≤i<N dengan i, N integer memberi 0≤i+1≤N. Bila S=i(i+1)/2, i'=i+1 dan S'=S+i'=(i+1)(i+2)/2. Jadi rumus tetap benar pada batas berikutnya." : "Preservation: 0≤i<N with integer i, N gives 0≤i+1≤N. If S=i(i+1)/2, i'=i+1 and S'=S+i'=(i+1)(i+2)/2. The formula holds at the next boundary."}</li><li>{id ? "Exit: guard salah memberi i≥N; invariant i≤N memberi i=N. Hasil S=N(N+1)/2." : "Exit: the false guard gives i≥N; invariant i≤N gives i=N. Result S=N(N+1)/2."}</li><li>{id ? "Terminasi: N−i integer nonnegatif dan turun 1 tiap iterasi. Invariant tanpa kemajuan ini belum menjamin berhenti." : "Termination: N−i is a nonnegative integer dropping by 1 each iteration. The invariant without this progress does not guarantee stopping."}</li></ol>
      <p className={styles.muted}>{id ? "N=0…6 dan i=0…7 adalah batas kontrol, bukan domain induksi. Bukti umum berlaku untuk N berhingga nonnegatif dengan integer tanpa overflow dan urutan update di atas. Teks bukti peserta tidak dinilai otomatis." : "N=0…6 and i=0…7 are control limits, not the induction domain. The general proof assumes finite nonnegative N, unbounded integers and the stated update order. Learners' proof text is not automatically graded."}</p>
    </>}
  </section>;
}

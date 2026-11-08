"use client";
import { useLocale } from "@/lib/locale";
import { mathVisualBounds, type MathLessonContent } from "@/content/cybersecurity-math/types";
import styles from "./cybersecurity-math.module.css";

export function MathLogarithmVisual({ activity, value, onChange }: {
  activity: MathLessonContent["exploration"]; value: [number, number]; onChange: (value: [number, number]) => void;
}) {
  const { locale } = useLocale();
  const id = locale === "id";
  const [a, b] = value;
  const logarithm = activity.kind === "logarithm";
  const binary = activity.kind === "binary-choices";
  const bounds = mathVisualBounds[activity.kind];
  const labels = logarithm ? (id ? ["Basis b", "Eksponen x"] : ["Base b", "Exponent x"])
    : binary ? (id ? ["Total bit pilihan k", "Jawaban seimbang diketahui h"] : ["Total choice bits k", "Known balanced answers h"])
      : (id ? ["Kandidat N (target di daftar)", "Rate r (percobaan/detik)"] : ["Candidates N (target in list)", "Rate r (attempts/second)"]);
  const seconds = (attempts: number) => {
    if (b === 0) return id ? "Tidak hingga (r=0)" : "No finite time (r=0)";
    const time = attempts / b;
    return `${Math.round(time * 10000) / 10000 !== time ? "≈ " : ""}${time.toLocaleString(locale, { maximumFractionDigits: 4 })}`;
  };
  return <section className={styles.visual} aria-label={id ? "Eksplorasi log dan pencarian" : "Log and search exploration"}>
    <h3>{logarithm ? (id ? "Pangkat dan inversnya" : "Powers and their inverse") : binary ? (id ? "Pembagian kandidat yang seimbang" : "Balanced candidate partitions") : (id ? "Posisi cocok, mean dan worst" : "Match position, mean and worst")}</h3>
    <p>{activity.instruction[locale]}</p>
    <div className={styles.controls}>{labels.map((label, index) => <label key={index}>{label}<input type="number" min={bounds[index][0]} max={bounds[index][1]} step={1} value={value[index]} onChange={(event) => {
      if (!event.target.value.trim()) return;
      const number = Number(event.target.value), [min, max] = bounds[index];
      if (Number.isInteger(number) && number >= min && number <= max) onChange(index === 0 ? [number, b] : [a, number]);
    }} /></label>)}</div>
    {logarithm ? <>
      <p className={styles.result} aria-live="polite">{a}^{b} = {a ** b} ↔ log_{a}({a ** b}) = {b}</p>
      <table><caption>{id ? "Dua arah hubungan pangkat dan log" : "Both directions of the power/log relationship"}</caption><thead><tr><th scope="col">{id ? "Eksponen x" : "Exponent x"}</th><th scope="col">{a}^x</th><th scope="col">log_{a}({a}^x)</th></tr></thead><tbody>{Array.from({ length: 7 }, (_, x) => <tr key={x}><th scope="row">{x}{x === b ? (id ? " (dipilih)" : " (selected)") : ""}</th><td>{a ** x}</td><td>{x}</td></tr>)}</tbody></table>
      <p className={styles.muted}>{id ? "Kontrol hanya memakai basis 2–4 dan pangkat eksak 0–6, bukan seluruh domain. Log riil membutuhkan argumen positif dan basis positif bukan satu. Eksponen nol memberi argumen satu, bukan nol." : "Controls sample bases 2–4 and exact powers 0–6, not the whole domain. Real logs require a positive argument and a positive base other than one. Exponent zero gives argument one, not zero."}</p>
    </> : binary ? <>
      <p>{id ? "Model: semua label biner panjang k; setiap jawaban membatasi satu bit dan membagi kumpulan sama besar." : "Model: all length-k binary labels; each answer fixes one bit and splits the set equally."}</p>
      <p className={styles.result} aria-live="polite">{b > a ? (id ? "h melebihi k; tahap ini tidak didefinisikan dalam model, bukan kandidat pecahan." : "h exceeds k; this stage is undefined in the model, not fractional candidates.") : `2^${a} / 2^${b} = ${2 ** (a - b)} ${id ? "kandidat" : "candidates"}`}</p>
      <div className={styles.numberline} aria-hidden="true">{Array.from({ length: a + 1 }, (_, h) => <span data-active={h === b} key={h}>{h}: {2 ** (a - h)}</span>)}</div>
      <table><caption>{id ? "Pembelahan ideal: langkah dan kandidat tersisa" : "Ideal partitions: steps and remaining candidates"}</caption><thead><tr><th scope="col">{id ? "Jawaban seimbang diketahui" : "Known balanced answers"}</th><th scope="col">{id ? "Kandidat tersisa" : "Remaining candidates"}</th></tr></thead><tbody>{Array.from({ length: a + 1 }, (_, h) => <tr key={h}><th scope="row">{h}{h === b ? (id ? " (dipilih)" : " (selected)") : ""}</th><td>{2 ** (a - h)}</td></tr>)}</tbody></table>
      <p>{a === 0 ? (id ? "Hanya satu kandidat: nol bit pilihan. Jika target pasti di kumpulan, pemeriksaan kandidat tunggal tidak bisa gagal; memverifikasinya tetap dapat memerlukan satu pemeriksaan." : "Only one candidate: zero choice bits. If the target is guaranteed in the set, the single candidate check cannot fail; verifying it may still require one check.") : (id ? `Pembanding: satu tebakan kecocokan yang gagal dari ${2 ** a} kandidat menyisakan ${2 ** a - 1}; ini bukan otomatis pembelahan dua.` : `Comparison: one failed match guess among ${2 ** a} candidates leaves ${2 ** a - 1}; this does not automatically halve the set.`)}</p>
      <p className={styles.muted}>{id ? "Model informasi ideal; bukan cara memperoleh bit secret dari sistem nyata dan bukan skor entropy password manusia." : "An ideal information model, not a way to obtain secret bits from real systems or a human-password entropy score."}</p>
    </> : <>
      <p>{id ? "Target pasti di daftar dan seragam, urutan tetap tanpa pengulangan. Rate hipotetis konstan; overhead/paralelisme diabaikan. Percobaan pertama selesai pada 1/r detik jika r>0." : "Target guaranteed in the list and uniform, fixed order without repetitions. Hypothetical constant rate; overhead/parallelism ignored. The first attempt finishes at 1/r seconds when r>0."}</p>
      <p className={styles.result} aria-live="polite">Mean: ({a}+1)/2 = {(a + 1) / 2} {id ? "percobaan" : "attempts"}; worst = {a} {id ? "percobaan" : "attempts"}. {b === 0 ? (id ? "Rate nol: tidak ada waktu selesai yang hingga." : "Zero rate: no finite completion time.") : `Mean: ${seconds((a + 1) / 2)} ${id ? "detik" : "seconds"}; worst: ${seconds(a)} ${id ? "detik" : "seconds"}.`}</p>
      <table><caption>{id ? "Percobaan dan waktu dengan satuan terpisah" : "Attempt counts and time in separate units"}</caption><thead><tr><th scope="col">{id ? "Kasus" : "Case"}</th><th scope="col">{id ? "Percobaan" : "Attempts"}</th><th scope="col">{id ? "Detik" : "Seconds"}</th></tr></thead><tbody>
        {[...new Set([1, Math.ceil(a / 2), a])].map((position) => <tr key={position}><th scope="row">{id ? "Cocok pada posisi " : "Match at position "}{position}</th><td>{position}</td><td>{seconds(position)}</td></tr>)}
        <tr><th scope="row">{id ? "Mean seluruh posisi seragam" : "Mean over uniform positions"}</th><td>{(a + 1) / 2}</td><td>{seconds((a + 1) / 2)}</td></tr><tr><th scope="row">Worst</th><td>{a}</td><td>{seconds(a)}</td></tr>
      </tbody></table>
      <p className={styles.muted}>{id ? "Waktu ditampilkan maksimal empat angka desimal; ≈ menandai pembulatan. Mean pecahan merangkum kasus, bukan setengah pemeriksaan. Rate nol tidak dapat menyelesaikan pekerjaan positif. Model ini bukan benchmark perangkat atau batas keamanan." : "Times show up to four decimal places; ≈ marks rounding. A fractional mean summarizes cases, not half a check. Zero rate cannot finish positive work. This model is not a device benchmark or security bound."}</p>
    </>}
  </section>;
}

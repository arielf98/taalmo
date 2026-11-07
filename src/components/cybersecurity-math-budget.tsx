"use client";
import { useLocale } from "@/lib/locale";
import { mathVisualBounds, type MathLessonContent } from "@/content/cybersecurity-math/types";
import styles from "./cybersecurity-math.module.css";

export function MathBudgetVisual({ activity, value, onChange }: {
  activity: MathLessonContent["exploration"]; value: [number, number]; onChange: (value: [number, number]) => void;
}) {
  const { locale } = useLocale();
  const [x, budget] = value;
  // shortcut: this visual teaches 40+3x only; parameterize when another authored lesson needs different costs.
  const fixed = 40, perJob = 3, total = fixed + perJob * x;
  const maximum = budget < fixed ? null : Math.floor((budget - fixed) / perJob);
  const labels = locale === "id" ? ["x: banyak pekerjaan (integer)", "Batas unit anggaran"] : ["x: job count (integer)", "Budget-unit limit"];
  return <section className={styles.visual} aria-label={locale === "id" ? "Model anggaran 40 + 3x" : "Budget model 40 + 3x"}>
    <h3>{locale === "id" ? "Berapa pekerjaan yang muat?" : "How many jobs fit?"}</h3><p>{activity.instruction[locale]}</p>
    <div className={styles.controls}>{labels.map((label, index) => <label key={index}>{label}<input type="number" min={mathVisualBounds.budget[index][0]} max={mathVisualBounds.budget[index][1]} step={1} value={value[index]} onChange={(event) => {
      if (!event.target.value.trim()) return;
      const number = Number(event.target.value), [min, max] = mathVisualBounds.budget[index];
      if (Number.isInteger(number) && number >= min && number <= max) onChange(index === 0 ? [number, budget] : [x, number]);
    }} /></label>)}</div>
    <p className={styles.result} aria-live="polite">40 + 3 × {x} = {total}; {total <= budget ? (locale === "id" ? "muat" : "fits") : (locale === "id" ? "melampaui batas" : "exceeds limit")}. {maximum === null ? (locale === "id" ? "Tidak ada x nonnegatif yang layak, termasuk x=0." : "No nonnegative x is feasible, including x=0.") : `${locale === "id" ? "Maksimum integer" : "Integer maximum"}: ${maximum}`}</p>
    <table><caption>{locale === "id" ? "Periksa biaya tetap, pilihan x, dan satu pekerjaan tambahan" : "Check fixed cost, chosen x, and one additional job"}</caption><thead><tr><th scope="col">x</th><th scope="col">40 + 3x</th><th scope="col">{locale === "id" ? "Memenuhi batas?" : "Within the limit?"}</th></tr></thead><tbody>{[...new Set([0, x, x + 1])].map((jobs) => <tr key={jobs}><th scope="row">{jobs}</th><td>{fixed + perJob * jobs}</td><td>{fixed + perJob * jobs <= budget ? (locale === "id" ? "Ya" : "Yes") : (locale === "id" ? "Tidak" : "No")}</td></tr>)}</tbody></table>
    <p className={styles.muted}>{locale === "id" ? "Semua biaya memakai unit anggaran fiktif, bukan harga atau benchmark nyata. x harus integer nonnegatif. Baris x+1 hanya membandingkan pilihan berikutnya, termasuk ketika berada di luar rentang kontrol. Batas anggaran di bawah biaya tetap membuat x=0 pun tidak layak." : "All costs use fictional budget units, not real prices or benchmarks. x must be a nonnegative integer. The x+1 row compares the next choice, even beyond the control range. A budget below fixed cost makes even x=0 infeasible."}</p>
  </section>;
}

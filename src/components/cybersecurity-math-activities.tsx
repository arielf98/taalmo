"use client";
import { useState } from "react";
import { useLocale } from "@/lib/locale";
import { mathAnswer, mathAnswerCorrect, mathFraction } from "@/lib/cybersecurity-math";
import { mathVisualBounds, type MathAnswer, type MathLessonContent, type MathQuestion } from "@/content/cybersecurity-math/types";
import { Button } from "./ui/button";
import styles from "./cybersecurity-math.module.css";
import { MathMeasurementVisual } from "./cybersecurity-math-measurements";
import { MathNumeracyVisual } from "./cybersecurity-math-numeracy";
import { MathBudgetVisual } from "./cybersecurity-math-budget";
import { MathFunctionVisual } from "./cybersecurity-math-functions";
import { MathGrowthVisual } from "./cybersecurity-math-growth";
import { MathLogarithmVisual } from "./cybersecurity-math-logarithms";
import { MathRepresentationVisual } from "./cybersecurity-math-representations";

export function MathQuestionCard({ question, answer, onAnswer }: {
  question: MathQuestion; answer?: MathAnswer; onAnswer: (value: MathAnswer | undefined) => void;
}) {
  const { locale } = useLocale();
  const [draft, setDraft] = useState<{ main: string; denominator: string } | null>(null);
  const [error, setError] = useState(false);
  const fraction = typeof question.answer !== "number";
  const input = draft?.main ?? (answer === undefined ? "" : typeof answer === "number" ? String(answer) : String(answer.numerator));
  const denominator = draft?.denominator ?? (answer !== undefined && typeof answer !== "number" ? String(answer.denominator) : "");
  const correct = mathAnswerCorrect(question, answer);
  const feedback = question.mistakes?.find((mistake) => mistake.value === answer)?.feedback ?? question.feedback;
  const fieldId = `math-${question.id}`;
  return (
    <section className={styles.question} aria-labelledby={`${fieldId}-prompt`}>
      <p id={`${fieldId}-prompt`}><strong>{question.prompt[locale]}</strong></p>
      {question.options && <p className={styles.muted}>{locale === "id" ? "Pilihan untuk dipikirkan: " : "Choices to consider: "}{question.options.join(" / ")}</p>}
      <form onSubmit={(event) => {
        event.preventDefault();
        const value = fraction ? mathFraction(input, denominator) : mathAnswer(input, question.decimalPlaces !== undefined);
        setError(value === null);
        if (value !== null) { onAnswer(value); setDraft(null); }
      }}>
        <label htmlFor={fieldId}>
          {fraction ? (locale === "id" ? "Pembilang" : "Numerator") : question.decimalPlaces !== undefined ? (locale === "id" ? "Jawaban desimal" : "Decimal answer") : (locale === "id" ? "Jawaban angka bulat" : "Integer answer")}
          <input id={fieldId} inputMode={typeof question.answer === "number" && question.answer < 0 ? "text" : question.decimalPlaces !== undefined ? "decimal" : "numeric"} autoComplete="off" maxLength={13} value={input}
            aria-invalid={error}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            onChange={(event) => { setDraft({ main: event.target.value, denominator }); setError(false); onAnswer(undefined); }} />
        </label>
        {fraction && <label htmlFor={`${fieldId}-denominator`}>{locale === "id" ? "Penyebut (1–10.000)" : "Denominator (1–10,000)"}
          <input id={`${fieldId}-denominator`} inputMode="numeric" autoComplete="off" maxLength={5} value={denominator} aria-invalid={error} aria-describedby={error ? `${fieldId}-error` : undefined} onChange={(event) => { setDraft({ main: input, denominator: event.target.value }); setError(false); onAnswer(undefined); }} />
        </label>}
        <Button type="submit">{locale === "id" ? "Periksa jawaban" : "Check answer"}</Button>
      </form>
      {!fraction && question.decimalPlaces === undefined && <p className={styles.muted}>{locale === "id" ? "Ketik angka bulat tanpa pemisah ribuan atau unit, misalnya 1234. Titik/koma pada tampilan jumlah bukan bagian jawaban integer." : "Type an integer without thousands separators or units, for example 1234. Grouping commas/points in displayed counts are not part of an integer answer."}</p>}
      <div aria-live="polite">
        {error && <p id={`${fieldId}-error`} role="alert">{fraction ? (locale === "id" ? "Isi pembilang bulat −10.000 sampai 10.000 dan penyebut bulat 1 sampai 10.000; penyebut nol ditolak." : "Enter an integer numerator from −10,000 to 10,000 and denominator from 1 to 10,000; zero denominators are rejected.") : (locale === "id" ? "Masukkan angka −1.000.000 sampai 1.000.000 sesuai jenis jawaban. Untuk desimal boleh memakai koma/titik, maksimal 4 angka di belakangnya. Kolom kosong bukan nol." : "Enter a number from −1,000,000 to 1,000,000 of the requested type. Decimals allow a comma or point and up to 4 decimal places. Empty is not zero.")}</p>}
        {question.decimalPlaces !== undefined && <p className={styles.muted}>{locale === "id" ? `Bulatkan hingga ${question.decimalPlaces} angka desimal; toleransi ±${0.5 * 10 ** -question.decimalPlaces}.` : `Round to ${question.decimalPlaces} decimal places; tolerance ±${0.5 * 10 ** -question.decimalPlaces}.`}</p>}
        {answer !== undefined && draft === null && <div className={`${styles.feedback} ${correct ? "" : styles.warning}`}>
          <strong>{correct ? (locale === "id" ? "Benar. " : "Correct. ") : (locale === "id" ? "Coba lagi. " : "Try again. ")}</strong>
          {correct ? question.solution[locale] : feedback[locale]}
        </div>}
        {draft !== null && <p className={styles.muted}>{locale === "id" ? "Periksa kembali jawaban yang diubah sebelum menyelesaikan checkpoint." : "Check your changed answer again before completing the checkpoint."}</p>}
      </div>
    </section>
  );
}

export function MathVisual({ activity, value, onChange }: {
  activity: MathLessonContent["exploration"]; value: [number, number]; onChange: (value: [number, number]) => void;
}) {
  const { locale } = useLocale();
  const [a, b] = value;
  if (activity.kind === "ratio" || activity.kind === "rate" || activity.kind === "bytes") return <MathMeasurementVisual activity={activity} value={value} onChange={onChange} />;
  if (activity.kind === "distance" || activity.kind === "rounding" || activity.kind === "powers") return <MathNumeracyVisual activity={activity} value={value} onChange={onChange} />;
  if (activity.kind === "budget") return <MathBudgetVisual activity={activity} value={value} onChange={onChange} />;
  if (activity.kind === "function" || activity.kind === "linear" || activity.kind === "composition") return <MathFunctionVisual activity={activity} value={value} onChange={onChange} />;
  if (activity.kind === "growth" || activity.kind === "search-space") return <MathGrowthVisual activity={activity} value={value} onChange={onChange} />;
  if (activity.kind === "logarithm" || activity.kind === "binary-choices" || activity.kind === "search-cost") return <MathLogarithmVisual activity={activity} value={value} onChange={onChange} />;
  if (activity.kind === "binary" || activity.kind === "hexadecimal" || activity.kind === "signed-byte") return <MathRepresentationVisual activity={activity} value={value} onChange={onChange} />;
  const division = activity.kind === "division";
  const count = activity.kind === "count";
  const fraction = activity.kind === "fraction";
  const change = activity.kind === "percentage-change";
  const bounds = mathVisualBounds[activity.kind];
  const groups = fraction || change ? [] : count ? [a, b] : division ? [...Array.from({ length: Math.floor(a / b) }, () => b), a % b] : Array.from({ length: a }, () => b);
  const total = count ? a + b : division ? a : a * b;
  const labels = activity.inputLabels?.map((label) => label[locale]) ?? (locale === "id"
    ? (change ? ["Persentase awal", "Persentase akhir"] : fraction ? ["Bagian terpilih", "Banyak bagian sama besar per utuh"] : count ? ["Kelompok pertama", "Kelompok kedua"] : division ? ["Jumlah kejadian", "Ukuran kelompok"] : ["Jumlah akun", "Percobaan per akun"])
    : (change ? ["Initial percentage", "Final percentage"] : fraction ? ["Selected parts", "Equal parts per whole"] : count ? ["First group", "Second group"] : division ? ["Event count", "Group size"] : ["Number of accounts", "Attempts per account"]));
  const title = locale === "id" ? "Eksplorasi dengan angka kecil" : "Explore with small numbers";
  return (
    <section className={styles.visual} aria-label={title}>
      <h3>{title}</h3>
      <p>{activity.instruction[locale]}</p>
      <div className={styles.controls}>
        {labels.map((label, index) => <label key={`${activity.kind}-${index}`}>
          {label}
          <input type="number" min={bounds[index][0]} max={bounds[index][1]} step={1}
            value={value[index]} onChange={(event) => {
              if (!event.target.value.trim()) return;
              const next = Number(event.target.value);
              const [min, max] = bounds[index];
              if (!Number.isInteger(next) || next < min || next > max) return;
              onChange(index === 0 ? [next, b] : [a, next]);
            }} />
        </label>)}
      </div>
      {count && <div className={styles.numberline} aria-hidden="true">{Array.from({ length: 17 }, (_, index) => <span data-active={index >= a && index <= a + b} key={index}>{index}</span>)}</div>}
      {fraction && <div aria-hidden="true" className={styles.fractionGrid} style={{ gridTemplateColumns: `repeat(${b}, 1fr)` }}>{Array.from({ length: Math.max(b, Math.ceil(a / b) * b) }, (_, index) => <span key={index} data-filled={index < a}>{index < a ? "●" : "○"}</span>)}</div>}
      {change && <div className={styles.changeBars} aria-hidden="true">{[a, b].map((value, index) => <div key={index}><span style={{ width: `${value}%` }} />{labels[index]}: {value}%</div>)}</div>}
      <div className={styles.groups} aria-hidden="true">
        {groups.map((size, index) => <div className={styles.group} key={index}>
          <small>{division && index === groups.length - 1 ? (locale === "id" ? "Sisa" : "Remainder") : `${locale === "id" ? "Kelompok" : "Group"} ${index + 1}`}</small>
          {size === 0 ? <span>0</span> : Array.from({ length: size }, (_, dot) => <span key={dot} className={styles.dot} />)}
        </div>)}
      </div>
      <p className={styles.result} aria-live="polite">{fraction ? `${a}/${b} ≈ ${(a / b).toLocaleString(locale, { maximumFractionDigits: 4 })} ≈ ${(100 * a / b).toLocaleString(locale, { maximumFractionDigits: 2 })}%` : change ? `${a}% → ${b}%: ${b - a} ${locale === "id" ? "poin persentase" : "percentage points"}; ${a === 0 ? (locale === "id" ? "relatif tidak terdefinisi (baseline nol)" : "relative change undefined (zero baseline)") : `${(100 * (b - a) / a).toLocaleString(locale, { maximumFractionDigits: 2 })}% ${locale === "id" ? "relatif" : "relative change"}`}` : count ? `${a} + ${b} = ${total}` : division ? `${a} = ${Math.floor(a / b)} × ${b} + ${a % b}` : `${a} × ${b} = ${total}`}</p>
      <table>
        <caption>{locale === "id" ? "Tabel setara dengan visual" : "Table equivalent of the visual"}</caption>
        <thead><tr><th scope="col">{locale === "id" ? "Besaran" : "Quantity"}</th><th scope="col">{locale === "id" ? "Nilai" : "Value"}</th></tr></thead>
        <tbody>
          <tr><th scope="row">{labels[0]}</th><td>{a}</td></tr>
          <tr><th scope="row">{labels[1]}</th><td>{b}</td></tr>
          <tr><th scope="row">{change ? (locale === "id" ? "Selisih poin persentase" : "Percentage-point difference") : fraction ? (locale === "id" ? "Bagian per utuh (desimal)" : "Parts per whole (decimal)") : division ? (locale === "id" ? "Kelompok penuh" : "Full groups") : activity.inputLabels ? "Total" : (locale === "id" ? "Total kejadian" : "Total events")}</th><td>{change ? b - a : fraction ? (a / b).toLocaleString(locale, { maximumFractionDigits: 4 }) : division ? Math.floor(a / b) : total}</td></tr>
          {division && <tr><th scope="row">{locale === "id" ? "Kejadian tersisa" : "Remaining events"}</th><td>{a % b}</td></tr>}
          {change && <tr><th scope="row">{locale === "id" ? "Perubahan relatif terhadap awal" : "Relative change from initial"}</th><td>{a === 0 ? (locale === "id" ? "Tidak terdefinisi: pembagi nol" : "Undefined: zero denominator") : `${(100 * (b - a) / a).toLocaleString(locale, { maximumFractionDigits: 2 })}%`}</td></tr>}
        </tbody>
      </table>
      {(fraction || change) && <p className={styles.muted}>{locale === "id" ? "≈ berarti nilai pendekatan. Tampilan desimal dibulatkan sampai 4 angka, persen sampai 2; jawaban pecahan tetap diperiksa secara eksak." : "≈ means approximately equal. Display decimals are rounded to 4 places and percentages to 2; fraction answers are still checked exactly."}</p>}
      <p className={styles.muted}>{locale === "id" ? "Data fiktif untuk belajar menghitung; bukan metrik keamanan atau kapasitas sistem nyata." : "Fictional data for learning to count; not a security metric or real system capacity."}</p>
    </section>
  );
}

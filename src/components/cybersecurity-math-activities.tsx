"use client";
import { useState } from "react";
import { useLocale } from "@/lib/locale";
import { mathAnswer } from "@/lib/cybersecurity-math";
import type { MathLessonContent, MathQuestion } from "@/content/cybersecurity-math/types";
import { Button } from "./ui/button";
import styles from "./cybersecurity-math.module.css";

export function MathQuestionCard({ question, answer, onAnswer }: {
  question: MathQuestion; answer?: number; onAnswer: (value: number | undefined) => void;
}) {
  const { locale } = useLocale();
  const [draft, setDraft] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const input = draft ?? (answer === undefined ? "" : String(answer));
  const correct = answer === question.answer;
  const feedback = question.mistakes?.find((mistake) => mistake.value === answer)?.feedback ?? question.feedback;
  const fieldId = `math-${question.id}`;
  return (
    <section className={styles.question} aria-labelledby={`${fieldId}-prompt`}>
      <p id={`${fieldId}-prompt`}><strong>{question.prompt[locale]}</strong></p>
      {question.options && <p className={styles.muted}>{locale === "id" ? "Pilihan untuk dipikirkan: " : "Choices to consider: "}{question.options.join(" / ")}</p>}
      <form onSubmit={(event) => {
        event.preventDefault();
        const value = mathAnswer(input);
        setError(value === null);
        if (value !== null) { onAnswer(value); setDraft(null); }
      }}>
        <label htmlFor={fieldId}>
          {locale === "id" ? "Jawaban angka bulat" : "Whole-number answer"}
          <input id={fieldId} inputMode="numeric" autoComplete="off" maxLength={8} value={input}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            onChange={(event) => { setDraft(event.target.value); setError(false); onAnswer(undefined); }} />
        </label>
        <Button type="submit">{locale === "id" ? "Periksa jawaban" : "Check answer"}</Button>
      </form>
      <div aria-live="polite">
        {error && <p id={`${fieldId}-error`} role="alert">{locale === "id" ? "Masukkan bilangan bulat dari −1.000.000 sampai 1.000.000. Kolom kosong berbeda dari nol." : "Enter an integer from −1,000,000 to 1,000,000. An empty field differs from zero."}</p>}
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
  const division = activity.kind === "division";
  const count = activity.kind === "count";
  const groups = count ? [a, b] : division ? [...Array.from({ length: Math.floor(a / b) }, () => b), a % b] : Array.from({ length: a }, () => b);
  const total = count ? a + b : division ? a : a * b;
  const labels = locale === "id"
    ? (count ? ["Kelompok pertama", "Kelompok kedua"] : division ? ["Jumlah kejadian", "Ukuran kelompok"] : ["Jumlah akun", "Percobaan per akun"])
    : (count ? ["First group", "Second group"] : division ? ["Event count", "Group size"] : ["Number of accounts", "Attempts per account"]);
  const title = locale === "id" ? "Eksplorasi dengan angka kecil" : "Explore with small numbers";
  return (
    <section className={styles.visual} aria-label={title}>
      <h3>{title}</h3>
      <p>{activity.instruction[locale]}</p>
      <div className={styles.controls}>
        {labels.map((label, index) => <label key={`${activity.kind}-${index}`}>
          {label}
          <input type="number" min={division && index === 1 ? 1 : 0} max={division && index === 0 ? 24 : 8} step={1}
            value={value[index]} onChange={(event) => {
              if (!event.target.value.trim()) return;
              const next = Number(event.target.value);
              const min = division && index === 1 ? 1 : 0;
              const max = division && index === 0 ? 24 : 8;
              if (!Number.isInteger(next) || next < min || next > max) return;
              onChange(index === 0 ? [next, b] : [a, next]);
            }} />
        </label>)}
      </div>
      {count && <div className={styles.numberline} aria-hidden="true">{Array.from({ length: 17 }, (_, index) => <span data-active={index >= a && index <= a + b} key={index}>{index}</span>)}</div>}
      <div className={styles.groups} aria-hidden="true">
        {groups.map((size, index) => <div className={styles.group} key={index}>
          <small>{division && index === groups.length - 1 ? (locale === "id" ? "Sisa" : "Remainder") : `${locale === "id" ? "Kelompok" : "Group"} ${index + 1}`}</small>
          {size === 0 ? <span>0</span> : Array.from({ length: size }, (_, dot) => <span key={dot} className={styles.dot} />)}
        </div>)}
      </div>
      <p className={styles.result} aria-live="polite">{count ? `${a} + ${b} = ${total}` : division ? `${a} = ${Math.floor(a / b)} × ${b} + ${a % b}` : `${a} × ${b} = ${total}`}</p>
      <table>
        <caption>{locale === "id" ? "Tabel setara dengan gambar kelompok" : "Table equivalent of the group illustration"}</caption>
        <thead><tr><th scope="col">{locale === "id" ? "Besaran" : "Quantity"}</th><th scope="col">{locale === "id" ? "Nilai" : "Value"}</th></tr></thead>
        <tbody>
          <tr><th scope="row">{labels[0]}</th><td>{a}</td></tr>
          <tr><th scope="row">{labels[1]}</th><td>{b}</td></tr>
          <tr><th scope="row">{division ? (locale === "id" ? "Kelompok penuh" : "Full groups") : (locale === "id" ? "Total kejadian" : "Total events")}</th><td>{division ? Math.floor(a / b) : total}</td></tr>
          {division && <tr><th scope="row">{locale === "id" ? "Kejadian tersisa" : "Remaining events"}</th><td>{a % b}</td></tr>}
        </tbody>
      </table>
      <p className={styles.muted}>{locale === "id" ? "Data fiktif untuk belajar menghitung; bukan metrik keamanan atau kapasitas sistem nyata." : "Fictional data for learning to count; not a security metric or real system capacity."}</p>
    </section>
  );
}

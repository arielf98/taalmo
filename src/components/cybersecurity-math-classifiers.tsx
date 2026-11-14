"use client";
import { useLocale } from "@/lib/locale";
import { mathVisualBounds, type MathLessonContent } from "@/content/cybersecurity-math/types";
import styles from "./cybersecurity-math.module.css";

const tables = [[3, 1, 2, 4], [0, 4, 0, 6], [0, 0, 2, 8], [0, 0, 0, 0]];
const events = [
  { name: "a", score: 90, d: true }, { name: "b", score: 80, d: false },
  { name: "c", score: 70, d: true }, { name: "d", score: 70, d: false },
  { name: "e", score: 50, d: true }, { name: "f", score: 40, d: false },
  { name: "g", score: 20, d: true }, { name: "h", score: 10, d: false },
];
function countAt(threshold: number) {
  const tp = events.filter((event) => event.d && event.score >= threshold).length;
  const fp = events.filter((event) => !event.d && event.score >= threshold).length;
  return [tp, 4 - tp, fp, 4 - fp];
}

export function MathClassifierVisual({ activity, value, onChange }: {
  activity: MathLessonContent["exploration"]; value: [number, number]; onChange: (value: [number, number]) => void;
}) {
  const { locale } = useLocale();
  const id = locale === "id", [a, b] = value, matrix = activity.kind === "confusion-matrix", threshold = activity.kind === "classifier-threshold";
  const [tp, fn, fp, tn] = matrix ? tables[a].map((count) => count * b) : threshold ? countAt(a) : [a, 4 - a, b, 6 - b];
  const D = tp + fn, nonD = fp + tn, alerts = tp + fp, total = D + nonD;
  const ratio = (num: number, den: number) => den === 0 ? (id ? "Tidak terdefinisi" : "Undefined") : `${num}/${den}≈${(num / den).toFixed(3)}`;
  const bounds = mathVisualBounds[activity.kind];
  const labels = matrix ? (id ? ["Tabel", "Pengali"] : ["Table", "Multiplier"]) : threshold ? (id ? ["Threshold t (skor≥t)", "Biaya per FN (FP=1)"] : ["Threshold t (score≥t)", "Cost per FN (FP=1)"]) : ["TP", "FP"];
  const tableNames = id ? ["TP 3 FN 1 FP 2 TN 4", "Tanpa alert", "Tanpa D", "Kosong"] : ["TP 3 FN 1 FP 2 TN 4", "No alerts", "No D", "Empty"];
  const thresholds = threshold ? [...new Set([101, ...events.map((event) => event.score), a])].sort((x, y) => y - x).map((t) => ({ t, counts: countAt(t) })) : [];
  return <section className={styles.visual} aria-label={id ? "Classifier pada data sintetis" : "Classifiers on synthetic data"}>
    <h3>{matrix ? (id ? "Kebenaran dan prediksi pada dua sumbu" : "Truth and predictions on two axes") : threshold ? (id ? "Satu ranking, beberapa keputusan" : "One ranking, multiple decisions") : (id ? "Setiap metrik punya denominator" : "Each metric has a denominator")}</h3><p>{activity.instruction[locale]}</p>
    <div className={styles.controls}>{labels.map((label, index) => <label key={label}>{label}: {value[index]}{matrix && index === 0 ? <select value={a} onChange={(event) => { const next = Number(event.target.value); if (Number.isInteger(next) && next >= 0 && next <= 3) onChange([next, b]); }}>{tableNames.map((name, i) => <option key={name} value={i}>{name}</option>)}</select> : <input type={threshold && index === 0 ? "range" : "number"} value={value[index]} min={bounds[index][0]} max={bounds[index][1]} step={1} onChange={(event) => { if (!event.target.value.trim()) return; const next = Number(event.target.value), [min, max] = bounds[index]; if (Number.isInteger(next) && next >= min && next <= max) onChange(index === 0 ? [next, b] : [a, next]); }} />}</label>)}</div>
    <p>{id ? "D=bermasalah menurut label sintetis; A=prediksi positif/alert. Semua label diketahui pada kohort latihan; skor hanya ranking, bukan peluang." : "D=problematic under synthetic labels; A=positive prediction/alert. All labels are known in the training cohort; scores rank events, not probabilities."}</p>
    {!matrix && !threshold && <p>{id ? "Kelas tetap: D 4/non-D 6. FN=4−TP dan TN=6−FP." : "Fixed classes: D 4/non-D 6. FN=4−TP and TN=6−FP."}</p>}
    {threshold && <table><caption>{id ? "Seluruh event; aturan inklusif skor≥t" : "All events; inclusive rule score≥t"}</caption><thead><tr><th scope="col">Event</th><th scope="col">{id ? "Skor" : "Score"}</th><th scope="col">{id ? "Kebenaran" : "Truth"}</th><th scope="col">{id ? "Prediksi" : "Prediction"}</th><th scope="col">{id ? "Sel" : "Cell"}</th></tr></thead><tbody>{events.map((event) => { const alerted = event.score >= a; return <tr key={event.name}><th scope="row">{event.name}</th><td>{event.score}</td><td>{event.d ? "D" : "¬D"}</td><td>{alerted ? "A" : "¬A"}</td><td>{event.d ? alerted ? "TP" : "FN" : alerted ? "FP" : "TN"}</td></tr>; })}</tbody></table>}
    <table><caption>{id ? "Confusion matrix lengkap dan total" : "Full confusion matrix and totals"}</caption><thead><tr><th scope="col">{id ? "Kebenaran ↓ / prediksi →" : "Truth ↓ / prediction →"}</th><th scope="col">A (+)</th><th scope="col">¬A (−)</th><th scope="col">Total</th></tr></thead><tbody><tr><th scope="row">D</th><td>TP={tp}</td><td>FN={fn}</td><td>{D}</td></tr><tr><th scope="row">¬D</th><td>FP={fp}</td><td>TN={tn}</td><td>{nonD}</td></tr><tr><th scope="row">Total</th><td>{alerts}</td><td>{fn + tn}</td><td>{total}</td></tr></tbody></table>
    {matrix && <p className={styles.result} aria-live="polite">Accuracy=(TP+TN)/N={ratio(tp + tn, total)}; error rate={ratio(fp + fn, total)}.</p>}
    {!matrix && <p className={styles.result} aria-live="polite">Precision={ratio(tp, alerts)}; recall={ratio(tp, D)}; F1={ratio(2 * tp, 2 * tp + fp + fn)}.</p>}
    <table><caption>{id ? "Metrik, kelompok acuan dan denominator" : "Metrics, reference groups and denominators"}</caption><thead><tr><th scope="col">{id ? "Metrik" : "Metric"}</th><th scope="col">{id ? "Rumus" : "Formula"}</th><th scope="col">{id ? "Hasil (≈dibulatkan)" : "Result (≈rounded)"}</th></tr></thead><tbody>{[
      ["Accuracy", "(TP+TN)/N", ratio(tp + tn, total)], ["Precision", "TP/(TP+FP)", ratio(tp, alerts)],
      ["Recall / TPR", "TP/(TP+FN)", ratio(tp, D)], ["FPR", "FP/(FP+TN)", ratio(fp, nonD)],
      ["F1", "2TP/(2TP+FP+FN)", ratio(2 * tp, 2 * tp + fp + fn)],
    ].map(([name, formula, result]) => <tr key={name}><th scope="row">{name}</th><td>{formula}</td><td>{result}</td></tr>)}</tbody></table>
    <p>{id ? "Konvensi F1: rumus hitungan di atas, termasuk 0 bila numerator 0 dan denominator positif. F1 dapat 0 ketika precision/recall undefined. Bila denominator F1=0,hasil undefined; TN tidak masuk F1. Nilai rasio0…1,bukan angka persen." : "F1 convention: the count formula above, including 0 when the numerator is 0 and denominator positive. F1 may be 0 when precision/recall is undefined. A zero F1 denominator is undefined; TN is absent. Ratios range 0…1, not percentage numbers."}</p>
    {(alerts === 0 || D === 0 || nonD === 0 || total === 0) && <p className={styles.notice}>{id ? "Kelompok acuan kosong: lihat undefined pada masing-masing metrik. Jangan menggantinya dengan 0. Setiap denominator diperiksa sendiri." : "Empty reference group: inspect undefined for each metric. Do not replace it with 0. Each denominator is checked separately."}</p>}
    {threshold && <>
      <p className={styles.result} aria-live="polite">{id ? "Biaya sintetis" : "Synthetic cost"}={b}×FN+1×FP={b * fn + fp}. ROC=({ratio(fp, nonD)}, {ratio(tp, D)}); PR=({ratio(tp, D)}, {ratio(tp, alerts)}).</p>
      {["ROC", "PR"].map((graph) => {
        const points = thresholds.filter((row) => graph === "ROC" || row.counts[0] + row.counts[2] > 0).map((row) => {
          const [t, , f] = row.counts;
          return { threshold: row.t, x: graph === "ROC" ? f / 4 : t / 4, y: graph === "ROC" ? t / 4 : t / (t + f) };
        });
        return <div key={graph}><h4>{graph}: x={graph === "ROC" ? "FPR" : "recall"}, y={graph === "ROC" ? "recall / TPR" : "precision"}</h4><svg viewBox="0 0 460 290" width="100%" aria-hidden="true">{[0, 0.5, 1].map((tick) => <g key={tick}><line x1="65" y1={225 - tick * 180} x2="425" y2={225 - tick * 180} stroke="var(--border)" /><text x="53" y={229 - tick * 180} textAnchor="end" fill="var(--ink)">{tick === 0.5 ? "1/2" : tick}</text><text x={65 + tick * 360} y="247" textAnchor="middle" fill="var(--ink)">{tick === 0.5 ? "1/2" : tick}</text></g>)}<text x="18" y="22" fill="var(--ink)">{graph === "ROC" ? "TPR" : "Precision"}</text><text x="245" y="278" textAnchor="middle" fill="var(--ink)">{graph === "ROC" ? "FPR" : "Recall"}</text><polyline points={points.map((point) => `${65 + point.x * 360},${225 - point.y * 180}`).join(" ")} fill="none" stroke="var(--ink)" strokeDasharray="5 4" />{points.map((point) => point.threshold === a ? <rect key={point.threshold} x={61 + point.x * 360} y={221 - point.y * 180} width="8" height="8" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" /> : <circle key={point.threshold} cx={65 + point.x * 360} cy={225 - point.y * 180} r="3" fill="var(--ink)" />)}</svg></div>;
      })}
      <p>{id ? "Kotak=*threshold terpilih,lingkaran=titik lain (jika rasio terdefinisi). Sumbu tetap 0…1. Garis putus-putus pemandu baca, bukan pengamatan antara/AUC. Tanpa alert,precision undefined sehingga titik itu dihilangkan dari PR,bukan diberi nilai 1. Kedua event skor 70 berpindah bersama." : "Square=*selected threshold,circles=other points (when ratios are defined). Axes stay0…1. Dashed guides are not intermediate observations/AUC. Without alerts,precision is undefined,so that PR point is omitted,not set to 1. Both score 70 events move together."}</p>
      <table><caption>{id ? "Semua threshold grafik; *terpilih" : "Every graph threshold; *selected"}</caption><thead><tr><th scope="col">t</th><th scope="col">TP/FN/FP/TN</th><th scope="col">FPR (xROC)</th><th scope="col">Recall (yROC,xPR)</th><th scope="col">Precision (yPR)</th><th scope="col">{id ? "Biaya" : "Cost"}</th></tr></thead><tbody>{thresholds.map(({ t, counts: [tPos, fNeg, fPos, tNeg] }) => <tr key={t} aria-current={t === a ? "true" : undefined}><th scope="row">{t === a ? "* " : ""}{t}</th><td>{[tPos, fNeg, fPos, tNeg].join(" / ")}</td><td>{ratio(fPos, 4)}</td><td>{ratio(tPos, 4)}</td><td>{ratio(tPos, tPos + fPos)}</td><td>{b * fNeg + fPos}</td></tr>)}</tbody></table>
    </>}
    <p className={styles.muted}>{id ? "Pecahan eksak dan pendekatan≈dibulatkan. Data sintetis,bukan performa detektor nyata; pilihan threshold/biaya memerlukan konteks dan validasi terpisah,tidak menentukan investigasi otomatis." : "Exact fractions and rounded≈approximations. Synthetic data,not actual-detector performance; threshold/cost choices require context and separate validation,not automatic investigations."}</p>
  </section>;
}

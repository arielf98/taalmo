"use client";
import { useLocale } from "@/lib/locale";
import { mathVisualBounds, type MathLessonContent } from "@/content/cybersecurity-math/types";
import styles from "./cybersecurity-math.module.css";

export function MathGrowthVisual({ activity, value, onChange }: {
  activity: MathLessonContent["exploration"]; value: [number, number]; onChange: (value: [number, number]) => void;
}) {
  const { locale } = useLocale();
  const id = locale === "id";
  const [a, b] = value;
  const comparison = activity.kind === "growth";
  const bounds = mathVisualBounds[activity.kind];
  const labels = comparison ? (id ? ["Putaran n", "Tambahan / faktor b"] : ["Round n", "Addition / factor b"])
    : (id ? ["Banyak simbol a", "Panjang ℓ (posisi)"] : ["Alphabet size a", "Length ℓ (positions)"]);
  const rows = comparison ? Array.from({ length: 7 }, (_, n) => ({ n, linear: 1 + b * n, exponential: b ** n })) : [];
  const yMax = b === 2 ? 80 : 800;
  const symbols = ["A", "B", "C", "D"].slice(0, a);
  const prefixLength = Math.min(b, 2);
  // shortcut: only two prefix positions are rendered; show suffix counts instead of the full exponential tree.
  const prefixes = comparison ? [] : b === 0 ? ["ε"] : b === 1 ? symbols : symbols.flatMap((first) => symbols.map((second) => first + second));
  const completions = comparison ? 0 : a ** (b - prefixLength);
  return <section className={styles.visual} aria-label={id ? "Eksplorasi pertumbuhan dan pilihan" : "Growth and choice exploration"}>
    <h3>{comparison ? (id ? "Tambahan tetap atau faktor tetap?" : "Fixed addition or fixed factor?") : (id ? "Pohon prefix dan ruang lengkap" : "Prefix tree and complete space")}</h3>
    <p>{activity.instruction[locale]}</p>
    <div className={styles.controls}>{labels.map((label, index) => <label key={index}>{label}
      <input type="number" min={bounds[index][0]} max={bounds[index][1]} step={1} value={value[index]} onChange={(event) => {
        if (!event.target.value.trim()) return;
        const number = Number(event.target.value), [min, max] = bounds[index];
        if (Number.isInteger(number) && number >= min && number <= max) onChange(index === 0 ? [number, b] : [a, number]);
      }} />
    </label>)}</div>
    {comparison ? <>
      <p>L(n) = 1 + {b}n; E(n) = {b}^n; n ∈ {"{0, 1, 2, 3, 4, 5, 6}"}.</p>
      <svg viewBox="0 0 480 290" width="100%" aria-hidden="true">
        <text x="16" y="16" fill="var(--ink)" fontSize="13">{id ? "Salinan (jumlah)" : "Copies (count)"}</text>
        {[0, 1, 2, 3, 4].map((tick) => <g key={tick}><line x1="65" y1={230 - tick * 50} x2="425" y2={230 - tick * 50} stroke="var(--border)" /><text x="55" y={234 - tick * 50} textAnchor="end" fill="var(--ink)" fontSize="13">{tick * yMax / 4}</text></g>)}
        <line x1="65" y1="30" x2="65" y2="230" stroke="var(--ink)" /><line x1="65" y1="230" x2="425" y2="230" stroke="var(--ink)" />
        {rows.map((row) => <text key={row.n} x={65 + row.n * 60} y="252" textAnchor="middle" fill="var(--ink)" fontSize="13">{row.n}</text>)}
        <text x="245" y="279" textAnchor="middle" fill="var(--ink)" fontSize="14">{id ? "Putaran n (langkah utuh)" : "Round n (whole steps)"}</text>
        <polyline points={rows.map((row) => `${65 + row.n * 60},${230 - row.linear * 200 / yMax}`).join(" ")} fill="none" stroke="var(--ink)" strokeWidth="2" strokeDasharray="5 4" />
        <polyline points={rows.map((row) => `${65 + row.n * 60},${230 - row.exponential * 200 / yMax}`).join(" ")} fill="none" stroke="var(--green)" strokeWidth="2" />
        {rows.map((row) => <g key={row.n}><rect x={61 + row.n * 60} y={226 - row.linear * 200 / yMax} width="8" height="8" fill="var(--surface)" stroke="var(--ink)" strokeWidth={row.n === a ? 3 : 1} /><circle cx={65 + row.n * 60} cy={230 - row.exponential * 200 / yMax} r={row.n === a ? 6 : 3} fill="var(--green)" stroke="var(--ink)" /></g>)}
      </svg>
      <p className={styles.result} aria-live="polite">L({a}) = {1 + b * a}; E({a}) = {b ** a}; E − L = {b ** a - (1 + b * a)} {id ? "salinan" : "copies"}</p>
      <p>{id ? `Kotak/garis putus-putus = linear; lingkaran/garis utuh = eksponensial. Skala vertikal 0–${yMax}, berubah bila b diganti. Semua titik sampel integer; garis penghubung bukan data tambahan.` : `Squares/dashes = linear; circles/solid guide = exponential. Vertical scale is 0–${yMax} and changes with b. All samples are integer points; connecting guides are not additional data.`}</p>
      <table><caption>{id ? "Semua sampel grafik dalam jumlah salinan" : "All graph samples in copy counts"}</caption><thead><tr><th scope="col">{id ? "Putaran n" : "Round n"}</th><th scope="col">L(n) = 1+bn</th><th scope="col">E(n) = b^n</th></tr></thead><tbody>{rows.map((row) => <tr key={row.n}><th scope="row">{row.n}{row.n === a ? (id ? " (dipilih)" : " (selected)") : ""}</th><td>{row.linear}</td><td>{row.exponential}</td></tr>)}</tbody></table>
      <p className={styles.muted}>{id ? "Model sintetis, bukan kapasitas penyimpanan atau pertumbuhan kejadian nyata. Faktor tetap adalah asumsi dan belum tentu berlaku di luar contoh." : "Synthetic models, not storage capacity or measured event growth. A constant factor is an assumption and may not hold beyond the example."}</p>
    </> : <>
      <p>Alphabet: {`{${symbols.join(", ")}}`}. {id ? "Semua kombinasi boleh; pengulangan boleh. Prefix adalah awalan yang dipilih, suffix adalah kelanjutannya." : "All combinations and repetition are allowed. A prefix is a chosen beginning; a suffix is its continuation."}</p>
      <p>{id ? `Pohon menampilkan ${prefixLength} dari ${b} posisi. Setiap prefix punya ${completions} string lengkap sebagai kelanjutan (termasuk suffix kosong saat sudah lengkap).` : `The tree shows ${prefixLength} of ${b} positions. Each prefix has ${completions} complete-string continuations (including an empty suffix when already complete).`}</p>
      {b === 0 ? <p>ε — {id ? "satu string kosong, tanpa posisi" : "one empty string, no positions"}</p> : <div className={styles.groups}>{symbols.map((first) => <div className={styles.group} key={first}><strong>{first}</strong>{b > 1 && <ul>{symbols.map((second) => <li key={second}>{first + second}</li>)}</ul>}</div>)}</div>}
      <p className={styles.result} aria-live="polite">{a}^{b} = {a ** b} {id ? "string lengkap" : "complete strings"}</p>
      <table><caption>{id ? "Prefix yang digambar dan jumlah kelanjutannya" : "Displayed prefixes and their completion counts"}</caption><thead><tr><th scope="col">{id ? `Prefix (${prefixLength} posisi)` : `Prefix (${prefixLength} positions)`}</th><th scope="col">{id ? `String lengkap per prefix (${b - prefixLength} posisi tersisa)` : `Complete strings per prefix (${b - prefixLength} positions remaining)`}</th></tr></thead><tbody>{prefixes.map((prefix) => <tr key={prefix}><th scope="row">{prefix}</th><td>{completions}</td></tr>)}<tr><th scope="row">Total</th><td>{prefixes.length} × {completions} = {a ** b}</td></tr></tbody></table>
      <p className={styles.muted}>{id ? "Panjang nol memberi satu string kosong; satu simbol memberi satu string di setiap panjang tetap. Jumlah ini tidak menentukan peluang pemilihan: peluang sama membutuhkan pemilihan simbol seragam dan independen. Bukan skor password manusia atau rekomendasi secret." : "Length zero gives one empty string; one symbol gives one string at each fixed length. Counts do not determine selection probabilities: equal probabilities require uniform independent symbol selection. This is not a human-password score or a secret recommendation."}</p>
    </>}
  </section>;
}

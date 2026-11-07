"use client";
import { useLocale } from "@/lib/locale";
import { mathVisualBounds, type MathLessonContent } from "@/content/cybersecurity-math/types";
import styles from "./cybersecurity-math.module.css";

export function MathFunctionVisual({ activity, value, onChange }: {
  activity: MathLessonContent["exploration"]; value: [number, number]; onChange: (value: [number, number]) => void;
}) {
  const { locale } = useLocale();
  const id = locale === "id";
  const [a, b] = value;
  const mapping = activity.kind === "function";
  const linear = activity.kind === "linear";
  const bounds = mathVisualBounds[activity.kind];
  const labels = mapping ? (id ? ["Input x", "Input terbesar dalam domain"] : ["Input x", "Largest input in the domain"])
    : linear ? (id ? ["Waktu t (menit utuh)", "Rate m (catatan/menit)"] : ["Time t (whole minutes)", "Rate m (records/minute)"])
      : (id ? ["Input x (label fiktif)", "Urutan operasi"] : ["Input x (fictional label)", "Operation order"]);
  // shortcut: fixed authored models; add parameters only when another published lesson needs different rules.
  const samples = Array.from({ length: mapping ? b + 1 : linear ? 7 : 0 }, (_, input) => ({ input, output: mapping ? 2 * input : 3 + b * input }));
  const insideDomain = !mapping || a <= b;
  const middle = b === 0 ? a + 2 : 3 * a;
  const composed = b === 0 ? 3 * middle : middle + 2;
  const order = b === 0 ? "f → g: g(f(x))" : "g → f: f(g(x))";
  const selected = mapping ? 2 * a : 3 + b * a;
  return <section className={styles.visual} aria-label={id ? "Eksplorasi fungsi" : "Function exploration"}>
    <h3>{mapping ? (id ? "Domain dan hasil yang dicapai" : "Domain and reached outputs") : linear ? (id ? "Grafik jumlah terhadap waktu" : "Count against time graph") : (id ? "Dua tahap dan jalan kembali" : "Two stages and the way back")}</h3>
    <p>{activity.instruction[locale]}</p>
    <div className={styles.controls}>{labels.map((label, index) => <label key={index}>{label}
      {!mapping && !linear && index === 1 ? <select value={b} onChange={(event) => {
        const order = Number(event.target.value);
        if (order === 0 || order === 1) onChange([a, order]);
      }}><option value={0}>f → g: g(f(x))</option><option value={1}>g → f: f(g(x))</option></select>
        : <input type="number" min={bounds[index][0]} max={bounds[index][1]} step={1} value={value[index]} onChange={(event) => {
          if (!event.target.value.trim()) return;
          const number = Number(event.target.value), [min, max] = bounds[index];
          if (Number.isInteger(number) && number >= min && number <= max) onChange(index === 0 ? [number, b] : [a, number]);
        }} />}
    </label>)}</div>
    {mapping ? <>
      <p>f(x) = 2x<br />Domain: {`{${samples.map((row) => row.input).join(", ")}}`}<br />{id ? "Range (himpunan hasil)" : "Range (reached outputs)"}: {`{${samples.map((row) => row.output).join(", ")}}`}</p>
      <p className={styles.result} aria-live="polite">{insideDomain ? `f(${a}) = ${selected}` : (id ? `Input ${a} di luar domain; f(${a}) tidak didefinisikan dalam model ini.` : `Input ${a} is outside the domain; f(${a}) is undefined in this model.`)}</p>
    </> : linear ? <>
      <p>Model: N(t) = 3 + {b}t; t ∈ {"{0, 1, 2, 3, 4, 5, 6}"} {id ? "menit" : "minutes"}.</p>
      <svg viewBox="0 0 480 290" width="100%" aria-hidden="true">
        <text x="20" y="16" fill="var(--ink)" fontSize="13">{id ? "N (catatan)" : "N (records)"}</text>
        {[0, 10, 20, 30].map((n) => <g key={n}><line x1="60" y1={230 - n * 200 / 30} x2="420" y2={230 - n * 200 / 30} stroke="var(--border)" /><text x="50" y={234 - n * 200 / 30} textAnchor="end" fill="var(--ink)" fontSize="13">{n}</text></g>)}
        <line x1="60" y1="30" x2="60" y2="230" stroke="var(--ink)" /><line x1="60" y1="230" x2="420" y2="230" stroke="var(--ink)" />
        {[0, 1, 2, 3, 4, 5, 6].map((t) => <text key={t} x={60 + 60 * t} y="252" textAnchor="middle" fill="var(--ink)" fontSize="13">{t}</text>)}
        <text x="240" y="279" textAnchor="middle" fill="var(--ink)" fontSize="14">{id ? "Waktu t (menit)" : "Time t (minutes)"}</text>
        <polyline points={samples.map((row) => `${60 + 60 * row.input},${230 - row.output * 200 / 30}`).join(" ")} fill="none" stroke="var(--green)" strokeWidth="2" strokeDasharray="5 4" />
        {samples.map((row) => <circle key={row.input} cx={60 + 60 * row.input} cy={230 - row.output * 200 / 30} r={row.input === a ? 7 : 4} fill="var(--green)" stroke="var(--ink)" strokeWidth={row.input === a ? 3 : 1} />)}
      </svg>
      <p className={styles.result} aria-live="polite">N({a}) = {selected} {id ? "catatan" : "records"}; m = {b} {id ? "catatan/menit" : "records/minute"}</p>
      <p>{id ? "Nilai awal N(0)=3 catatan. Kemiringan ΔN/Δt=m; titik berbingkai tebal adalah pilihan saat ini. Garis putus-putus hanya panduan antar sampel, bukan izin input pecahan menit atau catatan terukur tambahan." : "Initial value N(0)=3 records. Slope ΔN/Δt=m; the thick-outlined point is the current selection. Dashed guides join samples; they do not allow fractional-minute inputs or supply additional measured counts."}</p>
    </> : <>
      <p>f(x) = x + 2; g(u) = 3u. {id ? "Domain keduanya: integer nonnegatif. Kontrol x=0–6 adalah sebagian sampel, bukan seluruh domain." : "Both domains: nonnegative integers. The x=0–6 controls show a sample, not the whole domain."}</p>
      <p>{order}; h(x) = {b === 0 ? "3(x + 2)" : "3x + 2"}</p>
      <ol><li>{id ? "Input awal" : "Initial input"}: {a}</li><li>{b === 0 ? `f(${a}) = ${a} + 2 = ${middle}` : `g(${a}) = 3 × ${a} = ${middle}`}</li><li>{b === 0 ? `g(${middle}) = 3 × ${middle} = ${composed}` : `f(${middle}) = ${middle} + 2 = ${composed}`}</li></ol>
      <p className={styles.result} aria-live="polite">{a} → {middle} → {composed} → {id ? "invers" : "inverse"} → {b === 0 ? composed / 3 - 2 : (composed - 2) / 3}</p>
      <table><caption>{id ? "Tahap komposisi dan invers yang setara" : "Equivalent composition and inverse stages"}</caption><thead><tr><th scope="col">{id ? "Langkah" : "Step"}</th><th scope="col">{id ? "Nilai / aturan" : "Value / rule"}</th></tr></thead><tbody>
        <tr><th scope="row">{id ? "Input → nilai antara → output" : "Input → intermediate → output"}</th><td>{a} → {middle} → {composed}</td></tr>
        <tr><th scope="row">{id ? "Batalkan tahap terakhir dahulu" : "Undo the last stage first"}</th><td>h⁻¹({composed}) = {b === 0 ? `${composed} / 3 − 2 = ${a}` : `(${composed} − 2) / 3 = ${a}`}</td></tr>
        <tr><th scope="row">{id ? "Domain invers = range komposisi" : "Inverse domain = composition range"}</th><td>{b === 0 ? "{6, 9, 12, …}" : "{2, 5, 8, …}"}</td></tr>
        <tr><th scope="row">{id ? "Kebalikan pecahan, bukan invers fungsi" : "Reciprocal, not function inverse"}</th><td>1/h({a}) = 1/{composed}</td></tr>
      </tbody></table>
    </>}
    {(mapping || linear) && <table><caption>{mapping ? (id ? "Seluruh input yang diizinkan dan hasilnya" : "All allowed inputs and outputs") : (id ? "Semua sampel grafik N(t)=3+mt" : "All graph samples for N(t)=3+mt")}</caption><thead><tr><th scope="col">{mapping ? "x" : (id ? "t (menit)" : "t (minutes)")}</th><th scope="col">{mapping ? "f(x)" : (id ? "N(t) (catatan)" : "N(t) (records)")}</th></tr></thead><tbody>{samples.map((row) => <tr key={row.input}><th scope="row">{row.input}{row.input === a ? (id ? " (dipilih)" : " (selected)") : ""}</th><td>{row.output}</td></tr>)}</tbody></table>}
    <p className={styles.muted}>{mapping ? (id ? "Satu input harus punya satu output. Input di luar domain tidak diberi output nol. Mengubah domain dapat mengubah range meskipun rumus tetap sama." : "Each input must have one output. An out-of-domain input does not receive a zero output. Changing the domain can change the range even when the formula stays the same.")
      : linear ? (id ? "Data sintetis dengan rate tetap yang diasumsikan. Grafik ini bukan benchmark atau bukti penyebab kejadian." : "Synthetic data with an assumed constant rate. This graph is not a benchmark or evidence of an event's cause.")
        : (id ? "Urutan komposisi dapat mengubah hasil. Invers hanya menerima hasil yang dicapai dan membatalkan tahap secara terbalik. Aturan label yang mudah dibalik ini bukan algoritma enkripsi aman." : "Composition order may change the result. An inverse accepts reached outputs and undoes stages in reverse order. These easily reversed label rules are not a secure encryption algorithm.")}</p>
  </section>;
}

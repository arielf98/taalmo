"use client";
import { useLocale } from "@/lib/locale";
import { mathVisualBounds, type MathLessonContent } from "@/content/cybersecurity-math/types";
import styles from "./cybersecurity-math.module.css";

const choose = (n: number, k: number) => {
  let result = 1;
  for (let i = 0; i < k; i++) result = result * (n - i) / (i + 1);
  return result;
};

export function MathRandomVariableVisual({ activity, value, onChange }: {
  activity: MathLessonContent["exploration"]; value: [number, number]; onChange: (value: [number, number]) => void;
}) {
  const { locale } = useLocale();
  const id = locale === "id", [a, b] = value;
  const distribution = activity.kind === "distribution", binomial = activity.kind === "binomial";
  const bounds = mathVisualBounds[activity.kind];
  const q = binomial ? b : a;
  const denominator = distribution ? 4 : binomial ? 4 ** a : 4 ** b;
  const weights = distribution ? [[2, 0, 2], [0, 4, 0], [1, 2, 1]][a] : [];
  const rows: { label: string; numerator: number; x?: number; coefficient?: number }[] = distribution ? weights.map((numerator, index) => ({ label: String(index * b), x: index * b, numerator })) : binomial ? Array.from({ length: a + 1 }, (_, k) => ({ label: String(k), coefficient: choose(a, k), numerator: q === 0 ? Number(k === 0) * denominator : q === 4 ? Number(k === a) * denominator : choose(a, k) * q ** k * (4 - q) ** (a - k) })) : [
    ...Array.from({ length: b }, (_, index) => ({ label: String(index + 1), numerator: q === 0 ? 0 : q === 4 ? Number(index === 0) * denominator : q * (4 - q) ** index * 4 ** (b - index - 1) })),
    { label: `T>${b}`, numerator: q === 0 ? denominator : q === 4 ? 0 : (4 - q) ** b },
  ];
  const total = rows.reduce((sum, row) => sum + row.numerator, 0);
  const meanNumerator = distribution ? rows.reduce((sum, row) => sum + (row.x ?? 0) * row.numerator, 0) : a * q;
  const labels = distribution ? (id ? ["Model distribusi", "Skala c"] : ["Distribution model", "Scale c"]) : binomial ? ["n", "q (p=q/4)"] : ["q (p=q/4)", id ? "Horizon h" : "Horizon h"];
  const modelNames = id ? ["Dua ujung", "Konstan", "Tiga nilai"] : ["Two extremes", "Constant", "Three values"];
  return <section className={styles.visual} aria-label={id ? "Distribusi diskret eksak" : "Exact discrete distribution"}>
    <h3>{distribution ? (id ? "Histogram dan rata-rata berbobot" : "Histogram and weighted mean") : binomial ? (id ? "Jumlah sukses dalam n tetap" : "Success count in fixed n") : (id ? "Waktu sukses pertama dan ekor" : "First-success time and tail")}</h3><p>{activity.instruction[locale]}</p>
    <div className={styles.controls}>{labels.map((label, index) => <label key={label}>{label}{distribution && index === 0 ? <select value={a} onChange={(event) => { const next = Number(event.target.value); if (Number.isInteger(next) && next >= 0 && next <= 2) onChange([next, b]); }}>{modelNames.map((name, index) => <option value={index} key={name}>{name}</option>)}</select> : <input type="number" min={bounds[index][0]} max={bounds[index][1]} step={1} value={value[index]} onChange={(event) => { if (!event.target.value.trim()) return; const next = Number(event.target.value), [min, max] = bounds[index]; if (Number.isInteger(next) && next >= min && next <= max) onChange(index === 0 ? [next, b] : [a, next]); }} />}</label>)}</div>
    <p>{distribution ? (id ? `Z∈{0,1,2}, bobot ${weights.join(",")}/4; X=${b}Z. Kontrol skala mengubah nilai, bukan peluang.` : `Z∈{0,1,2}, weights ${weights.join(",")}/4; X=${b}Z. Scaling changes values, not probabilities.`) : binomial ? (id ? `n=${a},p=${q}/4; X menghitung sukses dari n indikator iid. Semua k=0…n ditampilkan.` : `n=${a},p=${q}/4; X counts successes in n iid indicators. Every k=0…n is shown.`) : (id ? `p=${q}/4, T termasuk percobaan sukses. Batang terakhir menggabungkan seluruh T>${b}, bukan satu nilai waktu.` : `p=${q}/4, T includes the successful trial. The final bar aggregates every T>${b}, not one time value.`)}</p>
    <svg viewBox="0 0 480 290" width="100%" aria-hidden="true"><g stroke="var(--border)">{[0, 0.5, 1].map((p) => <line key={p} x1="65" y1={220 - p * 180} x2="450" y2={220 - p * 180} />)}</g><g fill="var(--ink)" fontSize="12">{[0, 0.5, 1].map((p) => <text key={p} x="48" y={224 - p * 180} textAnchor="end">{p === 0.5 ? "1/2" : p}</text>)}<text x="12" y="19">P</text></g>{rows.map((row, i) => { const step = 360 / rows.length, x = 70 + i * step, height = row.numerator / denominator * 180; return <g key={row.label}><rect x={x + step * 0.15} y={220 - height} width={step * 0.7} height={height} fill="var(--mint-soft)" stroke="var(--ink)" /><text x={x + step / 2} y="240" textAnchor="middle" fill="var(--ink)" fontSize="12">{row.label}</text></g>; })}<text x="255" y="275" textAnchor="middle" fill="var(--ink)" fontSize="13">{distribution ? "X" : binomial ? "k" : (id ? "T atau bucket ekor" : "T or tail bucket")}</text></svg>
    <p className={styles.muted}>{id ? "Sumbu vertikal tetap 0…1; tinggi batang adalah peluang, bukan hitungan sampel. Baris bernilai 0 tetap ada di tabel. Semua model sintetis dan tidak menjalankan percobaan acak." : "The vertical axis stays 0…1; bar height is probability, not sample count. Zero-weight rows remain in the table. Models are synthetic; no random trials run."}</p>
    <table><caption>{id ? "Seluruh massa grafik dalam pecahan eksak" : "All chart mass in exact fractions"}</caption><thead><tr><th scope="col">{distribution ? "X" : binomial ? "k" : "T"}</th>{binomial && <th scope="col">C(n,k)</th>}<th scope="col">{id ? "Peluang" : "Probability"}</th>{distribution && <th scope="col">x·P(X=x)</th>}</tr></thead><tbody>{rows.map((row) => <tr key={row.label}><th scope="row">{row.label}</th>{binomial && <td>{row.coefficient}</td>}<td>{row.numerator}/{denominator}</td>{distribution && <td>{(row.x ?? 0) * row.numerator}/{denominator}</td>}</tr>)}<tr><th scope="row">{id ? "Total bobot" : "Total weight"}</th>{binomial && <td>—</td>}<td>{total}/{denominator}=1</td>{distribution && <td>{meanNumerator}/4</td>}</tr></tbody></table>
    {distribution || binomial ? <p className={styles.result} aria-live="polite">E[X]={meanNumerator}/4={meanNumerator / 4}. {distribution ? (id ? "Mean dapat berada di nilai berbobot 0; bukan hasil wajib." : "The mean may be a zero-weight value; it is not a required outcome.") : (id ? "np; jumlah sukses satu realisasi tetap integer." : "np; one realized success count is still an integer.")}</p> : <>
      <p className={styles.result} aria-live="polite">{q === 0 ? (id ? "p=0: tidak pernah sukses; tidak ada mean berhingga atau variansi biasa. Semua massa masih menunggu." : "p=0: never succeeds; no finite mean or ordinary variance. All mass is still waiting.") : `E[T]=${4}/${q}; Var(T)=${4 * (4 - q)}/${q * q} ${id ? "percobaan²" : "trials²"}; P(T>${b})=${rows[rows.length - 1].numerator}/${denominator}.`}</p>
      <p>{id ? "Mean/variansi memakai seluruh support tak hingga untuk 0<p<1. Bucket ekor menampung massanya, tidak menganggap T berhenti di h. Pada p=1, T=1 pasti dan Var 0; pada p=0, tail 1 berarti belum pernah sukses pada setiap horizon berhingga." : "Mean/variance use the entire infinite support for 0<p<1. The tail bucket retains mass; T does not stop at h. At p=1, T=1 certainly and Var 0; at p=0, tail 1 means no success by every finite horizon."}</p>
      <table><caption>{id ? "Contoh sebaran terpisah, tidak mengikuti kontrol p/h" : "Separate spread examples, independent of p/h controls"}</caption><thead><tr><th scope="col">{id ? "Distribusi" : "Distribution"}</th><th scope="col">E[X]</th><th scope="col">Var(X)</th></tr></thead><tbody><tr><th scope="row">P(X=0)=P(X=2)=1/2</th><td>1</td><td>(1+1)/2=1</td></tr><tr><th scope="row">P(X=1)=1</th><td>1</td><td>0</td></tr></tbody></table>
    </>}
    {binomial && <p className={styles.muted}>{id ? "n=0 memberi X=0 pasti; p=0/1 ditangani sebagai distribusi konstan tanpa menafsirkan 0^0. n0…5 dan p kelipatan 1/4 adalah batas kontrol, bukan seluruh domain rumus. Mean np tidak membuktikan asumsi iid." : "n=0 gives certain X=0; p=0/1 are constant distributions without interpreting 0^0. n0…5 and p in quarter steps are control limits, not the formula's whole domain. Mean np does not establish iid."}</p>}
  </section>;
}

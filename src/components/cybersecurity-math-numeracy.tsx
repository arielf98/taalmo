"use client";
import { useLocale } from "@/lib/locale";
import { mathVisualBounds, type MathLessonContent } from "@/content/cybersecurity-math/types";
import styles from "./cybersecurity-math.module.css";

export function MathNumeracyVisual({ activity, value, onChange }: {
  activity: MathLessonContent["exploration"]; value: [number, number]; onChange: (value: [number, number]) => void;
}) {
  const { locale } = useLocale();
  const [a, b] = value;
  const distance = activity.kind === "distance";
  const rounding = activity.kind === "rounding";
  const bounds = mathVisualBounds[activity.kind];
  const unit = rounding ? [10, 100, 1000][b] : 1;
  const undefinedPower = !distance && !rounding && a === 0 && b === 0;
  const power = !distance && !rounding && !undefinedPower ? a ** b : null;
  const labels = locale === "id" ? distance ? ["Posisi awal", "Posisi akhir"] : rounding ? ["Jumlah nonnegatif", "Satuan pembulatan"] : ["Basis", "Eksponen"]
    : distance ? ["Start position", "End position"] : rounding ? ["Nonnegative count", "Rounding unit"] : ["Base", "Exponent"];
  return <section className={styles.visual} aria-label={locale === "id" ? "Eksplorasi numerasi" : "Numeracy exploration"}>
    <h3>{locale === "id" ? "Lihat arti angka dan operasi" : "See what numbers and operations mean"}</h3>
    <p>{activity.instruction[locale]}</p>
    <div className={styles.controls}>{labels.map((label, index) => <label key={index}>{label}: {distance && <span>{value[index]}</span>}
      {rounding && index === 1 ? <select value={b} onChange={(event) => {
        const index = Number(event.target.value);
        if (Number.isInteger(index) && index >= 0 && index <= 2) onChange([a, index]);
      }}>{[10, 100, 1000].map((unit, index) => <option key={unit} value={index}>{unit}</option>)}</select>
        : <input type={distance ? "range" : "number"} min={bounds[index][0]} max={bounds[index][1]} step={1} value={value[index]} onChange={(event) => {
          if (!event.target.value.trim()) return;
          const number = Number(event.target.value), [min, max] = bounds[index];
          if (Number.isInteger(number) && number >= min && number <= max) onChange(index === 0 ? [number, b] : [a, number]);
        }} />}
    </label>)}</div>
    {distance && <svg viewBox="0 0 440 90" width="100%" aria-hidden="true">
      <line x1="20" y1="45" x2="420" y2="45" stroke="var(--muted)" />
      {[-10, -5, 0, 5, 10].map((position) => <g key={position}><line x1={220 + position * 20} y1="40" x2={220 + position * 20} y2="50" stroke="var(--muted)" /><text x={220 + position * 20} y="67" textAnchor="middle" fill="var(--ink)" fontSize="12">{position}</text></g>)}
      <line x1={220 + a * 20} y1="45" x2={220 + b * 20} y2="45" stroke="var(--green)" strokeWidth="5" />
      <circle cx={220 + a * 20} cy="45" r="5" fill="var(--ink)" /><circle cx={220 + b * 20} cy="45" r="5" fill="var(--green)" />
      <text x={220 + a * 20} y="25" textAnchor="middle" fill="var(--ink)" fontSize="14">A={a}</text><text x={220 + b * 20} y="86" textAnchor="middle" fill="var(--ink)" fontSize="14">B={b}</text>
    </svg>}
    <p className={styles.result} aria-live="polite">{distance ? `${b} − (${a}) = ${b - a}; ${locale === "id" ? "jarak" : "distance"} = ${Math.abs(b - a)}`
      : rounding ? `${a} → ${Math.round(a / unit) * unit} (${locale === "id" ? "terdekat, unit" : "nearest, unit"} ${unit})`
        : undefinedPower ? (locale === "id" ? "0^0 tidak diberi nilai dalam model pelajaran ini." : "0^0 is left undefined in this lesson's model.") : `${a}^${b} = ${power?.toLocaleString(locale)}`}</p>
    <table><caption>{locale === "id" ? "Nilai dan langkah yang setara dengan visual" : "Values and steps equivalent to the visual"}</caption><thead><tr><th scope="col">{locale === "id" ? "Besaran" : "Quantity"}</th><th scope="col">{locale === "id" ? "Nilai" : "Value"}</th></tr></thead>
      <tbody>{distance ? <><tr><th scope="row">A → B</th><td>{a} → {b}</td></tr><tr><th scope="row">{locale === "id" ? "Perubahan bertanda" : "Signed change"}</th><td>{b - a}</td></tr><tr><th scope="row">{locale === "id" ? "Jarak absolut" : "Absolute distance"}</th><td>{Math.abs(b - a)}</td></tr></>
        : rounding ? <><tr><th scope="row">{locale === "id" ? "Batas bawah kelipatan" : "Lower multiple"}</th><td>{Math.floor(a / unit) * unit}</td></tr><tr><th scope="row">{locale === "id" ? "Terdekat (setengah naik)" : "Nearest (half up)"}</th><td>{Math.round(a / unit) * unit}</td></tr><tr><th scope="row">{locale === "id" ? "Batas atas kelipatan" : "Upper multiple"}</th><td>{Math.ceil(a / unit) * unit}</td></tr></>
          : <><tr><th scope="row">{locale === "id" ? "Bentuk perkalian" : "Multiplication form"}</th><td>{undefinedPower ? "—" : b === 0 ? (locale === "id" ? "Tidak ada faktor; basis bukan nol memberi 1" : "No factors; a nonzero base gives 1") : Array.from({ length: b }, () => a).join(" × ")}</td></tr><tr><th scope="row">{locale === "id" ? "Hasil pangkat" : "Power result"}</th><td>{power === null ? "—" : power.toLocaleString(locale)}</td></tr><tr><th scope="row">{locale === "id" ? "Bandingkan basis × eksponen" : "Compare base × exponent"}</th><td>{a} × {b} = {a * b}</td></tr></>}
      </tbody></table>
    <p className={styles.muted}>{distance ? (locale === "id" ? "Posisi bertanda menyatakan selisih dari acuan, bukan jumlah kejadian negatif. Jarak selalu nonnegatif. Gunakan tombol panah pada slider untuk mengubah satu langkah." : "Signed positions express differences from a reference, not negative event counts. Distance is nonnegative. Use arrow keys on the sliders for single steps.")
      : rounding ? (locale === "id" ? "Visual ini hanya untuk jumlah nonnegatif. Pada tepat setengah, pembulatan terdekat naik. Estimasi bukan angka terukur; pembulatan atas/bawah dipilih sesuai tujuan." : "This visual uses nonnegative counts only. Exact halfway values round up. Estimates are not measurements; choose upper/lower rounding for the task.")
        : (locale === "id" ? "Basis 0–10 dan eksponen 0–10 menjaga eksplorasi kecil dan eksak. Model ini mengecualikan 0^0; pangkat bukan basis dikali eksponen." : "Bases and exponents from 0–10 keep exploration small and exact. This model excludes 0^0; a power is not base times exponent.")}</p>
  </section>;
}

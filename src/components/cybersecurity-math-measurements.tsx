"use client";
import { useLocale } from "@/lib/locale";
import { mathVisualBounds, type MathLessonContent } from "@/content/cybersecurity-math/types";
import styles from "./cybersecurity-math.module.css";

export function MathMeasurementVisual({ activity, value, onChange }: {
  activity: MathLessonContent["exploration"]; value: [number, number]; onChange: (value: [number, number]) => void;
}) {
  const { locale } = useLocale();
  const [a, b] = value;
  const ratio = activity.kind === "ratio";
  const rate = activity.kind === "rate";
  const bounds = mathVisualBounds[activity.kind];
  const labels = locale === "id"
    ? ratio ? ["Akun pada rasio awal", "Catatan pada rasio awal"] : rate ? ["Laju hipotetis (kejadian/detik)", "Target kejadian"] : ["Jumlah unit", "Jenis unit"]
    : ratio ? ["Accounts in the initial ratio", "Records in the initial ratio"] : rate ? ["Hypothetical rate (events/second)", "Target events"] : ["Unit count", "Unit type"];
  const unitIndex = activity.kind === "bytes" ? b : 0;
  const unit = ["B", "kB", "KiB"][unitIndex];
  const bytes = a * [1, 1000, 1024][unitIndex];
  const title = locale === "id" ? "Hubungkan jumlah dengan satuannya" : "Connect quantities to their units";
  const seconds = a > 0 ? b / a : null;
  return <section className={styles.visual} aria-label={title}>
    <h3>{title}</h3><p>{activity.instruction[locale]}</p>
    <div className={styles.controls}>
      {labels.map((label, index) => <label key={index}>{label}
        {!ratio && !rate && index === 1 ? <select value={b} onChange={(event) => {
          const index = Number(event.target.value);
          if (Number.isInteger(index) && index >= 0 && index <= 2) onChange([a, index]);
        }}>{["B", "kB", "KiB"].map((symbol, index) => <option key={symbol} value={index}>{symbol}</option>)}</select> : <input type="number" min={bounds[index][0]} max={bounds[index][1]} step={1} value={value[index]} onChange={(event) => {
          if (!event.target.value.trim()) return;
          const number = Number(event.target.value);
          const [min, max] = bounds[index];
          if (Number.isInteger(number) && number >= min && number <= max) onChange(index === 0 ? [number, b] : [a, number]);
        }} />}
      </label>)}
    </div>
    <p className={styles.result} aria-live="polite">{ratio
      ? `${a} : ${b} → ${locale === "id" ? "catatan per akun" : "records per account"} ≈ ${(b / a).toLocaleString(locale, { maximumFractionDigits: 4 })}`
      : rate ? b === 0 ? (locale === "id" ? "Target nol: tidak perlu pemrosesan (0 detik)." : "Zero target: no processing required (0 seconds).")
        : seconds === null ? (locale === "id" ? "Laju nol: target positif tidak tercapai pada model ini." : "Zero rate: a positive target is never reached in this model.")
          : `${b} ${locale === "id" ? "kejadian" : "events"} ÷ ${a} ${locale === "id" ? "kejadian/detik" : "events/second"} ≈ ${seconds.toLocaleString(locale, { maximumFractionDigits: 4 })} ${locale === "id" ? "detik" : "seconds"}`
      : `${a} ${unit} = ${bytes.toLocaleString(locale)} B = ${(bytes * 8).toLocaleString(locale)} bit`}</p>
    <table>
      <caption>{ratio ? (locale === "id" ? "Kedua jumlah diskalakan dengan faktor yang sama" : "Both quantities scaled by the same factor") : rate ? (locale === "id" ? "Perkiraan jumlah pada laju konstan hipotetis" : "Estimated counts at a hypothetical constant rate") : (locale === "id" ? "Konversi unit dengan definisi eksplisit" : "Unit conversion with explicit definitions")}</caption>
      <thead><tr><th scope="col">{ratio ? (locale === "id" ? "Faktor" : "Factor") : rate ? (locale === "id" ? "Waktu (detik)" : "Time (seconds)") : (locale === "id" ? "Besaran" : "Quantity")}</th><th scope="col">{ratio ? (locale === "id" ? "Akun" : "Accounts") : rate ? (locale === "id" ? "Kejadian" : "Events") : (locale === "id" ? "Nilai" : "Value")}</th>{ratio && <th scope="col">{locale === "id" ? "Catatan" : "Records"}</th>}</tr></thead>
      <tbody>{ratio ? [1, 2, 3, 4].map((factor) => <tr key={factor}><th scope="row">×{factor}</th><td>{a * factor}</td><td>{b * factor}</td></tr>)
        : rate ? <>{[0, 1, 5, 10].map((time) => <tr key={time}><th scope="row">{time}</th><td>{a * time}</td></tr>)}<tr><th scope="row">{b === 0 ? "0" : seconds === null ? (locale === "id" ? "Tidak tercapai" : "Not reached") : `≈ ${seconds.toLocaleString(locale, { maximumFractionDigits: 4 })}`}</th><td>{b} (target)</td></tr></>
          : <><tr><th scope="row">{locale === "id" ? "Byte (B)" : "Bytes (B)"}</th><td>{bytes.toLocaleString(locale)}</td></tr><tr><th scope="row">bit</th><td>{(bytes * 8).toLocaleString(locale)}</td></tr><tr><th scope="row">1 B</th><td>8 bit</td></tr><tr><th scope="row">1 kB</th><td>1 000 B</td></tr><tr><th scope="row">1 KiB</th><td>1 024 B</td></tr></>}
      </tbody>
    </table>
    <p className={styles.muted}>{ratio ? (locale === "id" ? "Model senilai mengasumsikan rasio tetap; data nyata dapat memiliki isi berbeda pada setiap akun." : "This proportional model assumes a fixed ratio; real accounts may contain different counts.") : rate ? (locale === "id" ? "Angka laju adalah asumsi pembelajaran, bukan benchmark, kapasitas server, atau kecepatan serangan. Nilai ≈ dibulatkan sampai 4 angka desimal; overhead dan perubahan laju tidak dimodelkan." : "The rate is a teaching assumption, not a benchmark, server capacity, or attack speed. Values marked ≈ are rounded to 4 decimal places; overhead and changing rates are not modeled.") : (locale === "id" ? "B berarti byte; bit adalah unit yang lebih kecil. kB memakai faktor 1.000, KiB memakai 1.024. Ukuran data bukan bukti durasi transfer atau risiko keamanan." : "B means byte; a bit is a smaller unit. kB uses a factor of 1,000 and KiB uses 1,024. Data size does not establish transfer time or security risk.")}</p>
  </section>;
}

"use client";
import { useLocale } from "@/lib/locale";
import { mathVisualBounds, type MathLessonContent } from "@/content/cybersecurity-math/types";
import { Button } from "./ui/button";
import styles from "./cybersecurity-math.module.css";

export function MathRepresentationVisual({ activity, value, onChange }: {
  activity: MathLessonContent["exploration"]; value: [number, number]; onChange: (value: [number, number]) => void;
}) {
  const { locale } = useLocale();
  const id = locale === "id";
  const [a, b] = value;
  const signed = activity.kind === "signed-byte";
  const hex = activity.kind === "hexadecimal";
  const raw = signed ? a : 16 * a + b;
  const pattern = raw.toString(2).padStart(8, "0");
  const hexPattern = raw.toString(16).toUpperCase().padStart(2, "0");
  const decoded = raw < 128 ? raw : raw - 256;
  const rawSum = raw + b;
  // shortcut: this authored model only adds 0…15 to one byte; other operations need their own stated contract.
  const stored = rawSum % 256;
  const signedSum = decoded + b;
  const storedSigned = stored < 128 ? stored : stored - 256;
  const signedOverflow = signedSum < -128 || signedSum > 127;
  const bounds = mathVisualBounds[activity.kind];
  const labels = signed ? (id ? ["Pola awal: nilai raw unsigned", "Tambahan nonnegatif (0–15)"] : ["Initial pattern: raw unsigned value", "Nonnegative addition (0–15)"])
    : (id ? ["Kelompok kiri empat bit (desimal)", "Kelompok kanan empat bit (desimal)"] : ["Left four-bit group (decimal)", "Right four-bit group (decimal)"]);
  const yesNo = (value: boolean) => value ? (id ? "Ya" : "Yes") : (id ? "Tidak" : "No");
  return <section className={styles.visual} aria-label={id ? "Eksplorasi representasi byte" : "Byte representation exploration"}>
    <h3>{signed ? (id ? "Pola sama, interpretasi berbeda" : "Same pattern, different interpretations") : hex ? (id ? "Dua kelompok bit menjadi dua digit hex" : "Two bit groups become two hex digits") : (id ? "Aktifkan bobot biner" : "Activate binary weights")}</h3>
    <p>{activity.instruction[locale]}</p>
    <p>{id ? "Lebar selalu delapan bit. Posisi 0 di paling kanan, posisi 7 di paling kiri. Tekan tombol bit dengan klik, Enter atau Space; angka pada kontrol kelompok adalah desimal." : "Width is always eight bits. Position 0 is rightmost; position 7 is leftmost. Toggle a bit by click, Enter or Space; group-control numbers are decimal."}</p>
    <div className={styles.controls}>{labels.map((label, index) => <label key={index}>{label}<input type="number" min={bounds[index][0]} max={bounds[index][1]} step={1} value={value[index]} onChange={(event) => {
      if (!event.target.value.trim()) return;
      const number = Number(event.target.value), [min, max] = bounds[index];
      if (Number.isInteger(number) && number >= min && number <= max) onChange(index === 0 ? [number, b] : [a, number]);
    }} /></label>)}</div>
    <div className={styles.bitGroups}>{[0, 1].map((group) => <fieldset className={styles.bitGroup} key={group}><legend>{group === 0 ? (id ? "Kiri: posisi 7–4" : "Left: positions 7–4") : (id ? "Kanan: posisi 3–0" : "Right: positions 3–0")}</legend><div className={styles.bitRow}>{Array.from({ length: 4 }, (_, index) => {
      const position = 7 - group * 4 - index;
      const weight = 2 ** position;
      const bit = Math.floor(raw / weight) % 2;
      const weightLabel = signed && position === 7 ? "128 / −128" : String(weight);
      return <Button key={position} type="button" variant="outline" aria-pressed={bit === 1}
        aria-label={id ? `Bit posisi ${position}, nilai ${bit}, bobot unsigned ${weight}${signed && position === 7 ? ", bobot signed −128" : ""}` : `Bit position ${position}, value ${bit}, unsigned weight ${weight}${signed && position === 7 ? ", signed weight −128" : ""}`}
        onClick={() => { const next = raw + (bit === 0 ? weight : -weight); onChange(signed ? [next, b] : [Math.floor(next / 16), next % 16]); }}><strong>b{position}={bit}</strong><small>{weightLabel}</small></Button>;
    })}</div></fieldset>)}</div>
    <p className={styles.result} aria-live="polite">{pattern}₂ = {raw} unsigned{hex ? ` = ${hexPattern}₁₆` : ""}{signed && <>; signed = {decoded}; +{b} → {stored.toString(2).padStart(8, "0")}₂, unsigned {stored}, signed {storedSigned}; {id ? "overflow unsigned/signed" : "unsigned/signed overflow"}: {yesNo(rawSum > 255)} / {yesNo(signedOverflow)}</>}</p>
    {hex ? <>
      <p>A=10, B=11, C=12, D=13, E=14, F=15. {id ? "Setiap digit setara empat bit; notasi ini tidak mengenkripsi data." : "Each digit equals four bits; this notation does not encrypt data."}</p>
      <table><caption>{id ? "Nilai tempat kedua kelompok" : "Place values of both groups"}</caption><thead><tr><th scope="col">{id ? "Kelompok / bit" : "Group / bits"}</th><th scope="col">{id ? "Digit hex (nilai)" : "Hex digit (value)"}</th><th scope="col">{id ? "Kontribusi desimal" : "Decimal contribution"}</th></tr></thead><tbody><tr><th scope="row">{id ? "Kiri" : "Left"}: {pattern.slice(0, 4)}</th><td>{hexPattern[0]} ({a})</td><td>{a} × 16 = {a * 16}</td></tr><tr><th scope="row">{id ? "Kanan" : "Right"}: {pattern.slice(4)}</th><td>{hexPattern[1]} ({b})</td><td>{b} × 1 = {b}</td></tr><tr><th scope="row">Total</th><td>{hexPattern}₁₆</td><td>{raw}</td></tr></tbody></table>
    </> : <table><caption>{signed ? (id ? "Bobot two's complement pola awal; bit tertinggi berbobot negatif" : "Initial two's-complement weights; the highest bit has negative weight") : (id ? "Bobot unsigned dan kontribusi setiap posisi" : "Unsigned weights and each position's contribution")}</caption><thead><tr><th scope="col">{id ? "Posisi" : "Position"}</th><th scope="col">{id ? "Bit × bobot" : "Bit × weight"}</th><th scope="col">{id ? "Kontribusi" : "Contribution"}</th></tr></thead><tbody>{Array.from({ length: 8 }, (_, index) => {
      const position = 7 - index, bit = Number(pattern[index]);
      const weight = signed && position === 7 ? -128 : 2 ** position;
      return <tr key={position}><th scope="row">{position}</th><td>{bit} × ({weight})</td><td>{bit * weight}</td></tr>;
    })}<tr><th scope="row">Total</th><td>{signed ? (id ? "Signed delapan bit" : "Signed eight-bit") : (id ? "Unsigned delapan bit" : "Unsigned eight-bit")}</td><td>{signed ? decoded : raw}</td></tr></tbody></table>}
    {signed && <table><caption>{id ? "Hasil matematika dan penyimpanan wrap dipisahkan" : "Mathematical and wrapped-storage results kept separate"}</caption><thead><tr><th scope="col">{id ? "Besaran" : "Quantity"}</th><th scope="col">{id ? "Nilai" : "Value"}</th></tr></thead><tbody>
      <tr><th scope="row">{id ? "Jumlah matematika unsigned" : "Unsigned mathematical sum"}</th><td>{raw} + {b} = {rawSum}</td></tr><tr><th scope="row">{id ? "Jumlah matematika signed" : "Signed mathematical sum"}</th><td>({decoded}) + {b} = {signedSum}</td></tr>
      <tr><th scope="row">{id ? "Raw low-eight-bit (sisa pembagian 256)" : "Raw low eight bits (remainder after division by 256)"}</th><td>{stored}: {stored.toString(2).padStart(8, "0")}₂</td></tr><tr><th scope="row">{id ? "Interpretasi signed hasil simpan" : "Stored result's signed interpretation"}</th><td>{storedSigned}</td></tr>
      <tr><th scope="row">{id ? "Unsigned di luar 0…255 / carry" : "Unsigned outside 0…255 / carry"}</th><td>{yesNo(rawSum > 255)}</td></tr><tr><th scope="row">{id ? "Signed di luar −128…127" : "Signed outside −128…127"}</th><td>{yesNo(signedOverflow)}</td></tr>
    </tbody></table>}
    <p className={styles.muted}>{signed ? (id ? "Model menyimpan sisa pembagian 256 untuk tambahan nonnegatif 0–15. Ini pilihan model, bukan klaim semua bahasa/API wrap saat overflow. Signedness mengubah arti bit, bukan pola bitnya." : "The model stores the remainder after division by 256 for nonnegative additions 0–15. This is a model choice, not a claim that all languages/APIs wrap on overflow. Signedness changes the meaning, not the pattern.") : (id ? "Delapan bit memberi 256 pola unsigned dengan nilai 0…255. Nol awal mempertahankan lebar; kelompok empat bit di kontrol bernilai 0…15. Data fiktif untuk belajar." : "Eight bits give 256 unsigned patterns with values 0…255. Leading zeros preserve width; four-bit groups in the controls have values 0…15. Fictional learning data.")}</p>
  </section>;
}

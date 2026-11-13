"use client";
import { useLocale } from "@/lib/locale";
import { mathVisualBounds, type MathLessonContent } from "@/content/cybersecurity-math/types";
import { Button } from "./ui/button";
import styles from "./cybersecurity-math.module.css";

export function MathLogicVisual({ activity, value, onChange }: {
  activity: MathLessonContent["exploration"]; value: [number, number]; onChange: (value: [number, number]) => void;
}) {
  const { locale } = useLocale();
  const id = locale === "id";
  const [a, b] = value;
  const bitwise = activity.kind === "bitwise";
  const deMorgan = activity.kind === "de-morgan";
  const bounds = mathVisualBounds[activity.kind];
  const labels = activity.inputLabels?.map((label) => label[locale]) ?? (bitwise ? ["x (0–15)", "m: mask (0–15)"] : ["A", "B"]);
  const rows = bitwise ? [] : [0, 1].flatMap((A) => [0, 1].map((B) => ({ a: A, b: B, and: A & B, or: A | B, notA: 1 - A, notB: 1 - B })));
  const results = [
    { label: "x AND m", value: a & b }, { label: "x OR m", value: a | b }, { label: "x XOR m", value: a ^ b },
    { label: "NOT4(x)", value: 15 - a }, { label: "left1(x)", value: (a * 2) % 16 }, { label: "right1(x)", value: Math.floor(a / 2) },
  ];
  return <section className={styles.visual} aria-label={id ? "Eksplorasi logika dan bit" : "Logic and bit exploration"}>
    <h3>{bitwise ? (id ? "Operasi unsigned empat bit" : "Unsigned four-bit operations") : deMorgan ? (id ? "Bandingkan aturan pada seluruh input" : "Compare rules over all inputs") : (id ? "Empat pasangan nilai Boolean" : "Four Boolean input pairs")}</h3>
    <p>{activity.instruction[locale]}</p>
    <div className={styles.controls}>{labels.map((label, index) => <label key={index}>{label}
      {bitwise ? <input type="number" min={bounds[index][0]} max={bounds[index][1]} step={1} value={value[index]} onChange={(event) => {
        if (!event.target.value.trim()) return;
        const number = Number(event.target.value), [min, max] = bounds[index];
        if (Number.isInteger(number) && number >= min && number <= max) onChange(index === 0 ? [number, b] : [a, number]);
      }} /> : <select value={value[index]} onChange={(event) => {
        const number = Number(event.target.value);
        if (number === 0 || number === 1) onChange(index === 0 ? [number, b] : [a, number]);
      }}><option value={0}>{id ? "0 — Salah" : "0 — False"}</option><option value={1}>{id ? "1 — Benar" : "1 — True"}</option></select>}
    </label>)}</div>
    {bitwise ? <>
      <p>{id ? "Lebar empat bit, posisi 3…0 berbobot 8,4,2,1. Mask izin ini fiktif: 8 kelola, 4 baca, 2 tulis, 1 jalankan. Tombol mendukung klik, Enter dan Space." : "Four-bit width, positions 3…0 have weights 8,4,2,1. Fictional permission mask: 8 manage, 4 read, 2 write, 1 run. Buttons support click, Enter and Space."}</p>
      <div className={styles.bitGroups}>{value.map((operand, operandIndex) => <fieldset key={operandIndex} className={styles.bitGroup}><legend>{operandIndex === 0 ? "x" : "m"}: {operand.toString(2).padStart(4, "0")}₂ = {operand}</legend><div className={styles.bitRow}>{Array.from({ length: 4 }, (_, index) => {
        const position = 3 - index, weight = 2 ** position, bit = Math.floor(operand / weight) % 2;
        return <Button key={position} type="button" variant="outline" aria-pressed={bit === 1} aria-label={`${operandIndex === 0 ? "x" : "m"}, ${id ? "posisi" : "position"} ${position}, ${id ? "bobot" : "weight"} ${weight}, ${id ? "nilai" : "value"} ${bit}`} onClick={() => {
          const next = operand + (bit === 0 ? weight : -weight);
          onChange(operandIndex === 0 ? [next, b] : [a, next]);
        }}><strong>b{position}={bit}</strong><small>{weight}</small></Button>;
      })}</div></fieldset>)}</div>
      <p className={styles.result} aria-live="polite">AND={a & b}; OR={a | b}; XOR={a ^ b}; NOT4(x)={15 - a}; left1(x)={(a * 2) % 16}; right1(x)={Math.floor(a / 2)}; any={Number((a & b) !== 0)}, all={Number((a & b) === b)}</p>
      <table className={styles.logicTable}><caption>{id ? "Tabel posisi sejajar; semua hasil memakai empat bit" : "Aligned positions; every result uses four bits"}</caption><thead><tr><th scope="col">{id ? "Posisi" : "Position"}</th><th scope="col">x</th><th scope="col">m</th><th scope="col">AND</th><th scope="col">OR</th><th scope="col">XOR</th></tr></thead><tbody>{Array.from({ length: 4 }, (_, index) => {
        const position = 3 - index, x = Math.floor(a / 2 ** position) % 2, m = Math.floor(b / 2 ** position) % 2;
        return <tr key={position}><th scope="row">{position}</th><td>{x}</td><td>{m}</td><td>{x & m}</td><td>{x | m}</td><td>{x ^ m}</td></tr>;
      })}</tbody></table>
      <table><caption>{id ? "Pola dan nilai hasil, unsigned empat bit" : "Result patterns and values, unsigned four bits"}</caption><thead><tr><th scope="col">{id ? "Operasi" : "Operation"}</th><th scope="col">{id ? "Biner" : "Binary"}</th><th scope="col">{id ? "Desimal" : "Decimal"}</th></tr></thead><tbody>{results.map((result) => <tr key={result.label}><th scope="row">{result.label}</th><td>{result.value.toString(2).padStart(4, "0")}</td><td>{result.value}</td></tr>)}</tbody></table>
      <p>{id ? `Any: (x AND m)≠0 → ${Number((a & b) !== 0)}. All: (x AND m)=m → ${Number((a & b) === b)}. Untuk m=0, any salah dan all benar karena tidak ada bit diminta.` : `Any: (x AND m)≠0 → ${Number((a & b) !== 0)}. All: (x AND m)=m → ${Number((a & b) === b)}. For m=0, any is false and all true because no bits are requested.`}</p>
      <p className={styles.muted}>{id ? "NOT4 membalik empat bit. Shift berjarak satu: kiri membuang bit keluar, kanan logis mengisi kiri dengan nol. Ini model unsigned empat bit, bukan aturan shift signed atau sistem otorisasi nyata." : "NOT4 flips four bits. Shift distance is one: left discards outgoing bits; logical right fills the left with zero. This is a four-bit unsigned model, not a signed-shift rule or real authorization system."}</p>
    </> : <>
      <p>{id ? "0=salah, 1=benar. A/B adalah kondisi, bukan jumlah. Tanda * pada tabel menandai input yang dipilih." : "0=false, 1=true. A/B are conditions, not counts. A * in the tables marks the selected input."}</p>
      <p className={styles.result} aria-live="polite">A={a}, B={b}: {deMorgan ? `NOT(A AND B)=${1 - (a & b)}; NOT A OR NOT B=${(1 - a) | (1 - b)}; NOT(A OR B)=${1 - (a | b)}; NOT A AND NOT B=${(1 - a) & (1 - b)}` : `AND=${a & b}; OR=${a | b}; NOT A=${1 - a}; NOT B=${1 - b}`}</p>
      {deMorgan ? <>
        <table className={styles.logicTable}><caption>{id ? "Hukum pertama dan rewrite yang salah" : "First law and incorrect rewrite"}</caption><thead><tr><th scope="col">A,B</th><th scope="col">NOT(A AND B)</th><th scope="col">NOT A OR NOT B</th><th scope="col">{id ? "Salah:" : "Incorrect:"} NOT A AND NOT B</th></tr></thead><tbody>{rows.map((row) => <tr key={`${row.a}-${row.b}`} data-current={row.a === a && row.b === b}><th scope="row">{row.a},{row.b}{row.a === a && row.b === b ? " *" : ""}</th><td>{1 - row.and}</td><td>{row.notA | row.notB}</td><td>{row.notA & row.notB}</td></tr>)}</tbody></table>
        <table className={styles.logicTable}><caption>{id ? "Hukum kedua: semua baris setara" : "Second law: equal on every row"}</caption><thead><tr><th scope="col">A,B</th><th scope="col">NOT(A OR B)</th><th scope="col">NOT A AND NOT B</th></tr></thead><tbody>{rows.map((row) => <tr key={`${row.a}-${row.b}`} data-current={row.a === a && row.b === b}><th scope="row">{row.a},{row.b}{row.a === a && row.b === b ? " *" : ""}</th><td>{1 - row.or}</td><td>{row.notA & row.notB}</td></tr>)}</tbody></table>
        <p className={styles.muted}>{id ? "Satu baris berbeda membantah kesetaraan. Untuk dua input Boolean, kecocokan seluruh empat baris membuktikan identitas di domain ini; kondisi fiktif bukan verifikasi akun/perangkat nyata." : "One differing row refutes equivalence. For two Boolean inputs, agreement on all four rows establishes the identity on this domain; fictional conditions verify no real account/device."}</p>
      </> : <table className={styles.logicTable}><caption>{id ? "Seluruh pasangan input dan operasi Boolean" : "Every input pair and Boolean operation"}</caption><thead><tr><th scope="col">A,B</th><th scope="col">AND</th><th scope="col">OR</th><th scope="col">NOT A</th><th scope="col">NOT B</th></tr></thead><tbody>{rows.map((row) => <tr key={`${row.a}-${row.b}`} data-current={row.a === a && row.b === b}><th scope="row">{row.a},{row.b}{row.a === a && row.b === b ? " *" : ""}</th><td>{row.and}</td><td>{row.or}</td><td>{row.notA}</td><td>{row.notB}</td></tr>)}</tbody></table>}
    </>}
  </section>;
}

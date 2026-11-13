"use client";
import { useLocale } from "@/lib/locale";
import type { MathLessonContent } from "@/content/cybersecurity-math/types";
import { Button } from "./ui/button";
import styles from "./cybersecurity-math.module.css";

const universe = ["r1", "r2", "r3", "r4"];
const members = (mask: number) => universe.filter((_, index) => (mask & 2 ** index) !== 0);
const setText = (values: string[]) => values.length ? `{${values.join(", ")}}` : "∅";

export function MathSetsVisual({ activity, value, onChange }: {
  activity: MathLessonContent["exploration"]; value: [number, number]; onChange: (value: [number, number]) => void;
}) {
  const { locale } = useLocale();
  const id = locale === "id";
  const [a, b] = value;
  const yesNo = (value: boolean) => value ? (id ? "Ya" : "Yes") : (id ? "Tidak" : "No");
  if (activity.kind === "sets") {
    const A = members(a), B = members(b), union = members(a | b), intersection = members(a & b);
    const left = A.filter((item) => !B.includes(item)), right = B.filter((item) => !A.includes(item));
    const complement = universe.filter((item) => !A.includes(item));
    return <section className={styles.visual} aria-label={id ? "Himpunan resource" : "Resource sets"}>
      <h3>{id ? "Pilih anggota, lihat operasi himpunan" : "Select members, see set operations"}</h3><p>{activity.instruction[locale]}</p>
      <p>U={setText(universe)}. {id ? "r1=log, r2=backup, r3=report, r4=settings. Tombol 1 berarti anggota, 0 bukan anggota; tiap label unik." : "r1=log, r2=backup, r3=report, r4=settings. Button 1 means member, 0 nonmember; each label is distinct."}</p>
      <div className={styles.bitGroups}>{value.map((mask, group) => <fieldset className={styles.bitGroup} key={group}><legend>{group === 0 ? "A" : "B"}</legend><div className={styles.bitRow}>{universe.map((item, index) => {
        const included = (mask & 2 ** index) !== 0;
        return <Button type="button" variant="outline" key={item} aria-pressed={included} aria-label={`${group === 0 ? "A" : "B"}, ${item}, ${id ? "anggota" : "member"} ${Number(included)}`} onClick={() => { const next = mask ^ 2 ** index; onChange(group === 0 ? [next, b] : [a, next]); }}>{item}={Number(included)}</Button>;
      })}</div></fieldset>)}</div>
      <svg viewBox="0 0 400 230" width="100%" aria-hidden="true"><rect x="5" y="5" width="390" height="220" rx="8" fill="none" stroke="var(--border)" /><text x="16" y="25" fill="var(--ink)">U</text><circle cx="150" cy="110" r="75" fill="var(--mint-soft)" stroke="var(--ink)" /><circle cx="250" cy="110" r="75" fill="none" stroke="var(--ink)" /><text x="115" y="65" fill="var(--ink)">A</text><text x="275" y="65" fill="var(--ink)">B</text><text x="115" y="120" textAnchor="middle" fill="var(--ink)">{left.length}</text><text x="200" y="120" textAnchor="middle" fill="var(--ink)">{intersection.length}</text><text x="285" y="120" textAnchor="middle" fill="var(--ink)">{right.length}</text><text x="200" y="210" textAnchor="middle" fill="var(--ink)">{id ? "Di luar keduanya" : "Outside both"}: {universe.length - union.length}</text></svg>
      <p className={styles.muted}>{id ? "Diagram skematis: angka menyebut banyak anggota tiap daerah; luas lingkaran bukan skala jumlah." : "Schematic diagram: numbers count each region's members; circle areas are not cardinality scales."}</p>
      <p className={styles.result} aria-live="polite">A={setText(A)}; B={setText(B)}; |A∪B|={union.length}; |A∩B|={intersection.length}; A⊆B: {yesNo(A.every((item) => B.includes(item)))}</p>
      <table><caption>{id ? "Anggota hasil yang setara dengan diagram" : "Result members equivalent to the diagram"}</caption><thead><tr><th scope="col">{id ? "Operasi" : "Operation"}</th><th scope="col">{id ? "Anggota" : "Members"}</th><th scope="col">{id ? "Ukuran" : "Size"}</th></tr></thead><tbody>{[{ label: "A∪B", values: union }, { label: "A∩B", values: intersection }, { label: "A∖B", values: left }, { label: "B∖A", values: right }, { label: "Aᶜ=U∖A", values: complement }].map((row) => <tr key={row.label}><th scope="row">{row.label}</th><td>{setText(row.values)}</td><td>{row.values.length}</td></tr>)}</tbody></table>
      <p className={styles.muted}>{id ? "Jika A kosong, A⊆B benar. Ini tidak berarti ∅ otomatis anggota B. Resource dan daftar review hanya data fiktif." : "If A is empty, A⊆B is true. This does not automatically make ∅ a member of B. Resources and review lists are fictional."}</p>
    </section>;
  }
  if (activity.kind === "relation") {
    const roles = ["viewer", "editor"], resources = ["log", "backup"];
    const pairs = roles.flatMap((role, row) => resources.filter((_, column) => (value[row] & 2 ** column) !== 0).map((resource) => `(${role},${resource})`));
    const totalFunction = value.every((mask) => mask === 1 || mask === 2);
    return <section className={styles.visual} aria-label={id ? "Pasangan dan relasi" : "Pairs and relations"}><h3>{id ? "Pilih relasi di dalam Cartesian product" : "Select a relation within the Cartesian product"}</h3><p>{activity.instruction[locale]}</p><p>D={setText(roles)}, C={setText(resources)}. {id ? "Semua empat sel adalah D×C; hanya sel bernilai 1 masuk R. Tombol bisa diubah dengan Enter/Space." : "All four cells form D×C; only cells marked 1 belong to R. Buttons support Enter/Space."}</p>
      <table><caption>{id ? "Urutan pasangan: role dahulu, resource kedua" : "Pair order: role first, resource second"}</caption><thead><tr><th scope="col">D → C</th>{resources.map((resource) => <th scope="col" key={resource}>{resource}</th>)}</tr></thead><tbody>{roles.map((role, row) => <tr key={role}><th scope="row">{role}</th>{resources.map((resource, column) => { const selected = (value[row] & 2 ** column) !== 0; return <td key={resource}><Button type="button" variant="outline" aria-pressed={selected} aria-label={`(${role},${resource}), ${id ? "anggota R" : "member of R"} ${Number(selected)}`} onClick={() => { const next = value[row] ^ 2 ** column; onChange(row === 0 ? [next, b] : [a, next]); }}>{Number(selected)}</Button></td>; })}</tr>)}</tbody></table>
      <p className={styles.result} aria-live="polite">|D×C|=4; |R|={pairs.length}; {id ? "fungsi total D→C" : "total function D→C"}: {yesNo(totalFunction)}</p><p>R={setText(pairs)}</p><p className={styles.muted}>{id ? "Tepat satu pilihan tiap baris diperlukan untuk fungsi total; relasi umum boleh nol atau beberapa. Grid ini bukan pengaturan izin sistem nyata." : "A total function needs exactly one selection per row; general relations allow zero or several. This grid configures no real system permissions."}</p>
    </section>;
  }
  const targets = [Math.floor(a / 3), a % 3], names = ["x", "y", "z"], inputs = ["u", "v"];
  const codomain = names.slice(0, b), chosen = targets.map((index) => names[index]);
  const valid = targets.every((index) => index < b), injective = targets[0] !== targets[1];
  const onto = codomain.every((name) => chosen.includes(name));
  return <section className={styles.visual} aria-label={id ? "Fungsi dan bijeksi" : "Functions and bijections"}><h3>{id ? "Ubah panah atau codomain" : "Change arrows or the codomain"}</h3><p>{activity.instruction[locale]}</p><p>D={"{u,v}"}; C={setText(codomain)}. {id ? "Domain tetap. Pilihan z di luar C diberi peringatan, bukan mengubah C otomatis." : "The domain is fixed. Choosing z outside C raises a warning rather than automatically changing C."}</p>
    <div className={styles.controls}>{inputs.map((input, row) => <label key={input}>{id ? "Target untuk" : "Target for"} {input}<select value={targets[row]} onChange={(event) => { const next = Number(event.target.value); if (Number.isInteger(next) && next >= 0 && next <= 2) onChange([row === 0 ? next * 3 + targets[1] : targets[0] * 3 + next, b]); }}>{names.map((name, index) => <option key={name} value={index}>{name}{index >= b ? (id ? " (di luar C)" : " (outside C)") : ""}</option>)}</select></label>)}<label>Codomain C<select value={b} onChange={(event) => { const next = Number(event.target.value); if (next === 2 || next === 3) onChange([a, next]); }}><option value={2}>{"{x,y}"}</option><option value={3}>{"{x,y,z}"}</option></select></label></div>
    {valid && <svg viewBox="0 0 400 245" width="100%" aria-hidden="true"><defs><marker id="math-mapping-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--ink)" /></marker></defs><text x="70" y="22" textAnchor="middle" fill="var(--ink)">D</text><text x="330" y="22" textAnchor="middle" fill="var(--ink)">C</text>{inputs.map((input, row) => <g key={input}><line x1="90" y1={80 + row * 90} x2="309" y2={60 + targets[row] * 70} stroke="var(--ink)" strokeWidth="2" markerEnd="url(#math-mapping-arrow)" /><circle cx="70" cy={80 + row * 90} r="18" fill="var(--surface)" stroke="var(--ink)" /><text x="70" y={85 + row * 90} textAnchor="middle" fill="var(--ink)">{input}</text></g>)}{codomain.map((name, index) => <g key={name}><circle cx="330" cy={60 + index * 70} r="18" fill="var(--surface)" stroke="var(--ink)" /><text x="330" y={65 + index * 70} textAnchor="middle" fill="var(--ink)">{name}</text></g>)}</svg>}
    <p className={styles.result} aria-live="polite">{valid ? `${id ? "Fungsi sah" : "Valid function"}; ${id ? "injektif" : "injective"}: ${yesNo(injective)}; onto C: ${yesNo(onto)}; ${id ? "bijektif" : "bijective"}: ${yesNo(injective && onto)}; ${id ? "belum tercapai" : "unreached"}: ${codomain.filter((name) => !chosen.includes(name)).length}` : (id ? "Target di luar C: bukan fungsi D→C yang sah. Tidak memperluas codomain secara otomatis." : "Target outside C: not a valid function D→C. The codomain is not expanded automatically.")}</p>
    <table><caption>{id ? "Daftar panah dan validitas tujuan" : "Arrows and target validity"}</caption><thead><tr><th scope="col">{id ? "Input D" : "D input"}</th><th scope="col">{id ? "Target dipilih" : "Chosen target"}</th><th scope="col">{id ? "Dalam C?" : "In C?"}</th></tr></thead><tbody>{inputs.map((input, row) => <tr key={input}><th scope="row">{input}</th><td>{chosen[row]}</td><td>{yesNo(targets[row] < b)}</td></tr>)}</tbody></table><p>{valid ? `Image=${setText([...new Set(chosen)])}; ${id ? "invers pada seluruh C" : "inverse on all C"}: ${yesNo(injective && onto)}` : (id ? "Perbaiki target atau nyatakan codomain yang berbeda sebelum menilai sifat fungsi." : "Correct the target or declare a different codomain before classifying the function.")}</p><p className={styles.muted}>{id ? "Dua input dan maksimal tiga tujuan membuat seluruh mapping dapat diperiksa. Ini model label fiktif, bukan penetapan identitas/izin nyata." : "Two inputs and at most three targets make the whole mapping inspectable. This fictional label model assigns no real identities/permissions."}</p>
  </section>;
}

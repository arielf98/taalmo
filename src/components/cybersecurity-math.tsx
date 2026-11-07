"use client";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { mathModuleTasks, mathModuleCheckDescriptions, mathModules, mathLevels, mathLessonHref, mathPathHref, mathQuestions, mathRecordKey, mathTitle } from "@/content/cybersecurity-math/catalog";
import { mathAttemptComplete, mathLessonPassed, mathLessonUnlocked, mathModulePassed, mathQuestionCorrect, mathSummary, newMathAttempt } from "@/lib/cybersecurity-math";
import { useMathProgress } from "@/lib/cybersecurity-math-progress";
import { Badge, Workspace } from "./shell";
import { Button } from "./ui/button";
import { MathQuestionCard } from "./cybersecurity-math-activities";
import { MathStorageNotice } from "./cybersecurity-math-player";
import styles from "./cybersecurity-math.module.css";

export function CybersecurityMathCourseCard() {
  const { locale } = useLocale();
  const { progress } = useMathProgress();
  const summary = mathSummary(progress);
  return <section className={`card ${styles.card}`} lang={locale}>
    <Badge><ShieldCheck size={14} /> {locale === "id" ? "MATEMATIKA × CYBERSECURITY" : "MATH × CYBERSECURITY"}</Badge>
    <h2>{mathTitle[locale]}</h2>
    <p>{locale === "id" ? "Mulai dari menghitung. Bangun intuisi melalui soal kecil, visual yang bisa diubah, dan penjelasan kesalahan, lalu lanjut ke logika, peluang, dan matematika kriptografi." : "Start with counting. Build intuition through small problems, visuals you can change, and explanations of mistakes, then progress to logic, probability, and cryptographic mathematics."}</p>
    <p>{locale === "id" ? `${summary.completed} / ${summary.total} lesson terbit selesai · ${summary.target} lesson direncanakan dalam 10 level` : `${summary.completed} / ${summary.total} published lessons complete · ${summary.target} planned lessons across 10 levels`}</p>
    <div className={styles.actions}>
      <Button asChild><Link href={mathPathHref}>{locale === "id" ? "Jelajahi jalur" : "Explore path"}<ArrowRight size={16} /></Link></Button>
      {summary.resume && <Link className={styles.link} href={mathLessonHref(summary.resume.id)}>{locale === "id" ? "Mulai / lanjutkan: " : "Start / continue: "}{summary.resume.title[locale]}</Link>}
    </div>
  </section>;
}

function MathModuleCheckpoint({ id }: { id: string }) {
  const { locale } = useLocale();
  const { progress, update, finish, restart, task } = useMathProgress();
  const module = mathModules.find((item) => item.id === id)!;
  const record = progress.records[mathRecordKey(id)] ?? newMathAttempt(id);
  const unlocked = module.lessons.every((lesson) => mathLessonPassed(lesson.id, progress));
  const passed = mathModulePassed(id, progress);
  const questions = mathQuestions(id, record.attempt);
  const draft = progress.tasks[id] ?? { text: "", ready: false };
  const nextModule = mathModules[mathModules.findIndex((item) => item.id === id) + 1];
  const nextLesson = nextModule?.lessons.find((lesson) => lesson.content);
  return <section className={`card ${styles.card}`} id={`checkpoint-${id}`}>
    <Badge>{locale === "id" ? "CHECKPOINT MODUL" : "MODULE CHECKPOINT"} · {id.toUpperCase()}</Badge>
    <h2>{module.title[locale]}</h2>
    <p>{mathModuleCheckDescriptions[id]?.[locale]}</p>
    {!unlocked && <p className={styles.notice}>{locale === "id" ? "Checkpoint terbuka setelah tiga lesson modul ini selesai. Teori lesson berikutnya tetap bisa dibaca sebagai preview." : "This checkpoint opens after all three lessons in this module are complete. You can still read later lesson theory in preview mode."}</p>}
    {unlocked && <>
      <p className={styles.muted}>{locale === "id" ? `Set ${record.attempt % 2 + 1} · Percobaan ${record.attempt + 1}` : `Set ${record.attempt % 2 + 1} · Attempt ${record.attempt + 1}`}
        {record.seenSets.includes(record.attempt % 2) && (locale === "id" ? " · Soal pernah dilihat" : " · Previously seen questions")}
        {record.helped && (locale === "id" ? " · Riwayat bantuan tersimpan" : " · Assistance history saved")}</p>
      {questions.map((question) => <MathQuestionCard key={`${question.id}-${record.attempt}`} question={question} answer={record.answers[question.id]} onAnswer={(value) => update(id, { answers: { [question.id]: value }, viewedSets: [...new Set([...record.viewedSets, record.attempt % 2])] })} />)}
      <div className={styles.actions}>
        <Button disabled={!mathAttemptComplete(id, record)} onClick={() => finish(id)}>{locale === "id" ? "Selesaikan checkpoint modul" : "Complete module checkpoint"}</Button>
        <Button variant="outline" onClick={() => update(id, { solutionOpen: true, helped: true })}>{locale === "id" ? "Pelajari solusi" : "Study solutions"}</Button>
        <Button variant="ghost" onClick={() => restart(id)}>{locale === "id" ? "Coba set lain" : "Try the other set"}</Button>
      </div>
      {record.solutionOpen && <div className={styles.notice}><p>{locale === "id" ? "Solusi dibuka; pilih Coba set lain sebelum menyelesaikan checkpoint." : "Solutions are open; choose Try the other set before completing the checkpoint."}</p><ol>{questions.map((question) => <li key={question.id}>{question.solution[locale]}</li>)}</ol></div>}
      <p aria-live="polite">{locale === "id" ? `Jawaban benar: ${questions.filter((question) => mathQuestionCorrect(question, record)).length} / ${questions.length}.` : `Correct answers: ${questions.filter((question) => mathQuestionCorrect(question, record)).length} / ${questions.length}.`}</p>
    </>}
    {passed && <><p className={styles.feedback} role="status">{locale === "id" ? "Checkpoint modul selesai. Kelulusan formatif tetap tersimpan saat kamu mengulang. Assessment L0 menunggu empat modul lengkap." : "Module checkpoint complete. Formative completion stays saved when you retake it. The L0 assessment awaits all four complete modules."}</p>
      {nextLesson ? <Link className={styles.link} href={mathLessonHref(nextLesson.id)}>{locale === "id" ? "Lanjutkan: " : "Continue: "}{nextLesson.title[locale]}</Link> : <p className={styles.muted}>{locale === "id" ? "Modul berikutnya masih direncanakan; belum ada lesson lanjutan yang dapat diluncurkan." : "The next module is still planned; there are no further published lessons to launch."}</p>}
    </>}
    <h3>{locale === "id" ? "Task pelajar" : "Learner task"} · {module.title[locale]}</h3>
    <p>{mathModuleTasks[id]?.[locale]}</p>
    <p className={styles.muted}>{locale === "id" ? "Rubrik 10 poin: ketepatan hasil 4, langkah/alasan 3, asumsi dan batas 2, kejelasan 1. Target review manusia ≥8 tanpa miskonsepsi kritis. Task ini tidak dinilai otomatis dan tidak mengunci progres lesson." : "10-point rubric: correct results 4, steps/reasoning 3, assumptions and limits 2, clarity 1. Human-review target ≥8 without critical misconceptions. This task is not automatically graded and does not lock lesson progress."}</p>
    {passed ? <>
      <label className={styles.writing}>{locale === "id" ? "Draf task (maksimal 20.000 karakter)" : "Task draft (up to 20,000 characters)"}<textarea maxLength={20000} value={draft.text} onChange={(event) => task(id, event.target.value, false)} /></label>
      <label><input type="checkbox" checked={draft.ready} disabled={!draft.text.trim()} onChange={(event) => task(id, draft.text, event.target.checked)} /> {locale === "id" ? "Saya sudah mengecek rubrik; siap direview manusia" : "I have checked the rubric; ready for human review"}</label>
      <p role="status">{draft.ready ? (locale === "id" ? "Siap direview — belum direview independen." : "Ready for review — not independently reviewed.") : draft.text.trim() ? (locale === "id" ? "Status: draf, belum dinilai." : "Status: draft, not graded.") : (locale === "id" ? "Status: belum dikerjakan." : "Status: not started.")}</p>
    </> : <p className={styles.muted}>{locale === "id" ? "Baca task kapan saja. Penyimpanan draf modul terbuka setelah checkpoint modul lulus; kamu juga boleh menulis catatan di luar aplikasi." : "Read the task at any time. Saving a module draft opens after its checkpoint is passed; you may also keep notes outside the app."}</p>}
  </section>;
}

export function CybersecurityMathPath() {
  const { locale } = useLocale();
  const { progress } = useMathProgress();
  const summary = mathSummary(progress);
  return <Workspace>
    <div className={styles.page} lang={locale}>
      <div className="breadcrumb"><Link href="/dashboard">{locale === "id" ? "Pembelajaran saya" : "My learning"}</Link> / {mathTitle[locale]}</div>
      <div className="page-heading"><div><Badge>{locale === "id" ? "DARI NOL KE EXPERT TRACK" : "FROM ZERO TO THE EXPERT TRACK"}</Badge><h1>{mathTitle[locale]}</h1><p>{locale === "id" ? "Belajar matematika lewat mencoba, mengamati, dan menjelaskan mengapa. Tidak perlu sudah bisa coding atau matematika SMA." : "Learn mathematics by trying, observing, and explaining why. No coding or high-school math background required."}</p></div></div>
      <CybersecurityMathCourseCard />
      <MathStorageNotice />
      <section className={`card ${styles.card}`} aria-label={locale === "id" ? "Progres matematika" : "Math progress"}>
        <div className={styles.stats}>
          <div className={styles.stat}><strong>{summary.completed} / {summary.total}</strong><span>{locale === "id" ? "Lesson terbit selesai" : "Published lessons complete"}</span></div>
          <div className={styles.stat}><strong>{summary.target - summary.total}</strong><span>{locale === "id" ? "Lesson masih direncanakan" : "Lessons still planned"}</span></div>
          <div className={styles.stat}><strong>{summary.percent}%</strong><span>{locale === "id" ? "Progres materi yang sudah terbit" : "Progress through published material"}</span></div>
        </div>
        <p>{locale === "id" ? `Cara belajar: prediksi → eksplorasi visual → penjelasan → latihan dan hint → penerapan → checkpoint. ${summary.total} lesson sudah tersedia. Materi lanjutan diterbitkan per modul; 120 adalah target, bukan jumlah yang sudah siap.` : `Learning loop: predict → explore a visual → understand → practice and hints → apply → checkpoint. ${summary.total} lessons are available. Advanced content publishes module by module; 120 is the target, not the available count.`}</p>
        <a className={styles.link} href="#checkpoint-cm-l0m01">{locale === "id" ? "Buka checkpoint dan task modul" : "Go to module checkpoints and tasks"}</a>
      </section>
      <section className={styles.levels} aria-label={locale === "id" ? "Peta kurikulum" : "Curriculum map"}>
        {mathLevels.map((level, levelIndex) => <details key={level.id} className={styles.level} open={levelIndex === 0}>
          <summary>L{levelIndex} · {level.title[locale]} · {level.modules.flatMap((module) => module.lessons).filter((lesson) => lesson.content).length} / 12 {locale === "id" ? "terbit" : "published"}</summary>
          <p>{level.context[locale]}</p>
          <p className={styles.muted}>{levelIndex === 0 ? (locale === "id" ? "Mulai dari nol. Pelajari jumlah kejadian sebelum menilai pola keamanannya." : "Start from zero. Understand event counts before judging their security meaning.") : (locale === "id" ? `Prasyarat progres resmi: assessment L${levelIndex - 1} dan modul sebelumnya. Level ini masih direncanakan.` : `Official progress requires the L${levelIndex - 1} assessment and preceding modules. This level is still planned.`)}</p>
          {level.modules.map((module, moduleIndex) => <section key={module.id} className={styles.module}>
            <h3>{moduleIndex + 1}. {module.title[locale]}</h3>
            <p className={styles.muted}>{module.id.toUpperCase()} · {module.checks ? (mathModulePassed(module.id, progress) ? (locale === "id" ? "Checkpoint modul selesai" : "Module checkpoint complete") : (locale === "id" ? "Checkpoint setelah tiga lesson" : "Checkpoint after three lessons")) : (locale === "id" ? "Modul dan task direncanakan" : "Module and task planned")}</p>
            <ol>{module.lessons.map((lesson) => <li key={lesson.id}>
              {lesson.content ? <Link href={mathLessonHref(lesson.id)}>{lesson.title[locale]}</Link> : lesson.title[locale]}
              <span>{!lesson.content ? (locale === "id" ? "Direncanakan" : "Planned") : mathLessonPassed(lesson.id, progress) ? (locale === "id" ? "Checkpoint selesai" : "Checkpoint complete") : mathLessonUnlocked(lesson.id, progress) ? (locale === "id" ? "Tersedia" : "Available") : (locale === "id" ? "Baca preview; prasyarat belum selesai" : "Read preview; prerequisites incomplete")}</span>
            </li>)}</ol>
          </section>)}
        </details>)}
      </section>
      {mathModules.filter((module) => module.checks).map((module) => <MathModuleCheckpoint key={module.id} id={module.id} />)}
      <MathStorageNotice />
      <section className={`card ${styles.card}`}>
        <h2>{locale === "id" ? "Ke mana jalur ini menuju?" : "Where does this path lead?"}</h2>
        <p>{locale === "id" ? "Numerasi → aljabar → bit dan logika → peluang → statistik deteksi → modular → graf dan matriks → kriptografi klasik → ECC dan argumen keamanan → lattice, post-quantum, dan capstone." : "Numeracy → algebra → bits and logic → probability → detection statistics → modular arithmetic → graphs and matrices → classical cryptography → ECC and security arguments → lattices, post-quantum, and a capstone."}</p>
        <p>{locale === "id" ? "Capstone yang direncanakan: memo deteksi, worksheet kriptografi, proof sketch, telaah post-quantum, dan refleksi. Rubrik 100 poin: derivasi 25, statistik 20, konsep kriptografi 20, penalaran 20, sumber/batas 10, komunikasi 5. Target review ≥85 tanpa kesalahan kritis; pelaksanaannya belum tersedia." : "Planned capstone: a detection memo, cryptography worksheet, proof sketch, post-quantum review, and reflection. 100-point rubric: derivations 25, statistics 20, cryptographic concepts 20, reasoning 20, sources/limits 10, communication 5. Human-review target ≥85 without critical errors; this capstone is not available yet."}</p>
        <p>{locale === "id" ? "Expert track memperdalam matematika kriptografi; bukan jaminan menjadi ahli seluruh cybersecurity. Bukti dan task tertulis memerlukan review manusia; checkpoint lokal bukan sertifikasi dan platform ini belum menyediakan reviewer." : "The expert track deepens cryptographic mathematics; it does not guarantee expertise across cybersecurity. Proofs and written tasks need human review; local checkpoints are not certification, and the platform does not provide a reviewer."}</p>
        <p className={styles.muted}>{locale === "id" ? "Progres hanya di browser/perangkat ini. Menghapus storage menghapus progres. Salin catatan penting ke luar browser; perubahan serentak antartab bisa saling menimpa. Progres matematika terpisah dari Database Engineering." : "Progress stays in this browser/device. Clearing storage deletes progress. Copy important notes outside the browser; simultaneous changes across tabs can overwrite each other. Math progress is separate from Database Engineering."}</p>
      </section>
    </div>
  </Workspace>;
}

"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { mathLessonHref, mathLessons, mathLevels, mathModules, mathPathHref, mathQuestions, mathRecordKey, mathTitle, type MathLesson } from "@/content/cybersecurity-math/catalog";
import { useLocale } from "@/lib/locale";
import { mathAttemptComplete, mathLessonPassed, mathLessonUnlocked, mathLevelPassed, mathModulePassed, mathModuleUnlocked, newMathAttempt, type MathRecord } from "@/lib/cybersecurity-math";
import { useMathProgress } from "@/lib/cybersecurity-math-progress";
import { Badge, Workspace } from "./shell";
import { Button } from "./ui/button";
import { MathQuestionCard, MathVisual } from "./cybersecurity-math-activities";
import styles from "./cybersecurity-math.module.css";

export function MathStorageNotice() {
  const { locale } = useLocale();
  const { storageFailed } = useMathProgress();
  return storageFailed ? <p role="alert" className={styles.notice}>{locale === "id" ? "Browser tidak dapat menyimpan progres. Pekerjaan masih tersedia di tab ini; jangan tutup/refresh tab. Aktifkan penyimpanan dan lakukan perubahan untuk mencoba menyimpan lagi." : "Your browser could not save progress. Your work is still available in this tab; do not close or refresh it. Enable storage and make a change to try saving again."}</p> : null;
}

export function CybersecurityMathPlayer({ lesson }: { lesson: MathLesson }) {
  const { locale } = useLocale();
  const { progress, update, finish, restart } = useMathProgress();
  const [preview, setPreview] = useState(() => newMathAttempt(lesson.id));
  const content = lesson.content;
  if (!content) return null;
  const unlocked = mathLessonUnlocked(lesson.id, progress);
  const record = unlocked ? progress.records[mathRecordKey(lesson.id)] ?? newMathAttempt(lesson.id) : preview;
  const patch = (changes: Partial<MathRecord>) => {
    if (unlocked) update(lesson.id, changes);
    else setPreview((current) => ({ ...current, ...changes, answers: { ...current.answers, ...changes.answers } }));
  };
  const navigate = (step: number) => patch({ step, ...(step === 5 ? { viewedSets: [...new Set([...record.viewedSets, record.attempt % 2])] } : {}) });
  const retakeCheckpoint = () => {
    const attempt = (record.attempt + 1) % 1000000;
    const nextRecord = { ...record, attempt, solutionOpen: false, seenSets: [...record.viewedSets], viewedSets: record.step === 5 ? [...new Set([...record.viewedSets, attempt % 2])] : [...record.viewedSets], answers: { ...record.answers } };
    for (const item of [...mathQuestions(lesson.id, 0), ...mathQuestions(lesson.id, 1)]) nextRecord.answers[item.id] = undefined;
    return nextRecord;
  };
  const question = (item: typeof content.prediction) => <MathQuestionCard key={`${unlocked ? "official" : "preview"}-${item.id}-${record.attempt}`}
    question={item} answer={record.answers[item.id]} onAnswer={(value) => patch({ answers: { [item.id]: value } })} />;
  const steps = locale === "id" ? ["Coba dulu", "Eksplorasi", "Pahami", "Latihan", "Terapkan", "Checkpoint"] : ["Predict", "Explore", "Understand", "Practice", "Apply", "Checkpoint"];
  const checkpoint = mathQuestions(lesson.id, record.attempt);
  const completed = mathLessonPassed(lesson.id, progress);
  const targetReached = content.exploration.target.every((value, index) => value === record.exploration[index]);
  const previous = mathLessons[mathLessons.findIndex((item) => item.id === lesson.id) - 1];
  const next = mathLessons[mathLessons.findIndex((item) => item.id === lesson.id) + 1];
  const previousModule = mathModules[mathModules.findIndex((module) => module.id === lesson.moduleId) - 1];
  const missingModuleCheckpoint = !mathModuleUnlocked(lesson.moduleId, progress) && previousModule;
  const previousLevel = mathLevels[mathLevels.findIndex((level) => level.id === lesson.levelId) - 1];
  const missingLevelAssessment = previousLevel && !mathLevelPassed(previousLevel.id, progress);
  const nextNeedsLevel = next?.levelId !== lesson.levelId && mathModulePassed(lesson.moduleId, progress) && !mathLevelPassed(lesson.levelId, progress);
  return <Workspace>
    <div className={styles.page} lang={locale}>
      <div className="breadcrumb"><Link href={mathPathHref}>{mathTitle[locale]}</Link><span> / {lesson.moduleId.toUpperCase()}</span></div>
      <div className="page-heading"><div><Badge>{locale === "id" ? "BELAJAR BERTAHAP" : "GUIDED LEARNING"} · {lesson.levelId.replace("cm-", "").toUpperCase()}</Badge><h1>{lesson.title[locale]}</h1><p>{content.objective[locale]}</p></div></div>
      <MathStorageNotice />
      {!unlocked && <div className={styles.notice}>
        <strong>{locale === "id" ? "Mode preview: progres belum dicatat. " : "Preview mode: progress is not recorded. "}</strong>
        {locale === "id" ? "Kamu boleh membaca dan mencoba. Selesaikan prasyarat sebelum memulai percobaan resmi. Jawaban preview tidak menjadi kelulusan otomatis." : "You may read and explore. Complete the prerequisite before starting an official attempt. Preview answers do not become completion records."}
        {missingLevelAssessment ? <p><Link className={styles.link} href={`${mathPathHref}#assessment-${previousLevel.id}`}>{locale === "id" ? "Prasyarat: assessment " : "Prerequisite: assessment "}{previousLevel.title[locale]}</Link></p> : missingModuleCheckpoint ? <p><Link className={styles.link} href={`${mathPathHref}#checkpoint-${missingModuleCheckpoint.id}`}>{locale === "id" ? "Prasyarat: checkpoint modul " : "Prerequisite: module checkpoint "}{missingModuleCheckpoint.title[locale]}</Link></p> : previous?.content && <p><Link className={styles.link} href={mathLessonHref(previous.id)}>{locale === "id" ? "Prasyarat: " : "Prerequisite: "}{previous.title[locale]}</Link></p>}
      </div>}
      {completed && <p className={styles.notice}>{locale === "id" ? "Checkpoint lesson sudah selesai. Kamu boleh mengulang; kelulusan sebelumnya tetap tersimpan. Ini progres formatif, bukan sertifikasi." : "This lesson checkpoint is complete. You can retake it; the earlier completion stays saved. This is formative progress, not certification."}</p>}
      <nav className={styles.steps} aria-label={locale === "id" ? "Langkah lesson" : "Lesson steps"}>
        {steps.map((label, index) => <button key={index} aria-current={record.step === index ? "step" : undefined} onClick={() => navigate(index)}>{index + 1}. {label}</button>)}
      </nav>
      <section className={`card ${styles.card}`} aria-labelledby="math-step-title">
        <h2 id="math-step-title">{steps[record.step]}</h2>
        {record.step === 0 && <><p>{content.hook[locale]}</p><p className={styles.muted}>{locale === "id" ? "Prediksi awal tidak mengurangi nilai. Kesalahan membantu kita menemukan bagian yang perlu dijelaskan." : "Your initial prediction does not reduce your score. Mistakes help us find what needs explaining."}</p>{question(content.prediction)}</>}
        {record.step === 1 && <>
          <MathVisual activity={content.exploration} value={record.exploration} onChange={(value) => patch({ exploration: value, answers: { [content.exploration.question.id]: undefined } })} />
          {targetReached ? question(content.exploration.question) : <p className={styles.notice}>{locale === "id" ? "Atur kontrol sesuai instruksi untuk membuka pertanyaan pengamatan." : "Set the controls as instructed to open the observation question."}</p>}
        </>}
        {record.step === 2 && <>
          {content.explanation.map((paragraph, index) => <p key={index}>{paragraph[locale]}</p>)}
          <h3>{content.worked.title[locale]}</h3>
          <ol>{content.worked.steps.map((step, index) => <li key={index}>{step[locale]}</li>)}</ol>
          <p className={styles.feedback}>{content.worked.result[locale]}</p>
        </>}
        {record.step === 3 && <>
          <p>{locale === "id" ? "Kerjakan dua variasi dan satu kasus batas. Semua perlu benar; kamu boleh memperbaiki jawaban." : "Complete two variations and one edge case. All must be correct; you may revise your answers."}</p>
          {content.practice.map(question)}
          <Button variant="outline" disabled={record.hint >= 3} onClick={() => patch({ ...(record.hint === 2 ? retakeCheckpoint() : {}), hint: record.hint + 1, helped: true })}>{locale === "id" ? `Buka petunjuk ${Math.min(record.hint + 1, 3)} / 3` : `Reveal hint ${Math.min(record.hint + 1, 3)} / 3`}</Button>
          <div aria-live="polite">{content.hints.slice(0, record.hint).map((hint, index) => <p className={styles.feedback} key={index}>{index + 1}. {hint[locale]}</p>)}</div>
        </>}
        {record.step === 4 && <>
          <h3>{locale === "id" ? "Coba konteks lain" : "Try a different context"}</h3><p>{content.transfer[locale]}</p>
          <label className={styles.writing}>{locale === "id" ? "Catatan penerapan opsional (draf, tidak dinilai otomatis)" : "Optional application notes (draft, not automatically graded)"}<textarea maxLength={6000} value={record.transfer} onChange={(event) => patch({ transfer: event.target.value })} /></label>
          <p>{content.reflection[locale]}</p>
          <label className={styles.writing}>{locale === "id" ? "Refleksimu — jelaskan mengapa" : "Your reflection — explain why"}<textarea maxLength={6000} value={record.reflection} onChange={(event) => patch({ reflection: event.target.value })} /></label>
          <p className={styles.muted}>{locale === "id" ? "Rubrik: hasil tepat (4), langkah dan alasan (3), asumsi/batas (2), kejelasan (1). Target 8/10 untuk review manusia; teks terisi belum membuktikan jawaban benar." : "Rubric: correct result (4), steps and reasoning (3), assumptions/limits (2), clarity (1). Aim for 8/10 in human review; nonempty text does not prove correctness."}</p>
        </>}
        {record.step === 5 && <>
          <p>{locale === "id" ? "Jawab ketiga soal dengan benar tanpa membuka solusi pada percobaan ini. Selesaikan juga pengamatan, latihan, dan refleksi. Catatan penerapan opsional. Tidak ada batas waktu." : "Answer all three questions correctly without opening solutions in this attempt. Also complete the observation, practice, and reflection. Application notes are optional. There is no time limit."}</p>
          <p className={styles.muted}>{locale === "id" ? `Set ${record.attempt % 2 + 1} · Percobaan ${record.attempt + 1}` : `Set ${record.attempt % 2 + 1} · Attempt ${record.attempt + 1}`}
            {record.seenSets.includes(record.attempt % 2) && (locale === "id" ? " · Soal pernah dilihat; progres formatif" : " · Previously seen questions; formative progress")}
            {record.helped && (locale === "id" ? " · Riwayat bantuan tersimpan" : " · Assistance history saved")}</p>
          {checkpoint.map(question)}
          <div className={styles.actions}>
            <Button disabled={!unlocked || !mathAttemptComplete(lesson.id, record)} onClick={() => finish(lesson.id)}>{locale === "id" ? "Selesaikan checkpoint" : "Complete checkpoint"}</Button>
            <Button variant="outline" onClick={() => patch({ solutionOpen: true, helped: true })}>{locale === "id" ? "Pelajari solusi checkpoint" : "Study checkpoint solutions"}</Button>
          </div>
          {record.solutionOpen && <div className={styles.notice}>
            <p>{locale === "id" ? "Solusi sudah dibuka. Ulangi checkpoint dengan set lain untuk melanjutkan. Kamu tidak perlu mengulang catatan dan latihan; bantuan tetap tercatat." : "Solutions are open. Retake the checkpoint with the other set to continue. Your notes and practice remain; assistance stays recorded."}</p>
            <ol>{checkpoint.map((item) => <li key={item.id}>{item.solution[locale]}</li>)}</ol>
          </div>}
          <Button variant="ghost" onClick={() => patch(retakeCheckpoint())}>{locale === "id" ? "Ulangi checkpoint (set lain)" : "Retake checkpoint (other set)"}</Button>
          {!mathAttemptComplete(lesson.id, record) && <p className={styles.notice}>{locale === "id" ? "Belum lengkap: periksa pengamatan pada langkah 2, semua latihan langkah 4, refleksi langkah 5, dan tiga jawaban checkpoint. Jika solusi terbuka, mulai checkpoint set lain." : "Not complete yet: check the observation in step 2, all practice in step 4, the reflection in step 5, and all three checkpoint answers. If solutions are open, start the other checkpoint set."}</p>}
        </>}
      </section>
      <div className={styles.actions}>
        <Button variant="outline" disabled={record.step === 0} onClick={() => navigate(record.step - 1)}><ArrowLeft size={16} />{locale === "id" ? "Sebelumnya" : "Previous"}</Button>
        <Button disabled={record.step === 5} onClick={() => navigate(record.step + 1)}>{locale === "id" ? "Berikutnya" : "Next"}<ArrowRight size={16} /></Button>
        <Link href={mathPathHref} className={styles.link}>{locale === "id" ? "Kembali ke jalur dan checkpoint modul" : "Back to path and module checkpoint"}</Link>
      </div>
      {completed && (next?.content && mathLessonUnlocked(next.id, progress)
        ? <Button asChild><Link href={mathLessonHref(next.id)}>{locale === "id" ? "Lanjutkan: " : "Continue: "}{next.title[locale]}<ArrowRight size={16} /></Link></Button>
        : <Button asChild><Link href={nextNeedsLevel ? `${mathPathHref}#assessment-${lesson.levelId}` : `${mathPathHref}#checkpoint-${lesson.moduleId}`}>{nextNeedsLevel ? (locale === "id" ? "Lanjutkan ke assessment level" : "Continue to the level assessment") : (locale === "id" ? "Lanjutkan ke checkpoint modul" : "Continue to the module checkpoint")}<ArrowRight size={16} /></Link></Button>)}
      {unlocked && <Button variant="ghost" onClick={() => restart(lesson.id)}>{locale === "id" ? "Mulai ulang seluruh lesson; kelulusan tetap tersimpan" : "Restart the whole lesson; earned completion stays saved"}</Button>}
      <p className={styles.muted}>{locale === "id" ? "Progres hanya di browser dan perangkat ini. Menghapus penyimpanan menghapus progres. Simpan salinan catatan penting di luar browser; perubahan bersamaan di beberapa tab dapat saling menimpa." : "Progress stays in this browser on this device. Clearing storage deletes it. Keep important notes outside the browser; simultaneous changes in multiple tabs can overwrite each other."}</p>
    </div>
  </Workspace>;
}

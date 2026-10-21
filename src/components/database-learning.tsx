"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Check, ChevronRight } from "lucide-react";
import { Badge, Workspace } from "./shell";
import { Button } from "./ui/button";
import { Quiz } from "./quiz";
import { useProgress } from "@/lib/progress";
import {
  assessmentKey,
  assessmentQuestions,
  databaseLevels,
  databasePathHref,
  databaseVersion,
  draftLessonCount,
  lessonRecordKey,
  publishedLessons,
  publishedModules,
  type DatabaseLesson,
} from "@/content/database/catalog";
import {
  assessmentResult,
  emptyCurriculum,
  lessonPassed,
  levelPassed,
  modulePassed,
  moduleUnlocked,
} from "@/lib/curriculum";
import type { ConceptCheck } from "@/content/database/types";

export function DatabaseCourseCard() {
  const { progress } = useProgress();
  const curriculum = progress.curriculum ?? emptyCurriculum();
  const resume =
    publishedLessons.find((lesson) => lesson.id === curriculum.resume) ??
    publishedLessons.find((lesson) => !lessonPassed(lesson, curriculum)) ??
    publishedLessons[0];
  return (
    <section className="card database-course-card" lang="id">
      <Badge>JALUR BARU · POSTGRESQL</Badge>
      <h2>Database Zero to Master</h2>
      <p>
        Mulai dari model relasional, lalu bangun intuisi SQL yang menjaga
        kebenaran data. Materi jalur ini berbahasa Indonesia.
      </p>
      <p>
        {
          publishedLessons.filter((lesson) => lessonPassed(lesson, curriculum))
            .length
        }{" "}
        / {publishedLessons.length} lesson tersedia selesai · {draftLessonCount}{" "}
        lesson lanjutan masih draft
      </p>
      <div className="database-actions">
        <Button asChild>
          <Link href={databasePathHref}>
            Jelajahi kurikulum <ArrowRight size={15} />
          </Link>
        </Button>
        <Link className="text-link" href={`/lessons/${resume.id}`}>
          Lanjutkan: {resume.title}
        </Link>
      </div>
    </section>
  );
}

export function DatabasePath() {
  const { progress } = useProgress();
  const curriculum = progress.curriculum ?? emptyCurriculum();
  return (
    <Workspace>
      <div className="database-path" lang="id">
        <div className="breadcrumb">
          <Link href="/dashboard">Pembelajaran saya</Link>
          <ChevronRight size={13} />
          Database Zero to Master
        </div>
        <div className="page-heading">
          <div>
            <Badge>POSTGRESQL · VERSI {databaseVersion}</Badge>
            <h1>Database Zero to Master</h1>
            <p>
              Dari query pertama sampai keputusan arsitektur database. Belajar
              berdasarkan penguasaan, tanpa menunggu kalender.
            </p>
          </div>
        </div>
        <DatabaseCourseCard />
        <p className="simulation-notice">
          Tersedia: {publishedModules.length} modul, {publishedLessons.length}{" "}
          lesson. {draftLessonCount} lesson lainnya masih draft. Aktivitas
          memakai prediksi hasil dan analisis skenario; aplikasi belum
          mengeksekusi SQL pengguna. Progres untuk learner browser ini, tanpa
          sinkronisasi akun.
        </p>
        <Diagnostic />
        {databaseLevels.map((level) => (
          <section
            key={level.id}
            className="database-level"
            aria-labelledby={`title-${level.id}`}
          >
            <div className="section-heading compact">
              <div>
                <span className="eyebrow">
                  {level.id.toUpperCase()} · REKOMENDASI MINGGU{" "}
                  {level.suggested_weeks.from}–{level.suggested_weeks.through}
                </span>
                <h2 id={`title-${level.id}`}>{level.title}</h2>
                <p>{level.goal}</p>
              </div>
              <Badge tone={levelPassed(level.id, curriculum) ? "mint" : "gray"}>
                {levelPassed(level.id, curriculum)
                  ? "LEVEL LULUS"
                  : level.modules.every((module) =>
                        module.lessons.every((lesson) => lesson.content),
                      )
                    ? "TERSEDIA"
                    : "DRAFT"}
              </Badge>
            </div>
            {level.modules.map((module) => {
              const available = module.lessons.every(
                (lesson) => lesson.content,
              );
              const unlocked = moduleUnlocked(module.id, curriculum);
              return (
                <article
                  className="card database-module"
                  key={module.id}
                  id={module.id}
                >
                  <div className="section-heading compact">
                    <div>
                      <span className="eyebrow">
                        {module.id.toUpperCase()} · {module.scenario}
                      </span>
                      <h3>{module.title}</h3>
                      <p>{module.objective}</p>
                    </div>
                    <Badge
                      tone={
                        modulePassed(module.id, curriculum) ? "mint" : "gray"
                      }
                    >
                      {modulePassed(module.id, curriculum)
                        ? "LULUS"
                        : available
                          ? "MATERI TERSEDIA"
                          : "DRAFT"}
                    </Badge>
                  </div>
                  <p className="small muted">
                    Prasyarat sertifikasi:{" "}
                    {module.prerequisite_module_ids.length
                      ? module.prerequisite_module_ids.map((id) => (
                          <Link key={id} href={`#${id}`}>
                            {id.toUpperCase()}{" "}
                          </Link>
                        ))
                      : "tidak ada"}
                    .{" "}
                    {unlocked
                      ? "Progres resmi terbuka."
                      : "Teori dapat dijelajahi; luluskan prasyarat untuk mencatat kelulusan."}
                  </p>
                  <ol className="database-lesson-list">
                    {module.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        {lesson.status === "published" ? (
                          <Link href={`/lessons/${lesson.id}`}>
                            <BookOpen size={17} />
                            <span>
                              <strong>{lesson.title}</strong>
                              <small>
                                {lesson.id} · {lesson.estimated_minutes} menit
                              </small>
                            </span>
                            {lessonPassed(lesson, curriculum) ? (
                              <Check size={17} aria-label="Selesai" />
                            ) : (
                              <ChevronRight size={17} />
                            )}
                          </Link>
                        ) : (
                          <div className="draft-lesson">
                            <span>
                              {lesson.title}
                              <small>
                                {lesson.id} · materi belum diterbitkan
                              </small>
                            </span>
                            <Badge tone="gray">DRAFT</Badge>
                          </div>
                        )}
                      </li>
                    ))}
                  </ol>
                  {available && (
                    <Assessment
                      id={module.id}
                      title={`Checkpoint ${module.id.toUpperCase()}`}
                      threshold={80}
                      enabled={
                        unlocked &&
                        module.lessons.every((lesson) =>
                          lessonPassed(lesson, curriculum),
                        )
                      }
                    />
                  )}
                </article>
              );
            })}
            {level.modules.every((module) =>
              module.lessons.every((lesson) => lesson.content),
            ) && (
              <Assessment
                id={level.id}
                title={`Assessment level ${level.id.toUpperCase()}`}
                threshold={85}
                enabled={level.modules.every((module) =>
                  modulePassed(module.id, curriculum),
                )}
              />
            )}
          </section>
        ))}
      </div>
    </Workspace>
  );
}

function Diagnostic() {
  const [result, setResult] = useState<number | null>(null);
  return (
    <details className="card database-module">
      <summary>Diagnostic opsional untuk learner berpengalaman</summary>
      <p>
        Gunakan hasil ini untuk memilih teori yang perlu diulang. Diagnostic
        tidak memberikan kelulusan atau melewati pemeriksaan keselamatan.
      </p>
      <Quiz
        id="database-diagnostic"
        question="Invoice 103 memiliki dua pembayaran sukses: 250.000 dan 200.000. Jika amount invoice 450.000 dijumlah setelah JOIN langsung ke payments, berapa tagihan yang terhitung?"
        options={[
          "450.000 karena invoice_id adalah primary key",
          "900.000 karena invoice muncul dua kali",
          "200.000 karena hanya pembayaran terakhir dihitung",
        ]}
        answer={1}
        explanation="Primary key tetap unik pada tabel asal, tetapi hasil JOIN berisi satu baris per pasangan yang cocok. Agregasikan payments per invoice sebelum menjumlah tagihan."
        onGraded={setResult}
      />
      {result !== null && (
        <p role="status">
          {result === 1
            ? "Mulai eksplorasi JOIN dan kardinalitas di L1M03 jika teori dasar sudah dikuasai. Tetap selesaikan seluruh aktivitas dan safety check untuk sertifikasi."
            : "Mulai dari L0M01, lalu pelajari proyeksi dan JOIN secara berurutan."}
        </p>
      )}
    </details>
  );
}

function Assessment({
  id,
  title,
  threshold,
  enabled,
}: {
  id: string;
  title: string;
  threshold: number;
  enabled: boolean;
}) {
  const learning = useProgress();
  const curriculum = learning.progress.curriculum ?? emptyCurriculum();
  const key = assessmentKey(id);
  const record = curriculum.records[key];
  const [error, setError] = useState(false);
  const questions = assessmentQuestions(id, record?.attempt ?? 0);
  const result = assessmentResult(questions, record?.answers ?? {});
  const allAnswered = questions.every(
    (question) => record?.answers[question.id] !== undefined,
  );
  const passed = id.includes("m")
    ? modulePassed(id, curriculum)
    : levelPassed(id, curriculum);
  return (
    <details className="database-assessment">
      <summary>
        {title} · minimum {threshold}% {passed ? "· LULUS" : ""}
      </summary>
      <p>
        {enabled
          ? "Jawab seluruh soal. Retake tanpa batas dengan urutan opsi dan pilihan soal level yang berganti. Semua soal kritis wajib benar, terpisah dari ambang skor."
          : "Selesaikan aktivitas dan prasyarat terlebih dahulu. Teori tetap dapat dibaca."}
      </p>
      {enabled && (
        <>
          {questions.map((question) => (
            <Quiz
              key={`${question.id}-${record?.attempt ?? 0}`}
              {...question}
              attempt={record?.attempt ?? 0}
              savedAnswer={record?.answers[question.id]}
              onGraded={(answer) =>
                setError(!learning.recordAnswer(key, question.id, answer))
              }
            />
          ))}
          <p role="status">
            Skor upaya saat ini: {result.score.toFixed(1)}% · Pemeriksaan kritis{" "}
            {result.criticalPassed ? "lolos" : "belum lolos"}
            {passed ? " · Kelulusan terdahulu tersimpan" : ""}
          </p>
          <div className="database-actions">
            <Button
              disabled={
                !allAnswered ||
                result.score < threshold ||
                !result.criticalPassed
              }
              onClick={() => setError(!learning.finishLearning(key))}
            >
              Catat kelulusan {id.toUpperCase()}
            </Button>
            <Button
              variant="outline"
              onClick={() => setError(!learning.retryLearning(key))}
            >
              Upaya baru
            </Button>
          </div>
        </>
      )}
      {error && (
        <p role="alert">
          Browser tidak dapat menyimpan progres. Aktifkan local storage agar
          kelulusan bertahan.
        </p>
      )}
    </details>
  );
}

export function DatabaseLessonPlayer({ lesson }: { lesson: DatabaseLesson }) {
  const learning = useProgress();
  const curriculum = learning.progress.curriculum ?? emptyCurriculum();
  const { resumeLearning } = learning;
  useEffect(() => {
    resumeLearning(lesson.id);
  }, [lesson.id, resumeLearning]);
  const content = lesson.content!;
  const key = lessonRecordKey(lesson.id, content.version);
  const record = curriculum.records[key];
  const attempt = record?.attempt ?? 0;
  const [error, setError] = useState(false);
  const [hint, setHint] = useState(0);
  const variant =
    content.activity.variants[attempt % content.activity.variants.length];
  const questions = [...content.checks, variant, ...content.activity.edgeCases];
  const ready =
    questions.every(
      (question) => record?.answers[question.id] === question.answer,
    ) && !!record?.reflection.trim();
  const tried = record?.answers[variant.id] !== undefined;
  const unlocked = moduleUnlocked(lesson.moduleId, curriculum);
  const done = lessonPassed(lesson, curriculum);
  const next =
    publishedLessons[
      publishedLessons.findIndex((item) => item.id === lesson.id) + 1
    ];
  const check = (question: ConceptCheck) => (
    <Quiz
      key={`${question.id}-${attempt}`}
      {...question}
      attempt={attempt}
      savedAnswer={record?.answers[question.id]}
      onGraded={(answer) => {
        const saved = learning.recordAnswer(key, question.id, answer);
        learning.resumeLearning(lesson.id);
        setError(!saved);
      }}
    />
  );
  return (
    <Workspace>
      <article className="database-reader" lang="id">
        <div className="breadcrumb">
          <Link href={databasePathHref}>Database Zero to Master</Link>
          <ChevronRight size={13} />
          {lesson.id.toUpperCase()}
        </div>
        <div className="lesson-heading">
          <Badge>
            {lesson.levelId.toUpperCase()} · {lesson.moduleId.toUpperCase()} ·{" "}
            {content.difficulty === "intermediate" ? "MENENGAH" : "PEMULA"}
          </Badge>
          <h1>{lesson.title}</h1>
          <p>
            {lesson.estimated_minutes} menit · versi {content.version} ·{" "}
            {content.tags.join(" · ")}
          </p>
          <p className="small muted">
            Materi jalur ini tersedia dalam bahasa Indonesia. Pemilih bahasa
            mengatur antarmuka platform.
          </p>
        </div>
        {!unlocked && (
          <p className="simulation-notice">
            Eksplorasi teori terbuka. Selesaikan modul prasyarat untuk mencatat
            kelulusan resmi lesson ini.
          </p>
        )}
        <section className="lesson-section">
          <span className="eyebrow">01 · PROBLEM</span>
          <h2>Masalah yang akan dipecahkan</h2>
          <p>{content.hook}</p>
          <ul>
            {content.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
        </section>
        <section className="lesson-section">
          <span className="eyebrow">02 · LEARN</span>
          {content.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </section>
          ))}
        </section>
        <section className="lesson-section">
          <span className="eyebrow">03 · WORKED EXAMPLE</span>
          <h2>Baca input, telusuri hasil</h2>
          <p>
            Dataset School Finance v1: 6 siswa, 10 invoice, 11 pembayaran. Nilai
            uang dalam rupiah. Hanya pembayaran succeeded dihitung sebagai
            penerimaan. Tanggal acuan di contoh selalu tetap.
          </p>
          {content.worked.setupSql && (
            <>
              <h3>Setup contoh terisolasi</h3>
              <pre className="code-block">
                <code>{content.worked.setupSql}</code>
              </pre>
            </>
          )}
          <pre className="code-block">
            <code>{content.worked.sql}</code>
          </pre>
          <div className="table-scroll">
            <table>
              <caption>Hasil contoh PostgreSQL</caption>
              <thead>
                <tr>
                  {content.worked.columns.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {content.worked.rows.map((row, index) => (
                  <tr key={index}>
                    {row.map((value, cell) => (
                      <td key={cell}>{value === null ? "NULL" : value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>{content.worked.explanation}</p>
          <p className="small muted">
            Contoh SQL untuk database latihan disposable. Halaman ini
            menggunakan prediksi hasil; SQL tidak dieksekusi di browser atau
            database bersama.
          </p>
        </section>
        <section className="lesson-section">
          <span className="eyebrow">04 · TRY</span>
          <h2>{content.activity.prompt}</h2>
          <p>{content.activity.setup}</p>
          <pre className="code-block">
            <code>{content.activity.starterSql}</code>
          </pre>
          {check(variant)}
          <div className="database-hints">
            <Button
              variant="outline"
              disabled={(hint >= 2 && !tried) || hint >= 3}
              onClick={() => setHint((value) => value + 1)}
            >
              Buka hint {Math.min(hint + 1, 3)}
            </Button>
            {hint >= 2 && !tried && (
              <p>Coba kirim satu jawaban aktivitas sebelum membuka solusi.</p>
            )}
            {content.activity.hints
              .slice(0, Math.min(hint, tried ? 3 : 2))
              .map((text, index) => (
                <p key={index}>
                  <strong>Hint {index + 1}:</strong> {text}
                </p>
              ))}
            {tried && (
              <details>
                <summary>Solusi dan pembahasan sesudah upaya</summary>
                <pre className="code-block">
                  <code>{content.activity.solutionSql}</code>
                </pre>
                <p>{content.activity.solutionExplanation}</p>
              </details>
            )}
          </div>
        </section>
        <section className="lesson-section">
          <span className="eyebrow">05 · BREAK / EDGE CASE</span>
          <h2>Uji batas pemahaman</h2>
          <p>
            {content.activity.critical
              ? "Pemeriksaan ini kritis untuk integritas data. Semua kasus wajib benar."
              : "Kedua kasus wajib benar agar kelulusan mencerminkan batas konsep, bukan hanya happy path."}
          </p>
          {content.activity.edgeCases.map(check)}
        </section>
        <section className="lesson-section">
          <span className="eyebrow">06 · EXPLAIN WHY</span>
          <h2>Checkpoint konsep</h2>
          {content.checks.map(check)}
          <div className="database-reflection">
            <label htmlFor={`${lesson.id}-reflection`}>
              {content.reflection}
            </label>
            <textarea
              id={`${lesson.id}-reflection`}
              rows={5}
              maxLength={6000}
              value={record?.reflection ?? ""}
              onChange={(event) => {
                const saved = learning.recordReflection(
                  key,
                  event.target.value,
                );
                learning.resumeLearning(lesson.id);
                setError(!saved);
              }}
            />
          </div>
          <p className="small muted">
            Refleksi dicatat untuk Anda tinjau ulang; kualitas argumen tidak
            dinilai otomatis.
          </p>
        </section>
        <section className="card database-completion">
          <h2>Complete</h2>
          <p role="status">
            {done
              ? "Lesson lulus. Kelulusan tersimpan untuk versi konten ini."
              : "Selesaikan aktivitas, kedua edge case, dua concept check, dan tulis refleksi. Membaca atau menekan Next tidak memberikan kelulusan."}
          </p>
          <div className="database-actions">
            <Button
              disabled={!ready || !unlocked}
              onClick={() => {
                setError(!learning.finishLearning(key));
                learning.resumeLearning(next?.id ?? lesson.id);
              }}
            >
              Catat lesson selesai
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setHint(0);
                setError(!learning.retryLearning(key));
              }}
            >
              Ulangi dengan varian lain
            </Button>
          </div>
          {error && (
            <p role="alert">
              Browser tidak dapat menyimpan progres. Aktifkan local storage;
              kelulusan belum tersimpan.
            </p>
          )}
        </section>
        <nav className="lesson-pagination" aria-label="Navigasi lesson">
          <Link href={`${databasePathHref}#${lesson.moduleId}`}>
            ← Modul dan checkpoint
          </Link>
          {next ? (
            <Link href={`/lessons/${next.id}`}>Next: {next.title} →</Link>
          ) : (
            <Link href={`${databasePathHref}#${lesson.moduleId}`}>
              Assessment dan kelanjutan draft →
            </Link>
          )}
        </nav>
      </article>
    </Workspace>
  );
}

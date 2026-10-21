"use client";
import { useLocale } from "@/lib/locale";

import { useState } from "react";
import { Check, ArrowRight, CircleHelp } from "lucide-react";
import { Button } from "./ui/button";
import { useProgress } from "@/lib/progress";
export function Quiz({
  id,
  question,
  options,
  answer,
  explanation,
  lab = false,
  feedback,
  onGraded,
  savedAnswer,
  attempt = 0,
}: {
  id: string;
  question: string;
  options: readonly string[];
  answer: number;
  explanation: string;
  lab?: boolean;
  feedback?: readonly string[];
  onGraded?: (selected: number) => void;
  savedAnswer?: number;
  attempt?: number;
}) {
  const { t } = useLocale();

  const [selected, setSelected] = useState<number | null>(savedAnswer ?? null);
  const [checked, setChecked] = useState(savedAnswer !== undefined);
  const [error, setError] = useState(false);
  const { progress, complete } = useProgress();
  const done = !onGraded && progress.completed.includes(id);
  const order = options.map((_, i) => (i + attempt) % options.length);
  const correct = checked && selected === answer;
  return (
    <section className="quiz card" aria-label={t("Knowledge checkpoint")}>
      <div className="eyebrow">
        <CircleHelp size={16} />{" "}
        {lab ? t("THE FINAL CHECK") : t("KNOWLEDGE CHECKPOINT")}
      </div>
      <h3>{t(question)}</h3>
      <div
        className="quiz-options"
        role="group"
        aria-label={t("Answer options")}
      >
        {order.map((i, position) => {
          const option = options[i];
          return (
            <button
              key={option}
              aria-pressed={selected === i}
              className={`quiz-option ${selected === i ? "selected" : ""} ${checked && selected === i ? (i === answer ? "correct" : "incorrect") : ""}`}
              onClick={() => {
                setSelected(i);
                setChecked(false);
              }}
            >
              <span className="option-letter" aria-hidden="true">
                {String.fromCharCode(65 + position)}
              </span>
              {t(option)}
              {checked && i === selected && i === answer && <Check size={18} />}
            </button>
          );
        })}
      </div>
      <Button
        disabled={selected === null}
        onClick={() => {
          setChecked(true);
          if (selected !== null) {
            if (onGraded) onGraded(selected);
            else if (selected === answer) setError(!complete(id));
          }
        }}
      >
        {t("Check answer ")}
        <ArrowRight size={16} />
      </Button>
      <div aria-live="polite">
        {checked && (
          <div className={`quiz-feedback ${correct ? "success" : "warning"}`}>
            <strong>
              {correct ? t("You’ve got it.") : t("Almost. Take another look.")}
            </strong>
            <p>
              {t(
                selected !== null && feedback?.[selected]
                  ? feedback[selected]
                  : explanation,
              )}
            </p>
            {correct && feedback && <p>{t(explanation)}</p>}
          </div>
        )}
        {!onGraded && (done || correct) && (
          <p className="completion">
            <Check size={16} />
            {lab ? t("Lab complete") : t("Checkpoint complete")}
          </p>
        )}
        {error && (
          <p role="alert">
            {t(
              "Your browser could not save progress. Keep this tab open or enable local storage.",
            )}
          </p>
        )}
      </div>
    </section>
  );
}

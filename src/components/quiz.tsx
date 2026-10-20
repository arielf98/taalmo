"use client";
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
}: {
  id: string;
  question: string;
  options: readonly string[];
  answer: number;
  explanation: string;
  lab?: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const { progress, complete } = useProgress();
  const done = progress.completed.includes(id);
  const correct = checked && selected === answer;
  return (
    <section className="quiz card" aria-label="Knowledge checkpoint">
      <div className="eyebrow">
        <CircleHelp size={16} />{" "}
        {lab ? "THE FINAL CHECK" : "KNOWLEDGE CHECKPOINT"}
      </div>
      <h3>{question}</h3>
      <div className="quiz-options" role="group" aria-label="Answer options">
        {options.map((option, i) => (
          <button
            key={option}
            aria-pressed={selected === i}
            className={`quiz-option ${selected === i ? "selected" : ""} ${checked && selected === i ? (i === answer ? "correct" : "incorrect") : ""}`}
            onClick={() => {
              setSelected(i);
              setChecked(false);
            }}
          >
            <span className="option-letter">{String.fromCharCode(65 + i)}</span>
            {option}
            {checked && i === selected && i === answer && <Check size={18} />}
          </button>
        ))}
      </div>
      <Button
        disabled={selected === null}
        onClick={() => {
          setChecked(true);
          if (selected === answer) setError(!complete(id));
        }}
      >
        Check answer <ArrowRight size={16} />
      </Button>
      <div aria-live="polite">
        {checked && (
          <div className={`quiz-feedback ${correct ? "success" : "warning"}`}>
            <strong>
              {correct ? "You’ve got it." : "Almost. Take another look."}
            </strong>
            <p>{explanation}</p>
          </div>
        )}
        {(done || correct) && (
          <p className="completion">
            <Check size={16} />
            {lab ? "Lab complete" : "Checkpoint complete"}
          </p>
        )}
        {error && (
          <p role="alert">
            Your browser could not save progress. Keep this tab open or enable
            local storage.
          </p>
        )}
      </div>
    </section>
  );
}

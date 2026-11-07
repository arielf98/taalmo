export type Copy = { id: string; en: string };
export const copy = (id: string, en: string): Copy => ({ id, en });
export interface FractionAnswer { numerator: number; denominator: number }
export type MathAnswer = number | FractionAnswer;

export interface MathQuestion {
  id: string;
  prompt: Copy;
  answer: MathAnswer;
  decimalPlaces?: number;
  solution: Copy;
  feedback: Copy;
  options?: number[];
  mistakes?: { value: number; feedback: Copy }[];
  critical?: boolean;
}

export interface MathLessonContent {
  hook: Copy;
  objective: Copy;
  prediction: MathQuestion;
  exploration: {
    kind: "count" | "groups" | "division" | "fraction" | "percentage-change" | "ratio" | "rate" | "bytes" | "distance" | "rounding" | "powers" | "budget" | "function" | "linear" | "composition";
    inputLabels?: [Copy, Copy];
    initial: [number, number];
    target: [number, number];
    instruction: Copy;
    question: MathQuestion;
  };
  explanation: Copy[];
  worked: { title: Copy; steps: Copy[]; result: Copy };
  practice: MathQuestion[];
  hints: [Copy, Copy, Copy];
  transfer: Copy;
  reflection: Copy;
  checkpoints: [MathQuestion[], MathQuestion[]];
}

export const mathVisualBounds: Record<MathLessonContent["exploration"]["kind"], [[number, number], [number, number]]> = {
  count: [[0, 8], [0, 8]], groups: [[0, 8], [0, 8]], division: [[0, 24], [1, 8]],
  fraction: [[0, 8], [1, 8]], "percentage-change": [[0, 100], [0, 100]],
  ratio: [[1, 8], [0, 24]], rate: [[0, 100], [0, 2000]], bytes: [[0, 8], [0, 2]],
  distance: [[-10, 10], [-10, 10]], rounding: [[0, 2000], [0, 2]], powers: [[0, 10], [0, 10]],
  budget: [[0, 60], [0, 200]],
  function: [[0, 4], [0, 4]], linear: [[0, 6], [0, 4]], composition: [[0, 6], [0, 1]],
};

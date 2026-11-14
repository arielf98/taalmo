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
    kind: "count" | "groups" | "division" | "fraction" | "percentage-change" | "ratio" | "rate" | "bytes" | "distance" | "rounding" | "powers" | "budget" | "function" | "linear" | "composition" | "growth" | "search-space" | "logarithm" | "binary-choices" | "search-cost" | "binary" | "hexadecimal" | "signed-byte" | "truth-table" | "bitwise" | "de-morgan" | "sets" | "relation" | "mapping" | "quantifiers" | "parity-proof" | "invariant" | "counting" | "selection" | "pigeonhole" | "sample-space" | "conditional" | "repeated-trials";
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
  growth: [[0, 6], [2, 3]], "search-space": [[1, 4], [0, 6]],
  logarithm: [[2, 4], [0, 6]], "binary-choices": [[0, 8], [0, 8]], "search-cost": [[1, 256], [0, 16]],
  binary: [[0, 15], [0, 15]], hexadecimal: [[0, 15], [0, 15]], "signed-byte": [[0, 255], [0, 15]],
  "truth-table": [[0, 1], [0, 1]], bitwise: [[0, 15], [0, 15]], "de-morgan": [[0, 1], [0, 1]],
  sets: [[0, 15], [0, 15]], relation: [[0, 3], [0, 3]], mapping: [[0, 8], [2, 3]],
  quantifiers: [[0, 6], [0, 6]], "parity-proof": [[-3, 3], [-3, 3]], invariant: [[0, 6], [0, 7]],
  counting: [[0, 4], [0, 4]], selection: [[0, 5], [0, 1]], pigeonhole: [[0, 6], [1, 4]],
  "sample-space": [[0, 4], [0, 4]], conditional: [[0, 15], [0, 15]], "repeated-trials": [[1, 16], [0, 1]],
};

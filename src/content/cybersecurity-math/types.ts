export type Copy = { id: string; en: string };
export const copy = (id: string, en: string): Copy => ({ id, en });

export interface MathQuestion {
  id: string;
  prompt: Copy;
  answer: number;
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
    kind: "count" | "groups" | "division";
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

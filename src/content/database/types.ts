export interface ConceptCheck {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  feedback: string[];
  critical?: boolean;
}
export interface WorkedExample {
  dataset?: string;
  sql: string;
  setupSql?: string;
  columns: string[];
  rows: (string | null)[][];
  ordered?: boolean;
  explanation: string;
}
export interface AuthoredLesson {
  id: string;
  version: string;
  difficulty: "beginner" | "intermediate";
  tags: string[];
  hook: string;
  objectives: string[];
  sections: { title: string; paragraphs: string[] }[];
  worked: WorkedExample;
  checks: ConceptCheck[];
  activity: {
    kind: "prediction";
    prompt: string;
    setup: string;
    starterSql: string;
    variants: ConceptCheck[];
    edgeCases: ConceptCheck[];
    hints: [string, string, string];
    solutionSql: string;
    solutionError?: string;
    solutionExplanation: string;
    critical: boolean;
  };
  reflection: string;
}

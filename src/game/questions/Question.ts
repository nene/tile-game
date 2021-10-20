import { FlagColor } from "../orgs/FlagColors";

export interface ValidationResult {
  type: "praise" | "punish" | "neutral";
  msg: string;
}

export interface ColorsQuestion {
  type: "colors";
  question: string;
  validate: (answer: FlagColor[]) => ValidationResult;
}

export interface MultiChoiceQuestion {
  type: "multi-choice";
  question: string;
  choices: string[];
  fontSize?: "medium" | "small";
  validate: (answer: string) => ValidationResult;
}

export type Question = ColorsQuestion | MultiChoiceQuestion;

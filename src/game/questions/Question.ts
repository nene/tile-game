import { FlagColor } from "../orgs/FlagColors";

export interface ColorsQuestion {
  type: "colors";
  question: string;
  validate: (answer: FlagColor[]) => string;
}

export interface MultiChoiceQuestion {
  type: "multi-choice";
  question: string;
  choices: string[];
  fontSize?: "medium" | "small";
  validate: (answer: string) => string;
}

export type Question = ColorsQuestion | MultiChoiceQuestion;

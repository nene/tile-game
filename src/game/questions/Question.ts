import { FlagColor } from "../orgs/FlagColors";
import { ValidationResult } from "./ValidationResult";

export type QuestionCategory = "colors" | "place" | "slogan" | "year" | "terminology";

export interface ColorsQuestion {
  type: "colors";
  category: QuestionCategory;
  question: string;
  validate: (answer: FlagColor[]) => ValidationResult;
}

export interface MultiChoiceQuestion {
  type: "multi-choice";
  category: QuestionCategory;
  question: string;
  choices: string[];
  fontSize?: "medium" | "small";
  validate: (answer: string) => ValidationResult;
}

export type Question = ColorsQuestion | MultiChoiceQuestion;

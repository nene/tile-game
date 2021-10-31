import { random } from "lodash";
import { createColorsQuestion } from "./ColorsQuestion";
import { createPlaceQuestion } from "./PlaceQuestion";
import { Question } from "./Question";
import { createSloganQuestion } from "./SloganQuestion";
import { createTerminologyQuestion } from "./TerminologyQuestion";
import { createYearQuestion } from "./YearQuestion";

export class QuestionFactory {
  createQuestion(): Question {
    switch (random(0, 4)) {
      case 0: return createColorsQuestion();
      case 1: return createPlaceQuestion();
      case 2: return createSloganQuestion();
      case 3: return createTerminologyQuestion();
      case 4:
      default: return createYearQuestion();
    }
  }
}

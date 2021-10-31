import { OrgSkill } from "../attributes/OrgSkill";
import { pickRandom } from "../utils/pickRandom";
import { createColorsQuestion } from "./ColorsQuestion";
import { createPlaceQuestion } from "./PlaceQuestion";
import { Question } from "./Question";
import { createSloganQuestion } from "./SloganQuestion";
import { createTerminologyQuestion } from "./TerminologyQuestion";
import { createYearQuestion } from "./YearQuestion";

export type QuestionCategory = "colors" | "place" | "slogan" | "year" | "terminology";

export class QuestionFactory {
  createQuestion(orgSkill: OrgSkill): Question {
    const categories: QuestionCategory[] = [...orgSkill.getEnabledCategories(), "terminology"];

    switch (pickRandom(categories)) {
      case "colors": return createColorsQuestion(orgSkill.getTargetOrgs());
      case "place": return createPlaceQuestion(orgSkill.getTargetOrgs(), orgSkill.getPossibleOrgs());
      case "slogan": return createSloganQuestion(orgSkill.getTargetOrgs(), orgSkill.getPossibleOrgs());
      case "year": return createYearQuestion(orgSkill.getTargetOrgs(), orgSkill.getPossibleOrgs());
      case "terminology": return createTerminologyQuestion();
    }
  }
}

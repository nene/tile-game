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
  constructor(private orgSkill: OrgSkill) { }

  create(): Question {
    const categories: QuestionCategory[] = [...this.orgSkill.getEnabledCategories(), "terminology"];

    switch (pickRandom(categories)) {
      case "colors": return createColorsQuestion(this.orgSkill.getTargetOrgs());
      case "place": return createPlaceQuestion(this.orgSkill.getTargetOrgs(), this.orgSkill.getPossibleOrgs());
      case "slogan": return createSloganQuestion(this.orgSkill.getTargetOrgs(), this.orgSkill.getPossibleOrgs());
      case "year": return createYearQuestion(this.orgSkill.getTargetOrgs(), this.orgSkill.getPossibleOrgs());
      case "terminology": return createTerminologyQuestion();
    }
  }

  rightAnswer() {
    this.orgSkill.rightAnswer();
  }

  wrongAnswer() {
    this.orgSkill.wrongAnswer();
  }
}

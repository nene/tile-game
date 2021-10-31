import { OrgSkill } from "../attributes/OrgSkill";
import { pickRandom } from "../utils/pickRandom";
import { createColorsQuestion } from "./ColorsQuestion";
import { createPlaceQuestion } from "./PlaceQuestion";
import { Question, QuestionCategory } from "./Question";
import { createSloganQuestion } from "./SloganQuestion";
import { createTerminologyQuestion } from "./TerminologyQuestion";
import { createYearQuestion } from "./YearQuestion";

const QUESTIONS_BETWEEN_DUPLICATE_QUESTIONS = 3;

export class QuestionFactory {
  private previousQuestions: string[] = [];

  constructor(private orgSkill: OrgSkill) { }

  create(): Question {
    while (true) {
      const question = this.generateQuestion();
      if (!this.previousQuestions.includes(question.question)) {
        this.rememberQuestion(question.question);
        return question;
      }
    }
  }

  private generateQuestion(): Question {
    const categories: QuestionCategory[] = [...this.orgSkill.getEnabledCategories(), "terminology"];

    switch (pickRandom(categories)) {
      case "colors": return createColorsQuestion(this.orgSkill.getTargetOrgs());
      case "place": return createPlaceQuestion(this.orgSkill.getTargetOrgs(), this.orgSkill.getPossibleOrgs());
      case "slogan": return createSloganQuestion(this.orgSkill.getTargetOrgs(), this.orgSkill.getPossibleOrgs());
      case "year": return createYearQuestion(this.orgSkill.getTargetOrgs(), this.orgSkill.getPossibleOrgs());
      case "terminology": return createTerminologyQuestion();
    }
  }

  private rememberQuestion(question: string) {
    this.previousQuestions.push(question);
    if (this.previousQuestions.length > QUESTIONS_BETWEEN_DUPLICATE_QUESTIONS) {
      this.previousQuestions.shift();
    }
  }

  rightAnswer(question: Question) {
    if (this.isOrgQuestion(question)) {
      this.orgSkill.rightAnswer();
    }
  }

  wrongAnswer(question: Question) {
    if (this.isOrgQuestion(question)) {
      this.orgSkill.wrongAnswer();
    }
  }

  private isOrgQuestion(question: Question): boolean {
    return this.orgSkill.getEnabledCategories().includes(question.category);
  }
}

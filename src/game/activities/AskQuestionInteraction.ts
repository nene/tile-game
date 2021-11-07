import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { TextContent } from "../dialogs/TextContent";
import { FlagQuestionContent } from "../dialogs/FlagQuestionContent";
import { Interaction, InteractionType } from "./Interaction";
import { Dialog } from "../dialogs/Dialog";
import { ColorsQuestion, MultiChoiceQuestion, Question, ValidationResult } from "../questions/Question";
import { Rect } from "../Coord";
import { MultiChoiceQuestionContent } from "../dialogs/MultiChoiceQuestionContent";
import { CallFuxActivity } from "./CallFuxActivity";
import { RequestWaterInteraction } from "./RequestWaterInteraction";

export class AskQuestionInteraction implements Interaction {
  private finished = false;
  private punishWithWater = false;

  constructor(private character: Character) {
  }

  getType() {
    return InteractionType.question;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController) {
    const question = ui.questions().create();

    ui.showModal(new Dialog({
      world: ui.getWorld(),
      character: this.character,
      createContent: (rect) => {
        if (question.type === "colors") {
          return this.createColorsContent(ui, rect, question);
        } else {
          return this.createMultiChoiceContent(ui, rect, question);
        }
      },
    }));
    this.finished = true;
  }

  private createColorsContent(ui: UiController, rect: Rect, question: ColorsQuestion) {
    return new FlagQuestionContent({
      question: question.question,
      container: rect,
      onAnswer: (colors) => {
        this.handleValidationResult(question.validate(colors), question, ui);
      },
    });
  }

  private createMultiChoiceContent(ui: UiController, rect: Rect, question: MultiChoiceQuestion) {
    return new MultiChoiceQuestionContent({
      container: rect,
      question: question.question,
      choices: question.choices,
      fontSize: question.fontSize,
      onAnswer: (answer) => {
        this.handleValidationResult(question.validate(answer), question, ui);
      }
    });
  }

  private handleValidationResult(result: ValidationResult, question: Question, ui: UiController) {
    this.showReply(ui, result.msg);
    this.character.satisfyDesire("question");
    if (result.type === "punish") {
      ui.questions().wrongAnswer(question);
      this.character.changeOpinion(-1);
      this.punishWithWater = true;
    }
    else if (result.type === "praise") {
      ui.questions().rightAnswer(question);
      this.character.changeOpinion(+1);
    }
  }

  nextActivity() {
    if (this.punishWithWater) {
      return new CallFuxActivity(this.character, new RequestWaterInteraction(this.character));
    }
  }

  private showReply(ui: UiController, text: string) {
    ui.showModal(new Dialog({
      world: ui.getWorld(),
      character: this.character,
      createContent: (rect) => new TextContent(text, rect),
      onClose: () => ui.hideModal(),
    }));
  }
}

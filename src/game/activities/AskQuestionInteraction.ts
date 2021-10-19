import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { TextContent } from "../dialogs/TextContent";
import { FlagQuestionContent } from "../dialogs/FlagQuestionContent";
import { Interaction } from "./Interaction";
import { Dialog } from "../dialogs/Dialog";
import { ColorsQuestion, MultiChoiceQuestion, Question } from "../questions/Question";
import { Rect } from "../Coord";
import { MultiChoiceQuestionContent } from "../dialogs/MultiChoiceQuestionContent";

export class AskQuestionInteraction implements Interaction {
  constructor(private character: Character, private question: Question) {
  }

  interact(ui: UiController) {
    ui.showDialog(new Dialog({
      character: this.character,
      createContent: (rect) => {
        if (this.question.type === "colors") {
          return this.createColorsContent(ui, rect, this.question);
        } else {
          return this.createMultiChoiceContent(ui, rect, this.question);
        }
      },
    }));
  }

  private createColorsContent(ui: UiController, rect: Rect, question: ColorsQuestion) {
    return new FlagQuestionContent({
      question: question.question,
      container: rect,
      onAnswer: (colors) => {
        this.showReply(ui, question.validate(colors));
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
        this.showReply(ui, question.validate(answer));
      }
    });
  }

  nextActivity() {
    return undefined;
  }

  private showReply(ui: UiController, text: string) {
    ui.showDialog(new Dialog({
      character: this.character,
      createContent: (rect) => new TextContent(text, rect),
      onClose: () => ui.hideDialog(),
    }));
  }
}

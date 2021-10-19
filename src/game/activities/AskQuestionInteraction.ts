import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { TextContent } from "../dialogs/TextContent";
import { FlagQuestionContent } from "../dialogs/FlagQuestionContent";
import { Interaction } from "./Interaction";
import { Dialog } from "../dialogs/Dialog";
import { createColorsQuestion } from "../questions/ColorsQuestion";
import { ColorsQuestion } from "../questions/Question";

export class AskQuestionInteraction implements Interaction {
  private question: ColorsQuestion;

  constructor(private character: Character) {
    this.question = createColorsQuestion();
  }

  interact(ui: UiController) {
    ui.showDialog(new Dialog({
      character: this.character,
      createContent: (rect) => new FlagQuestionContent({
        question: this.question.question,
        container: rect,
        onAnswer: (colors) => {
          this.showReply(ui, this.question.validate(colors));
        },
      }),
    }));
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

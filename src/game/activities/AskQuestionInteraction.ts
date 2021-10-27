import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { TextContent } from "../dialogs/TextContent";
import { FlagQuestionContent } from "../dialogs/FlagQuestionContent";
import { Interaction, InteractionType } from "./Interaction";
import { Dialog } from "../dialogs/Dialog";
import { ColorsQuestion, MultiChoiceQuestion, Question, ValidationResult } from "../questions/Question";
import { Rect } from "../Coord";
import { MultiChoiceQuestionContent } from "../dialogs/MultiChoiceQuestionContent";
import { GameWorld } from "../GameWorld";
import { BeerGlass, DrinkLevel } from "../items/BeerGlass";
import { getDrink } from "../items/Drink";

export class AskQuestionInteraction implements Interaction {
  private finished = false;

  constructor(private character: Character, private question: Question) {
  }

  getType() {
    return InteractionType.question;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController, world: GameWorld) {
    ui.showDialog(new Dialog({
      character: this.character,
      createContent: (rect) => {
        if (this.question.type === "colors") {
          return this.createColorsContent(ui, world, rect, this.question);
        } else {
          return this.createMultiChoiceContent(ui, world, rect, this.question);
        }
      },
    }));
    this.finished = true;
  }

  private createColorsContent(ui: UiController, world: GameWorld, rect: Rect, question: ColorsQuestion) {
    return new FlagQuestionContent({
      question: question.question,
      container: rect,
      onAnswer: (colors) => {
        this.handleValidationResult(question.validate(colors), ui, world);
      },
    });
  }

  private createMultiChoiceContent(ui: UiController, world: GameWorld, rect: Rect, question: MultiChoiceQuestion) {
    return new MultiChoiceQuestionContent({
      container: rect,
      question: question.question,
      choices: question.choices,
      fontSize: question.fontSize,
      onAnswer: (answer) => {
        this.handleValidationResult(question.validate(answer), ui, world);
      }
    });
  }

  private handleValidationResult(result: ValidationResult, ui: UiController, world: GameWorld) {
    this.showReply(ui, result.msg);
    if (result.type === "punish") {
      this.character.changeOpinion(-1);
      this.punishWithWater(ui, world);
    }
    else if (result.type === "praise") {
      this.character.changeOpinion(+1);
    }
  }

  private punishWithWater(ui: UiController, world: GameWorld) {
    const glass = new BeerGlass(getDrink("water"), DrinkLevel.full);
    ui.setSelectedItem(glass);
    world.getPlayer().onInteract(ui, world);
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

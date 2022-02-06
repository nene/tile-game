import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { Interaction, InteractionType } from "./Interaction";
import { CharacterDialog } from "../../dialogs/CharacterDialog";
import { CalloutSpriteFactory } from "./CalloutSpriteFactory";

export class EmptyBottlesInteraction implements Interaction {
  private dialog: CharacterDialog;

  constructor(private character: AcademicCharacter) {
    this.dialog = new CharacterDialog(character);
  }

  getCalloutSprites() {
    return [CalloutSpriteFactory.getSprite(InteractionType.emptyBottle)];
  }

  tryComplete() {
    return this.isFinished();
  }

  isFinished() {
    return this.character.getAnnoyance() !== "empty-bottles";
  }

  interact(ui: UiController) {
    this.dialog.show(ui, "Laibad laual!");
  }

  nextActivity() {
    return undefined;
  }
}

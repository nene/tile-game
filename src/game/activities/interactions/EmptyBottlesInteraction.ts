import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiApi } from "../../UiController";
import { Interaction } from "./Interaction";
import { CharacterDialog } from "../../dialogs/CharacterDialog";
import { CalloutSpriteFactory, InteractionType } from "./CalloutSpriteFactory";

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

  interact(ui: UiApi) {
    this.dialog.show(ui, "Laibad laual!");
  }

  nextActivity() {
    return undefined;
  }
}

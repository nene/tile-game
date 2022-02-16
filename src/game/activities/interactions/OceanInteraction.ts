import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiApi } from "../../UiController";
import { Interaction } from "./Interaction";
import { CharacterDialog } from "../../dialogs/CharacterDialog";
import { CalloutSpriteFactory, InteractionType } from "./CalloutSpriteFactory";

export class OceanInteraction implements Interaction {
  private dialog: CharacterDialog;

  constructor(private character: AcademicCharacter) {
    this.dialog = new CharacterDialog(character);
  }

  getCalloutSprites() {
    return [CalloutSpriteFactory.getSprite(InteractionType.ocean)];
  }

  tryComplete() {
    return this.isFinished();
  }

  isFinished() {
    return this.character.getAnnoyance() !== "ocean";
  }

  interact(ui: UiApi) {
    this.dialog.show(ui, "Ookean!");
  }

  nextActivity() {
    return undefined;
  }
}

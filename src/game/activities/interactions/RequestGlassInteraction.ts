import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { Interaction } from "./Interaction";
import { DrinkLevel, isBeerGlass, isEmptyBeerGlass } from "../../items/BeerGlass";
import { GameItem } from "../../items/GameItem";
import { CharacterDialog } from "../../dialogs/CharacterDialog";
import { CalloutSpriteFactory, InteractionType } from "./CalloutSpriteFactory";

export class RequestGlassInteraction implements Interaction {
  private finished = false;
  private dialog: CharacterDialog;

  constructor(private character: AcademicCharacter) {
    this.dialog = new CharacterDialog(character);
  }

  getCalloutSprites() {
    return [CalloutSpriteFactory.getSprite(InteractionType.glass)];
  }

  tryComplete(): boolean {
    const table = this.character.getField("table");
    if (!table) {
      throw new Error("Can't perform RequestGlassInteraction when not sitting at table.");
    }

    const beerGlass = table.getInventory().takeFirstOfKind(isEmptyBeerGlass);
    if (beerGlass) {
      this.character.setField("glass", beerGlass);
      this.finished = true;
      return true;
    }
    return false;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController, item?: GameItem) {
    if (!item || !(isBeerGlass(item))) {
      this.dialog.show(ui, "Reb! too mulle üks tühi šoppen.");
      return;
    }
    if (item.getLevel() !== DrinkLevel.empty) {
      this.dialog.show(ui, "Ma palusin tühja šoppenit.");
      return;
    }

    this.dialog.show(ui, "Aitäh!", {
      onClose: () => {
        ui.getAttributes().setSelectedItem(undefined);
        this.character.setField("glass", item);
        this.finished = true;
      },
    });
  }

  nextActivity() {
    return undefined;
  }
}

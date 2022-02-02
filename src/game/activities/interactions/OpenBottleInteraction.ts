import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { Interaction, InteractionType } from "./Interaction";
import { GameItem } from "../../items/GameItem";
import { CallFuxActivity } from "../CallFuxActivity";
import { PourDrinkInteraction } from "./PourDrinkInteraction";
import { DialogInventoryView } from "../../inventory/DialogInventoryView";
import { StorageInventory } from "../../inventory/StorageInventory";
import { BeerBottle, isBeerBottle } from "../../items/BeerBottle";

export class OpenBottleInteraction implements Interaction {
  private finished = false;
  private inventory: StorageInventory;

  constructor(private character: AcademicCharacter) {
    this.inventory = new StorageInventory({
      size: 1,
      isAcceptingItem: isBeerBottle,
    });

    const beerBottle = this.character.getField("bottle");
    if (beerBottle) {
      this.inventory.add(beerBottle);
      this.character.setField("bottle", undefined);
    }
  }

  getType() {
    return InteractionType.opener;
  }

  tryComplete(): boolean {
    const beerBottle = this.inventory.itemAt(0) as BeerBottle | undefined;
    if (!beerBottle) {
      return false;
    }

    if (beerBottle.isOpen()) {
      this.finished = true;
      this.character.setField("bottle", beerBottle);
      return true
    }
    if (this.character.hasSkill("opening")) {
      beerBottle.open();
      this.character.setField("bottle", beerBottle);
      this.finished = true;
      return true
    }
    return false;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController, item?: GameItem) {
    ui.showInventory(new DialogInventoryView({
      ui,
      character: this.character,
      inventory: this.inventory,
      text: this.inventory.itemAt(0) ? "Palun ava pudel." : "Too avatud pudel tagasi.",
      onClose: () => {
        this.tryComplete();
        ui.hideInventory();
      },
    }));
  }

  nextActivity() {
    if (this.finished) {
      return new CallFuxActivity(this.character, new PourDrinkInteraction(this.character));
    }
  }
}

import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { Interaction, InteractionType } from "./Interaction";
import { GameItem } from "../../items/GameItem";
import { CallFuxActivity } from "../CallFuxActivity";
import { PourDrinkInteraction } from "./PourDrinkInteraction";
import { DialogInventoryView } from "../../inventory/DialogInventoryView";
import { StorageInventory } from "../../inventory/StorageInventory";
import { BeerBottle, isBeerBottle } from "../../items/BeerBottle";
import { CharacterDialog } from "../../dialogs/CharacterDialog";

export class OpenBottleInteraction implements Interaction {
  private finished = false;
  private isDialogOpen = false;
  private inventory: StorageInventory;
  private dialog: CharacterDialog;

  constructor(private character: AcademicCharacter) {
    this.dialog = new CharacterDialog(character);
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
    if (this.isDialogOpen) {
      return false;
    }
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
    if (item && isBeerBottle(item)) {
      if (item.isOpen()) {
        this.dialog.show(ui, "Aitäh!");
      } else {
        this.dialog.show(ui, "Tee palun pudel lahti.");
      }
      return;
    }

    this.isDialogOpen = true;
    ui.showInventory(new DialogInventoryView({
      ui,
      character: this.character,
      inventory: this.inventory,
      text: this.inventory.itemAt(0) ? "Palun ava pudel." : "Too avatud pudel tagasi.",
      onClose: () => {
        this.finished = this.tryTakeOpenBottleFromInventory();
        ui.hideInventory();
        this.isDialogOpen = false;
      },
    }));
  }

  private tryTakeOpenBottleFromInventory(): boolean {
    const beerBottle = this.inventory.itemAt(0) as BeerBottle | undefined;
    if (beerBottle?.isOpen()) {
      this.character.setField("bottle", beerBottle);
      return true;
    }
    return false;
  }

  nextActivity() {
    if (this.finished) {
      return new CallFuxActivity(this.character, new PourDrinkInteraction(this.character));
    }
  }
}

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
  private openedBottle?: BeerBottle;
  private isDialogOpen = false;
  private inventory: StorageInventory;
  private dialog: CharacterDialog;

  constructor(private character: AcademicCharacter, closedBottle: BeerBottle) {
    this.dialog = new CharacterDialog(character);
    this.inventory = new StorageInventory({
      size: 1,
      isAcceptingItem: isBeerBottle,
      items: [closedBottle],
    });
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
      this.openedBottle = beerBottle;
      return true
    }
    if (this.character.hasSkill("opening")) {
      beerBottle.open();
      this.openedBottle = beerBottle;
      return true
    }
    return false;
  }

  isFinished() {
    return Boolean(this.openedBottle);
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
        this.openedBottle = this.tryTakeOpenedBottleFromInventory();
        ui.hideInventory();
        this.isDialogOpen = false;
      },
    }));
  }

  private tryTakeOpenedBottleFromInventory(): BeerBottle | undefined {
    const beerBottle = this.inventory.itemAt(0) as BeerBottle | undefined;
    return beerBottle?.isOpen() ? beerBottle : undefined;
  }

  nextActivity() {
    if (this.openedBottle) {
      return new CallFuxActivity(this.character, new PourDrinkInteraction(this.character, this.openedBottle));
    }
  }
}

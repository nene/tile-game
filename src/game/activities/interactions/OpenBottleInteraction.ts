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
import { Drink } from "../../items/Drink";

export class OpenBottleInteraction implements Interaction {
  private openedBottle?: BeerBottle;
  private isDialogOpen = false;
  private inventory: StorageInventory;
  private dialog: CharacterDialog;
  private drink: Drink;

  constructor(private character: AcademicCharacter, closedBottle: BeerBottle) {
    this.dialog = new CharacterDialog(character);
    this.drink = closedBottle.getDrink();
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
    if (beerBottle.getDrink() !== this.drink) {
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
    if (this.isCorrectOpenedBottle(item)) {
      this.isDialogOpen = true;
      this.openedBottle = item;
      ui.getAttributes().setSelectedItem(undefined);
      this.dialog.show(ui, "Aitäh!", {
        onClose: () => {
          this.isDialogOpen = false;
        }
      });
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

  private isCorrectOpenedBottle(item?: GameItem): item is BeerBottle {
    return Boolean(
      this.inventory.allItems().length === 0 &&
      item &&
      isBeerBottle(item) &&
      item.isOpen() &&
      item.getDrink() === this.drink
    );
  }

  private tryTakeOpenedBottleFromInventory(): BeerBottle | undefined {
    const beerBottle = this.inventory.itemAt(0) as BeerBottle | undefined;
    return beerBottle?.isOpen() && beerBottle.getDrink() === this.drink ? beerBottle : undefined;
  }

  nextActivity() {
    if (this.openedBottle) {
      return new CallFuxActivity(this.character, new PourDrinkInteraction(this.character, this.openedBottle));
    }
  }
}

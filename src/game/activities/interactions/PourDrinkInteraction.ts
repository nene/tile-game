import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { Interaction, InteractionType } from "./Interaction";
import { DrinkActivity } from "./../DrinkActivity";
import { GameItem } from "../../items/GameItem";
import { BeerGlass, DrinkLevel, isBeerGlass } from "../../items/BeerGlass";
import { CharacterDialog } from "../../dialogs/CharacterDialog";
import { StorageInventory } from "../../inventory/StorageInventory";
import { BeerBottle, isBeerBottle } from "../../items/BeerBottle";
import { DialogInventoryView } from "../../inventory/DialogInventoryView";
import { Table } from "../../furniture/Table";
import { Drink } from "../../items/Drink";
import { ValidationResult } from "../../questions/ValidationResult";

export class PourDrinkInteraction implements Interaction {
  private finished = false;
  private isDialogOpen = false;
  private inventory: StorageInventory;
  private dialog: CharacterDialog;
  private drink: Drink;

  constructor(private character: AcademicCharacter, beerBottle: BeerBottle) {
    this.dialog = new CharacterDialog(character);
    this.drink = beerBottle.getDrink();
    this.inventory = new StorageInventory({
      size: 2,
      isAcceptingItem: (item) => isBeerBottle(item) || isBeerGlass(item),
    });

    this.inventory.add(beerBottle);

    const beerGlass = this.character.getField("glass");
    if (beerGlass) {
      this.inventory.add(beerGlass);
      this.character.setField("glass", undefined);
    }
  }

  getType() {
    return InteractionType.beer;
  }

  private glassAndBottleFromInventory(): [BeerGlass | undefined, BeerBottle | undefined] {
    const glass = this.inventory.allItems().filter(isBeerGlass)[0];
    const bottle = this.inventory.allItems().filter(isBeerBottle)[0];
    return [glass, bottle];
  }

  tryComplete(): boolean {
    if (this.isDialogOpen) {
      return false;
    }
    const [beerGlass, beerBottle] = this.glassAndBottleFromInventory();
    if (!beerGlass || !beerBottle) {
      return false;
    }

    if (this.character.hasSkill("pouring")) {
      beerGlass.fill(beerBottle.getDrink(), DrinkLevel.full);
      beerBottle.empty();
      this.character.setField("glass", beerGlass);
      this.getTable().getInventory().add(beerBottle);
      this.finished = true;
      return true;
    }
    return false;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController, item?: GameItem) {
    if (this.isCorrectPouredDrink(item)) {
      this.isDialogOpen = true;
      ui.getAttributes().setSelectedItem(undefined);
      this.character.setField("glass", item);
      this.showRatingDialog(ui, item);
      return;
    }

    this.isDialogOpen = true;
    ui.showInventory(new DialogInventoryView({
      ui,
      character: this.character,
      inventory: this.inventory,
      text: "Palun vala õlu välja.",
      onClose: () => {
        const beerGlass = this.tryTakePouredDrinkFromInventory();
        ui.hideInventory();
        if (beerGlass) {
          this.character.setField("glass", beerGlass);
          this.showRatingDialog(ui, beerGlass);
        } else {
          this.isDialogOpen = false;
        }
      },
    }));
  }

  private isCorrectPouredDrink(item?: GameItem): item is BeerGlass {
    return Boolean(
      this.inventory.allItems().length === 0 &&
      item &&
      isBeerGlass(item) &&
      item.getDrink() === this.drink
    );
  }

  private tryTakePouredDrinkFromInventory(): BeerGlass | undefined {
    const [beerGlass, beerBottle] = this.glassAndBottleFromInventory();
    if (!beerGlass || beerGlass.getDrink() !== this.drink) {
      return undefined;
    }
    if (beerBottle) {
      this.getTable().getInventory().add(beerBottle);
    }
    return beerGlass;
  }

  private getTable(): Table {
    const table = this.character.getField("table");
    if (!table) {
      throw new Error("Can't perform PourDrinkInteraction when not sitting at table.");
    }
    return table;
  }

  private showRatingDialog(ui: UiController, beerGlass: BeerGlass) {
    const rating = this.ratePouring(beerGlass);
    this.dialog.show(ui, rating.msg, {
      onClose: () => {
        this.praiseOrPunish(rating);
        this.finished = true;
        this.isDialogOpen = false;
      }
    });
  }

  private ratePouring(beerGlass: BeerGlass): ValidationResult {
    switch (beerGlass.getLevel()) {
      case DrinkLevel.full:
        return { type: "praise", msg: "Ooo! See on ju suurepäraselt täidetud šoppen. Oled tõega kiitust väärt." };
      case DrinkLevel.almostFull:
        return { type: "neutral", msg: "Aitäh! Oled üsna tublisti valanud." };
      case DrinkLevel.half:
        return { type: "punish", msg: "No kuule! See on ju poolik šoppen. Mis jama sa mulle tood!" };
      case DrinkLevel.almostEmpty:
        return { type: "punish", msg: "See ei lähe! Ma palusin sul tuua šoppeni täie õlut, aga sina tood mulle mingi tilga šoppeni põhjas." };
      case DrinkLevel.empty:
        throw new Error("Not expecting this method to be called with empty glass.");
    }
  }

  private praiseOrPunish(rating: ValidationResult) {
    if (rating.type === "praise") {
      this.character.changeOpinion(+1);
    }
    else if (rating.type === "punish") {
      this.character.changeOpinion(-1);
    }
  }

  nextActivity() {
    if (this.finished) {
      return new DrinkActivity(this.character);
    }
  }
}

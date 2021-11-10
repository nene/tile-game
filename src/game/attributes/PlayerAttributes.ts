import { AlcoSkill } from "./AlcoSkill";
import { StorageInventory } from "../inventory/StorageInventory";
import { BeerGlass, DrinkLevel } from "../items/BeerGlass";
import { getDrink } from "../items/Drink";
import { Wallet } from "./Wallet";
import { OrgSkill } from "./OrgSkill";
import { isBottleOpener } from "../items/BottleOpener";
import { GameItem } from "../items/GameItem";
import { OpeningSkill } from "./OpeningSkill";
import { PouringSkill } from "./PouringSkill";

export class PlayerAttributes {
  public readonly inventory = new StorageInventory({ size: 5, items: [new BeerGlass(getDrink("pilsner"), DrinkLevel.full)] });
  public readonly wallet = new Wallet(25);
  public readonly alcoSkill = new AlcoSkill();
  public readonly orgSkill = new OrgSkill();
  public readonly openingSkill = new OpeningSkill();
  public readonly pouringSkill = new PouringSkill();
  private selectedItem?: GameItem;

  getSelectedItem(): GameItem | undefined {
    return this.selectedItem;
  }

  setSelectedItem(item: GameItem | undefined) {
    this.selectedItem = item;
  }

  resetForNewDay() {
    this.resetSelectedItem();
    this.resetInventory();
    this.alcoSkill.reset();
  }

  private resetSelectedItem() {
    if (this.selectedItem) {
      this.inventory.add(this.selectedItem);
      this.selectedItem = undefined;
    }
  }

  private resetInventory() {
    const openers = this.inventory.allItems().filter(isBottleOpener);
    this.inventory.clear();
    openers.forEach((item) => this.inventory.add(item))
  }
}

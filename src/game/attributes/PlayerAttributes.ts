import { AlcoSkill } from "./AlcoSkill";
import { StorageInventory } from "../inventory/StorageInventory";
import { BeerGlass, DrinkLevel } from "../items/BeerGlass";
import { getDrink } from "../items/Drink";
import { Wallet } from "./Wallet";
import { OrgSkill } from "./OrgSkill";
import { isBottleOpener } from "../items/BottleOpener";
import { GameItem } from "../items/GameItem";
import { PouringSkill } from "./PouringSkill";
import { SkillConfig } from "./Skill";
import { TermSkill } from "./TermSkill";

export class PlayerAttributes {
  public readonly inventory = new StorageInventory({
    size: 7,
    items: [
      new BeerGlass(getDrink("pilsner"), DrinkLevel.full),
      new BeerGlass(getDrink("pilsner"), DrinkLevel.almostFull)
    ],
  });
  public readonly wallet = new Wallet(25);
  public readonly alcoSkill: AlcoSkill;
  public readonly orgSkill: OrgSkill;
  public readonly pouringSkill: PouringSkill;
  public readonly termSkill: TermSkill;
  private selectedItem?: GameItem;

  constructor(cfg: SkillConfig) {
    this.alcoSkill = new AlcoSkill(cfg);
    this.orgSkill = new OrgSkill(cfg);
    this.pouringSkill = new PouringSkill(cfg);
    this.termSkill = new TermSkill(cfg);
  }

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

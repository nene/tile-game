import { AlcoSkill } from "./AlcoSkill";
import { StorageInventory } from "../inventory/StorageInventory";
import { getDrink } from "../items/Drink";
import { Wallet } from "./Wallet";
import { OrgSkill } from "./OrgSkill";
import { GameItem } from "../items/GameItem";
import { PouringSkill } from "./PouringSkill";
import { LevelUpEvent } from "./Skill";
import { TermSkill } from "./TermSkill";
import { BeerBottle } from "../items/BeerBottle";
import { BeerGlass, DrinkLevel } from "../items/BeerGlass";
import { Observable, mergeWith } from "rxjs";

export class PlayerAttributes {
  public readonly inventory = new StorageInventory({
    size: 8,
    items: [
      new BeerBottle(getDrink("tommu-hiid")),
      new BeerBottle(getDrink("pilsner")),
      new BeerBottle(getDrink("special")),
      new BeerBottle(getDrink("heineken")),
      new BeerGlass(),
      new BeerGlass(),
      new BeerGlass(),
      new BeerGlass(getDrink("tommu-hiid"), DrinkLevel.full),
    ],
  });
  public readonly wallet = new Wallet(25);
  public readonly alcoSkill: AlcoSkill;
  public readonly orgSkill: OrgSkill;
  public readonly pouringSkill: PouringSkill;
  public readonly termSkill: TermSkill;

  // When any of the skills triggers LevelUpEvent
  public levelUp$: Observable<LevelUpEvent>;

  private selectedItem?: GameItem;

  constructor() {
    this.alcoSkill = new AlcoSkill();
    this.orgSkill = new OrgSkill();
    this.pouringSkill = new PouringSkill();
    this.termSkill = new TermSkill();

    this.levelUp$ = this.alcoSkill.levelUp$.pipe(
      mergeWith(
        this.orgSkill.levelUp$,
        this.pouringSkill.levelUp$,
        this.termSkill.levelUp$,
      )
    );
  }

  getSelectedItem(): GameItem | undefined {
    return this.selectedItem;
  }

  setSelectedItem(item: GameItem | undefined) {
    this.selectedItem = item;
  }

  resetForNewDay() {
    this.resetSelectedItem();
    this.alcoSkill.reset();
  }

  private resetSelectedItem() {
    if (this.selectedItem) {
      this.inventory.add(this.selectedItem);
      this.selectedItem = undefined;
    }
  }
}

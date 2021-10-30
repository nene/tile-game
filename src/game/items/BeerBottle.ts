import { MiniGame } from "../minigames/MiniGame";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { BeerGlass } from "./BeerGlass";
import { Drink } from "./Drink";
import { BottleOpener } from "./BottleOpener";
import { GameItem, SellableGameItem } from "./GameItem";

export enum CapState {
  closed = 1,
  open = 2,
}

export class BeerBottle implements SellableGameItem {
  private spriteSheet: SpriteSheet;
  private full = true;

  constructor(private drink: Drink, private capState = CapState.closed) {
    this.spriteSheet = SpriteLibrary.get("bottle");
  }

  getName() {
    if (!this.full) {
      return "Tühi pudel";
    }
    return this.drink.name + (this.isOpen() ? " (avatud)" : "");
  }

  getDescription() {
    return this.drink.description;
  }

  getPrice() {
    return this.drink.price;
  }

  getDrink(): Drink {
    return this.drink;
  }

  empty() {
    this.full = false;
  }

  isEmpty(): boolean {
    return !this.full;
  }

  open() {
    this.capState = CapState.open;
  }

  isOpen(): boolean {
    return this.capState === CapState.open;
  }

  getSprite(): Sprite {
    if (this.full) {
      return this.spriteSheet.getSprite([this.capState, this.drink.bottleSpriteIndex]);
    } else {
      return this.spriteSheet.getSprite([1, 0]);
    }
  }

  combine(item: GameItem): MiniGame | undefined {
    if (item instanceof BeerGlass) {
      return item.combine(this); // Keep main logic in beer-glass
    }
    if (item instanceof BottleOpener) {
      return item.combine(this); // Keep main logic in bottle-opener
    }
  }

  clone() {
    return new BeerBottle(this.drink, this.capState);
  }
}

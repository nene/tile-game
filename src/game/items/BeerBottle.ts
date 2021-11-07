import { MiniGame } from "../minigames/MiniGame";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { isBeerGlass } from "./BeerGlass";
import { Drink } from "./Drink";
import { isBottleOpener } from "./BottleOpener";
import { GameItem, SellableGameItem } from "./GameItem";
import { OpeningGame } from "../minigames/OpeningGame";

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

  fill(drink: Drink) {
    this.drink = drink;
    this.full = true;
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
    if (isBeerGlass(item)) {
      return item.combine(this); // Keep main logic in beer-glass
    }
    if (isBottleOpener(item) && !this.isOpen()) {
      return new OpeningGame(this, item);
    }
  }

  clone() {
    return new BeerBottle(this.drink, this.capState);
  }
}

export const isBeerBottle = (item: GameItem): item is BeerBottle => item instanceof BeerBottle;

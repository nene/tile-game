import { MiniGame } from "../minigames/MiniGame";
import { PouringGame } from "../minigames/PouringGame";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { Drink, DrinkColor } from "./Drink";
import { BeerBottle } from "./BeerBottle";
import { GameItem } from "./GameItem";

export enum DrinkLevel {
  empty = 0,
  almostEmpty = 1,
  half = 2,
  almostFull = 3,
  full = 4,
}

export class BeerGlass implements GameItem {
  private spriteSheet: SpriteSheet;
  private smallSpriteSheet: SpriteSheet;

  constructor(private drink?: Drink, private level: DrinkLevel = DrinkLevel.empty) {
    this.spriteSheet = SpriteLibrary.get("beer-glass-lg");
    this.smallSpriteSheet = SpriteLibrary.get("beer-glass-sm");
  }

  combine(item: GameItem): MiniGame | undefined {
    if (item instanceof BeerBottle && !item.isEmpty() && item.isOpen() && this.level === DrinkLevel.empty) {
      return new PouringGame(this, item);
    }
  }

  getName() {
    switch (this.level) {
      case DrinkLevel.empty: return "Tühi šoppen";
      case DrinkLevel.almostEmpty: return "Peaaegu tühi šoppen";
      case DrinkLevel.half: return "Poolik šoppen";
      case DrinkLevel.almostFull: return "Peaaegu täis šoppen";
      case DrinkLevel.full:
        switch (this.drink?.color) {
          case DrinkColor.water: return "Šoppen veega";
          case DrinkColor.lemonade: return "Šoppen limonaadiga";
          default: return "Šoppen õllega";
        }
    }
  }

  getDescription() {
    return "Harilik klaasist šoppen";
  }

  getPrice() {
    return 0;
  }

  fill(drink: Drink | undefined, level: DrinkLevel) {
    this.drink = drink;
    this.level = level;
  }

  consume() {
    if (this.level > DrinkLevel.empty) {
      this.level--;
    }
  }

  getLevel(): DrinkLevel {
    return this.level;
  }

  getDrink(): Drink | undefined {
    return this.drink;
  }

  getSprite(): Sprite {
    return this.spriteSheet.getSprite([this.level, this.drink?.color ?? 0]);
  }

  getSmallSprite(): Sprite {
    return this.smallSpriteSheet.getSprite([this.level, this.drink?.color ?? 0]);
  }

  clone() {
    return new BeerGlass(this.drink, this.level);
  }
}

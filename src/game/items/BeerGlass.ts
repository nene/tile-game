import { MiniGame } from "../minigames/MiniGame";
import { PouringGame } from "../minigames/PouringGame";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { Drink } from "./Drink";
import { isBeerBottle } from "./BeerBottle";
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
    if (isBeerBottle(item) && !item.isEmpty() && item.isOpen() && this.level === DrinkLevel.empty) {
      return new PouringGame(this, item);
    }
  }

  getName() {
    return "Šoppen";
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
    return this.level > DrinkLevel.empty ? this.drink : undefined;
  }

  getSprite(): Sprite {
    return this.spriteSheet.getSprite([this.level, this.drink?.color ?? 0]);
  }

  getSmallSprite(): Sprite {
    return this.smallSpriteSheet.getSprite([this.level, this.drink?.color ?? 0]);
  }
}

export const isBeerGlass = (item: GameItem): item is BeerGlass => item instanceof BeerGlass;

export const isEmptyBeerGlass = (item: GameItem): item is BeerGlass => isBeerGlass(item) && item.getLevel() === DrinkLevel.empty;

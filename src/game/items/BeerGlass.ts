import { MiniGame } from "../minigames/MiniGame";
import { PouringGame } from "../minigames/PouringGame";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { SpriteSheet } from "../SpriteSheet";
import { BeerBottle } from "./BeerBottle";
import { GameItem } from "./GameItem";

export enum BeerLevel {
  empty = 0,
  almostEmpty = 1,
  half = 2,
  almostFull = 3,
  full = 4,
}

export class BeerGlass implements GameItem {
  private spriteSheet: SpriteSheet;
  private smallSpriteSheet: SpriteSheet;

  constructor(private level: BeerLevel) {
    this.spriteSheet = SpriteLibrary.get("beer-glass-lg");
    this.smallSpriteSheet = SpriteLibrary.get("beer-glass-sm");
  }

  combine(item: GameItem): GameItem[] | MiniGame {
    if (item instanceof BeerBottle && !item.isEmpty() && item.isOpen() && this.level === BeerLevel.empty) {
      return new PouringGame(this, item);
    }
    return [];
  }

  getName() {
    switch (this.level) {
      case BeerLevel.empty: return "Tühi shoppen";
      case BeerLevel.almostEmpty: return "Peaaegu tühi shoppen";
      case BeerLevel.half: return "Poolik shoppen";
      case BeerLevel.almostFull: return "Peaaegu täis shoppen";
      case BeerLevel.full: return "Shoppen õllega";
    }
  }

  fill(level: BeerLevel) {
    this.level = level;
  }

  drink() {
    if (this.level > BeerLevel.empty) {
      this.level--;
    }
  }

  getLevel(): BeerLevel {
    return this.level;
  }

  getSprite(): Sprite {
    return this.spriteSheet.getSprite([this.level, 0]);
  }

  getSmallSprite(): Sprite {
    return this.smallSpriteSheet.getSprite([this.level, 0]);
  }
}

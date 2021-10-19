import { MiniGame } from "../minigames/MiniGame";
import { PouringGame } from "../minigames/PouringGame";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { Beer } from "./Beer";
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
  private beer?: Beer;

  constructor(private level: BeerLevel = BeerLevel.empty) {
    this.spriteSheet = SpriteLibrary.get("beer-glass-lg");
    this.smallSpriteSheet = SpriteLibrary.get("beer-glass-sm");
  }

  combine(item: GameItem): MiniGame | undefined {
    if (item instanceof BeerBottle && !item.isEmpty() && item.isOpen() && this.level === BeerLevel.empty) {
      return new PouringGame(this, item);
    }
  }

  getName() {
    switch (this.level) {
      case BeerLevel.empty: return "Tühi šoppen";
      case BeerLevel.almostEmpty: return "Peaaegu tühi šoppen";
      case BeerLevel.half: return "Poolik šoppen";
      case BeerLevel.almostFull: return "Peaaegu täis šoppen";
      case BeerLevel.full: return "Šoppen õllega";
    }
  }

  fill(beer: Beer, level: BeerLevel) {
    this.beer = beer;
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

  getBeer(): Beer | undefined {
    return this.beer;
  }

  getSprite(): Sprite {
    return this.spriteSheet.getSprite([this.level, this.beer?.color ?? 0]);
  }

  getSmallSprite(): Sprite {
    return this.smallSpriteSheet.getSprite([this.level, this.beer?.color ?? 0]);
  }

  clone() {
    return new BeerGlass(this.level);
  }
}

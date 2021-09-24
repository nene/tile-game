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

  constructor(private level: BeerLevel, sprites: SpriteLibrary) {
    this.spriteSheet = sprites.get("beer-lg");
    this.smallSpriteSheet = sprites.get("beer-sm");
  }

  combine(item: GameItem): GameItem[] {
    if (item instanceof BeerBottle) {
      this.fill();
      return [this];
    }
    return [];
  }

  getName() {
    return "Glass of beer";
  }

  fill() {
    this.level = BeerLevel.full;
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

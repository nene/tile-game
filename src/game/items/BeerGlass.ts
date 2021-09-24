import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { SpriteSheet } from "../SpriteSheet";
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

  getName() {
    return "Glass of beer";
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

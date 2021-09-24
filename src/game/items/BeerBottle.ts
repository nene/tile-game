import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { SpriteSheet } from "../SpriteSheet";
import { BeerGlass } from "./BeerGlass";
import { GameItem } from "./GameItem";

export enum BeerType {
  alexander = 1,
  heineken = 2,
  special = 3,
}

const beerNames = {
  [BeerType.alexander]: "Alexander",
  [BeerType.heineken]: "Heineken",
  [BeerType.special]: "Special",
}

export class BeerBottle implements GameItem {
  private spriteSheet: SpriteSheet;
  private full = true;

  constructor(private type: BeerType, sprites: SpriteLibrary) {
    this.spriteSheet = sprites.get("bottle");
  }

  getName() {
    return beerNames[this.type];
  }

  empty() {
    this.full = false;
  }

  isEmpty(): boolean {
    return !this.full;
  }

  getSprite(): Sprite {
    if (this.full) {
      return this.spriteSheet.getSprite([1, this.type]);
    } else {
      return this.spriteSheet.getSprite([1, 0]);
    }
  }

  combine(item: GameItem): GameItem[] {
    if (item instanceof BeerGlass) {
      return item.combine(this); // Keep main logic in beer-glass
    }
    return [];
  }
}

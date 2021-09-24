import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { SpriteSheet } from "../SpriteSheet";
import { BeerGlass } from "./BeerGlass";
import { GameItem } from "./GameItem";

export enum BeerType {
  empty = 0,
  alexander = 1,
  heineken = 2,
  special = 3,
}

const beerNames = {
  [BeerType.empty]: "Tühi pudel",
  [BeerType.alexander]: "Alexander",
  [BeerType.heineken]: "Heineken",
  [BeerType.special]: "Special",
}

export class BeerBottle implements GameItem {
  private spriteSheet: SpriteSheet;

  constructor(private type: BeerType, sprites: SpriteLibrary) {
    this.spriteSheet = sprites.get("bottle");
  }

  getName() {
    return beerNames[this.type];
  }

  empty() {
    this.type = BeerType.empty;
  }

  isEmpty(): boolean {
    return this.type === BeerType.empty;
  }

  getSprite(): Sprite {
    return this.spriteSheet.getSprite([1, this.type]);
  }

  combine(item: GameItem): GameItem[] {
    if (item instanceof BeerGlass) {
      return item.combine(this); // Keep main logic in beer-glass
    }
    return [];
  }
}

import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { GameItem } from "./GameItem";

export enum BeerType {
  alexander = 0,
  heineken = 1,
  special = 2,
}

const beerNames = {
  [BeerType.alexander]: "Alexander",
  [BeerType.heineken]: "Heineken",
  [BeerType.special]: "Special",
}

export class BeerBottle implements GameItem {
  private sprite: Sprite;

  constructor(private type: BeerType, sprites: SpriteLibrary) {
    this.sprite = sprites.get("bottle").getSprite([1, type]);
  }

  getName() {
    return beerNames[this.type];
  }

  getSprite(): Sprite {
    return this.sprite;
  }
}

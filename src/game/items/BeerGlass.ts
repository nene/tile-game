import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { GameItem } from "./GameItem";

export class BeerGlass implements GameItem {
  private sprite: Sprite;

  constructor(sprites: SpriteLibrary) {
    this.sprite = sprites.get("beer").getSprite([1, 0]);
  }

  getName() {
    return "Glass of beer";
  }

  getSprite(): Sprite {
    return this.sprite;
  }
}

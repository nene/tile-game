import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { GameItem } from "./GameItem";

export class Book implements GameItem {
  getName() {
    return "Majaraamat";
  }

  getSprite(): Sprite {
    return SpriteLibrary.getSprite("book");
  }

  combine() {
    return undefined;
  }
}

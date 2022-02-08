import { Sprite } from "../sprites/Sprite";
import { ItemSpriteLibrary } from "./ItemSpriteLibrary";
import { GameItem } from "./GameItem";

export class Ocean implements GameItem {
  getName() {
    return "Ookean";
  }

  getSprite(): Sprite {
    return ItemSpriteLibrary.getSprite("ocean");
  }

  combine() {
    return undefined;
  }
}

export const isOcean = (item: GameItem): item is Ocean => item instanceof Ocean;

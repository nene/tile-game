import { MiniGame } from "../minigames/MiniGame";
import { Sprite } from "../sprites/Sprite";

export interface GameItem {
  getName: () => string;
  getSprite: () => Sprite;
  combine: (item: GameItem) => MiniGame | undefined;
}

export interface SellableGameItem extends GameItem {
  getDescription: () => string;
  getPrice: () => number;
  clone: () => GameItem;
}

import { MiniGame } from "../minigames/MiniGame";
import { Sprite } from "../sprites/Sprite";

export interface GameItem {
  getName: () => string;
  getDescription: () => string;
  getPrice: () => number;
  getSprite: () => Sprite;
  combine: (item: GameItem) => MiniGame | undefined;
  clone: () => GameItem;
}

import { MiniGame } from "../minigames/MiniGame";
import { Sprite } from "../Sprite";

export interface GameItem {
  getName: () => string;
  getSprite: () => Sprite;
  combine: (item: GameItem) => GameItem[] | MiniGame;
  clone: () => GameItem;
}

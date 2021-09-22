import { Sprite } from "../Sprite";

export interface GameItem {
  getName: () => string;
  getSprite: () => Sprite;
}

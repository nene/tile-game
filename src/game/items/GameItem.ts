import { MiniGame } from "../minigames/MiniGame";
import { Sprite } from "../sprites/Sprite";

export interface GameItem {
  readonly type?: any;
  getName: () => string;
  getSprite: () => Sprite;
  combine: (item: GameItem) => MiniGame | undefined;
}

export interface SellableGameItem extends GameItem {
  getDescription: () => string;
  getPrice: () => number;
  clone: () => GameItem;
}

export type SmallGameItem = GameItem & { getSmallSprite(): Sprite };

export const isSmallGameItem = (item: GameItem): item is SmallGameItem => "getSmallSprite" in item;

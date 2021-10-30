import { GameItem, SellableGameItem } from "./GameItem";

export interface BottleOpener extends SellableGameItem {
  readonly type: 'bottle-opener';
  getCaptureDistance: () => number;
  hasRibbon: () => boolean;
}

export function isBottleOpener(item: GameItem): item is BottleOpener {
  return item.type === "bottle-opener";
}

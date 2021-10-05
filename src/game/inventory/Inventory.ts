import { GameItem } from "../items/GameItem";

export interface Inventory {
  size: () => number;
  itemAt: (index: number) => GameItem | undefined;
  takeAt: (index: number) => GameItem | undefined;
  isWritable: () => this is WritableInventory;
}

export interface WritableInventory extends Inventory {
  placeAt: (index: number, item: GameItem) => void;
}

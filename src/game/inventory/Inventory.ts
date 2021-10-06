import { GameItem } from "../items/GameItem";
import { Wallet } from "../Wallet";

export interface Inventory {
  size: () => number;
  allItems: () => GameItem[];
  itemAt: (index: number) => GameItem | undefined;
  takeAt: (index: number, wallet: Wallet) => GameItem | undefined;
  isWritable: () => this is WritableInventory;
}

export interface WritableInventory extends Inventory {
  placeAt: (index: number, item: GameItem) => void;
  isFull: () => boolean;
}

import { GameItem } from "../items/GameItem";
import { Wallet } from "../Wallet";

export interface Inventory {
  size: () => number;
  allItems: () => GameItem[];
  itemAt: (index: number) => GameItem | undefined;
  isWritable: () => this is WritableInventory;
  isTakeable: () => this is TakeableInventory;
  isCombinable: () => boolean;
}

export interface TakeableInventory extends Inventory {
  takeAt: (index: number, wallet: Wallet) => GameItem | undefined;
}

export interface WritableInventory extends TakeableInventory {
  placeAt: (index: number, item: GameItem) => void;
  isFull: () => boolean;
}

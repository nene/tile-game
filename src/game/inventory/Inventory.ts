import { GameItem } from "../items/GameItem";
import { Wallet } from "../Wallet";

export interface Inventory {
  size: () => number;
  itemAt: (index: number) => GameItem | undefined;
  takeAt: (index: number, wallet: Wallet) => GameItem | undefined;
  isWritable: () => this is WritableInventory;
}

export interface WritableInventory extends Inventory {
  placeAt: (index: number, item: GameItem) => void;
  removeAt: (index: number) => void;
}

import { fill } from "lodash";
import { WritableInventory } from "./Inventory";
import { GameItem } from "../items/GameItem";

type Slot = GameItem | undefined;

// Inventory for storing various items, like a chest
export class StorageInventory implements WritableInventory {
  private slots: Slot[];
  private _size: number;

  constructor({ size, items }: { size: number, items?: GameItem[] }) {
    this._size = size;
    this.slots = fill(new Array(size), undefined);
    items?.forEach((item, i) => {
      this.slots[i] = item;
    });
  }

  placeAt(index: number, item: GameItem) {
    if (!isFilledSlot(this.slots[index])) {
      this.slots[index] = item;
    }
  }

  isWritable() {
    return true;
  }

  takeAt(index: number) {
    const item = this.slots[index];
    this.slots[index] = undefined;
    return item;
  }

  size(): number {
    return this._size;
  }

  itemAt(index: number): GameItem | undefined {
    return this.slots[index];
  }

  allItems() {
    return this.slots.filter(isFilledSlot);
  }
}

function isFilledSlot(x: Slot): x is GameItem {
  return x !== undefined;
}

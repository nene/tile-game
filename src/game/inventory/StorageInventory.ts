import { fill, negate } from "lodash";
import { WritableInventory } from "./Inventory";
import { GameItem } from "../items/GameItem";
import { Wallet } from "../attributes/Wallet";
import { isDefined } from "../utils/isDefined";

type Slot = GameItem | undefined;

interface StorageInventoryConfig {
  size: number;
  items?: GameItem[];
  isAcceptingItem?: (item: GameItem) => boolean;
}

// Inventory for storing various items, like a chest
export class StorageInventory implements WritableInventory {
  private slots: Slot[];
  private _size: number;
  public isAcceptingItem: (item: GameItem) => boolean;

  constructor({ size, items, isAcceptingItem }: StorageInventoryConfig) {
    this._size = size;
    this.slots = fill(new Array(size), undefined);
    items?.forEach((item, i) => {
      this.slots[i] = item;
    });
    this.isAcceptingItem = isAcceptingItem || (() => true);
  }

  placeAt(index: number, item: GameItem) {
    if (!this.isAcceptingItem(item)) {
      throw new Error(`This inventory doesn't accept ${item.getName()}`);
    }
    if (!isDefined(this.slots[index])) {
      this.slots[index] = item;
    }
  }

  add(item: GameItem) {
    const emptyIndex = this.slots.findIndex(negate(isDefined));
    if (emptyIndex > -1) {
      this.placeAt(emptyIndex, item);
    } else {
      throw new Error(`Inventory full, can't add ${item.getName()}`);
    }
  }

  isWritable() {
    return true;
  }

  isTakeable() {
    return true;
  }

  isCombinable() {
    return true;
  }

  takeAt(index: number, wallet: Wallet) {
    const item = this.slots[index];
    this.slots[index] = undefined;
    return item;
  }

  takeFirstOfKind<T extends GameItem>(predicate: (item: GameItem) => item is T): T | undefined {
    for (let i = 0; i < this.slots.length; i++) {
      const item = this.slots[i];
      if (item && predicate(item)) {
        return item;
      }
    }
    return undefined;
  }

  size(): number {
    return this._size;
  }

  itemAt(index: number): GameItem | undefined {
    return this.slots[index];
  }

  allItems() {
    return this.slots.filter(isDefined);
  }

  isFull() {
    return this._size === this.allItems().length;
  }

  clear() {
    this.slots = fill(new Array(this.slots.length), undefined);
  }
}

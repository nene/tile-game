import { fill } from "lodash";
import { Coord } from "./Coord";
import { GameItem } from "./items/GameItem";

type Slot = GameItem | undefined;

export class InventoryImpl {
  private slots: Slot[];
  private _size: Coord;

  constructor({ size: [xSize, ySize], items }: { size: Coord, items?: GameItem[] }) {
    this._size = [xSize, ySize];
    this.slots = fill(new Array(xSize * ySize), undefined);
    items?.forEach((item) => this.add(item));
  }

  addAt(coord: Coord, item: GameItem) {
    const index = this.coordToIndex(coord);
    if (!isFilledSlot(this.slots[index])) {
      this.slots[index] = item;
    }
  }

  add(item: GameItem) {
    const index = this.slots.findIndex((slot) => !isFilledSlot(slot));
    if (index !== -1) {
      this.slots[index] = item;
    }
  }

  remove(item: GameItem) {
    const index = this.slots.findIndex((slot) => slot === item);
    if (index !== -1) {
      this.slots[index] = undefined;
    }
  }

  size(): Coord {
    return this._size;
  }

  itemAt(coord: Coord): GameItem | undefined {
    return this.slots[this.coordToIndex(coord)];
  }

  isFull(): boolean {
    return this.slots.every(isFilledSlot);
  }

  private coordToIndex([x, y]: Coord): number {
    return this._size[1] * y + x;
  }
}

function isFilledSlot(x: Slot): x is GameItem {
  return x !== undefined;
}

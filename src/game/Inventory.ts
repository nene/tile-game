import { Coord } from "./Coord";
import { GameItem } from "./items/GameItem";

export class Inventory {
  private _items: GameItem[];
  private _size: Coord;

  constructor(cfg: { size: Coord, items?: GameItem[] }) {
    this._size = cfg.size;
    this._items = cfg.items || [];
  }

  add(item: GameItem) {
    if (!this.isFull()) {
      this._items = [...this._items, item];
    }
  }

  remove(item: GameItem) {
    this._items = this._items.filter((it) => it !== item);
  }

  items(): GameItem[] {
    return this._items;
  }

  size(): Coord {
    return this._size;
  }

  itemAt([x, y]: Coord): GameItem | undefined {
    const index = this._size[1] * y + x;
    return this._items[index];
  }

  maxItems(): number {
    return this._size[0] * this._size[1];
  }

  isFull(): boolean {
    return this._items.length >= this.maxItems();
  }
}

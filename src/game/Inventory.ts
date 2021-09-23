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
    if (this._items.length < this.maxItems()) {
      this._items = [...this._items, item];
    }
  }

  remove(item: GameItem) {
    this._items = this._items.filter((it) => it !== item);
  }

  items(): GameItem[] {
    return this._items;
  }

  maxItems(): number {
    return this._size[0] * this._size[1];
  }
}

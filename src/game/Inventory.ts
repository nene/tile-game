import { Coord } from "./Coord";
import { GameItem } from "./items/GameItem";

type OnChangeCallback = (items: GameItem[]) => void;

export class Inventory {
  private _items: GameItem[];
  private _size: Coord;
  private _callbacks: OnChangeCallback[] = [];

  constructor(cfg: { size: Coord, items?: GameItem[] }) {
    this._size = cfg.size;
    this._items = cfg.items || [];
  }

  add(item: GameItem) {
    if (this._items.length < this.maxItems()) {
      this._items = [...this._items, item];
      this.notify();
    }
  }

  remove(item: GameItem) {
    this._items = this._items.filter((it) => it !== item);
    this.notify();
  }

  items(): GameItem[] {
    return this._items;
  }

  maxItems(): number {
    return this._size[0] * this._size[1];
  }

  onChange(callback: OnChangeCallback) {
    this._callbacks.push(callback);
  }

  private notify() {
    this._callbacks.forEach((cb) => cb(this._items));
  }
}

import { GameItem } from "./items/GameItem";

type OnChangeCallback = (items: GameItem[]) => void;

export class Inventory {
  private _items: GameItem[] = [];
  private _size: number;
  private _callbacks: OnChangeCallback[] = [];

  constructor(cfg: { size: number }) {
    this._size = cfg.size;
  }

  add(item: GameItem) {
    if (this._items.length < this._size) {
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

  size(): number {
    return this._size;
  }

  onChange(callback: OnChangeCallback) {
    this._callbacks.push(callback);
  }

  private notify() {
    this._callbacks.forEach((cb) => cb(this._items));
  }
}

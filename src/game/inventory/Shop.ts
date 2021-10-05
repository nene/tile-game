import { BeerBottle } from "../items/BeerBottle";
import { Inventory } from "./Inventory";

export class Shop implements Inventory {
  constructor(private items: BeerBottle[]) {
  }

  size() {
    return this.items.length;
  }

  itemAt(index: number) {
    return this.items[index];
  }

  // Purchases an item
  takeAt(index: number) {
    return this.items[index]?.clone();
  }

  isWritable() {
    return false;
  }

  allItems() {
    return this.items;
  }
}

import { BeerBottle } from "../items/BeerBottle";
import { Wallet } from "../Wallet";
import { TakeableInventory } from "./Inventory";

export class Shop implements TakeableInventory {
  constructor(private items: BeerBottle[]) {
  }

  size() {
    return this.items.length;
  }

  itemAt(index: number) {
    return this.items[index];
  }

  // Purchases an item
  takeAt(index: number, wallet: Wallet) {
    const item = this.items[index];
    if (!item) {
      return;
    }
    const price = item.getBeer().price;
    if (wallet.getMoney() >= price) {
      wallet.remove(price);
      return item.clone();
    }
  }

  isWritable() {
    return false;
  }

  isTakeable() {
    return true;
  }

  allItems() {
    return this.items;
  }
}

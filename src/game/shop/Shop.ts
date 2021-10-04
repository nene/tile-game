import { BeerBottle } from "../items/BeerBottle";

export class Shop {
  constructor(private items: BeerBottle[]) {
  }

  getItems(): BeerBottle[] {
    return this.items;
  }

  purchase(item: BeerBottle): BeerBottle {
    return item.clone();
  }
}

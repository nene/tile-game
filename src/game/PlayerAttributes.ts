import { Drunkenness } from "./Drunkenness";
import { StorageInventory } from "./inventory/StorageInventory";
import { BeerGlass, DrinkLevel } from "./items/BeerGlass";
import { getDrink } from "./items/Drink";
import { Wallet } from "./Wallet";

export class PlayerAttributes {
  public readonly inventory = new StorageInventory({ size: 5, items: [new BeerGlass(getDrink("pilsner"), DrinkLevel.full)] });
  public readonly wallet = new Wallet(25);
  public readonly drunkenness = new Drunkenness();
}

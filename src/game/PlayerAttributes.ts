import { Drunkenness } from "./Drunkenness";
import { StorageInventory } from "./inventory/StorageInventory";
import { BottleOpener } from "./items/BottleOpener";
import { Wallet } from "./Wallet";

export class PlayerAttributes {
  public readonly inventory = new StorageInventory({ size: 5 });
  public readonly wallet = new Wallet(10);
  public readonly drunkenness = new Drunkenness();

  constructor() {
    this.inventory.placeAt(0, new BottleOpener());
  }
}

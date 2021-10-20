import { Drunkenness } from "./Drunkenness";
import { StorageInventory } from "./inventory/StorageInventory";
import { Wallet } from "./Wallet";

export class PlayerAttributes {
  public readonly inventory = new StorageInventory({ size: 5 });
  public readonly wallet = new Wallet(25);
  public readonly drunkenness = new Drunkenness();
}

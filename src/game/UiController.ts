import { Inventory } from "./Inventory";
import { PixelScreen } from "./PixelScreen";
import { Coord } from "./Coord";
import { GameItem } from "./items/GameItem";
import { InventoryController } from "./InventoryController";
import { Dialog } from "./Dialog";
import { Overlay } from "./Overlay";

export class UiController {
  private inventoryController: InventoryController;
  private dialog?: Dialog;

  constructor(private playerInventory: Inventory) {
    this.inventoryController = new InventoryController(playerInventory);
  }

  getSelectedItem(): GameItem | undefined {
    return this.inventoryController.getSelectedItem();
  }

  removeSelectedItem() {
    this.inventoryController.removeSelectedItem();
  }

  showInventory(inventory: Inventory, title?: string) {
    this.inventoryController.showInventory(inventory, title);
  }

  paint(screen: PixelScreen) {
    if (this.dialog) {
      Overlay.paint(screen);
      this.dialog.paint(screen);
    } else {
      this.inventoryController.paint(screen);
    }
  }

  handleClick(screenCoord: Coord): boolean {
    if (this.dialog) {
      if (this.dialog.isCoordInView(screenCoord)) {
        this.dialog = undefined; // Close the dialog
      }
      return true;
    }
    return this.inventoryController.handleClick(screenCoord);
  }

  handleHover(screenCoord: Coord): boolean {
    return this.inventoryController.handleHover(screenCoord);
  }

  showDialog(dialog: Dialog) {
    this.dialog = dialog;
  }
}

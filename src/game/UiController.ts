import { Inventory } from "./Inventory";
import { PixelScreen } from "./PixelScreen";
import { Coord } from "./Coord";
import { GameItem } from "./items/GameItem";
import { InventoryController } from "./InventoryController";
import { Dialog } from "./Dialog";
import { Overlay } from "./Overlay";
import { CursorController } from "./CursorController";

export class UiController {
  private inventoryController: InventoryController;
  private cursorController: CursorController;
  private dialog?: Dialog;

  constructor(playerInventory: Inventory) {
    this.inventoryController = new InventoryController(playerInventory);
    this.cursorController = new CursorController();
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

    // Cursor is always painted on top
    this.cursorController.paint(screen);
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

  handleMouseMove(screenCoord: Coord): boolean {
    this.cursorController.handleMouseMove(screenCoord);
    return this.inventoryController.handleMouseMove(screenCoord);
  }

  showDialog(dialog: Dialog) {
    this.dialog = dialog;
  }
}

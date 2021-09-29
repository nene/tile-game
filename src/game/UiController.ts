import { Inventory } from "./Inventory";
import { PixelScreen } from "./PixelScreen";
import { Coord } from "./Coord";
import { GameItem } from "./items/GameItem";
import { InventoryController } from "./InventoryController";
import { Dialog } from "./Dialog";
import { Overlay } from "./Overlay";
import { CursorController } from "./CursorController";
import { MiniGame } from "./minigames/MiniGame";

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

  tick() {
    this.inventoryController.tick();
  }

  paint(screen: PixelScreen) {
    if (this.getMiniGame()) {
      this.getMiniGame()?.paint(screen);
      return;
    }

    if (this.dialog) {
      Overlay.paint(screen);
      this.dialog.paint(screen);
    } else {
      this.inventoryController.paint(screen);
    }

    // Cursor is always painted on top
    this.cursorController.paint(screen);
  }

  isGamePaused(): boolean {
    return this.inventoryController.isGamePaused() || Boolean(this.dialog);
  }

  isGameWorldVisible(): boolean {
    return !this.inventoryController.getMiniGame();
  }

  handleClick(screenCoord: Coord): boolean {
    if (this.getMiniGame()) {
      this.getMiniGame()?.handleClick(screenCoord);
      return true;
    }

    if (this.dialog) {
      if (this.dialog.isCoordInView(screenCoord)) {
        this.dialog = undefined; // Close the dialog
      }
      return true;
    }
    return this.inventoryController.handleClick(screenCoord);
  }

  handleMouseMove(screenCoord: Coord) {
    this.getMiniGame()?.handleMouseMove(screenCoord);

    this.cursorController.handleMouseMove(screenCoord);
    this.inventoryController.handleMouseMove(screenCoord);
  }

  handleMouseDown(screenCoord: Coord) {
    this.getMiniGame()?.handleMouseDown(screenCoord);
  }

  handleMouseUp(screenCoord: Coord) {
    this.getMiniGame()?.handleMouseUp(screenCoord);
  }

  private getMiniGame(): MiniGame | undefined {
    return this.inventoryController.getMiniGame();
  }

  showDialog(dialog: Dialog) {
    this.dialog = dialog;
  }
}

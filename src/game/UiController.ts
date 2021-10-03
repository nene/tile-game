import { Inventory } from "./Inventory";
import { PixelScreen } from "./PixelScreen";
import { Coord } from "./Coord";
import { GameItem } from "./items/GameItem";
import { InventoryController } from "./InventoryController";
import { Dialog } from "./Dialog";
import { Overlay } from "./Overlay";
import { CursorController } from "./CursorController";
import { MiniGame } from "./minigames/MiniGame";
import { Wallet } from "./Wallet";
import { ShopView } from "./shop/ShopView";

export class UiController {
  private inventoryController: InventoryController;
  private cursorController: CursorController;
  private dialog?: Dialog;
  private wallet = new Wallet(112);
  private shopView = new ShopView();

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

    Overlay.paint(screen);
    this.shopView.paint(screen);
    this.wallet.paint(screen);

    // Cursor is always painted on top
    this.cursorController.paint(screen);
  }

  isGameWorldActive(): boolean {
    return !this.inventoryController.isObjectInventoryShown() && !this.dialog;
  }

  isGameWorldVisible(): boolean {
    return !this.inventoryController.getMiniGame();
  }

  handleClick(screenCoord: Coord): boolean {
    this.shopView.handleMouseEvent("click", screenCoord);

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
    this.shopView.handleMouseEvent("mousemove", screenCoord);
  }

  handleMouseDown(screenCoord: Coord) {
    this.getMiniGame()?.handleMouseDown(screenCoord);
    this.shopView.handleMouseEvent("mousedown", screenCoord);
  }

  handleMouseUp(screenCoord: Coord) {
    this.getMiniGame()?.handleMouseUp(screenCoord);
    this.shopView.handleMouseEvent("mouseup", screenCoord);
  }

  private getMiniGame(): MiniGame | undefined {
    return this.inventoryController.getMiniGame();
  }

  showDialog(dialog: Dialog) {
    this.dialog = dialog;
  }
}

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
import { Shop } from "./shop/Shop";
import { BeerBottle } from "./items/BeerBottle";
import { getBeer } from "./items/Beer";

export class UiController {
  private inventoryController: InventoryController;
  private cursorController: CursorController;
  private dialog?: Dialog;
  private wallet = new Wallet(112);
  private shopView = new ShopView(new Shop([
    new BeerBottle(getBeer("alexander")),
    new BeerBottle(getBeer("pilsner")),
    new BeerBottle(getBeer("tommu-hiid")),
    new BeerBottle(getBeer("limonaad")),
    new BeerBottle(getBeer("bock")),
    new BeerBottle(getBeer("porter")),
    new BeerBottle(getBeer("special")),
    new BeerBottle(getBeer("kriek")),
  ]));

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
    screen.withFixedCoords(() => {
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

      // Overlay.paint(screen);
      // this.shopView.paint(screen);
      this.wallet.paint(screen);

      // Cursor is always painted on top
      this.cursorController.paint(screen);
    });
  }

  isGameWorldActive(): boolean {
    return !this.inventoryController.isObjectInventoryShown() && !this.dialog;
  }

  isGameWorldVisible(): boolean {
    return !this.inventoryController.getMiniGame();
  }

  handleMouseEvent(type: string, coord: Coord, wheelDelta?: Coord): boolean | undefined {
    let stopPropagation: boolean | undefined = undefined;
    stopPropagation = stopPropagation || this.shopView.handleMouseEvent(type, coord, wheelDelta);
    stopPropagation = stopPropagation || this.getMiniGame()?.handleMouseEvent(type, coord, wheelDelta);
    stopPropagation = stopPropagation || this.cursorController.handleMouseEvent(type, coord, wheelDelta);
    stopPropagation = stopPropagation || this.handleDialogClose(type, coord, wheelDelta);
    stopPropagation = stopPropagation || this.inventoryController.handleMouseEvent(type, coord, wheelDelta);
    if (stopPropagation) {
      return true;
    }
  }

  private handleDialogClose(type: string, coord: Coord, wheelDelta?: Coord): boolean | undefined {
    if (this.dialog && type === "click") {
      if (this.dialog.isCoordInView(coord)) {
        this.dialog = undefined; // Close the dialog
      }
      return true;
    }
  }

  private getMiniGame(): MiniGame | undefined {
    return this.inventoryController.getMiniGame();
  }

  showDialog(dialog: Dialog) {
    this.dialog = dialog;
  }
}

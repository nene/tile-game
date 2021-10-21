import { PixelScreen } from "./PixelScreen";
import { GameItem } from "./items/GameItem";
import { InventoryController } from "./InventoryController";
import { Dialog } from "./dialogs/Dialog";
import { Overlay } from "./Overlay";
import { CursorController } from "./CursorController";
import { MiniGame } from "./minigames/MiniGame";
import { ScoreBoard } from "./ScoreBoard";
import { GameEvent } from "./GameEvent";
import { Inventory } from "./inventory/Inventory";
import { InventoryView } from "./inventory/InventoryView";
import { PlayerAttributes } from "./PlayerAttributes";
import { Coord } from "./Coord";
import { Clock } from "./Clock";

export class UiController {
  private inventoryController: InventoryController;
  private cursorController: CursorController;
  private dialog?: Dialog;
  private scoreBoard: ScoreBoard;
  private clock = new Clock();

  constructor(private attributes: PlayerAttributes) {
    this.inventoryController = new InventoryController(attributes);
    this.cursorController = new CursorController();
    this.scoreBoard = new ScoreBoard([269, 0], attributes.wallet, attributes.drunkenness, this.clock);
  }

  getSelectedItem(): GameItem | undefined {
    return this.inventoryController.getSelectedItem();
  }

  removeSelectedItem() {
    this.inventoryController.removeSelectedItem();
  }

  setSelectedItem(item: GameItem) {
    this.inventoryController.setSelectedItem(item);
  }

  showInventory(inventory: Inventory, view: InventoryView) {
    this.inventoryController.showInventory(inventory, view);
  }

  hideInventory() {
    this.inventoryController.hideInventory();
  }

  giveMoney(amount: number) {
    this.attributes.wallet.add(amount);
  }

  getAttributes(): PlayerAttributes {
    return this.attributes;
  }

  tick() {
    this.inventoryController.tick();
    if (this.isGameWorldActive()) {
      this.clock.tick();
    }
  }

  paint(screen: PixelScreen) {
    screen.withFixedCoords(() => {
      if (this.getMiniGame()) {
        this.getMiniGame()?.paint(screen);
        this.scoreBoard.paint(screen);
        return;
      }

      if (this.dialog) {
        Overlay.paint(screen);
        this.dialog.paint(screen);
      } else {
        this.inventoryController.paint(screen);
      }

      this.scoreBoard.paint(screen);

      // Cursor is always painted on top
      this.cursorController.paint(screen);
    });
  }

  isGameWorldActive(): boolean {
    // Time stops when inventory or dialog is open,
    // but regardless of that, time always runs during mini-game.
    return Boolean(this.getMiniGame()) || (!this.inventoryController.isObjectInventoryShown() && !this.dialog);
  }

  isGameWorldVisible(): boolean {
    return !this.inventoryController.getMiniGame();
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    let stopPropagation: boolean | undefined = undefined;
    stopPropagation = stopPropagation || this.getMiniGame()?.handleGameEvent(event);
    stopPropagation = stopPropagation || this.cursorController.handleGameEvent(event);
    stopPropagation = stopPropagation || this.dialog?.handleGameEvent(event);
    stopPropagation = stopPropagation || this.inventoryController.handleGameEvent(event);
    if (stopPropagation) {
      return true;
    }
  }

  highlightCursor(highlighted: boolean) {
    this.cursorController.setHighlighted(highlighted);
  }

  getMouseCoord(): Coord {
    return this.cursorController.getCoord();
  }

  private getMiniGame(): MiniGame | undefined {
    return this.inventoryController.getMiniGame();
  }

  showDialog(dialog: Dialog) {
    this.dialog = dialog;
  }

  hideDialog() {
    this.dialog = undefined;
  }
}

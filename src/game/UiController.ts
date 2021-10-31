import { PixelScreen } from "./PixelScreen";
import { GameItem } from "./items/GameItem";
import { InventoryController } from "./InventoryController";
import { Overlay } from "./Overlay";
import { CursorController } from "./CursorController";
import { MiniGame } from "./minigames/MiniGame";
import { ScoreBoard } from "./ScoreBoard";
import { GameEvent } from "./GameEvent";
import { InventoryView } from "./inventory/InventoryView";
import { PlayerAttributes } from "./PlayerAttributes";
import { Coord } from "./Coord";
import { Clock } from "./Clock";
import { Component } from "./ui/Component";

export class UiController {
  private inventoryController: InventoryController;
  private cursorController: CursorController;
  private modalWindow?: Component;
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

  setSelectedItem(item: GameItem | undefined) {
    this.inventoryController.setSelectedItem(item);
  }

  showInventory(view: InventoryView) {
    this.inventoryController.showInventory(view);
  }

  hideInventory() {
    this.inventoryController.hideInventory();
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

      if (this.modalWindow) {
        Overlay.paint(screen);
        this.modalWindow.paint(screen);
      } else {
        this.inventoryController.paint(screen);
      }

      this.scoreBoard.paint(screen);

      // Cursor is always painted on top
      this.cursorController.paint(screen);
    });
  }

  isGameWorldActive(): boolean {
    // Time stops when inventory or modalWindow is open,
    // but regardless of that, time always runs during mini-game.
    return Boolean(this.getMiniGame()) || (!this.inventoryController.isObjectInventoryShown() && !this.modalWindow);
  }

  isGameWorldVisible(): boolean {
    return !this.inventoryController.getMiniGame();
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    let stopPropagation: boolean | undefined = undefined;
    stopPropagation = stopPropagation || this.getMiniGame()?.handleGameEvent(event);
    stopPropagation = stopPropagation || this.cursorController.handleGameEvent(event);
    stopPropagation = stopPropagation || this.modalWindow?.handleGameEvent(event);
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

  showModal(modalWindow: Component) {
    this.modalWindow = modalWindow;
  }

  hideModal() {
    this.modalWindow = undefined;
  }
}

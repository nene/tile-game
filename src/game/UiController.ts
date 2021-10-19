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
import { getCharacter } from "./npc/Character";
import { MultiChoiceQuestionContent } from "./dialogs/MultiChoiceQuestionContent";

export class UiController {
  private inventoryController: InventoryController;
  private cursorController: CursorController;
  private dialog?: Dialog;
  private scoreBoard: ScoreBoard;

  constructor(private attributes: PlayerAttributes) {
    this.inventoryController = new InventoryController(attributes);
    this.cursorController = new CursorController();
    this.scoreBoard = new ScoreBoard([269, 0], attributes.wallet, attributes.drunkenness);
    this.dialog = new Dialog({
      character: getCharacter("koppel"),
      createContent: (rect) => new MultiChoiceQuestionContent({
        container: rect,
        question: "Millisel aastal on asutatud Vironia?",
        choices: ["1981", "1900", "1907", "1914"],
        onAnswer: () => { }
      }),
      onClose: () => { }
    });
  }

  getSelectedItem(): GameItem | undefined {
    return this.inventoryController.getSelectedItem();
  }

  removeSelectedItem() {
    this.inventoryController.removeSelectedItem();
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

      this.scoreBoard.paint(screen);

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

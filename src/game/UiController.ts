import { StorageInventory } from "./inventory/StorageInventory";
import { PixelScreen } from "./PixelScreen";
import { GameItem } from "./items/GameItem";
import { InventoryController } from "./InventoryController";
import { Dialog } from "./Dialog";
import { Overlay } from "./Overlay";
import { CursorController } from "./CursorController";
import { MiniGame } from "./minigames/MiniGame";
import { WalletView } from "./WalletView";
import { GameEvent } from "./GameEvent";
import { Wallet } from "./Wallet";
import { Inventory } from "./inventory/Inventory";
import { Headline } from "./ui/Window";
import { Character, getCharacter } from "./npc/Character";

export class UiController {
  private inventoryController: InventoryController;
  private cursorController: CursorController;
  private dialog?: Dialog;
  private wallet = new Wallet(10);
  private walletView = new WalletView(this.wallet);

  constructor(playerInventory: StorageInventory) {
    this.inventoryController = new InventoryController(playerInventory, this.wallet);
    this.cursorController = new CursorController();
    this.dialog = new Dialog(getCharacter("koppel"), "See ei lähe!\nMa palusin sul tuua shoppeni täie õlut,\naga sina tood mulle mingi tilga shoppeni põhjas.");
  }

  getSelectedItem(): GameItem | undefined {
    return this.inventoryController.getSelectedItem();
  }

  removeSelectedItem() {
    this.inventoryController.removeSelectedItem();
  }

  showInventory(inventory: Inventory, headline: Headline) {
    this.inventoryController.showInventory(inventory, headline);
  }

  giveMoney(amount: number) {
    this.wallet.add(amount);
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

      this.walletView.paint(screen);

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
    stopPropagation = stopPropagation || this.handleDialogClose(event);
    stopPropagation = stopPropagation || this.inventoryController.handleGameEvent(event);
    if (stopPropagation) {
      return true;
    }
  }

  private handleDialogClose(event: GameEvent): boolean | undefined {
    if (this.dialog && event.type === "click") {
      if (!this.dialog.isCoordInView(event.coord)) {
        this.dialog = undefined; // Close the dialog
      }
      return true;
    }
  }

  private getMiniGame(): MiniGame | undefined {
    return this.inventoryController.getMiniGame();
  }

  showDialog(character: Character, text: string) {
    this.dialog = new Dialog(character, text);
  }
}

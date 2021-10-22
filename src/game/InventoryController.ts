import { PixelScreen } from "./PixelScreen";
import { InventoryView } from "./inventory/InventoryView";
import { GridInventoryView } from "./inventory/GridInventoryView";
import { Coord, coordSub, isCoordInRect } from "./Coord";
import { GameItem } from "./items/GameItem";
import { Overlay } from "./Overlay";
import { MiniGame } from "./minigames/MiniGame";
import { GameEvent } from "./GameEvent";
import { PlayerAttributes } from "./PlayerAttributes";
import { Tooltip } from "./ui/Tooltip";
import { Inventory } from "./inventory/Inventory";

export class InventoryController {
  private playerInventoryView: InventoryView;
  private objectInventoryView?: InventoryView;
  private mouseCoord: Coord = [-16, -16];
  private selectedItem?: GameItem;
  private miniGame?: MiniGame;
  private tooltip = new Tooltip();

  constructor(private attributes: PlayerAttributes) {
    this.playerInventoryView = new GridInventoryView({
      inventory: this.attributes.inventory,
      coord: [107, 200 - 22],
      size: [5, 1],
    });
    this.playerInventoryView.onSlotClick((index, item) => {
      this.handleSlotClick(this.attributes.inventory, index, item);
    });
  }

  getSelectedItem(): GameItem | undefined {
    return this.selectedItem;
  }

  setSelectedItem(item: GameItem | undefined) {
    this.selectedItem = item;
  }

  showInventory(view: InventoryView) {
    this.objectInventoryView = view;
    view.onSlotClick((index, item) => {
      this.handleSlotClick(view.getInventory(), index, item);
    });
  }

  hideInventory() {
    this.objectInventoryView = undefined;
  }

  getMiniGame(): MiniGame | undefined {
    return this.miniGame;
  }

  isObjectInventoryShown(): boolean {
    return Boolean(this.objectInventoryView);
  }

  tick() {
    this.miniGame?.tick();
    if (this.miniGame?.isFinished()) {
      this.miniGame = undefined;
    }
  }

  paint(screen: PixelScreen) {
    if (this.objectInventoryView) {
      Overlay.paint(screen);
      this.objectInventoryView.paint(screen);
    }

    this.playerInventoryView.paint(screen);

    if (this.selectedItem) {
      screen.drawSprite(this.selectedItem.getSprite(), coordSub(this.mouseCoord, [8, 8]));
    }
    this.tooltip.paint(screen);
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    if (this.playerInventoryView.handleGameEvent(event) || this.objectInventoryView?.handleGameEvent(event)) {
      return true;
    }

    switch (event.type) {
      case "click":
        return this.handleClickOutsideInventoryViews();
      case "mousemove":
        this.handleMouseMove(event.coord);
        break;
    }
  }

  private handleClickOutsideInventoryViews(): boolean | undefined {
    this.tooltip.hide();

    // When inventory window is open, but the click wasn't handled by it
    if (this.objectInventoryView) {
      this.hideInventory();
      return true;
    }
  }

  private handleMouseMove(screenCoord: Coord) {
    this.mouseCoord = screenCoord;
    this.tooltip.hide();
    this.tooltip.show(screenCoord, this.getHoveredInventoryItem(screenCoord)?.getName());
  }

  private getHoveredInventoryItem(coord: Coord): GameItem | undefined {
    const item = this.getInventoryItemAtCoord(coord, this.playerInventoryView);
    if (item) {
      return item;
    }
    if (this.objectInventoryView) {
      return this.getInventoryItemAtCoord(coord, this.objectInventoryView);
    }
    return undefined;
  }

  private getInventoryItemAtCoord(coord: Coord, inventoryView: InventoryView): GameItem | undefined {
    if (isCoordInRect(coord, inventoryView.getRect())) {
      return inventoryView.getInventory().itemAt(inventoryView.getSlotIndexAtCoord(coord));
    }
    return undefined;
  }

  private handleSlotClick(inventory: Inventory, slotIndex: number, item?: GameItem) {
    this.tooltip.hide();

    if (item && !this.selectedItem) {
      if (inventory.isTakeable() && (inventory === this.attributes.inventory || !this.attributes.inventory.isFull())) {
        // Take item from inventory
        // (only take from non-player-inventory when player-inventory has some room)
        this.selectedItem = inventory.takeAt(slotIndex, this.attributes.wallet);
      }
    }
    else if (!item && this.selectedItem && inventory.isWritable()) {
      // Place item at hand to inventory
      inventory.placeAt(slotIndex, this.selectedItem);
      this.selectedItem = undefined;
    }
    else if (item && this.selectedItem && inventory.isCombinable()) {
      // Combine these items if possible
      const miniGame = item.combine(this.selectedItem);
      if (miniGame) {
        // A minigame is used for combining
        this.miniGame = miniGame;
        // Ensure we start minigame with current mouse coordinate
        this.miniGame.handleGameEvent({ type: "mousemove", coord: this.mouseCoord });
        this.miniGame.setHandShakeAmount(this.attributes.drunkenness.getHandShakeAmount());
      }
    }
  }
}

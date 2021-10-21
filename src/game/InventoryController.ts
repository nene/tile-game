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
  }

  getSelectedItem(): GameItem | undefined {
    return this.selectedItem;
  }

  setSelectedItem(item: GameItem | undefined) {
    this.selectedItem = item;
  }

  showInventory(view: InventoryView) {
    this.objectInventoryView = view;
  }

  getMiniGame(): MiniGame | undefined {
    return this.miniGame;
  }

  isObjectInventoryShown(): boolean {
    return Boolean(this.objectInventoryView);
  }

  hideInventory() {
    this.objectInventoryView = undefined;
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
    if (this.objectInventoryView?.handleGameEvent(event)) {
      return true;
    }

    switch (event.type) {
      case "click":
        return this.handleClick(event.coord);
      case "mousemove":
        this.handleMouseMove(event.coord);
        break;
    }
  }

  private handleClick(screenCoord: Coord): boolean {
    this.tooltip.hide();

    if (isCoordInRect(screenCoord, this.playerInventoryView.getRect())) {
      this.handleInventoryClick(screenCoord, this.playerInventoryView);
      return true;
    }
    else if (this.objectInventoryView) {
      if (isCoordInRect(screenCoord, this.objectInventoryView.getRect())) {
        this.handleInventoryClick(screenCoord, this.objectInventoryView);
      } else {
        this.hideInventory();
      }
      return true;
    }
    return false;
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

  private handleInventoryClick(coord: Coord, inventoryView: InventoryView) {
    const slotIndex = inventoryView.getSlotIndexAtCoord(coord);
    if (slotIndex === -1) {
      return; // no slot clicked
    }

    const inventory = inventoryView.getInventory();
    const item = inventory.itemAt(slotIndex);
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

import { PixelScreen } from "./PixelScreen";
import { InventoryView } from "./inventory/InventoryView";
import { GridInventoryView } from "./inventory/GridInventoryView";
import { Coord, coordSub } from "./Coord";
import { GameItem } from "./items/GameItem";
import { Overlay } from "./ui/Overlay";
import { MiniGame } from "./minigames/MiniGame";
import { GameEvent } from "./GameEvent";
import { PlayerAttributes } from "./attributes/PlayerAttributes";
import { Tooltip } from "./ui/Tooltip";
import { Inventory } from "./inventory/Inventory";
import { SCREEN_RECT } from "./ui/screen-size";

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
      size: [5, 1],
      container: SCREEN_RECT,
      align: "bottom"
    });
    this.playerInventoryView.onSlotClick((index, item) => {
      this.handleSlotClick(this.attributes.inventory, index, item);
    });
    this.playerInventoryView.onSlotRightClick((index, item) => {
      this.handleSlotRightClick(this.attributes.inventory, index, item);
    });
    this.playerInventoryView.onItemHover((coord, item) => {
      this.handleItemHover(coord, item);
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
    view.onSlotRightClick((index, item) => {
      this.handleSlotRightClick(view.getInventory(), index, item);
    });
    view.onItemHover((coord, item) => {
      this.handleItemHover(coord, item);
    });
  }

  hideInventory() {
    this.objectInventoryView = undefined;
  }

  getMiniGame(): MiniGame | undefined {
    return this.miniGame;
  }

  resetForNewDay() {
    this.miniGame = undefined;
    if (this.selectedItem) {
      this.attributes.inventory.add(this.selectedItem);
      this.selectedItem = undefined;
    }
    this.hideInventory();
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
  }

  private handleItemHover(coord: Coord, item: GameItem) {
    this.mouseCoord = coord;
    this.tooltip.show(coord, item.getName());
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
    else if (!item && this.selectedItem && inventory.isWritable() && inventory.isAcceptingItem(this.selectedItem)) {
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

  private handleSlotRightClick(inventory: Inventory, slotIndex: number, item?: GameItem) {
    this.tooltip.hide();

    // Do nothing when:
    // - we have item selected or
    // - when we clicked empty slot or
    // - object inventory is not open
    if (this.selectedItem || !item || !this.objectInventoryView) {
      return;
    }
    const objInventory = this.objectInventoryView.getInventory();

    if (inventory === this.attributes.inventory) {
      // When taking from player inventory -> move to object inventory
      if (objInventory.isWritable() && !objInventory.isFull() && objInventory.isAcceptingItem(item)) {
        const takenItem = this.attributes.inventory.takeAt(slotIndex, this.attributes.wallet);
        takenItem && objInventory.add(takenItem);
      }
    }
    else {
      // When taking from object inventory -> move to player inventory
      if (objInventory.isTakeable() && !this.attributes.inventory.isFull() && this.attributes.inventory.isAcceptingItem(item)) {
        const takenItem = objInventory.takeAt(slotIndex, this.attributes.wallet);
        takenItem && this.attributes.inventory.add(takenItem);
      }
    }
  }
}

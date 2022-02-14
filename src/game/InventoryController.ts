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
import { BeerGlass } from "./items/BeerGlass";
import { beerGlassName } from "./items/beerGlassName";
import { isTickableComponent } from "./ui/Component";

export class InventoryController {
  private playerInventoryView: InventoryView;
  private objectInventoryView?: InventoryView;
  private mouseCoord: Coord = [-16, -16];
  private miniGame?: MiniGame;
  private tooltip = new Tooltip();

  constructor(private attributes: PlayerAttributes) {
    this.playerInventoryView = new GridInventoryView({
      inventory: this.attributes.inventory,
      size: [this.attributes.inventory.size(), 1],
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
    this.hideInventory();
  }

  isObjectInventoryShown(): boolean {
    return Boolean(this.objectInventoryView);
  }

  gameTick() {
    this.miniGame?.tick();
    if (this.miniGame?.isFinished()) {
      this.miniGame = undefined;
    }
  }

  uiTick() {
    if (this.objectInventoryView && isTickableComponent(this.objectInventoryView)) {
      this.objectInventoryView.tick();
    }
  }

  paint(screen: PixelScreen) {
    if (this.objectInventoryView) {
      Overlay.paint(screen);
      this.objectInventoryView.paint(screen);
    }

    this.playerInventoryView.paint(screen);

    const selectedItem = this.attributes.getSelectedItem();
    if (selectedItem) {
      screen.drawSprite(selectedItem.getSprite(), coordSub(this.mouseCoord, [8, 8]));
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
    this.tooltip.show(coord, item instanceof BeerGlass ? beerGlassName(item, this.attributes.alcoSkill) : item.getName());
  }

  private handleSlotClick(inventory: Inventory, slotIndex: number, item?: GameItem) {
    this.tooltip.hide();
    const selectedItem = this.attributes.getSelectedItem();

    if (item && !selectedItem) {
      if (inventory.isTakeable() && (inventory === this.attributes.inventory || !this.attributes.inventory.isFull())) {
        // Take item from inventory
        // (only take from non-player-inventory when player-inventory has some room)
        this.attributes.setSelectedItem(inventory.takeAt(slotIndex, this.attributes.wallet));
      }
    }
    else if (!item && selectedItem && inventory.isWritable() && inventory.isAcceptingItem(selectedItem)) {
      // Place item at hand to inventory
      inventory.placeAt(slotIndex, selectedItem);
      this.attributes.setSelectedItem(undefined);
    }
    else if (item && selectedItem && inventory.isCombinable()) {
      // Combine these items if possible
      const miniGame = item.combine(selectedItem);
      if (miniGame) {
        // A minigame is used for combining
        this.miniGame = miniGame;
        // Ensure we start minigame with current mouse coordinate
        this.miniGame.handleGameEvent({ type: "mousemove", coord: this.mouseCoord });
        this.miniGame.init(this.attributes);
        // Minigame might finish immediately. Discard it in that case
        if (this.miniGame.isFinished()) {
          this.miniGame = undefined;
        }
      }
    }
  }

  private handleSlotRightClick(inventory: Inventory, slotIndex: number, item?: GameItem) {
    this.tooltip.hide();

    // Do nothing when:
    // - we have item selected or
    // - when we clicked empty slot or
    // - object inventory is not open
    if (this.attributes.getSelectedItem() || !item || !this.objectInventoryView) {
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

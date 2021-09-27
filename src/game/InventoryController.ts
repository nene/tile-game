import { Inventory } from "./Inventory";
import { PixelScreen } from "./PixelScreen";
import { InventoryView } from "./InventoryView";
import { Coord, coordAdd, coordSub } from "./Coord";
import { GameItem } from "./items/GameItem";
import { debounce } from "lodash";
import { Overlay } from "./Overlay";
import { MiniGame } from "./minigames/MiniGame";

export class InventoryController {
  private playerInventoryView: InventoryView;
  private objectInventory?: Inventory;
  private objectInventoryView?: InventoryView;
  private mouseCoord: Coord = [-16, -16];
  private selectedItem?: GameItem;
  private hoveredItem?: GameItem;
  private miniGame?: MiniGame;

  constructor(private playerInventory: Inventory) {
    this.playerInventoryView = new InventoryView(playerInventory, [107, 200 - 22]);
  }

  getSelectedItem(): GameItem | undefined {
    return this.selectedItem;
  }

  removeSelectedItem() {
    this.selectedItem = undefined;
  }

  showInventory(inventory: Inventory, title?: string) {
    this.objectInventory = inventory;
    this.objectInventoryView = new InventoryView(inventory, [130, 50], title);
  }

  getMiniGame(): MiniGame | undefined {
    return this.miniGame;
  }

  private hideInventory() {
    this.objectInventory = undefined;
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
      screen.drawSprite(this.selectedItem.getSprite(), coordSub(this.mouseCoord, [8, 8]), { fixed: true });
    }
    if (this.hoveredItem) {
      screen.drawText(this.hoveredItem.getName(), "#3e2821", "#c8b997", coordAdd(this.mouseCoord, [10, 10]));
    }
  }

  handleClick(screenCoord: Coord): boolean {
    this.hoveredItem = undefined;

    if (this.playerInventoryView.isCoordInView(screenCoord)) {
      this.handleInventoryClick(screenCoord, this.playerInventory, this.playerInventoryView);
      return true;
    }
    else if (this.objectInventory && this.objectInventoryView) {
      if (this.objectInventoryView.isCoordInView(screenCoord)) {
        this.handleInventoryClick(screenCoord, this.objectInventory, this.objectInventoryView);
      } else {
        this.hideInventory();
      }
      return true;
    }
    return false;
  }

  handleMouseMove(screenCoord: Coord) {
    this.mouseCoord = screenCoord;
    this.hoveredItem = undefined;
    this.showTooltipAfterDelay(screenCoord);
  }

  private showTooltipAfterDelay = debounce((screenCoord: Coord) => {
    this.hoveredItem = this.getHoveredInventoryItem(screenCoord);
  }, 500);

  private getHoveredInventoryItem(coord: Coord): GameItem | undefined {
    const item = this.getInventoryItemAtCoord(coord, this.playerInventory, this.playerInventoryView);
    if (item) {
      return item;
    }
    if (this.objectInventory && this.objectInventoryView) {
      return this.getInventoryItemAtCoord(coord, this.objectInventory, this.objectInventoryView);
    }
    return undefined;
  }

  private getInventoryItemAtCoord(coord: Coord, inventory: Inventory, inventoryView: InventoryView): GameItem | undefined {
    if (inventoryView.isCoordInView(coord)) {
      const slot = inventoryView.getSlotAtCoord(coord);
      return slot && inventory.itemAt(slot);
    }
    return undefined;
  }

  private handleInventoryClick(coord: Coord, inventory: Inventory, inventoryView: InventoryView) {
    const slotCoord = inventoryView.getSlotAtCoord(coord);
    if (!slotCoord) {
      return; // no slot clicked
    }

    const item = inventory.itemAt(slotCoord);
    if (item && !this.selectedItem) {
      // Take item from inventory
      inventory.remove(item);
      this.selectedItem = item;
    }
    else if (!item && this.selectedItem && !inventory.isFull()) {
      // Place item at hand to inventory
      inventory.addAt(slotCoord, this.selectedItem);
      this.selectedItem = undefined;
    }
    else if (item && this.selectedItem) {
      // Combine these items if possible
      const combinedItems = item.combine(this.selectedItem);
      if (combinedItems instanceof Array) {
        if (combinedItems.length > 0) {
          inventory.remove(item);
          inventory.addAt(slotCoord, combinedItems[0]);
          this.selectedItem = combinedItems[1]; // possibly nothing
        }
        else {
          // Otherwise swap item at hand with item in inventory
          inventory.remove(item);
          inventory.addAt(slotCoord, this.selectedItem);
          this.selectedItem = item;
        }
      } else {
        // A minigame is used for combining
        this.miniGame = combinedItems;
        // Ensure we start minigame with current mouse coordinate
        this.miniGame.handleMouseMove(this.mouseCoord);
      }
    }
  }
}

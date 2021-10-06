import { PixelScreen, TextStyle } from "./PixelScreen";
import { Inventory, WritableInventory } from "./inventory/Inventory";
import { InventoryView } from "./inventory/InventoryView";
import { GridInventoryView } from "./inventory/GridInventoryView";
import { Coord, coordAdd, coordSub, rectGrow } from "./Coord";
import { GameItem } from "./items/GameItem";
import { debounce } from "lodash";
import { Overlay } from "./Overlay";
import { MiniGame } from "./minigames/MiniGame";
import { GameEvent } from "./GameEvent";
import { Shop } from "./inventory/Shop";
import { ShopView } from "./inventory/ShopView";
import { Wallet } from "./Wallet";
import { StorageInventoryView } from "./inventory/StorageInventoryView";
import { Headline } from "./ui/Window";

export class InventoryController {
  private playerInventoryView: InventoryView;
  private objectInventory?: Inventory;
  private objectInventoryView?: InventoryView;
  private mouseCoord: Coord = [-16, -16];
  private selectedItem?: GameItem;
  private hoveredItem?: GameItem;
  private miniGame?: MiniGame;

  constructor(private playerInventory: WritableInventory, private wallet: Wallet) {
    this.playerInventoryView = new GridInventoryView({
      inventory: playerInventory,
      coord: [107, 200 - 22],
      size: [5, 1],
    });
  }

  getSelectedItem(): GameItem | undefined {
    return this.selectedItem;
  }

  removeSelectedItem() {
    this.selectedItem = undefined;
  }

  showInventory(inventory: Inventory, headline: Headline) {
    this.objectInventory = inventory;
    if (inventory instanceof Shop) {
      this.objectInventoryView = new ShopView(inventory, this.wallet);
    } else {
      this.objectInventoryView = new StorageInventoryView({ inventory, rect: { coord: [115, 45], size: [91, 87] }, size: [4, 3], headline });
    }
  }

  getMiniGame(): MiniGame | undefined {
    return this.miniGame;
  }

  isObjectInventoryShown(): boolean {
    return Boolean(this.objectInventory);
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
      screen.drawSprite(this.selectedItem.getSprite(), coordSub(this.mouseCoord, [8, 8]));
    }
    if (this.hoveredItem) {
      this.drawTooltip(this.hoveredItem, screen)
    }
  }

  private drawTooltip(item: GameItem, screen: PixelScreen) {
    const style: TextStyle = { color: "#3e2821" };
    const textCoord = coordAdd(this.mouseCoord, [11, 2]);
    const textSize = screen.measureText(item.getName(), style);
    screen.drawRect(rectGrow({ coord: textCoord, size: textSize }, [2, 1]), "#c8b997");
    screen.drawText(item.getName(), textCoord, style);
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    this.objectInventoryView?.handleGameEvent(event);

    switch (event.type) {
      case "click":
        return this.handleClick(event.coord);
      case "mousemove":
        this.handleMouseMove(event.coord);
        break;
    }
  }

  private handleClick(screenCoord: Coord): boolean {
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

  private handleMouseMove(screenCoord: Coord) {
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
      return inventory.itemAt(inventoryView.getSlotIndexAtCoord(coord));
    }
    return undefined;
  }

  private handleInventoryClick(coord: Coord, inventory: Inventory, inventoryView: InventoryView) {
    const slotIndex = inventoryView.getSlotIndexAtCoord(coord);
    if (slotIndex === -1) {
      return; // no slot clicked
    }

    const item = inventory.itemAt(slotIndex);
    if (item && !this.selectedItem) {
      if (inventory === this.playerInventory || !this.playerInventory.isFull()) {
        // Take item from inventory
        // (only take from non-player-inventory when player-inventory has some room)
        this.selectedItem = inventory.takeAt(slotIndex, this.wallet);
      }
    }
    else if (!item && this.selectedItem && inventory.isWritable()) {
      // Place item at hand to inventory
      inventory.placeAt(slotIndex, this.selectedItem);
      this.selectedItem = undefined;
    }
    else if (item && this.selectedItem && inventory.isWritable()) {
      // Combine these items if possible
      const combinedItems = item.combine(this.selectedItem);
      if (combinedItems instanceof Array) {
        if (combinedItems.length > 0) {
          inventory.takeAt(slotIndex, this.wallet);
          inventory.placeAt(slotIndex, combinedItems[0]);
          this.selectedItem = combinedItems[1]; // possibly nothing
        }
        else {
          // Otherwise swap item at hand with item in inventory
          inventory.takeAt(slotIndex, this.wallet);
          inventory.placeAt(slotIndex, this.selectedItem);
          this.selectedItem = item;
        }
      } else {
        // A minigame is used for combining
        this.miniGame = combinedItems;
        // Ensure we start minigame with current mouse coordinate
        this.miniGame.handleGameEvent({ type: "mousemove", coord: this.mouseCoord });
      }
    }
  }
}

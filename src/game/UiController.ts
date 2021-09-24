import { Inventory } from "./Inventory";
import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./SpriteLibrary";
import { InventoryView } from "./InventoryView";
import { Coord, coordSub } from "./Coord";
import { GameItem } from "./items/GameItem";
import { Sprite } from "./Sprite";

export class UiController {
  private playerInventoryView: InventoryView;
  private objectInventory?: Inventory;
  private objectInventoryView?: InventoryView;
  private mouseCoord: Coord = [0, 0];
  private selectedItem?: GameItem;
  private cursor: Sprite;

  constructor(private playerInventory: Inventory, private sprites: SpriteLibrary) {
    this.playerInventoryView = new InventoryView(playerInventory, [107, 200 - 22], sprites);
    this.cursor = sprites.get("cursor").getSprite([0, 0]);
  }

  showInventory(inventory: Inventory) {
    this.objectInventory = inventory;
    this.objectInventoryView = new InventoryView(inventory, [130, 50], this.sprites);
  }

  hideInventory() {
    this.objectInventory = undefined;
    this.objectInventoryView = undefined;
  }

  paint(screen: PixelScreen) {
    if (this.objectInventoryView) {
      screen.drawRect({ coord: [0, 0], size: [320, 200] }, "rgba(0,0,0,0.5)", { fixed: true });
      this.objectInventoryView.paint(screen);
    }
    this.playerInventoryView.paint(screen);
    if (this.selectedItem) {
      screen.drawSprite(this.selectedItem.getSprite(), coordSub(this.mouseCoord, [8, 8]), { fixed: true });
    }

    screen.drawSprite(this.cursor, this.mouseCoord, { fixed: true });
  }

  handleClick(screenCoord: Coord): boolean {
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

  handleHover(screenCoord: Coord): boolean {
    this.mouseCoord = screenCoord;
    return true;
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
      // Swap item at hand with item in inventory
      inventory.remove(item);
      inventory.addAt(slotCoord, this.selectedItem);
      this.selectedItem = item;
    }
  }
}

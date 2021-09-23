import { Inventory } from "./Inventory";
import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./SpriteLibrary";
import { InventoryView } from "./InventoryView";
import { UiController } from "./GameObject";
import { Coord } from "./Coord";

export class InventoryController implements UiController {
  private playerInventoryView: InventoryView;
  private objectInventory?: Inventory;
  private objectInventoryView?: InventoryView;

  constructor(private playerInventory: Inventory, private sprites: SpriteLibrary) {
    this.playerInventoryView = new InventoryView(playerInventory, [107, 200 - 22], sprites);
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
  }

  handleClick(screenCoord: Coord): boolean {
    if (this.playerInventoryView.isCoordInView(screenCoord)) {
      this.handlePlayerInventoryClick(screenCoord);
      return true;
    }
    else if (this.objectInventoryView) {
      if (this.objectInventoryView.isCoordInView(screenCoord)) {
        this.handleObjectInventoryClick(screenCoord);
      } else {
        this.hideInventory();
      }
      return true;
    }
    return false;
  }

  private handlePlayerInventoryClick(screenCoord: Coord) {
    const item = this.playerInventoryView.getItemAtCoord(screenCoord);
    if (item && this.objectInventory && !this.objectInventory.isFull()) {
      this.playerInventory.remove(item);
      this.objectInventory.add(item);
    }
  }

  private handleObjectInventoryClick(screenCoord: Coord) {
    const item = this.objectInventoryView?.getItemAtCoord(screenCoord);
    if (item && !this.playerInventory.isFull()) {
      this.objectInventory?.remove(item);
      this.playerInventory.add(item);
    }
  }
}

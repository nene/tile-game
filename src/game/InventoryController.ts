import { Inventory } from "./Inventory";
import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./SpriteLibrary";
import { InventoryView } from "./InventoryView";
import { UiController } from "./GameObject";

export class InventoryController implements UiController {
  private playerInventoryView: InventoryView;
  private objectInventoryView?: InventoryView;

  constructor(playerInventory: Inventory, private sprites: SpriteLibrary) {
    this.playerInventoryView = new InventoryView(playerInventory, [107, 200 - 22], sprites);
  }

  showInventory(inventory: Inventory) {
    this.objectInventoryView = new InventoryView(inventory, [130, 50], this.sprites);
  }

  paint(screen: PixelScreen) {
    if (this.objectInventoryView) {
      screen.drawRect({ coord: [0, 0], size: [320, 200] }, "rgba(0,0,0,0.5)", { fixed: true });
      this.objectInventoryView.paint(screen);
    }
    this.playerInventoryView.paint(screen);
  }
}

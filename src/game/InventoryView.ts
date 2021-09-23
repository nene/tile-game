import { Coord, coordAdd, coordMul } from "./Coord";
import { Inventory } from "./Inventory";
import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./SpriteLibrary";
import { SpriteSheet } from "./SpriteSheet";

export class InventoryView {
  private slotSprites: SpriteSheet;

  constructor(private inventory: Inventory, private coord: Coord, sprites: SpriteLibrary) {
    this.slotSprites = sprites.get("slot");
  }

  paint(screen: PixelScreen) {
    screen.drawRect(
      { coord: this.coord, size: coordAdd([1, 1], coordMul([21, 21], this.inventory.size())) },
      "#c8b997",
      { fixed: true },
    );

    const startCoord = coordAdd(this.coord, [1, 1]);
    const [cols, rows] = this.inventory.size();
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const slotCoord = coordAdd(startCoord, coordMul([21, 21], [x, y]));
        screen.drawSprite(this.slotSprites.getSprite([0, 0]), slotCoord, { fixed: true });
        const item = this.inventory.itemAt([x, y]);
        if (item) {
          screen.drawSprite(item.getSprite(), coordAdd(slotCoord, [2, 2]), { fixed: true });
        }
      }
    }
  }
}

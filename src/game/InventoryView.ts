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
      { coord: this.coord, size: coordAdd([1, 1], coordMul([21, 21], [this.inventory.maxItems(), 1])) },
      "#c8b997",
      { fixed: true },
    );

    const startCoord = coordAdd(this.coord, [1, 1]);
    for (let i = 0; i < this.inventory.maxItems(); i++) {
      const slotCoord = coordAdd(startCoord, coordMul([21, 0], [i, i]));
      screen.drawSprite(this.slotSprites.getSprite([0, 0]), slotCoord, { fixed: true });
      const item = this.inventory.items()[i];
      if (item) {
        screen.drawSprite(item.getSprite(), coordAdd(slotCoord, [2, 2]), { fixed: true });
      }
    }
  }
}

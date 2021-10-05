import { Coord, coordAdd, coordMul, isCoordInRect, Rect } from "../Coord";
import { Inventory } from "./Inventory";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../SpriteLibrary";
import { SpriteSheet } from "../SpriteSheet";

interface StorageInventoryViewCfg {
  inventory: Inventory;
  size: Coord;
  coord: Coord;
  title?: string;
}

export class StorageInventoryView {
  private slotSprites: SpriteSheet;
  private rect: Rect;
  private inventory: Inventory;
  private size: Coord;
  private coord: Coord;
  private title?: string;

  constructor({ inventory, size, coord, title }: StorageInventoryViewCfg) {
    this.inventory = inventory;
    this.size = size;
    this.coord = coord;
    this.title = title;
    this.slotSprites = SpriteLibrary.get("slot");
    this.rect = { coord, size: coordAdd(this.titleSize(), coordMul([21, 21], size)) };
  }

  paint(screen: PixelScreen) {
    screen.withFixedCoords(() => {
      screen.drawRect(
        this.rect,
        "#c8b997",
      );
      if (this.title) {
        this.drawTitle(this.title, screen);
      }

      const startCoord = coordAdd(this.coord, this.titleSize());
      const [cols, rows] = this.size;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const slotCoord = coordAdd(startCoord, coordMul([21, 21], [x, y]));
          screen.drawSprite(this.slotSprites.getSprite([0, 0]), slotCoord);
          const item = this.inventory.itemAt(this.coordToIndex([x, y]));
          if (item) {
            screen.drawSprite(item.getSprite(), coordAdd(slotCoord, [2, 2]));
          }
        }
      }
    });
  }

  private drawTitle(text: string, screen: PixelScreen) {
    screen.drawText(text, coordAdd(this.coord, [1, 1]), { color: "#8f563b" });
  }

  isCoordInView(screenCoord: Coord): boolean {
    return isCoordInRect(screenCoord, this.rect);
  }

  getSlotIndexAtCoord(screenCoord: Coord): number {
    const startCoord = coordAdd(this.coord, this.titleSize());
    const [cols, rows] = this.size;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const slotCoord = coordAdd(startCoord, coordMul([21, 21], [x, y]));
        if (isCoordInRect(screenCoord, { coord: slotCoord, size: [20, 20] })) {
          return this.coordToIndex([x, y]);
        }
      }
    }
    return -1;
  }

  private titleSize(): Coord {
    return this.title ? [1, 12] : [1, 1];
  }

  private coordToIndex([x, y]: Coord): number {
    return this.size[1] * y + x;
  }
}

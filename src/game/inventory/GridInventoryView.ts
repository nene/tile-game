import { Coord, coordAdd, coordMul, isCoordInRect, Rect } from "../Coord";
import { Inventory } from "./Inventory";
import { InventoryView, SlotClickHandler } from "./InventoryView";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { Sprite } from "../sprites/Sprite";
import { GameEvent } from "../GameEvent";

interface GridInventoryViewCfg {
  inventory: Inventory;
  size: Coord;
  coord: Coord;
}

export class GridInventoryView implements InventoryView {
  private slotSprites: SpriteSheet;
  private rect: Rect;
  private inventory: Inventory;
  private size: Coord;
  private coord: Coord;
  private handleSlotClick?: SlotClickHandler;

  constructor({ inventory, size, coord }: GridInventoryViewCfg) {
    this.inventory = inventory;
    this.size = size;
    this.coord = coord;
    this.slotSprites = SpriteLibrary.get("slot");
    this.rect = { coord, size: coordAdd(coordMul([21, 21], size), [1, 1]) };
  }

  onSlotClick(cb: SlotClickHandler) {
    this.handleSlotClick = cb;
  }

  paint(screen: PixelScreen) {
    screen.withFixedCoords(() => {
      screen.drawRect(
        this.rect,
        "#c8b997",
      );

      const startCoord = coordAdd(this.coord, [1, 1]);
      const [cols, rows] = this.size;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const slotCoord = coordAdd(startCoord, coordMul([21, 21], [x, y]));
          screen.drawSprite(this.getSlotSprite(), slotCoord);
          const item = this.inventory.itemAt(this.coordToIndex([x, y]));
          if (item) {
            screen.drawSprite(item.getSprite(), coordAdd(slotCoord, [2, 2]));
          }
        }
      }
    });
  }

  private getSlotSprite(): Sprite {
    return this.slotSprites.getSprite(this.inventory.isTakeable() ? [0, 0] : [1, 0]);
  }

  handleGameEvent(event: GameEvent) {
    switch (event.type) {
      case "click":
        return this.handleClick(event.coord);
    }
  }

  private handleClick(coord: Coord): boolean | undefined {
    const slotIndex = this.getSlotIndexAtCoord(coord);
    if (slotIndex !== -1) {
      this.handleSlotClick && this.handleSlotClick(slotIndex, this.inventory.itemAt(slotIndex));
      return true;
    }
  }

  getRect() {
    return this.rect;
  }

  getInventory() {
    return this.inventory;
  }

  getSlotIndexAtCoord(screenCoord: Coord): number {
    const startCoord = coordAdd(this.coord, [1, 1]);
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

  private coordToIndex([x, y]: Coord): number {
    return this.size[0] * y + x;
  }
}

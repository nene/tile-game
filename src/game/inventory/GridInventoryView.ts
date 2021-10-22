import { Coord, coordAdd, coordMul, isCoordInRect, Rect } from "../Coord";
import { Inventory } from "./Inventory";
import { InventoryView, ItemHoverHandler, SlotClickHandler } from "./InventoryView";
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
  private handleItemHover?: ItemHoverHandler;

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

  onItemHover(cb: ItemHoverHandler) {
    this.handleItemHover = cb;
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
      case "mousemove":
        return this.handleMouseMove(event.coord);
    }
  }

  private handleClick(coord: Coord): boolean | undefined {
    const slotIndex = this.getSlotIndexAtCoord(coord);
    if (slotIndex !== -1) {
      this.handleSlotClick && this.handleSlotClick(slotIndex, this.inventory.itemAt(slotIndex));
      return true;
    }
    return isCoordInRect(coord, this.rect);
  }

  private handleMouseMove(coord: Coord): boolean | undefined {
    const item = this.inventory.itemAt(this.getSlotIndexAtCoord(coord));
    if (item) {
      this.handleItemHover && this.handleItemHover(coord, item);
      return true;
    }
    return undefined;
  }

  getInventory() {
    return this.inventory;
  }

  private getSlotIndexAtCoord(screenCoord: Coord): number {
    if (!isCoordInRect(screenCoord, this.rect)) {
      return -1;
    }

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

import { Coord, coordAdd, coordMul, isCoordInRect, Rect, rectCenter } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { Inventory } from "./Inventory";
import { InventoryView, ItemHoverHandler, SlotClickHandler } from "./InventoryView";
import { Headline, Window } from "../ui/Window";
import { GridInventoryView } from "./GridInventoryView";
import { GameEvent } from "../GameEvent";

interface StorageInventoryViewCfg {
  inventory: Inventory;
  headline: Headline;
  windowSize: Coord;
  gridSize: Coord;
  onClose: () => void;
}

// Shows inventory grid inside window
export class StorageInventoryView implements InventoryView {
  private window: Window;
  private grid: GridInventoryView;

  constructor({ inventory, windowSize, gridSize, headline, onClose }: StorageInventoryViewCfg) {
    this.window = new Window({ headline, size: windowSize, onClose });
    this.grid = new GridInventoryView({ inventory, coord: this.gridRect(gridSize, this.window.contentAreaRect()).coord, size: gridSize });
  }

  private gridRect(gridSize: Coord, container: Rect): Rect {
    return rectCenter({ coord: [0, 0], size: coordAdd(coordMul([21, 21], gridSize), [1, 1]) }, container);
  }

  onSlotClick(cb: SlotClickHandler) {
    this.grid.onSlotClick(cb);
  }

  onItemHover(cb: ItemHoverHandler) {
    this.grid.onItemHover(cb);
  }

  paint(screen: PixelScreen) {
    this.window.paint(screen);
    this.grid.paint(screen);
  }

  handleGameEvent(event: GameEvent) {
    if (this.window.handleGameEvent(event) || this.grid.handleGameEvent(event)) {
      return true;
    }
    return event.type === "click" && isCoordInRect(event.coord, this.window.getRect());
  }

  getInventory() {
    return this.grid.getInventory();
  }
}

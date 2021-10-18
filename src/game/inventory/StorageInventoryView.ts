import { Coord, coordAdd, coordMul, Rect, rectCenter } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { Inventory } from "./Inventory";
import { InventoryView } from "./InventoryView";
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

  paint(screen: PixelScreen) {
    this.window.paint(screen);
    this.grid.paint(screen);
  }

  handleGameEvent(event: GameEvent) {
    this.window.handleGameEvent(event);
    return undefined;
  }

  getRect(): Rect {
    return this.window.getRect();
  }

  getSlotIndexAtCoord(coord: Coord): number {
    return this.grid.getSlotIndexAtCoord(coord);
  }
}

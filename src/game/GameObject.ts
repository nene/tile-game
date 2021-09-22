import { Coord, Rect } from "./Coord";
import { GameWorld } from "./GameWorld";
import { Inventory } from "./Inventory";
import { PixelScreen } from "./PixelScreen";

export interface UiController {
  showInventory: (inventory: Inventory) => void;
}

export interface GameObject {
  zIndex: () => number;
  getCoord: () => Coord;
  paint: (screen: PixelScreen) => void;
  tick: (world: GameWorld) => void;
  isSolid: () => boolean;
  tileSize: () => Coord;
  hitBox: () => Rect;
  onInteract: (ui: UiController) => void;
}

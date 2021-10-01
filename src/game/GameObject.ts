import { Coord, Rect } from "./Coord";
import { GameWorld } from "./GameWorld";
import { PixelScreen } from "./PixelScreen";
import { UiController } from "./UiController";

export interface GameObject {
  zIndex: () => number;
  getCoord: () => Coord;
  paint: (screen: PixelScreen) => void;
  tick: (world: GameWorld) => void;
  isSolid: () => boolean;
  hitBox: () => Rect;
  boundingBox: () => Rect;
  onInteract: (ui: UiController) => void;
}

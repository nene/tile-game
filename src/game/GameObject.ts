import { Coord, Rect } from "./Coord";
import { GameWorld } from "./GameWorld";
import { Location } from "./locations/Location";
import { PixelScreen } from "./PixelScreen";
import { UiController } from "./UiController";

export interface GameObject {
  zIndex: () => number;
  getCoord: () => Coord;
  paint: (screen: PixelScreen) => void;
  tick: (location: Location, world: GameWorld) => void;
  isSolid: () => boolean;
  hitBox: () => Rect;
  boundingBox: () => Rect;
  onInteract: (ui: UiController) => void;
  isInteractable: (ui: UiController) => boolean;
}

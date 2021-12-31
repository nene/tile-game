import { Coord, Rect } from "./Coord";
import { GameWorld } from "./GameWorld";
import { GameItem } from "./items/GameItem";
import { Location } from "./locations/Location";
import { PixelScreen } from "./PixelScreen";
import { UiController } from "./UiController";

export type CancelTick = "cancel tick";
export const CANCEL_TICK: CancelTick = "cancel tick";

export interface GameObject {
  zIndex: () => number;
  getCoord: () => Coord;
  paint: (screen: PixelScreen) => void;
  tick: (location: Location, world: GameWorld) => void | CancelTick;
  isSolid: () => boolean;
  hitBox: () => Rect;
  boundingBox: () => Rect;
  interact: (ui: UiController, item?: GameItem) => void;
  isInteractable: (ui: UiController, item?: GameItem) => boolean;
}

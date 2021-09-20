import { Coord } from "./Coord";
import { GameWorld } from "./GameWorld";
import { PixelScreen } from "./PixelScreen";

export interface GameObject {
  zIndex: () => number;
  getCoord: () => Coord;
  paint: (screen: PixelScreen) => void;
  tick: (world: GameWorld) => void;
  isSolid: () => boolean;
  tileSize: () => Coord;
}

import { Coord } from "./Coord";
import { GameWorld } from "./GameWorld";
import { PixelScreen } from "./PixelScreen";

export interface GameObject {
  zIndex: () => number;
  getCoord: () => Coord;
  tick: (world: GameWorld) => void;
  paint: (screen: PixelScreen) => void;
}

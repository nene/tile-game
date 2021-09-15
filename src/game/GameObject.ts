import { Coord } from "./Coord";
import { PixelScreen } from "./PixelScreen";

export interface GameObject {
  zIndex: () => number;
  getCoord: () => Coord;
  tick: (screen: PixelScreen) => void;
  paint: (screen: PixelScreen) => void;
}

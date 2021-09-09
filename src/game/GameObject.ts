import { Coord } from "./Coord";
import { PixelScreen } from "./PixelScreen";

export interface GameObject {
  zIndex: () => number;
  tick: (screen: PixelScreen) => void;
  paint: (screen: PixelScreen) => void;
}

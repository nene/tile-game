import { Coord } from "./Coord";
import { PixelScreen } from "./PixelScreen";

export interface GameLocationBackground {
  paint: (screen: PixelScreen) => void;
}

export interface GameLocation {
  gridSize: () => Coord;
  getBackground: () => GameLocationBackground;
}

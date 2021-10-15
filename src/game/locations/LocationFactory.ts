import { Coord } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";

export interface GameLocationBackground {
  paint: (screen: PixelScreen) => void;
}

export interface LocationFactory {
  getSize: () => Coord;
  getBackground: () => GameLocationBackground;
  getObjects: () => GameObject[];
}

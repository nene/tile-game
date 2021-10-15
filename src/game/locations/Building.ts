import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";

export interface Building {
  paint: (screen: PixelScreen) => void;
  getWalls: () => GameObject[];
}

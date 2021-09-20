import { GameGrid } from "./GameGrid";
import { GameObject } from "./GameObject";
import { PixelScreen } from "./PixelScreen";

export interface GameLocationBackground {
  paint: (screen: PixelScreen) => void;
}

export interface GameLocation {
  getGrid: () => GameGrid;
  getBackground: () => GameLocationBackground;
  getStaticObjects: () => GameObject[];
}

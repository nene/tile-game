import { Coord } from "./Coord";
import { GameWorld } from "./GameWorld";
import { PixelScreen } from "./PixelScreen";

export interface StaticGameObject {
  zIndex: () => number;
  getCoord: () => Coord;
  paint: (screen: PixelScreen) => void;
}

export interface GameObject extends StaticGameObject {
  tick: (world: GameWorld) => void;
}

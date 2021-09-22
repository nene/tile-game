import { Coord, Rect } from "./Coord";
import { GameWorld } from "./GameWorld";
import { PixelScreen } from "./PixelScreen";
import { Player } from "./Player";

export interface GameObject {
  zIndex: () => number;
  getCoord: () => Coord;
  paint: (screen: PixelScreen) => void;
  tick: (world: GameWorld) => void;
  isSolid: () => boolean;
  tileSize: () => Coord;
  hitBox: () => Rect;
  onInteract: (player: Player) => void;
}

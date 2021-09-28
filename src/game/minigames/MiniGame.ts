import { Coord } from "../Coord";
import { PixelScreen } from "../PixelScreen";

export interface MiniGame {
  tick: () => void;
  paint: (screen: PixelScreen) => void;
  handleClick: (coord: Coord) => void;
  handleMouseMove: (coord: Coord) => void;
  handleMouseDown: (coord: Coord) => void;
  handleMouseUp: (coord: Coord) => void;
  isFinished: () => boolean;
}

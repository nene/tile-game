import { Coord } from "../Coord";
import { PixelScreen } from "../PixelScreen";

export interface MiniGame {
  tick: () => void;
  paint: (screen: PixelScreen) => void;
  handleMouseEvent: (type: string, coord: Coord, wheelDelta?: Coord) => boolean | undefined;
  isFinished: () => boolean;
}

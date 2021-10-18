import { Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";

export interface DialogContent {
  paint: (screen: PixelScreen, rect: Rect) => void;
  handleGameEvent: (event: GameEvent) => boolean | undefined;
}

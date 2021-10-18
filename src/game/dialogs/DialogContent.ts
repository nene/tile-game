import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";

export interface DialogContent {
  paint: (screen: PixelScreen) => void;
  handleGameEvent: (event: GameEvent) => boolean | undefined;
}

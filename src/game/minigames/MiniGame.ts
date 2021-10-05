import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";

export interface MiniGame {
  tick: () => void;
  paint: (screen: PixelScreen) => void;
  handleMouseEvent: (event: GameEvent) => boolean | undefined;
  isFinished: () => boolean;
}

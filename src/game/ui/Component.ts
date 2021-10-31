import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";

export interface Component {
  paint: (screen: PixelScreen) => void;
  handleGameEvent: (event: GameEvent) => boolean | undefined;
}

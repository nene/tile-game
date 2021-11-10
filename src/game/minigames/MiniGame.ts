import { PlayerAttributes } from "../attributes/PlayerAttributes";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";

export interface MiniGame {
  tick: () => void;
  paint: (screen: PixelScreen) => void;
  handleGameEvent: (event: GameEvent) => boolean | undefined;
  isFinished: () => boolean;
  init: (attributes: PlayerAttributes) => void;
}

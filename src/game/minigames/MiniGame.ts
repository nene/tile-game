import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";

export interface MiniGame {
  tick: () => void;
  paint: (screen: PixelScreen) => void;
  handleGameEvent: (event: GameEvent) => boolean | undefined;
  isFinished: () => boolean;
  setHandShakeAmount: (amount: number) => void;
}

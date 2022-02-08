import { PlayerAttributes } from "../attributes/PlayerAttributes";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { MiniGame } from "./MiniGame";

export class DiscardSelectedItem implements MiniGame {
  init(attributes: PlayerAttributes) {
    attributes.setSelectedItem(undefined);
  }

  tick() { }

  paint(screen: PixelScreen) { }

  handleGameEvent(event: GameEvent): boolean | undefined {
    return undefined;
  }

  isFinished(): boolean {
    return true;
  }
}

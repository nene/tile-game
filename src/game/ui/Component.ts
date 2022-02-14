import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";

export interface Component {
  paint: (screen: PixelScreen) => void;
  handleGameEvent: (event: GameEvent) => boolean | undefined;
}

export interface TickableComponent extends Component {
  tick(): void;
}

export const isTickableComponent = (cmp: Component): cmp is TickableComponent => "tick" in cmp;

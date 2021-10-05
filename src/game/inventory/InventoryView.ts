import { Coord } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";

export interface InventoryView {
  paint: (screen: PixelScreen) => void;
  handleGameEvent: (event: GameEvent) => boolean | undefined;
  isCoordInView: (screenCoord: Coord) => boolean;
  getSlotIndexAtCoord: (screenCoord: Coord) => number;
}

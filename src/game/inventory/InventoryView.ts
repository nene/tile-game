import { Coord, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";

export interface InventoryView {
  paint: (screen: PixelScreen) => void;
  handleGameEvent: (event: GameEvent) => boolean | undefined;
  getRect: () => Rect;
  getSlotIndexAtCoord: (screenCoord: Coord) => number;
}

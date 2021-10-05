import { Coord } from "../Coord";
import { PixelScreen } from "../PixelScreen";

export interface InventoryView {
  paint: (screen: PixelScreen) => void;
  isCoordInView: (screenCoord: Coord) => boolean;
  getSlotIndexAtCoord: (screenCoord: Coord) => number;
}

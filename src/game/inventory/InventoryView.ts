import { Coord, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { GameItem } from "../items/GameItem";
import { PixelScreen } from "../PixelScreen";
import { Inventory } from "./Inventory";

export type SlotClickHandler = (slotIndex: number, item?: GameItem) => void;
export type ItemHoverHandler = (coord: Coord, item: GameItem) => void;

export interface InventoryView {
  paint: (screen: PixelScreen) => void;
  handleGameEvent: (event: GameEvent) => boolean | undefined;
  getRect: () => Rect;
  getSlotIndexAtCoord: (screenCoord: Coord) => number;
  getInventory: () => Inventory;
  onSlotClick: (callback: SlotClickHandler) => void;
  onItemHover: (callback: ItemHoverHandler) => void;
}

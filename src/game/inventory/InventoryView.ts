import { Coord } from "../Coord";
import { GameEvent } from "../GameEvent";
import { GameItem } from "../items/GameItem";
import { PixelScreen } from "../PixelScreen";
import { Inventory } from "./Inventory";

export type SlotClickHandler = (slotIndex: number, item?: GameItem) => void;
export type ItemHoverHandler = (coord: Coord, item: GameItem) => void;

export interface InventoryView {
  paint: (screen: PixelScreen) => void;
  handleGameEvent: (event: GameEvent) => boolean | undefined;
  getInventory: () => Inventory;
  onSlotClick: (callback: SlotClickHandler) => void;
  onSlotRightClick: (callback: SlotClickHandler) => void;
  onItemHover: (callback: ItemHoverHandler) => void;
}

import { Coord } from "../Coord";
import { GameItem } from "../items/GameItem";
import { Component } from "../ui/Component";
import { Inventory } from "./Inventory";

export type SlotClickHandler = (slotIndex: number, item?: GameItem) => void;
export type ItemHoverHandler = (coord: Coord, item: GameItem) => void;

export interface InventoryView extends Component {
  getInventory: () => Inventory;
  onSlotClick: (callback: SlotClickHandler) => void;
  onSlotRightClick: (callback: SlotClickHandler) => void;
  onItemHover: (callback: ItemHoverHandler) => void;
}

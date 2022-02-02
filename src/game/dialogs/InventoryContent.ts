import { Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { GridInventoryView } from "../inventory/GridInventoryView";
import { Inventory } from "../inventory/Inventory";
import { PixelScreen } from "../PixelScreen";
import { Component } from "../ui/Component";
import { TextContent } from "./TextContent";

export class InventoryContent implements Component {
  private text: TextContent;
  private grid: GridInventoryView;

  constructor(inventory: Inventory, text: string, rect: Rect) {
    this.text = new TextContent(text, rect);
    this.grid = new GridInventoryView({
      inventory,
      size: [inventory.size(), 1],
      container: rect,
      align: "bottom",
    });
  }

  paint(screen: PixelScreen) {
    this.text.paint(screen);
    this.grid.paint(screen);
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    return this.text.handleGameEvent(event) || this.grid.handleGameEvent(event);
  }

  getGrid() {
    return this.grid;
  }
}

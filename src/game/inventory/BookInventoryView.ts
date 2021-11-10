import { Coord, coordAdd, isCoordInRect, rectGrow } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { Inventory } from "./Inventory";
import { InventoryView, ItemHoverHandler, SlotClickHandler } from "./InventoryView";
import { Headline, Window } from "../ui/Window";
import { GridInventoryView } from "./GridInventoryView";
import { GameEvent } from "../GameEvent";
import { Book, isBook } from "../items/Book";
import { TextContent } from "../dialogs/TextContent";

interface BookInventoryViewCfg {
  inventory: Inventory;
  headline: Headline;
  windowSize: Coord;
  gridSize: Coord;
  onClose: () => void;
}

export class BookInventoryView implements InventoryView {
  private inventory: Inventory;
  private window: Window;
  private grid: GridInventoryView;

  constructor({ inventory, windowSize, gridSize, headline, onClose }: BookInventoryViewCfg) {
    this.inventory = inventory;
    this.window = new Window({ headline, size: windowSize, onClose });

    this.grid = new GridInventoryView({
      inventory,
      size: gridSize,
      container: this.window.contentAreaRect(),
      align: "top-left",
    });
  }

  onSlotClick(cb: SlotClickHandler) {
    this.grid.onSlotClick(cb);
  }

  onSlotRightClick(cb: SlotClickHandler) {
    this.grid.onSlotRightClick(cb);
  }

  onItemHover(cb: ItemHoverHandler) {
    this.grid.onItemHover(cb);
  }

  paint(screen: PixelScreen) {
    this.window.paint(screen);
    this.grid.paint(screen);
    this.drawNames(screen);
  }

  private drawNames(screen: PixelScreen) {
    const { coord, size } = this.window.contentAreaRect();

    const namesList = new TextContent(
      this.getNames(),
      rectGrow({ coord: coordAdd(coord, [23, 0]), size: coordAdd(size, [-23, 0]) }, [-1, -1]),
    );

    namesList.paint(screen);
  }

  private getBook(): Book | undefined {
    const item = this.inventory.itemAt(0);
    return item && isBook(item) ? item : undefined;
  }

  private getNames(): string {
    const book = this.getBook();
    return book ? book.getEntries().map((char) => char.getName()).join("\n") : ""
  }

  handleGameEvent(event: GameEvent) {
    if (this.window.handleGameEvent(event) || this.grid.handleGameEvent(event)) {
      return true;
    }
    return event.type === "click" && isCoordInRect(event.coord, this.window.getRect());
  }

  getInventory() {
    return this.grid.getInventory();
  }
}

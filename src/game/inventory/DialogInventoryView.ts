import { isCoordInRect } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { Inventory } from "./Inventory";
import { InventoryView, ItemHoverHandler, SlotClickHandler } from "./InventoryView";
import { GameEvent } from "../GameEvent";
import { Character } from "../npc/Character";
import { Dialog } from "../dialogs/Dialog";
import { UiApi } from "../UiController";
import { InventoryContent } from "../dialogs/InventoryContent";
import { TickableComponent } from "../ui/Component";

interface DialogInventoryViewCfg {
  ui: UiApi;
  inventory: Inventory;
  character: Character;
  text: string;
  onClose: () => void;
}

export class DialogInventoryView implements InventoryView, TickableComponent {
  private inventory: Inventory;
  private dialog: Dialog;
  private content?: InventoryContent;

  constructor({ ui, inventory, character, text, onClose }: DialogInventoryViewCfg) {
    this.inventory = inventory;

    this.dialog = new Dialog({
      ui,
      character,
      align: "center",
      createContent: (rect) => {
        return this.content = new InventoryContent(inventory, text, rect);
      },
      onClose,
    });
  }

  tick() {
    this.dialog.tick();
  }

  onSlotClick(cb: SlotClickHandler) {
    this.content?.getGrid().onSlotClick(cb);
  }

  onSlotRightClick(cb: SlotClickHandler) {
    this.content?.getGrid().onSlotRightClick(cb);
  }

  onItemHover(cb: ItemHoverHandler) {
    this.content?.getGrid().onItemHover(cb);
  }

  paint(screen: PixelScreen) {
    this.dialog.paint(screen);
  }

  handleGameEvent(event: GameEvent) {
    if (this.dialog.handleGameEvent(event)) {
      return true;
    }
    return event.type === "click" && isCoordInRect(event.coord, this.dialog.getRect());
  }

  getInventory() {
    return this.inventory;
  }
}

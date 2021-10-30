import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { StaticInventory } from "../inventory/StaticInventory";
import { StorageInventoryView } from "../inventory/StorageInventoryView";
import { Tap } from "../items/Tap";
import { Drain } from "../items/Drain";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";

export class KitchenSink implements GameObject {
  private inventory = new StaticInventory({
    size: 2,
    items: [
      new Tap(),
      new Drain(),
    ],
  });

  constructor(private coord: Coord) {
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(SpriteLibrary.getSprite('kitchen-sink'), this.coord);
  }

  zIndex() {
    return this.coord[1];
  }

  getCoord() {
    return this.coord;
  }

  isSolid() {
    return true;
  }

  hitBox(): Rect {
    return { coord: [0, -27], size: [16, 43] };
  }

  boundingBox(): Rect {
    return { coord: [0, -16], size: [16, 32] };
  }

  isInteractable(ui: UiController) {
    return true;
  }

  onInteract(ui: UiController) {
    ui.showInventory(new StorageInventoryView({
      inventory: this.inventory,
      windowSize: [140, 87],
      gridSize: [2, 1],
      headline: { title: "Kraanikauss", description: "Täida siin šoppen veega või tühjenda valamusse." },
      onClose: () => {
        ui.hideInventory();
      },
    }));
  }
}

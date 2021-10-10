import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { StaticInventory } from "../inventory/StaticInventory";
import { StorageInventoryView } from "../inventory/StorageInventoryView";
import { BottleOpener, BottleOpenerType } from "../items/BottleOpener";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";

export class Countertop implements GameObject {
  private sprite: Sprite;
  private inventory = new StaticInventory({
    size: 1,
    items: [
      new BottleOpener(BottleOpenerType.attatched),
    ],
  });

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.get("countertop").getSprite([0, 0]);
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.sprite, this.coord);
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
    return { coord: [0, -23], size: [16, 55] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [16, 32] };
  }

  onInteract(ui: UiController) {
    ui.showInventory(this.inventory, new StorageInventoryView({
      inventory: this.inventory,
      rect: { coord: [115, 45], size: [91, 87] },
      size: [1, 1],
      headline: { title: "Konvendi avaja", description: "Vaid koha peal kasutamiseks." }
    }));
  }
}

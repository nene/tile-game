import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { StorageInventory } from "../inventory/StorageInventory";
import { BottleOpener, BottleOpenerType } from "../items/BottleOpener";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";

export class Countertop implements GameObject {
  private sprite: Sprite;
  private inventory = new StorageInventory({
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
    ui.showInventory(this.inventory, { title: "Konvendi avaja", description: "Vaid koha peal kasutamiseks." });
  }
}

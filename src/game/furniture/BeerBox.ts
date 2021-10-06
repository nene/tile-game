import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { StorageInventory } from "../inventory/StorageInventory";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";

export class BeerBox implements GameObject {
  private sprite: Sprite;
  private inventory: StorageInventory;

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.get("beer-box").getSprite([0, 0]);
    this.inventory = new StorageInventory({
      size: 12,
    });
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
    return { coord: [3, -4], size: [11, 14] };
  }

  boundingBox(): Rect {
    return { coord: [3, 0], size: [11, 10] };
  }

  onInteract(ui: UiController) {
    ui.showInventory(this.inventory, { title: "Õllekast", description: "Viska siia tühjad pudelid." });
  }
}

import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { StaticInventory } from "../inventory/StaticInventory";
import { StorageInventoryView } from "../inventory/StorageInventoryView";
import { LockedBottleOpener } from "../items/LockedBottleOpener";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";

export class Countertop implements GameObject {
  private sprite: Sprite;
  private inventory = new StaticInventory({
    size: 1,
    items: [
      new LockedBottleOpener(),
    ],
  });

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.getSprite("countertop");
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

  isInteractable() {
    return true;
  }

  interact(ui: UiController) {
    ui.showInventory(new StorageInventoryView({
      inventory: this.inventory,
      windowSize: [97, 87],
      gridSize: [1, 1],
      headline: { title: "Konvendi avaja", description: "Vaid koha peal kasutamiseks." },
      onClose: () => {
        ui.hideInventory();
      },
    }));
  }
}

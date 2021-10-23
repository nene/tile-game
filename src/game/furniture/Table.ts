import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { StorageInventory } from "../inventory/StorageInventory";
import { StorageInventoryView } from "../inventory/StorageInventoryView";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";

export class Table implements GameObject {
  private sprite: Sprite;
  private inventory: StorageInventory;

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.getSprite("table");
    this.inventory = new StorageInventory({
      size: 10,
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
    return { coord: [0, -6], size: [64, 17] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [64, 16] };
  }

  isInteractable() {
    return true;
  }

  onInteract(ui: UiController) {
    ui.showInventory(new StorageInventoryView({
      inventory: this.inventory,
      windowSize: [112, 66],
      gridSize: [5, 2],
      headline: { title: "Laud", description: "Siin võib vedeleda tühju šoppeneid." },
      onClose: () => ui.hideInventory(),
    }));
  }
}

import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { StorageInventory } from "../inventory/StorageInventory";
import { StorageInventoryView } from "../inventory/StorageInventoryView";
import { PixelScreen } from "../PixelScreen";
import { SoundLibrary } from "../sounds/SoundLibrary";
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

  isInteractable() {
    return true;
  }

  onInteract(ui: UiController) {
    SoundLibrary.play("glass-bottles");
    ui.showInventory(this.inventory, new StorageInventoryView({
      inventory: this.inventory,
      windowSize: [91, 87],
      gridSize: [4, 3],
      headline: { title: "Õllekast", description: "Viska siia tühjad pudelid." }
    }));
  }
}

import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { StorageInventory } from "../inventory/StorageInventory";
import { StorageInventoryView } from "../inventory/StorageInventoryView";
import { isBeerBottle } from "../items/BeerBottle";
import { PixelScreen } from "../PixelScreen";
import { SoundLibrary } from "../sounds/SoundLibrary";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";

export class BeerBox implements GameObject {
  private sprite: Sprite;
  private inventory: StorageInventory;

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.getSprite("beer-box");
    this.inventory = new StorageInventory({
      size: 12,
      isAcceptingItem: (item) => isBeerBottle(item) && item.isEmpty(),
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

  interact(ui: UiController) {
    SoundLibrary.play("glass-bottles");
    this.inventory.clear();
    ui.showInventory(new StorageInventoryView({
      inventory: this.inventory,
      windowSize: [91, 87],
      gridSize: [4, 3],
      headline: { title: "Taarakast", description: "Viska siia tühjad pudelid." },
      onClose: () => ui.hideInventory(),
    }));
  }
}

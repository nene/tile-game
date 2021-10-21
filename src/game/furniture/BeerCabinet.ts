import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { StorageInventory } from "../inventory/StorageInventory";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { BeerGlass } from "../items/BeerGlass";
import { UiController } from "../UiController";
import { SoundLibrary } from "../sounds/SoundLibrary";
import { StorageInventoryView } from "../inventory/StorageInventoryView";

export class BeerCabinet implements GameObject {
  private sprite: Sprite;
  private inventory: StorageInventory;

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.getSprite("beer-cabinet");
    this.inventory = new StorageInventory({
      size: 12,
      items: [
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
      ],
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
    return { coord: [0, -32], size: [32, 45] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [32, 13] };
  }

  isInteractable() {
    return true;
  }

  onInteract(ui: UiController) {
    SoundLibrary.play('opening-cabinet-door');
    ui.showInventory(new StorageInventoryView({
      inventory: this.inventory,
      windowSize: [91, 87],
      gridSize: [4, 3],
      headline: { title: "Šoppeniriiul", description: "Haara siit paar kannu." },
      onClose: () => ui.hideInventory(),
    }));
  }
}

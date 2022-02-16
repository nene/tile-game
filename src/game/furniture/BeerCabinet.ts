import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { StorageInventory } from "../inventory/StorageInventory";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { BeerGlass, isBeerGlass } from "../items/BeerGlass";
import { UiApi } from "../UiController";
import { SoundLibrary } from "../sounds/SoundLibrary";
import { StorageInventoryView } from "../inventory/StorageInventoryView";

export class BeerCabinet implements GameObject {
  private sprite: Sprite;
  private inventory: StorageInventory;

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.getSprite("beer-cabinet");
    this.inventory = new StorageInventory({
      size: 24,
      items: [
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
        new BeerGlass(),
      ],
      isAcceptingItem: isBeerGlass,
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

  interact(ui: UiApi) {
    SoundLibrary.play('opening-cabinet-door');
    ui.showInventory(new StorageInventoryView({
      inventory: this.inventory,
      windowSize: [109, 92],
      gridSize: [6, 4],
      headline: { title: "Šoppeniriiul", description: "Haara siit paar kannu." },
      onClose: () => ui.hideInventory(),
    }));
  }
}

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
    this.sprite = SpriteLibrary.get("beer-cabinet").getSprite([0, 0]);
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

  onInteract(ui: UiController) {
    SoundLibrary.play('opening-cabinet-door');
    ui.showInventory(this.inventory, new StorageInventoryView({
      inventory: this.inventory,
      rect: { coord: [115, 45], size: [91, 87] },
      size: [4, 3],
      headline: { title: "Shoppeniriiul", description: "Haara siit paar kannu." }
    }));
  }
}

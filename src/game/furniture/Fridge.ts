import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { Inventory } from "../Inventory";
import { BeerBottle, BeerType } from "../items/BeerBottle";
import { PixelScreen } from "../PixelScreen";
import { SoundLibrary } from "../SoundLibrary";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { UiController } from "../UiController";

export class Fridge implements GameObject {
  private sprite: Sprite;
  private inventory: Inventory;

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.get("fridge").getSprite([0, 0]);
    this.inventory = new Inventory({
      size: [3, 3],
      items: [
        new BeerBottle(BeerType.alexander),
        new BeerBottle(BeerType.alexander),
        new BeerBottle(BeerType.alexander),
        new BeerBottle(BeerType.heineken),
        new BeerBottle(BeerType.heineken),
        new BeerBottle(BeerType.heineken),
        new BeerBottle(BeerType.special),
        new BeerBottle(BeerType.special),
        new BeerBottle(BeerType.special),
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

  tileSize(): Coord {
    return [1, 1];
  }

  hitBox(): Rect {
    return { coord: [0, -32], size: [16, 45] };
  }

  onInteract(ui: UiController) {
    SoundLibrary.play('opening-fridge-door');
    ui.showInventory(this.inventory, "Külmik");
  }
}

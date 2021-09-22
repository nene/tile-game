import { Coord, Rect } from "./Coord";
import { GameObject, UiController } from "./GameObject";
import { Inventory } from "./Inventory";
import { PixelScreen } from "./PixelScreen";
import { Sprite } from "./Sprite";
import { SpriteLibrary } from "./SpriteLibrary";
import { BeerGlass } from "./items/BeerGlass";

export class BeerCabinet implements GameObject {
  private sprite: Sprite;
  private inventory: Inventory;

  constructor(private coord: Coord, sprites: SpriteLibrary) {
    this.sprite = sprites.get("beer-cabinet").getSprite([0, 0]);
    this.inventory = new Inventory({
      size: 9,
      items: [
        new BeerGlass(sprites),
        new BeerGlass(sprites),
        new BeerGlass(sprites),
        new BeerGlass(sprites),
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
    return [2, 1];
  }

  hitBox(): Rect {
    return { coord: [0, -32], size: [32, 45] };
  }

  onInteract(ui: UiController) {
    ui.showInventory(this.inventory);
  }
}

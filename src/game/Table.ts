import { Coord, Rect } from "./Coord";
import { GameObject } from "./GameObject";
import { PixelScreen } from "./PixelScreen";
import { Sprite } from "./Sprite";
import { SpriteLibrary } from "./SpriteLibrary";

export class Table implements GameObject {
  private sprite: Sprite;

  constructor(private coord: Coord, sprites: SpriteLibrary) {
    this.sprite = sprites.get("table").getSprite([0, 0]);
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
    return [4, 1];
  }

  hitBox(): Rect {
    return { coord: [0, -6], size: [64, 17] };
  }

  onInteract() { }
}

import { Coord } from "./Coord";
import { GameObject } from "./GameObject";
import { PixelScreen } from "./PixelScreen";
import { Sprite } from "./Sprite";
import { SpriteLibrary } from "./SpriteLibrary";

export class Wall implements GameObject {
  private sprite: Sprite;

  constructor(private coord: Coord, sprites: SpriteLibrary) {
    this.sprite = sprites.get("cfe-wall").getSprite([0, 0]);
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.sprite, this.coord);
  }

  getCoord() {
    return this.coord;
  }

  zIndex() {
    return this.coord[1];
  }

  isSolid() {
    return true;
  }

  tileSize(): Coord {
    return [1, 2];
  }
}

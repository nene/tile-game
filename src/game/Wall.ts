import { Coord, coordSub } from "./Coord";
import { GameObject } from "./GameObject";
import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./SpriteLibrary";
import { SpriteSheet } from "./SpriteSheet";

export class Wall implements GameObject {
  private wallSprites: SpriteSheet;

  constructor(private coord: Coord, sprites: SpriteLibrary) {
    this.wallSprites = sprites.get("cfe-bg");
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.wallSprites.getSprite([0, 0]), coordSub(this.coord, [0, 16]));
    screen.drawSprite(this.wallSprites.getSprite([0, 1]), this.coord);
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
    return [1, 1];
  }
}

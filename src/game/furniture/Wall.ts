import { Coord, coordAdd, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";

export class Wall implements GameObject {
  private sprite: Sprite;

  constructor(private coord: Coord, private widthInTiles: number = 1) {
    this.sprite = SpriteLibrary.get("cfe-wall").getSprite([0, 0]);
  }

  tick() { }

  paint(screen: PixelScreen) {
    for (let i = 0; i < this.widthInTiles; i++) {
      screen.drawSprite(this.sprite, coordAdd(this.coord, [i * 16, 0]));
    }
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

  hitBox(): Rect {
    return { coord: [0, 0], size: [16 * this.widthInTiles, 48] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [16 * this.widthInTiles, 48] };
  }

  onInteract() { }
}

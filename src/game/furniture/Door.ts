import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";

export class Door implements GameObject {
  private sprite: Sprite;

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.get("door").getSprite([0, 0]);
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
    return { coord: [-1, -33], size: [18, 33] };
  }

  boundingBox(): Rect {
    return { coord: [-1, -33], size: [18, 33] };
  }

  onInteract() { }
}

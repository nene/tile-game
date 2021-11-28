import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";

export class Pianino implements GameObject {
  constructor(private coord: Coord) {
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(SpriteLibrary.getSprite("pianino"), this.coord);
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
    return { coord: [0, -17], size: [32, 26] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [32, 9] };
  }

  isInteractable() {
    return false;
  }

  interact() { }
}

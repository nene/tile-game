import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";

export class FeenoksFridge implements GameObject {
  constructor(private coord: Coord) {
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(SpriteLibrary.getSprite("feenoks-fridge"), this.coord);
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
    return this.boundingBox();
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [32, 11] };
  }

  isInteractable() {
    return false;
  }

  interact() { }
}

import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";

export class BoardTable implements GameObject {
  constructor(private coord: Coord) {
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(SpriteLibrary.getSprite("board-table"), this.coord);
  }

  zIndex() {
    return this.coord[1] + this.boundingBox().coord[1];
  }

  getCoord() {
    return this.coord;
  }

  isSolid() {
    return true;
  }

  hitBox(): Rect {
    return { coord: [-5, -5], size: [42, 22] };
  }

  boundingBox(): Rect {
    return { coord: [-5, 4], size: [42, 13] };
  }

  isInteractable() {
    return false;
  }

  interact() { }
}

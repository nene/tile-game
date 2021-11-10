import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";

// Just a box which can't be walked through
// Invisible in itself, relies on the background map to render the wall itself
export class Wall implements GameObject {
  private coord: Coord;
  private size: Coord;

  constructor({ coord, size }: Rect) {
    this.coord = coord;
    this.size = size;
  }

  tick() { }

  paint() { }

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
    return { coord: [0, 0], size: this.size };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: this.size };
  }

  isInteractable() {
    return false;
  }

  interact() { }
}

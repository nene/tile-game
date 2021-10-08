import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";

// Invisible in itself, relies on the background map to render the wall itself
export class Wall implements GameObject {
  constructor(private coord: Coord, private widthInTiles: number = 1) {
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
    return { coord: [0, 0], size: [16 * this.widthInTiles, 16] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [16 * this.widthInTiles, 16] };
  }

  onInteract() { }
}

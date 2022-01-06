import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";

export class PlayerSpawnPoint implements GameObject {
  constructor(private coord: Coord) { }

  tick() { }

  paint() { }

  zIndex() {
    return this.coord[1];
  }

  getCoord() {
    return this.coord;
  }

  isSolid() {
    return false;
  }

  hitBox(): Rect {
    return { coord: [0, 0], size: [0, 0] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [0, 0] };
  }

  isInteractable() {
    return false;
  }

  interact() { }
}

export const isPlayerSpawnPoint = (obj: GameObject): obj is PlayerSpawnPoint => obj instanceof PlayerSpawnPoint;

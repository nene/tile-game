import { Coord, coordAdd, Rect, rectTranslate } from "./Coord";
import { GameObject } from "./GameObject";

interface ObstacleLookup {
  getObjectsInRect: (bounds: Rect) => GameObject[];
}

export class PlayerMovement {
  constructor(private player: GameObject) { }

  move(speed: Coord, location: ObstacleLookup): Coord {
    const newCoord = coordAdd(this.player.getCoord(), speed);
    const bounds = rectTranslate(this.player.boundingBox(), newCoord);

    if (location.getObjectsInRect(bounds).some((obj) => obj.isSolid() && obj !== this.player)) {
      return this.player.getCoord();
    }

    return newCoord;
  }
}

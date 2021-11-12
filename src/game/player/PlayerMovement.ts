import { times } from "lodash";
import { Coord, coordAdd, Rect, rectTranslate } from "../Coord";
import { GameObject } from "../GameObject";

interface ObstacleLookup {
  getObjectsInRect: (bounds: Rect) => GameObject[];
}

export class PlayerMovement {
  constructor(private player: GameObject) { }

  move([dirX, dirY]: Coord, speed: number, location: ObstacleLookup): Coord {
    let coord = this.player.getCoord();
    times(speed, () => {
      coord = this.tryMove(coord, [dirX, 0], location) || coord;
      coord = this.tryMove(coord, [0, dirY], location) || coord;
    });
    return coord;
  }

  private tryMove(coord: Coord, direction: Coord, location: ObstacleLookup): Coord | undefined {
    const newCoord = coordAdd(coord, direction);
    const bounds = rectTranslate(this.player.boundingBox(), newCoord);
    return this.overlapsObstacle(bounds, location) ? undefined : newCoord;
  }

  private overlapsObstacle(bounds: Rect, location: ObstacleLookup): boolean {
    return location.getObjectsInRect(bounds).some((obj) => obj.isSolid() && obj !== this.player);
  }
}

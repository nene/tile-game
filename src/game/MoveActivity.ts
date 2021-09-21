import { Coord, coordEq, coordMul, coordUnit, coordSub, coordAdd } from "./Coord";
import { GameWorld } from "./GameWorld";
import { Sprite } from "./Sprite";

export interface ActivityUpdates {
  finished?: boolean;
  coord?: Coord;
  extraSprite?: Sprite;
}

export interface Activity {
  tick: (world: GameWorld) => ActivityUpdates;
}

export class MoveActivity implements Activity {
  private speed: Coord = [0, 0];
  private path?: Coord[];
  constructor(private coord: Coord, private destination: Coord) { }

  public tick(world: GameWorld): ActivityUpdates {
    if (coordEq(this.coord, this.destination)) {
      return { finished: true };
    }

    const targetCoord = this.getActivePathStep(world);
    if (targetCoord) {
      this.speed = coordMul(coordUnit(coordSub(targetCoord, this.coord)), [2, 2]);

      this.coord = coordAdd(this.coord, this.speed);
      return { coord: this.coord };
    }
    return { finished: true };
  }

  private getActivePathStep(world: GameWorld): Coord | undefined {
    if (this.destination && !this.path) {
      this.path = world.findPath(this.coord, this.destination);
    }
    const current = this.path?.[0];
    if (current && coordEq(this.coord, current)) {
      this.path?.shift();
      return this.path?.[0];
    }
    return current;
  }
}

import { BurshType } from "../Bursh";
import { Coord, coordEq, coordMul, coordUnit, coordSub, coordAdd } from "../Coord";
import { GameWorld } from "../GameWorld";
import { SpriteAnimation } from "../SpriteAnimation";
import { SpriteLibrary } from "../SpriteLibrary";
import { Activity, ActivityUpdates } from "./Activity";

export class MoveActivity implements Activity {
  private speed: Coord = [0, 0];
  private path?: Coord[];
  private animation: SpriteAnimation;

  constructor(private coord: Coord, private destination: Coord, type: BurshType) {
    this.animation = new SpriteAnimation(SpriteLibrary.get(type), {
      frames: [[0, 0]],
    });
  }

  public tick(world: GameWorld): ActivityUpdates {
    this.animation.tick();
    const sprites = [this.animation.getSprite()];

    if (coordEq(this.coord, this.destination)) {
      return { finished: true, sprites };
    }

    const targetCoord = this.getActivePathStep(world);
    if (targetCoord) {
      this.speed = coordMul(coordUnit(coordSub(targetCoord, this.coord)), [2, 2]);

      this.coord = coordAdd(this.coord, this.speed);
      return { coord: this.coord, sprites };
    }
    return { finished: true, sprites };
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

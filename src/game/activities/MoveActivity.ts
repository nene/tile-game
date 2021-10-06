import { Coord, coordEq, coordMul, coordUnit, coordSub, coordAdd } from "../Coord";
import { GameWorld } from "../GameWorld";
import { Character } from "../npc/Character";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Activity, ActivityUpdates } from "./Activity";

export class MoveActivity implements Activity {
  private speed: Coord = [0, 0];
  private path?: Coord[];
  private animation: SpriteAnimation;
  private finished = false;

  constructor(private coord: Coord, private destination: Coord, character: Character) {
    this.animation = new SpriteAnimation(SpriteLibrary.get(character.spriteSet), {
      frames: [[0, 0]],
    });
  }

  public tick(world: GameWorld): ActivityUpdates {
    this.animation.tick();
    const sprites = [this.animation.getSprite()];

    if (coordEq(this.coord, this.destination)) {
      this.finished = true;
      return { finished: true, sprites };
    }

    const targetCoord = this.getActivePathStep(world);
    if (targetCoord) {
      this.speed = coordMul(coordUnit(coordSub(targetCoord, this.coord)), [2, 2]);

      this.coord = coordAdd(this.coord, this.speed);
      return { coord: this.coord, sprites };
    }
    this.finished = true;
    return { finished: true, sprites };
  }

  public isFinished() {
    return this.finished;
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

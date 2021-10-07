import { Coord, coordEq, coordMul, coordUnit, coordSub, coordAdd } from "../Coord";
import { GameObject } from "../GameObject";
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

  constructor(private destination: Coord, character: Character) {
    this.animation = new SpriteAnimation(SpriteLibrary.get(character.spriteSet), {
      frames: [[0, 0]],
    });
  }

  public tick(figure: GameObject, world: GameWorld): ActivityUpdates {
    const coord = figure.getCoord();
    this.animation.tick();
    const sprites = [this.animation.getSprite()];

    if (coordEq(coord, this.destination)) {
      this.finished = true;
      return { sprites };
    }

    const targetCoord = this.getActivePathStep(coord, world);
    if (targetCoord) {
      this.speed = coordMul(coordUnit(coordSub(targetCoord, coord)), [2, 2]);

      return { coord: coordAdd(coord, this.speed), sprites };
    }
    this.finished = true;
    return { sprites };
  }

  public isFinished() {
    return this.finished;
  }

  private getActivePathStep(coord: Coord, world: GameWorld): Coord | undefined {
    if (this.destination && !this.path) {
      this.path = world.findPath(coord, this.destination);
    }
    const current = this.path?.[0];
    if (current && coordEq(coord, current)) {
      this.path?.shift();
      return this.path?.[0];
    }
    return current;
  }

  interact() { }

  nextActivity() {
    return undefined;
  }
}

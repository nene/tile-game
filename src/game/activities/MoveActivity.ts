import { Coord, coordEq, coordMul, coordUnit, coordSub, coordAdd } from "../Coord";
import { GameObject } from "../GameObject";
import { Location } from "../locations/Location";
import { Character } from "../npc/Character";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Activity, ActivityUpdates } from "./Activity";

export class MoveActivity implements Activity {
  private speed: Coord = [0, 0];
  private path?: Coord[];
  private animation: SpriteAnimation;
  private finished = false;

  constructor(private destination: Coord, character: Character, private next?: Activity) {
    this.animation = new SpriteAnimation(SpriteLibrary.get(character.getSpriteSet()), {
      frames: [[0, 0]],
    });
  }

  public tick(figure: GameObject, location: Location): ActivityUpdates {
    const coord = figure.getCoord();
    this.animation.tick();
    const sprites = this.animation.getSprites();

    if (coordEq(coord, this.destination)) {
      this.finished = true;
      return { sprites };
    }

    const targetCoord = this.getActivePathStep(coord, location);
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

  private getActivePathStep(coord: Coord, location: Location): Coord | undefined {
    if (this.destination && !this.path) {
      this.path = location.findPath(coord, this.destination);
    }
    const current = this.path?.[0];
    if (current && coordEq(coord, current)) {
      this.path?.shift();
      return this.path?.[0];
    }
    return current;
  }

  isInteractable() {
    return false;
  }

  interact() { }

  nextActivity() {
    return this.finished ? this.next : undefined;
  }
}

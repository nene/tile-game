import { Coord, coordAdd } from "../Coord";
import { Door } from "../furniture/Door";
import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { Character } from "../npc/Character";
import { Activity, ActivityUpdates } from "./Activity";
import { MoveActivity } from "./MoveActivity";

export class MoveToDoorActivity implements Activity {
  private targetCoord?: Coord;

  constructor(private character: Character) {
  }

  public tick(entity: GameObject, world: GameWorld): ActivityUpdates {
    const door = world.allObjects().find((o) => o instanceof Door) as Door;
    this.targetCoord = coordAdd(door.getCoord(), [8, 8]);
    return {};
  }

  public isFinished() {
    return Boolean(this.targetCoord);
  }

  interact() { }

  nextActivity() {
    if (this.targetCoord) {
      return new MoveActivity(this.targetCoord, this.character);
    }
  }
}

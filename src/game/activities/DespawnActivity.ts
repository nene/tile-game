import { GameObject } from "../GameObject";
import { GameWorld } from "../GameWorld";
import { Character } from "../npc/Character";
import { Activity, ActivityUpdates } from "./Activity";

export class DespawnActivity implements Activity {
  private removed = false;

  constructor(private character: Character) {
  }

  public tick(bursh: GameObject, world: GameWorld): ActivityUpdates {
    world.remove(bursh);
    this.removed = true;
    return {};
  }

  public isFinished() {
    return this.removed;
  }

  interact() { }

  nextActivity() {
    return undefined;
  }
}

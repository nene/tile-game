import { Activity } from "../activities/Activity";
import { IdleActivity } from "../activities/IdleActivity";
import { MoveToTableActivity } from "../activities/MoveToTableActivity";
import { MoveToDoorActivity } from "../activities/MoveToDoorActivity";
import { DespawnActivity } from "../activities/DespawnActivity";
import { Character } from "./Character";
import { PauseActivity } from "../activities/PauseActivity";
import { SatisfyDesiresActivity } from "../activities/SatisfyDesiresActivity";
import { EnterDoorActivity } from "../activities/EnterDoorActivity";
import { MoveActivity } from "../activities/MoveActivity";
import { tileToScreenCoord } from "../Coord";

export class ActivityManager {
  private queue: Activity[] = [];
  private idle: Activity;

  constructor(character: Character) {
    this.idle = new IdleActivity(character);
    this.queue = [
      new MoveToDoorActivity(character),
      new EnterDoorActivity(character),
      new PauseActivity(5, character),
      new MoveToTableActivity(character),
      new SatisfyDesiresActivity(character),
      new MoveToDoorActivity(character),
      new EnterDoorActivity(character),
      new MoveActivity(tileToScreenCoord([10, 15]), character),
      new DespawnActivity(character),
    ];
  }

  currentActivity(): Activity {
    if (this.queue.length === 0) {
      return this.idle;
    }

    if (this.queue[0].isFinished()) {
      const nextActivity = this.queue[0].nextActivity();
      this.queue.shift();
      if (nextActivity) {
        this.queue.unshift(nextActivity);
      }
      return this.currentActivity();
    }
    return this.queue[0];
  }
}

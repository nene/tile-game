import { Activity } from "../activities/Activity";
import { IdleActivity } from "../activities/IdleActivity";
import { MoveToTableActivity } from "../activities/MoveToTableActivity";
import { MoveToDoorActivity } from "../activities/MoveToDoorActivity";
import { DespawnActivity } from "../activities/DespawnActivity";
import { Character } from "./Character";
import { PauseActivity } from "../activities/PauseActivity";
import { SatisfyDesiresActivity } from "../activities/SatisfyDesiresActivity";

export class Desires {
  private queue: Activity[] = [];
  private idle: Activity;

  constructor(character: Character) {
    this.idle = new IdleActivity(character);
    this.queue = [
      new PauseActivity(5, character),
      new MoveToTableActivity(character),
      new SatisfyDesiresActivity(character),
      new MoveToDoorActivity(character),
      new DespawnActivity(character),
    ];
  }

  private startActivity(activity: Activity) {
    this.queue.unshift(activity);
  }

  private finishCurrentActivity() {
    this.queue.shift();
  }

  currentActivity(): Activity {
    if (this.queue.length === 0) {
      return this.idle;
    }

    if (this.queue[0].isFinished()) {
      const nextActivity = this.queue[0].nextActivity();
      this.finishCurrentActivity();
      if (nextActivity) {
        this.startActivity(nextActivity);
      }
      return this.currentActivity();
    }
    return this.queue[0];
  }
}

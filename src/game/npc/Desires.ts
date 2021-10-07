import { Activity } from "../activities/Activity";
import { CallFuxActivity } from "../activities/CallFuxActivity";
import { IdleActivity } from "../activities/IdleActivity";
import { MoveToTableActivity } from "../activities/MoveToTableActivity";
import { MoveToDoorActivity } from "../activities/MoveToDoorActivity";
import { Character } from "./Character";

export class Desires {
  private queue: Activity[] = [];
  private idle: Activity;

  constructor(character: Character) {
    this.idle = new IdleActivity(character);
    this.queue = [
      new MoveToTableActivity(character),
      new CallFuxActivity(character),
      new MoveToDoorActivity(character),
    ];
  }

  startActivity(activity: Activity) {
    this.queue.unshift(activity);
  }

  queueActivity(activity: Activity) {
    this.queue.push(activity);
  }

  finishCurrentActivity() {
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

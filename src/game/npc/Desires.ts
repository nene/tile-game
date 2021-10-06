import { Activity } from "../activities/Activity";
import { CallFuxActivity } from "../activities/CallFuxActivity";
import { IdleActivity } from "../activities/IdleActivity";
import { Character } from "./Character";

export class Desires {
  private queue: Activity[] = [];
  private idle: Activity;

  constructor(character: Character) {
    this.idle = new IdleActivity(character);
    this.queue = [
      new CallFuxActivity(character),
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
      this.queue.shift();
      return this.currentActivity();
    }
    return this.queue[0];
  }
}

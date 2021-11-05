import { Activity } from "../activities/Activity";
import { IdleActivity } from "../activities/IdleActivity";

export class ActivityManager {
  private queue: Activity[] = [];
  private idle = new IdleActivity();

  constructor(activities: Activity[]) {
    this.queue = activities;
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

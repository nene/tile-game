import { Activity } from "../activities/Activity";
import { CallFuxActivity } from "../activities/CallFuxActivity";
import { IdleActivity } from "../activities/IdleActivity";
import { MoveToTableActivity } from "../activities/MoveToTableActivity";
import { MoveToDoorActivity } from "../activities/MoveToDoorActivity";
import { DespawnActivity } from "../activities/DespawnActivity";
import { Character } from "./Character";
import { PauseActivity } from "../activities/PauseActivity";
import { AskQuestionInteraction } from "../activities/AskQuestionInteraction";
import { RequestBeerInteraction } from "../activities/RequestBeerInteraction";

export class Desires {
  private queue: Activity[] = [];
  private idle: Activity;

  constructor(character: Character) {
    this.idle = new IdleActivity(character);
    this.queue = [
      new PauseActivity(5, character),
      new MoveToTableActivity(character),
      new CallFuxActivity(character, new AskQuestionInteraction(character)),
      new CallFuxActivity(character, new RequestBeerInteraction(character)),
      new MoveToDoorActivity(character),
      new DespawnActivity(character),
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

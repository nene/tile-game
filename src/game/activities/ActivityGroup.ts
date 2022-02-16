import { GameWorld } from "../GameWorld";
import { GameItem } from "../items/GameItem";
import { Location } from "../locations/Location";
import { CharacterFigure } from "../npc/CharacterFigure";
import { UiApi } from "../UiController";
import { Activity, ActivityUpdates } from "./Activity";
import { IdleActivity } from "./IdleActivity";

export class ActivityGroup implements Activity {
  private queue: Activity[] = [];
  private idle = new IdleActivity();

  constructor(activities: Activity[]) {
    this.queue = activities;
  }

  private currentActivity(): Activity {
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

  tick(figure: CharacterFigure, location: Location, world: GameWorld): ActivityUpdates {
    return this.currentActivity().tick(figure, location, world);
  }

  isFinished(): boolean {
    return this.currentActivity().isFinished();
  }

  isInteractable(ui: UiApi, item?: GameItem): boolean {
    return this.currentActivity().isInteractable(ui, item);
  }

  interact(ui: UiApi, item?: GameItem): void {
    return this.currentActivity().interact(ui, item);
  }

  nextActivity(): Activity | undefined {
    return this.currentActivity().nextActivity();
  }
}

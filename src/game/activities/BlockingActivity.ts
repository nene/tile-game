import { GameWorld } from "../GameWorld";
import { GameItem } from "../items/GameItem";
import { Location } from "../locations/Location";
import { CharacterFigure } from "../npc/CharacterFigure";
import { UiApi } from "../UiController";
import { Activity, ActivityUpdates } from "./Activity";
import { ActivityTrigger } from "./ActivityTrigger";

export interface BlockingActivityConfig {
  triggers: ActivityTrigger[];
  innerActivity: Activity;
}

export class BlockingActivity implements Activity {
  private blockingActivity?: Activity;
  private triggers: ActivityTrigger[];
  private innerActivity: Activity;

  constructor({ triggers, innerActivity }: BlockingActivityConfig) {
    this.triggers = triggers;
    this.innerActivity = innerActivity;
  }

  private currentActivity(): Activity {
    return this.blockingActivity ?? this.innerActivity;
  }

  tick(figure: CharacterFigure, location: Location, world: GameWorld): ActivityUpdates {
    if (!this.blockingActivity) {
      const trigger = this.triggers.find((activity) => activity.shouldTrigger(figure, location, world));
      this.blockingActivity = trigger?.createActivity();
    }
    else if (this.blockingActivity.isFinished()) {
      this.blockingActivity = undefined;
    }

    return this.currentActivity().tick(figure, location, world);
  }

  isFinished(): boolean {
    return this.innerActivity.isFinished();
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

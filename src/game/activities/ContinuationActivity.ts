import { GameWorld } from "../GameWorld";
import { GameItem } from "../items/GameItem";
import { Location } from "../locations/Location";
import { CharacterFigure } from "../npc/CharacterFigure";
import { UiController } from "../UiController";
import { Activity, ActivityUpdates } from "./Activity";

export class ContinuationActivity implements Activity {
  constructor(private current: Activity, private next: Activity) {
  }

  public tick(figure: CharacterFigure, location: Location, world: GameWorld): ActivityUpdates {
    return this.current.tick(figure, location, world);
  }

  public isFinished() {
    return this.current.isFinished();
  }

  isInteractable(ui: UiController, item?: GameItem) {
    return this.current.isInteractable(ui, item);
  }

  interact(ui: UiController, item?: GameItem) {
    return this.current.interact(ui, item);
  }

  nextActivity() {
    return this.next;
  }
}

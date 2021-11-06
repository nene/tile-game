import { GameWorld } from "../GameWorld";
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

  isInteractable(ui: UiController) {
    return this.current.isInteractable(ui);
  }

  interact(ui: UiController, world: GameWorld) {
    return this.current.interact(ui, world);
  }

  nextActivity() {
    return this.next;
  }
}

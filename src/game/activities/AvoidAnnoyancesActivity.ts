import { Activity, ActivityUpdates } from "./Activity";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { UiController } from "../UiController";
import { GameWorld } from "../GameWorld";
import { Location } from "../locations/Location";
import { CallFuxActivity } from "./CallFuxActivity";
import { CharacterFigure } from "../npc/CharacterFigure";
import { GameItem } from "../items/GameItem";
import { EmptyBottlesInteraction } from "./interactions/EmptyBottlesInteraction";
import { EmptyBottlesCompletion } from "./completions/EmptyBottlesCompletion";

export class AvoidAnnoyancesActivity implements Activity {
  private finished = false;
  private activity?: Activity;

  constructor(private character: AcademicCharacter, private innerActivity: Activity) {
  }

  tick(figure: CharacterFigure, location: Location, world: GameWorld): ActivityUpdates {
    if (this.character.getAnnoyance()) {
      if (!this.activity) {
        this.activity = new CallFuxActivity(this.character, new EmptyBottlesInteraction(this.character), new EmptyBottlesCompletion(this.character));
      }
      const result = this.activity.tick(figure, location, world);
      if (this.activity.isFinished()) {
        this.activity = undefined;
      }
      return result;
    }
    return this.innerActivity.tick(figure, location, world);
  }

  isFinished() {
    return this.innerActivity.isFinished();
  }

  isInteractable() {
    return true;
  }

  interact(ui: UiController, item?: GameItem) {
    if (this.activity) {
      return this.activity.interact(ui, item);
    }
    this.innerActivity.interact(ui, item);
  }

  nextActivity() {
    return this.innerActivity.nextActivity();
  }
}

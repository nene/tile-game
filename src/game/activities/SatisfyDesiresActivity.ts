import { Activity, ActivityUpdates } from "./Activity";
import { AkademicCharacter, Desire } from "../npc/Character";
import { UiController } from "../UiController";
import { GameWorld } from "../GameWorld";
import { Location } from "../locations/Location";
import { CallFuxActivity } from "./CallFuxActivity";
import { RequestDrinkInteraction } from "./interactions/RequestDrinkInteraction";
import { AskQuestionInteraction } from "./interactions/AskQuestionInteraction";
import { CharacterFigure } from "../npc/CharacterFigure";
import { ReceiveBookInteraction } from "./plain-interactions/ReceiveBookInteraction";
import { PlainInteraction } from "./plain-interactions/PlainInteraction";
import { ContinuationActivity } from "./ContinuationActivity";
import { pickRandom } from "../utils/pickRandom";
import { ColorBandInteraction } from "./plain-interactions/ColorBandInteraction";
import { GameItem } from "../items/GameItem";

export class SatisfyDesiresActivity implements Activity {
  private finished = false;
  private activity?: Activity;
  private alwaysAvailableInteractions: PlainInteraction[];

  constructor(private character: AkademicCharacter) {
    this.activity = this.chooseActivity();
    this.alwaysAvailableInteractions = [
      new ColorBandInteraction(character),
      new ReceiveBookInteraction(character),
    ];
  }

  private chooseActivity() {
    switch (pickRandom(this.character.getDesires()) as Desire | undefined) {
      case "beer": return this.chooseDrinkActivity();
      case "question": return this.chooseQuestionActivity();
      default: return undefined;
    }
  }

  private chooseDrinkActivity() {
    return new CallFuxActivity(this.character, new RequestDrinkInteraction(this.character));
  }

  private chooseQuestionActivity() {
    return new CallFuxActivity(this.character, new AskQuestionInteraction(this.character));
  }

  tick(figure: CharacterFigure, location: Location, world: GameWorld): ActivityUpdates {
    if (!this.activity) {
      this.finished = true;
      return {};
    }

    const updates = this.activity.tick(figure, location, world);
    if (this.activity.isFinished()) {
      const nextActivity = this.activity.nextActivity();
      if (nextActivity) {
        this.activity = nextActivity;
        return updates;
      }
      const activity = this.chooseActivity();
      if (activity) {
        this.activity = activity;
        return updates;
      }
      else {
        this.finished = true;
        return updates;
      }
    }
    return updates;
  }

  isFinished() {
    return this.finished;
  }

  isInteractable() {
    return true;
  }

  interact(ui: UiController, item?: GameItem) {
    if (!this.activity) {
      return;
    }

    for (const interaction of this.alwaysAvailableInteractions) {
      const result = interaction.interact(ui, item);
      if (result) {
        if (result.type === "activity") {
          this.activity = new ContinuationActivity(result.activity, this.activity);
        }
        return;
      }
    }

    this.activity.interact(ui, item);
  }

  nextActivity() {
    return undefined;
  }
}

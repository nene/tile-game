import { Activity, ActivityUpdates } from "./Activity";
import { AcademicCharacter, Desire } from "../npc/AcademicCharacter";
import { UiApi } from "../UiController";
import { GameWorld } from "../GameWorld";
import { Location } from "../locations/Location";
import { CallFuxActivity } from "./CallFuxActivity";
import { AskQuestionInteraction } from "./interactions/AskQuestionInteraction";
import { CharacterFigure } from "../npc/CharacterFigure";
import { ReceiveBookInteraction } from "./plain-interactions/ReceiveBookInteraction";
import { PlainInteraction } from "./plain-interactions/PlainInteraction";
import { ContinuationActivity } from "./ContinuationActivity";
import { pickRandom } from "../utils/pickRandom";
import { ColorBandInteraction } from "./plain-interactions/ColorBandInteraction";
import { GameItem } from "../items/GameItem";
import { RequestDrinkInteraction } from "./interactions/RequestDrinkInteraction";
import { RequestGlassInteraction } from "./interactions/RequestGlassInteraction";

export class SatisfyDesiresActivity implements Activity {
  private finished = false;
  private activity?: Activity;
  private alwaysAvailableInteractions: PlainInteraction[];

  constructor(private character: AcademicCharacter) {
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
    const requestBeer = new CallFuxActivity(
      this.character,
      new RequestDrinkInteraction(this.character),
    );
    if (this.character.getField("glass")) {
      return requestBeer;
    } else {
      const requestGlass = new CallFuxActivity(
        this.character,
        new RequestGlassInteraction(this.character),
      );
      return new ContinuationActivity(requestGlass, requestBeer);
    }
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

  interact(ui: UiApi, item?: GameItem) {
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

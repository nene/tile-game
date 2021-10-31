import { Activity, ActivityUpdates } from "./Activity";
import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { GameWorld } from "../GameWorld";
import { Location } from "../locations/Location";
import { CallFuxActivity } from "./CallFuxActivity";
import { RequestDrinkInteraction } from "./RequestDrinkInteraction";
import { random } from "lodash";
import { AskQuestionInteraction } from "./AskQuestionInteraction";
import { CharacterFigure } from "../npc/CharacterFigure";
import { QuestionFactory } from "../questions/QuestionFactory";

const MAX_BEERS = 2;
const MAX_QUESTIONS = 3;

export class SatisfyDesiresActivity implements Activity {
  private finished = false;
  private beers = 0;
  private questions = 0;
  private activity: Activity;
  private questionFactory = new QuestionFactory();

  constructor(private character: Character) {
    this.activity = this.chooseActivity() as Activity;
  }

  private chooseActivity() {
    if (this.beers < MAX_BEERS && this.questions < MAX_QUESTIONS) {
      return random(0, 1) === 1 ? this.chooseDrinkActivity() : this.chooseQuestionActivity();
    }
    else if (this.beers < MAX_BEERS) {
      return this.chooseDrinkActivity();
    }
    else if (this.beers < MAX_BEERS) {
      return this.chooseQuestionActivity();
    }
    else {
      return undefined;
    }
  }

  private chooseDrinkActivity() {
    this.beers++;
    return new CallFuxActivity(this.character, new RequestDrinkInteraction(this.character));
  }

  private chooseQuestionActivity() {
    this.questions++;
    return new CallFuxActivity(this.character, new AskQuestionInteraction(this.character, this.questionFactory.createQuestion()));
  }

  tick(figure: CharacterFigure, location: Location, world: GameWorld): ActivityUpdates {
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

  interact(ui: UiController, world: GameWorld) {
    this.activity.interact(ui, world);
  }

  nextActivity() {
    return undefined;
  }
}

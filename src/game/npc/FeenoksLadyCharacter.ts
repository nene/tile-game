import { Character } from "./Character";
import { Activity } from "../activities/Activity";
import { IdleActivity } from "../activities/IdleActivity";
import { FeenoksLadyGraphics } from "./FeenoksLadyGraphics";

export class FeenoksLadyCharacter implements Character {
  private dialogShown = false;
  private graphics = new FeenoksLadyGraphics();
  private activity: Activity = new IdleActivity();

  getName() {
    return "Proua Fenoksia";
  }

  getGraphics() {
    return this.graphics;
  }

  reset() {
    this.activity = new IdleActivity();
  }

  setActivity(activity: Activity) {
    this.activity = activity;
  }

  currentActivity(): Activity {
    return this.activity;
  }

  isDialogShown(): boolean {
    return this.dialogShown;
  }

  markDialogShown() {
    this.dialogShown = true;
  }

  isGreetable() {
    return false;
  }
}

export const isFeenoksLadyCharacter = (char: Character): char is FeenoksLadyCharacter => char instanceof FeenoksLadyCharacter;

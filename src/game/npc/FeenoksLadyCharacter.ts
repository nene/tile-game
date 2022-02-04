import { Character } from "./Character";
import { SellAlcoholActivity } from "../activities/SellAlcoholActivity";
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

  resetForDay() {
    this.activity = new SellAlcoholActivity(this);
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

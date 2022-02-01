import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";
import { Character } from "./Character";
import { Sprite } from "../sprites/Sprite";
import { SellAlcoholActivity } from "../activities/SellAlcoholActivity";
import { Activity } from "../activities/Activity";
import { IdleActivity } from "../activities/IdleActivity";

export class FeenoksLadyCharacter implements Character {
  private dialogShown = false;
  private activity: Activity = new IdleActivity();

  getName() {
    return "Proua Fenoksia";
  }

  getSpriteName(): SpriteName {
    return "feenoks-lady";
  }

  getFaceSprite(): Sprite {
    return {
      ...SpriteLibrary.getSprite(this.getSpriteName(), [0, 0]),
      coord: [0, 3],
      size: [16, 16],
      offset: [0, 0],
    };
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

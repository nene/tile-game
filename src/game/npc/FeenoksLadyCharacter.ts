import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";
import { Character } from "./Character";
import { Sprite } from "../sprites/Sprite";
import { SellAlcoholActivity } from "../activities/SellAlcoholActivity";

export class FeenoksLadyCharacter implements Character {
  private dialogShown = false;

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
  }

  getActivities() {
    return [
      new SellAlcoholActivity(this),
    ];
  }

  isDialogShown(): boolean {
    return this.dialogShown;
  }

  markDialogShown() {
    this.dialogShown = true;
  }
}

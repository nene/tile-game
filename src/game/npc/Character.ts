import { Activity } from "../activities/Activity";
import { Sprite } from "../sprites/Sprite";
import { SpriteName } from "../sprites/SpriteLibrary";

export interface Character {
  getName: () => string;
  getSpriteName: () => SpriteName;
  getFaceSprite: () => Sprite;
  resetForDay: (n: number) => void;
  currentActivity: () => Activity;
  isGreetable: () => boolean;
}

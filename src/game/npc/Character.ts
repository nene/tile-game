import { Activity } from "../activities/Activity";
import { Sprite } from "../sprites/Sprite";

export interface Character {
  getName: () => string;
  getGraphics: () => CharacterGraphics;
  reset: () => void;
  setActivity: (activity: Activity) => void;
  currentActivity: () => Activity;
  isGreetable: () => boolean;
}

export interface CharacterGraphics {
  getDefaultSprite: () => Sprite;
  getFaceSprite: () => Sprite;
}

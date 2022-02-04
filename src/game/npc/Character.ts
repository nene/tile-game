import { Activity } from "../activities/Activity";
import { Sprite } from "../sprites/Sprite";

export interface Character {
  getName: () => string;
  getGraphics: () => CharacterGraphics;
  resetForDay: (n: number) => void;
  currentActivity: () => Activity;
  isGreetable: () => boolean;
}

export interface CharacterGraphics {
  getDefaultSprite: () => Sprite;
  getFaceSprite: () => Sprite;
}

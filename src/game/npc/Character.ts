import { Activity } from "../activities/Activity";
import { Sprite } from "../sprites/Sprite";
import { SpriteName } from "../sprites/SpriteLibrary";

export interface Character {
  getName: () => string;
  getGraphics: () => CharacterGraphics;
  resetForDay: (n: number) => void;
  currentActivity: () => Activity;
  isGreetable: () => boolean;
}

export interface CharacterGraphics {
  getSpriteName: () => SpriteName;
  getFaceSprite: () => Sprite;
}

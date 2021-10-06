import { Character } from "../npc/Character";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Activity } from "./Activity";

export class IdleActivity implements Activity {
  private sprite: Sprite;

  constructor(character: Character) {
    this.sprite = SpriteLibrary.get(character.spriteSet).getSprite([0, 0]);
  }

  tick() {
    return { sprites: [this.sprite] };
  }

  isFinished() {
    return false;
  }

  interact() { }

  nextActivity() {
    return undefined;
  }
}

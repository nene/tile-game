import { Activity, ActivityUpdates } from "./Activity";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary } from "../sprites/SpriteLibrary";

export class GreetActivity implements Activity {
  private animation: SpriteAnimation;

  constructor(private character: AcademicCharacter) {
    this.animation = new SpriteAnimation(SpriteLibrary.get(character.getSpriteName()), {
      frames: character.getGreetAnimationFrames(),
      repeat: 1,
    });
  }

  tick(): ActivityUpdates {
    this.animation.tick();
    return { sprites: this.animation.getSprites() };
  }

  isFinished() {
    return this.animation.isFinished();
  }

  isInteractable() {
    return false;
  }

  interact() { }

  nextActivity() {
    return undefined;
  }
}

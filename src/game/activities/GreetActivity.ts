import { Activity, ActivityUpdates } from "./Activity";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { SpriteAnimation } from "../sprites/SpriteAnimation";

export class GreetActivity implements Activity {
  private animation: SpriteAnimation;

  constructor(character: AcademicCharacter) {
    this.animation = character.getGraphics().getGreetAnimation();
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

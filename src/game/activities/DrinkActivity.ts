import { Activity, ActivityUpdates } from "./Activity";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { DrinkAnimation } from "../sprites/DrinkAnimation";

export class DrinkActivity implements Activity {
  private animation: DrinkAnimation;

  constructor(character: AcademicCharacter) {
    this.animation = new DrinkAnimation(character.getDrinkAnimationConfig());
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

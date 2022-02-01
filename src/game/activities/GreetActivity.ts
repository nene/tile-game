import { ActivityUpdates, TriggerableActivity } from "./Activity";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Location } from "../locations/Location";
import { GameWorld } from "../GameWorld";

export class GreetActivity implements TriggerableActivity {
  private animation: SpriteAnimation;

  constructor(private character: AcademicCharacter) {
    this.animation = new SpriteAnimation(SpriteLibrary.get(character.getSpriteName()), {
      frames: character.getGreetAnimationFrames(),
      repeat: 1,
    });
  }

  shouldTrigger(figure: CharacterFigure, location: Location, world: GameWorld): boolean {
    // True when a new character is to be greeted
    return location.allCharacterFigures().some((fig) => this.character.greet(fig.getCharacter()));
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

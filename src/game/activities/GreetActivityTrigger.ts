import { GameWorld } from "../GameWorld";
import { Location } from "../locations/Location";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Activity } from "./Activity";
import { ActivityTrigger } from "./ActivityTrigger";
import { GreetActivity } from "./GreetActivity";

export class GreetActivityTrigger implements ActivityTrigger {
  constructor(private character: AcademicCharacter) {
  }

  shouldTrigger(figure: CharacterFigure, location: Location, world: GameWorld): boolean {
    // True when a new character is to be greeted
    return location.allCharacterFigures().some((fig) => this.character.greet(fig.getCharacter()));
  }

  createActivity(): Activity {
    return new GreetActivity(this.character);
  }
}

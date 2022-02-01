import { identity } from "lodash";
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
    // True when a new character is to be greeted.
    // We do map(greet) not some(greet) to ensure we greet everyone, not only the first one
    return location.allCharacterFigures().map((fig) => this.character.greet(fig.getCharacter())).some(identity);
  }

  createActivity(): Activity {
    return new GreetActivity(this.character);
  }
}

import { Activity, ActivityUpdates } from "./Activity";
import { BeerGlass } from "../items/BeerGlass";
import { AcademicCharacter } from "../npc/AcademicCharacter";
import { DrinkAnimation } from "../sprites/DrinkAnimation";
import { Location } from "../locations/Location";
import { CharacterFigure } from "../npc/CharacterFigure";

export class DrinkActivity implements Activity {
  private animation: DrinkAnimation;

  constructor(private beerGlass: BeerGlass, character: AcademicCharacter) {
    this.animation = new DrinkAnimation({
      beerGlass,
      sprites: character.getDrinkSprites(),
      idleTicks: 30,
      drinkTicks: 10,
    });
  }

  tick(figure: CharacterFigure, location: Location): ActivityUpdates {
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

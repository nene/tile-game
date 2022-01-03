import { Activity, ActivityUpdates } from "./Activity";
import { BeerGlass } from "../items/BeerGlass";
import { AkademicCharacter } from "../npc/Character";
import { DrinkAnimation } from "../sprites/DrinkAnimation";
import { Location } from "../locations/Location";
import { coordAdd, rectTranslate } from "../Coord";
import { isTable, Table } from "../furniture/Table";
import { CharacterFigure } from "../npc/CharacterFigure";

export class DrinkActivity implements Activity {
  private animation: DrinkAnimation;

  constructor(private beerGlass: BeerGlass, character: AkademicCharacter) {
    this.animation = new DrinkAnimation({
      beerGlass,
      spriteName: character.getSpriteName(),
      idleTicks: 30,
      drinkTicks: 10,
    });
  }

  tick(figure: CharacterFigure, location: Location): ActivityUpdates {
    this.animation.tick();
    if (this.animation.isFinished()) {
      const tableInventory = this.nearbyTable(figure, location)?.getInventory();
      if (tableInventory && !tableInventory?.isFull()) {
        tableInventory.add(this.beerGlass);
      }
    }
    return { sprites: this.animation.getSprites() };
  }

  private nearbyTable(figure: CharacterFigure, location: Location): Table | undefined {
    return location.getObjectsInRect(rectTranslate(figure.boundingBox(), coordAdd(figure.getCoord(), [0, 2]))).find(isTable);
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

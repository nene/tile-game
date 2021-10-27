import { Activity, ActivityUpdates } from "./Activity";
import { BeerGlass } from "../items/BeerGlass";
import { Character } from "../npc/Character";
import { DrinkAnimation } from "../sprites/DrinkAnimation";
import { GameObject } from "../GameObject";
import { Location } from "../locations/Location";
import { coordAdd, rectTranslate } from "../Coord";
import { Table } from "../furniture/Table";

export class DrinkActivity implements Activity {
  private animation: DrinkAnimation;

  constructor(private beerGlass: BeerGlass, character: Character) {
    this.animation = new DrinkAnimation({
      beerGlass,
      spriteName: character.getSpriteSet(),
      idleTicks: 30,
      drinkTicks: 10,
    });
  }

  tick(figure: GameObject, location: Location): ActivityUpdates {
    this.animation.tick();
    if (this.animation.isFinished()) {
      const tableInventory = this.nearbyTable(figure, location)?.getInventory();
      if (tableInventory && !tableInventory?.isFull()) {
        tableInventory.add(this.beerGlass);
      }
    }
    return { sprites: this.animation.getSprites() };
  }

  private nearbyTable(figure: GameObject, location: Location): Table | undefined {
    return location.getObjectsInRect(rectTranslate(figure.boundingBox(), coordAdd(figure.getCoord(), [0, 2]))).find((obj): obj is Table => obj instanceof Table);
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

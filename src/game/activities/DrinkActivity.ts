import { Activity, ActivityUpdates } from "./Activity";
import { BeerGlass } from "../items/BeerGlass";
import { Character } from "../npc/Character";
import { DrinkAnimation } from "../sprites/DrinkAnimation";

export class DrinkActivity implements Activity {
  private ticks = 0;
  private isHandUp = false;
  private animation: DrinkAnimation;

  constructor(beerGlass: BeerGlass, character: Character) {
    this.animation = new DrinkAnimation(beerGlass, character.spriteSet);
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

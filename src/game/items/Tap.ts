import { MiniGame } from "../minigames/MiniGame";
import { SoundLibrary } from "../sounds/SoundLibrary";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { BeerGlass, DrinkLevel } from "./BeerGlass";
import { getDrink } from "./Drink";
import { GameItem } from "./GameItem";

export class Tap implements GameItem {
  getName() {
    return "Kraan";
  }

  getSprite(): Sprite {
    return SpriteLibrary.getSprite("tap");
  }

  combine(item: GameItem): MiniGame | undefined {
    if (item instanceof BeerGlass && item.getLevel() === DrinkLevel.empty) {
      SoundLibrary.play("pouring-water");
      const fillStep = () => {
        item.fill(getDrink("water"), item.getLevel() + 1);
        if (item.getLevel() < DrinkLevel.full) {
          setTimeout(fillStep, 500);
        }
      };
      setTimeout(fillStep, 500);
    }
    return undefined;
  }
}

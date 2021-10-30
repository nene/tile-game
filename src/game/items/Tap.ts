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

  getDescription() {
    return "";
  }

  getPrice() {
    return 0;
  }

  getSprite(): Sprite {
    return SpriteLibrary.getSprite("tap");
  }

  combine(item: GameItem): MiniGame | undefined {
    if (item instanceof BeerGlass && item.getLevel() === DrinkLevel.empty) {
      SoundLibrary.play("pouring-water");
      item.fill(getDrink("water"), DrinkLevel.full);
    }
    return undefined;
  }

  clone() {
    return new Tap();
  }
}

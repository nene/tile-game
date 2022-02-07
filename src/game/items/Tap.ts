import { MiniGame } from "../minigames/MiniGame";
import { SoundLibrary } from "../sounds/SoundLibrary";
import { Sprite } from "../sprites/Sprite";
import { ItemSpriteLibrary } from "./ItemSpriteLibrary";
import { isBeerBottle } from "./BeerBottle";
import { DrinkLevel, isBeerGlass } from "./BeerGlass";
import { getDrink } from "./Drink";
import { GameItem } from "./GameItem";

export class Tap implements GameItem {
  getName() {
    return "Kraan";
  }

  getSprite(): Sprite {
    return ItemSpriteLibrary.getSprite("tap");
  }

  combine(item: GameItem): MiniGame | undefined {
    if (isBeerGlass(item) && item.getLevel() === DrinkLevel.empty) {
      SoundLibrary.play("pouring-water");
      const fillStep = () => {
        item.fill(getDrink("water"), item.getLevel() + 1);
        if (item.getLevel() < DrinkLevel.full) {
          setTimeout(fillStep, 500);
        }
      };
      setTimeout(fillStep, 500);
    }
    if (isBeerBottle(item) && item.isEmpty()) {
      SoundLibrary.play("pouring-water");
      item.fill(getDrink("water"));
    }
    return undefined;
  }
}

export const isTap = (item: GameItem): item is Tap => item instanceof Tap;

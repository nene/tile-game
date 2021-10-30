import { MiniGame } from "../minigames/MiniGame";
import { SoundLibrary } from "../sounds/SoundLibrary";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { BeerBottle } from "./BeerBottle";
import { BeerGlass, DrinkLevel } from "./BeerGlass";
import { GameItem } from "./GameItem";

export class Drain implements GameItem {
  getName() {
    return "Tagasi Emajõkke";
  }

  getSprite(): Sprite {
    return SpriteLibrary.getSprite("drain");
  }

  combine(item: GameItem): MiniGame | undefined {
    if (item instanceof BeerGlass && item.getLevel() > DrinkLevel.empty) {
      SoundLibrary.play("pouring-water");
      const drainStep = () => {
        item.fill(item.getDrink(), item.getLevel() - 1);
        if (item.getLevel() > DrinkLevel.empty) {
          setTimeout(drainStep, 500);
        }
      };
      setTimeout(drainStep, 500);
    }
    if (item instanceof BeerBottle && item.isOpen() && !item.isEmpty()) {
      SoundLibrary.play("pouring-water");
      item.empty();
    }
    return undefined;
  }
}

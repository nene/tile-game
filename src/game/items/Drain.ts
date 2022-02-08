import { MiniGame } from "../minigames/MiniGame";
import { SoundLibrary } from "../sounds/SoundLibrary";
import { Sprite } from "../sprites/Sprite";
import { ItemSpriteLibrary } from "./ItemSpriteLibrary";
import { isBeerBottle } from "./BeerBottle";
import { DrinkLevel, isBeerGlass } from "./BeerGlass";
import { GameItem } from "./GameItem";
import { isOcean } from "./Ocean";
import { DiscardSelectedItem } from "../minigames/DiscardSelectedItem";

export class Drain implements GameItem {
  getName() {
    return "Valamu";
  }

  getSprite(): Sprite {
    return ItemSpriteLibrary.getSprite("drain");
  }

  combine(item: GameItem): MiniGame | undefined {
    if (isBeerGlass(item) && item.getLevel() > DrinkLevel.empty) {
      SoundLibrary.play("pouring-water");
      const drainStep = () => {
        item.fill(item.getDrink(), item.getLevel() - 1);
        if (item.getLevel() > DrinkLevel.empty) {
          setTimeout(drainStep, 500);
        }
      };
      setTimeout(drainStep, 500);
    }
    if (isBeerBottle(item) && item.isOpen() && !item.isEmpty()) {
      SoundLibrary.play("pouring-water");
      item.empty();
    }
    if (isOcean(item)) {
      SoundLibrary.play("pouring-water");
      return new DiscardSelectedItem();
    }
    return undefined;
  }
}

export const isDrain = (item: GameItem): item is Drain => item instanceof Drain;

import { MiniGame } from "../minigames/MiniGame";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { isBeerBottle } from "./BeerBottle";
import { BottleOpener } from "./BottleOpener";
import { GameItem } from "./GameItem";

export class SimpleBottleOpener implements BottleOpener {
  readonly type = 'bottle-opener';

  getName() {
    return "Pudeliavaja";
  }

  getDescription() {
    return "Mugav kaasas kanda ja käsitseda.";
  }

  getPrice() {
    return 20;
  }

  getSprite(): Sprite {
    return SpriteLibrary.getSprite("bottle-opener", [0, 0]);
  }

  combine(item: GameItem): MiniGame | undefined {
    if (isBeerBottle(item)) {
      return item.combine(this); // Keep main logic in BeerBottle
    }
  }

  clone() {
    return new SimpleBottleOpener();
  }

  getCaptureDistance(): number {
    return 5;
  }

  hasRibbon(): boolean {
    return false;
  }
}

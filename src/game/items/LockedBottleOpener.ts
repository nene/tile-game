import { MiniGame } from "../minigames/MiniGame";
import { Sprite } from "../sprites/Sprite";
import { ItemSpriteLibrary } from "./ItemSpriteLibrary";
import { isBeerBottle } from "./BeerBottle";
import { BottleOpener } from "./BottleOpener";
import { GameItem } from "./GameItem";

export class LockedBottleOpener implements BottleOpener {
  readonly type = 'bottle-opener';

  getName() {
    return "Konvendi pudeliavaja";
  }

  getDescription() {
    return "Vaid koha peal kasutamiseks.";
  }

  getPrice() {
    return 20;
  }

  getSprite(): Sprite {
    return ItemSpriteLibrary.getSprite("bottle-opener-locked");
  }

  combine(item: GameItem): MiniGame | undefined {
    if (isBeerBottle(item)) {
      return item.combine(this); // Keep main logic in BeerBottle
    }
  }

  clone() {
    return new LockedBottleOpener();
  }

  getCaptureDistance(): number {
    return 2;
  }

  hasRibbon(): boolean {
    return true;
  }
}

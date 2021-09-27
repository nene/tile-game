import { MiniGame } from "../minigames/MiniGame";
import { OpeningGame } from "../minigames/OpeningGame";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { BeerBottle } from "./BeerBottle";
import { GameItem } from "./GameItem";

export class BottleOpener implements GameItem {
  private sprite: Sprite;

  constructor() {
    this.sprite = SpriteLibrary.get("bottle-opener").getSprite([0, 0]);
  }

  getName() {
    return "Pudeliavaja";
  }

  getSprite(): Sprite {
    return this.sprite;
  }

  combine(item: GameItem): GameItem[] | MiniGame {
    if (item instanceof BeerBottle && !item.isOpen()) {
      return new OpeningGame(item, this);
    }
    return [];
  }
}

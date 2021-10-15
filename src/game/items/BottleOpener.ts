import { MiniGame } from "../minigames/MiniGame";
import { OpeningGame } from "../minigames/OpeningGame";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { BeerBottle } from "./BeerBottle";
import { GameItem } from "./GameItem";

export enum BottleOpenerType {
  simple = 0,
  attatched = 1,
}

export class BottleOpener implements GameItem {
  private sprite: Sprite;

  constructor(private type: BottleOpenerType) {
    this.sprite = SpriteLibrary.getSprite("bottle-opener", [type, 0]);
  }

  getName() {
    switch (this.type) {
      case BottleOpenerType.simple: return "Pudeliavaja";
      case BottleOpenerType.attatched: return "Konvendi pudeliavaja";
    }
  }

  getSprite(): Sprite {
    return this.sprite;
  }

  combine(item: GameItem): MiniGame | undefined {
    if (item instanceof BeerBottle && !item.isOpen()) {
      return new OpeningGame(item, this);
    }
  }

  clone() {
    return new BottleOpener(this.type);
  }

  getCaptureDistance(): number {
    switch (this.type) {
      case BottleOpenerType.simple: return 5;
      case BottleOpenerType.attatched: return 2;
    }
  }

  hasRibbon(): boolean {
    return this.type === BottleOpenerType.attatched;
  }
}

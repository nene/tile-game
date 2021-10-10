import { MiniGame } from "../minigames/MiniGame";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { BeerGlass } from "./BeerGlass";
import { Beer } from "./Beer";
import { BottleOpener } from "./BottleOpener";
import { GameItem } from "./GameItem";

export enum CapState {
  closed = 1,
  open = 2,
}

export class BeerBottle implements GameItem {
  private spriteSheet: SpriteSheet;
  private full = true;

  constructor(private beer: Beer, private capState = CapState.closed) {
    this.spriteSheet = SpriteLibrary.get("bottle");
  }

  getName() {
    if (!this.full) {
      return "Tühi pudel";
    }
    return this.beer.name + (this.isOpen() ? " (avatud)" : "");
  }

  getBeer(): Beer {
    return this.beer;
  }

  empty() {
    this.full = false;
  }

  isEmpty(): boolean {
    return !this.full;
  }

  open() {
    this.capState = CapState.open;
  }

  isOpen(): boolean {
    return this.capState === CapState.open;
  }

  getSprite(): Sprite {
    if (this.full) {
      return this.spriteSheet.getSprite([this.capState, this.beer.spriteIndex]);
    } else {
      return this.spriteSheet.getSprite([1, 0]);
    }
  }

  combine(item: GameItem): MiniGame | undefined {
    if (item instanceof BeerGlass) {
      return item.combine(this); // Keep main logic in beer-glass
    }
    if (item instanceof BottleOpener) {
      return item.combine(this); // Keep main logic in bottle-opener
    }
  }

  clone() {
    return new BeerBottle(this.beer, this.capState);
  }
}

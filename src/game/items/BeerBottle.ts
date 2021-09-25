import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { SpriteSheet } from "../SpriteSheet";
import { BeerGlass } from "./BeerGlass";
import { BottleOpener } from "./BottleOpener";
import { GameItem } from "./GameItem";

export enum BeerType {
  alexander = 1,
  heineken = 2,
  special = 3,
}

enum CapState {
  closed = 1,
  open = 2,
}

const beerNames = {
  [BeerType.alexander]: "Alexander",
  [BeerType.heineken]: "Heineken",
  [BeerType.special]: "Special",
}

export class BeerBottle implements GameItem {
  private spriteSheet: SpriteSheet;
  private full = true;
  private capState = CapState.closed;

  constructor(private type: BeerType, sprites: SpriteLibrary) {
    this.spriteSheet = sprites.get("bottle");
  }

  getName() {
    if (!this.full) {
      return "Tühi pudel";
    }
    return beerNames[this.type] + " " + (this.isOpen() ? "(avatud)" : "(kinni)");
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
      return this.spriteSheet.getSprite([this.capState, this.type]);
    } else {
      return this.spriteSheet.getSprite([1, 0]);
    }
  }

  combine(item: GameItem): GameItem[] {
    if (item instanceof BeerGlass) {
      return item.combine(this).reverse(); // Keep main logic in beer-glass
    }
    if (item instanceof BottleOpener) {
      return item.combine(this).reverse(); // Keep main logic in bottle-opener
    }
    return [];
  }
}

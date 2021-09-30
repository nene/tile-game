import { Activity, ActivityUpdates } from "./Activity";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { BeerGlass, BeerLevel } from "../items/BeerGlass";
import { BurshType } from "../Bursh";
import { coordAdd } from "../Coord";

export class DrinkActivity implements Activity {
  private ticks = 0;
  private isHandUp = false;
  private sprite: Sprite;
  private handSprite: Sprite;

  constructor(private beer: BeerGlass, type: BurshType) {
    this.sprite = SpriteLibrary.get(type).getSprite([1, 0]);
    this.handSprite = SpriteLibrary.get(type).getSprite([2, 0]);
  }

  tick(): ActivityUpdates {
    this.ticks++;
    if (this.ticks > 10) {
      this.ticks = 0;
      this.isHandUp = !this.isHandUp;
      if (!this.isHandUp && this.beer.getLevel() !== BeerLevel.empty) {
        this.beer.drink();
      }
    }
    return {
      sprites: [this.sprite, this.getBeerSprite(), this.getHandSprite()],
      finished: this.beer.getLevel() === BeerLevel.empty,
    };
  }

  private getHandSprite(): Sprite {
    return this.spriteAtHandPosition(this.handSprite);
  }

  private getBeerSprite(): Sprite {
    return this.spriteAtHandPosition(this.beer.getSmallSprite());
  }

  private spriteAtHandPosition(sprite: Sprite) {
    if (this.isHandUp && this.beer.getLevel() !== BeerLevel.empty) {
      return { ...sprite, offset: coordAdd(sprite.offset, [0, -2]) };
    } else {
      return sprite;
    }
  }
}
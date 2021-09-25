import { Activity, ActivityUpdates } from "./Activity";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { BeerGlass, BeerLevel } from "../items/BeerGlass";

export class DrinkActivity implements Activity {
  private ticks = 0;
  private isHandUp = false;
  private sprite: Sprite;
  private handSprite: Sprite;

  constructor(private beer: BeerGlass) {
    this.sprite = SpriteLibrary.get("cfe-ksv-drinking").getSprite([0, 0]);
    this.handSprite = SpriteLibrary.get("cfe-ksv-hand").getSprite([0, 0]);
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
    this.handSprite.offset = this.isHandUp && this.beer.getLevel() !== BeerLevel.empty ? [-8, -15] : [-8, -13];
    return this.handSprite;
  }

  private getBeerSprite(): Sprite {
    const beerSprite = this.beer.getSmallSprite();
    beerSprite.offset = this.isHandUp && this.beer.getLevel() !== BeerLevel.empty ? [-2, -19] : [-2, -17];
    return beerSprite;
  }
}

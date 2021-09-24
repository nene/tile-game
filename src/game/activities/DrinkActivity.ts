import { Activity, ActivityUpdates } from "./Activity";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { SpriteSheet } from "../SpriteSheet";

export class DrinkActivity implements Activity {
  private ticks = 0;
  private isHandUp = false;
  private sprite: Sprite;
  private handSprite: Sprite;
  private beerSpriteSheet: SpriteSheet;
  private beerLevel: number;

  constructor(sprites: SpriteLibrary) {
    this.sprite = sprites.get("cfe-ksv-drinking").getSprite([0, 0]);
    this.handSprite = sprites.get("cfe-ksv-hand").getSprite([0, 0]);
    this.beerSpriteSheet = sprites.get("beer-sm");
    this.beerLevel = 4;
  }

  tick(): ActivityUpdates {
    this.ticks++;
    if (this.ticks > 10) {
      this.ticks = 0;
      this.isHandUp = !this.isHandUp;
      if (!this.isHandUp && this.beerLevel > 0) {
        this.beerLevel--;
      }
    }
    return {
      sprites: [this.sprite, this.getBeerSprite(), this.getHandSprite()],
      finished: this.beerLevel === 0,
    };
  }

  private getHandSprite(): Sprite {
    this.handSprite.offset = this.isHandUp && this.beerLevel > 0 ? [-8, -15] : [-8, -13];
    return this.handSprite;
  }

  private getBeerSprite(): Sprite {
    const beerSprite = this.beerSpriteSheet.getSprite([this.beerLevel, 0]);
    beerSprite.offset = this.isHandUp && this.beerLevel > 0 ? [-2, -19] : [-2, -17];
    return beerSprite;
  }
}

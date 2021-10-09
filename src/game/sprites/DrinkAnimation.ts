import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";
import { BeerGlass, BeerLevel } from "../items/BeerGlass";
import { coordAdd } from "../Coord";

export class DrinkAnimation {
  private ticks = 0;
  private isHandUp = false;
  private sprite: Sprite;
  private handSprite: Sprite;

  constructor(private beerGlass: BeerGlass, spriteName: SpriteName) {
    this.sprite = SpriteLibrary.get(spriteName).getSprite([1, 0]);
    this.handSprite = SpriteLibrary.get(spriteName).getSprite([2, 0]);
  }

  tick() {
    this.ticks++;
    if (this.ticks > 10) {
      this.ticks = 0;
      this.isHandUp = !this.isHandUp;
      if (!this.isHandUp && this.beerGlass.getLevel() !== BeerLevel.empty) {
        this.beerGlass.drink();
      }
    }
  }

  getSprites(): Sprite[] {
    return [this.sprite, this.getBeerSprite(), this.getHandSprite()];
  }

  private getHandSprite(): Sprite {
    return this.spriteAtHandPosition(this.handSprite);
  }

  private getBeerSprite(): Sprite {
    return this.spriteAtHandPosition(this.beerGlass.getSmallSprite());
  }

  private spriteAtHandPosition(sprite: Sprite) {
    if (this.isHandUp && this.beerGlass.getLevel() !== BeerLevel.empty) {
      return { ...sprite, offset: coordAdd(sprite.offset, [0, -2]) };
    } else {
      return sprite;
    }
  }

  isFinished() {
    return this.beerGlass.getLevel() === BeerLevel.empty;
  }
}

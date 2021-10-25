import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";
import { BeerGlass, DrinkLevel } from "../items/BeerGlass";
import { Coord, coordAdd } from "../Coord";
import { Animation } from "./Animation";
import { Drink } from "../items/Drink";

export class DrinkAnimation implements Animation {
  private ticks = 0;
  private isHandUp = false;
  private sprite: Sprite;
  private handSprite: Sprite;

  constructor(private beerGlass: BeerGlass, spriteName: SpriteName, private onSip?: (drink: Drink) => void) {
    this.sprite = SpriteLibrary.getSprite(spriteName, [1, 0]);
    this.handSprite = SpriteLibrary.getSprite(spriteName, [2, 0]);
  }

  tick() {
    this.ticks++;
    if (this.ticks > 10) {
      this.ticks = 0;
      this.isHandUp = !this.isHandUp;
      if (!this.isHandUp && this.beerGlass.getLevel() !== DrinkLevel.empty) {
        this.onSip && this.onSip(this.beerGlass.getDrink() as Drink);
        this.beerGlass.consume();
      }
    }
  }

  getSprites(): Sprite[] {
    return [this.sprite, this.getBeerSprite(), this.getHandSprite()];
  }

  private getHandSprite(): Sprite {
    return this.adjustSpriteOffset(this.handSprite, this.handPositionOffset());
  }

  private getBeerSprite(): Sprite {
    return this.adjustSpriteOffset(this.beerGlass.getSmallSprite(), coordAdd(this.handPositionOffset(), [-2, -15]));
  }

  private adjustSpriteOffset(sprite: Sprite, offset: Coord): Sprite {
    return { ...sprite, offset: coordAdd(sprite.offset, offset) };
  }

  private handPositionOffset(): Coord {
    return (this.isHandUp && this.beerGlass.getLevel() !== DrinkLevel.empty) ? [0, -2] : [0, 0];
  }

  isFinished() {
    return this.beerGlass.getLevel() === DrinkLevel.empty;
  }
}

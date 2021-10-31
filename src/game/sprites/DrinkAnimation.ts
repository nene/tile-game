import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";
import { BeerGlass, DrinkLevel } from "../items/BeerGlass";
import { Coord, coordAdd } from "../Coord";
import { Animation } from "./Animation";
import { Drink } from "../items/Drink";
import { noop } from "lodash";

interface DrinkAnimationConfig {
  beerGlass: BeerGlass;
  spriteName: SpriteName;
  idleTicks: number;
  drinkTicks: number;
  onSip?: (drink: Drink) => void;
}

export class DrinkAnimation implements Animation {
  private ticks = 0;
  private isHandUp = false;
  private sprite: Sprite;
  private handSprite: Sprite;
  private beerGlass: BeerGlass;
  private drinkTicks: number;
  private idleTicks: number;
  private onSip: (drink: Drink) => void;

  constructor({ beerGlass, spriteName, drinkTicks, idleTicks, onSip }: DrinkAnimationConfig) {
    this.sprite = SpriteLibrary.getSprite(spriteName, [1, 0]);
    this.handSprite = SpriteLibrary.getSprite(spriteName, [2, 0]);
    this.beerGlass = beerGlass;
    this.drinkTicks = drinkTicks;
    this.idleTicks = idleTicks;
    this.onSip = onSip || noop;
  }

  tick() {
    this.ticks++;
    if (this.isHandUp && this.ticks > this.drinkTicks) {
      this.ticks = 0;
      this.isHandUp = false;
      const drink = this.beerGlass.getDrink()
      if (drink) {
        this.onSip(drink);
        this.beerGlass.consume();
      }
    }
    else if (!this.isHandUp && this.ticks > this.idleTicks) {
      this.ticks = 0;
      this.isHandUp = true;
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

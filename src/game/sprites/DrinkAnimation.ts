import { Sprite } from "../sprites/Sprite";
import { BeerGlass, DrinkLevel } from "../items/BeerGlass";
import { Coord, coordAdd } from "../Coord";
import { Animation } from "./Animation";
import { Drink } from "../items/Drink";
import { noop } from "lodash";

export type DrinkAnimationSprites = Record<"figure1" | "figure2" | "hand", Sprite>;

export interface DrinkAnimationConfig {
  beerGlass: BeerGlass;
  sprites: DrinkAnimationSprites;
  idleTicks: number;
  drinkTicks: number;
  onSip?: (drink: Drink) => void;
  onFinish?: () => void;
}

export class DrinkAnimation implements Animation {
  private ticks = 0;
  private isHandUp = false;
  private sprites: DrinkAnimationSprites;
  private beerGlass: BeerGlass;
  private drinkTicks: number;
  private idleTicks: number;
  private onSip: (drink: Drink) => void;
  private onFinish: () => void;

  constructor({ beerGlass, sprites, drinkTicks, idleTicks, onSip, onFinish }: DrinkAnimationConfig) {
    this.sprites = sprites;
    this.beerGlass = beerGlass;
    this.drinkTicks = drinkTicks;
    this.idleTicks = idleTicks;
    this.onSip = onSip || noop;
    this.onFinish = onFinish || noop;
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
        if (this.isFinished()) {
          this.onFinish();
        }
      }
    }
    else if (!this.isHandUp && this.ticks > this.idleTicks) {
      this.ticks = 0;
      this.isHandUp = true;
    }
  }

  getSprites(): Sprite[] {
    return [this.getFigureSprite(), this.getBeerSprite(), this.getHandSprite()];
  }

  private getFigureSprite(): Sprite {
    return this.isDrinking() ? this.sprites.figure2 : this.sprites.figure1;
  }

  private getHandSprite(): Sprite {
    return this.adjustSpriteOffset(this.sprites.hand, this.handPositionOffset());
  }

  private getBeerSprite(): Sprite {
    return this.adjustSpriteOffset(this.beerGlass.getSmallSprite(), coordAdd(this.handPositionOffset(), [-2, -15]));
  }

  private adjustSpriteOffset(sprite: Sprite, offset: Coord): Sprite {
    return { ...sprite, offset: coordAdd(sprite.offset, offset) };
  }

  private handPositionOffset(): Coord {
    return this.isDrinking() ? [0, -2] : [0, 0];
  }

  private isDrinking(): boolean {
    return this.isHandUp && this.beerGlass.getLevel() !== DrinkLevel.empty;
  }

  isFinished() {
    return this.beerGlass.getLevel() === DrinkLevel.empty;
  }
}

import { Activity, ActivityUpdates } from "./Activity";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { BeerGlass, BeerLevel } from "../items/BeerGlass";
import { coordAdd } from "../Coord";
import { Character } from "../npc/Character";

export class DrinkActivity implements Activity {
  private ticks = 0;
  private isHandUp = false;
  private sprite: Sprite;
  private handSprite: Sprite;

  constructor(private beer: BeerGlass, character: Character) {
    this.sprite = SpriteLibrary.get(character.spriteSet).getSprite([1, 0]);
    this.handSprite = SpriteLibrary.get(character.spriteSet).getSprite([2, 0]);
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

  isFinished() {
    return this.beer.getLevel() === BeerLevel.empty;
  }

  interact() { }

  nextActivity() {
    return undefined;
  }
}

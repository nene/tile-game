import { coordAdd } from "../Coord";
import { Activity, ActivityUpdates } from "./Activity";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";

export class CallFuxActivity implements Activity {
  private counter = 0;
  private extraSprite: Sprite;

  constructor(sprites: SpriteLibrary) {
    this.extraSprite = sprites.get("callout").getSprite([0, 0]);
    // Place above the head
    this.extraSprite.offset = coordAdd(this.extraSprite.offset, [0, -32]);
  }

  tick(): ActivityUpdates {
    this.counter++;
    return {
      extraSprite: this.isShouting() ? this.extraSprite : undefined,
      finished: this.counter > 90,
    };
  }

  // shout for a second, then wait for a second
  private isShouting(): boolean {
    const currentSecond = Math.floor(this.counter / 10);
    return currentSecond % 2 === 0;
  }
}

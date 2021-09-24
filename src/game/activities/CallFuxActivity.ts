import { coordAdd } from "../Coord";
import { Activity, ActivityUpdates } from "./Activity";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";

export class CallFuxActivity implements Activity {
  private counter = 0;
  private sprite: Sprite;
  private calloutSprite: Sprite;

  constructor(type: 0 | 1 | 2, sprites: SpriteLibrary) {
    this.sprite = sprites.get("cfe-ksv").getSprite([type, 0]);
    this.calloutSprite = sprites.get("callout").getSprite([0, 0]);
    // Place above the head
    this.calloutSprite.offset = coordAdd(this.calloutSprite.offset, [0, -32]);
  }

  tick(): ActivityUpdates {
    this.counter++;
    return {
      sprites: this.isShouting() ? [this.sprite, this.calloutSprite] : [this.sprite],
      finished: this.counter > 90,
    };
  }

  // shout for a second, then wait for a second
  private isShouting(): boolean {
    const currentSecond = Math.floor(this.counter / 10);
    return currentSecond % 2 === 0;
  }
}

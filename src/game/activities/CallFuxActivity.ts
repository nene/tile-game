import { coordAdd } from "../Coord";
import { Activity, ActivityUpdates } from "./Activity";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { Dialog } from "../Dialog";
import { WaitingBeerActivity } from "./WaitingBeerActivity";

export class CallFuxActivity implements Activity {
  private counter = 0;
  private sprite: Sprite;
  private calloutSprite: Sprite;
  private finished = false;

  constructor(private character: Character) {
    this.sprite = SpriteLibrary.get(character.spriteSet).getSprite([0, 0]);
    this.calloutSprite = SpriteLibrary.get("callout").getSprite([0, 0]);
    // Place above the head
    this.calloutSprite.offset = coordAdd(this.calloutSprite.offset, [0, -32]);
  }

  tick(): ActivityUpdates {
    this.counter++;
    return {
      sprites: this.isShouting() ? [this.sprite, this.calloutSprite] : [this.sprite],
    };
  }

  // shout for a second, then wait for a second
  private isShouting(): boolean {
    const currentSecond = Math.floor(this.counter / 10);
    return currentSecond % 2 === 0;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController) {
    ui.showDialog(new Dialog(this.character, "Hea rebane,\nPalun too mulle shoppen õlut."));
    this.finished = true;
  }

  nextActivity() {
    if (this.finished) {
      return new WaitingBeerActivity(this.character);
    }
  }
}

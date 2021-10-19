import { coordAdd } from "../Coord";
import { Activity, ActivityUpdates } from "./Activity";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { Interaction } from "./Interaction";

export class CallFuxActivity implements Activity {
  private counter = 0;
  private sprite: Sprite;
  private calloutSprite: Sprite;
  private finished = false;

  constructor(private character: Character, private interaction: Interaction) {
    this.sprite = SpriteLibrary.getSprite(character.spriteSet);
    this.calloutSprite = SpriteLibrary.getSprite("callout");
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

  isInteractable() {
    return true;
  }

  interact(ui: UiController) {
    this.finished = true;
    this.interaction.interact(ui);
  }

  nextActivity() {
    if (this.finished) {
      return this.interaction.nextActivity();
    }
  }
}

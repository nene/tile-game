import { coordAdd } from "../Coord";
import { Activity, ActivityUpdates } from "./Activity";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { Dialog } from "../Dialog";
import { WaitingBeerActivity } from "./WaitingBeerActivity";
import { Beer } from "../items/Beer";

export class CallFuxActivity implements Activity {
  private counter = 0;
  private sprite: Sprite;
  private calloutSprite: Sprite;
  private expectedBeer?: Beer;

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
    return Boolean(this.expectedBeer);
  }

  interact(ui: UiController) {
    this.expectedBeer = this.chooseBeer(this.character.favoriteBeers);
    ui.showDialog(new Dialog(this.character, `Hea rebane,\nPalun too mulle üks ${this.expectedBeer.name}.`));
    ui.giveMoney(this.expectedBeer.price);
  }

  private chooseBeer(beers: Beer[]): Beer {
    return beers[Math.floor(Math.random() * beers.length)];
  }

  nextActivity() {
    if (this.expectedBeer) {
      return new WaitingBeerActivity(this.character, this.expectedBeer);
    }
  }
}

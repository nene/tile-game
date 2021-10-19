import { coordAdd } from "../Coord";
import { Activity, ActivityUpdates } from "./Activity";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { WaitingBeerActivity } from "./WaitingBeerActivity";
import { Beer } from "../items/Beer";
import { random } from "lodash";
import { TextContent } from "../dialogs/TextContent";

export class CallFuxActivity implements Activity {
  private counter = 0;
  private sprite: Sprite;
  private calloutSprite: Sprite;
  private expectedBeer?: Beer;
  private finished = false;

  constructor(private character: Character) {
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
    this.expectedBeer = this.chooseBeer(this.character.favoriteBeers);
    if (this.expectedBeer) {
      this.showDialog(ui, `Hea rebane, palun too mulle üks ${this.expectedBeer.name}.`);
      ui.giveMoney(this.expectedBeer.price);
    } else {
      const money = random(2, 6);
      this.showDialog(ui, `Hea rebane, palun too mulle üks õlu omal valikul. Siin sulle ${money} münti.`);
      ui.giveMoney(money);
    }
  }

  private showDialog(ui: UiController, text: string) {
    ui.showDialog(this.character, (rect) => new TextContent(text, rect));
  }

  private chooseBeer(beers: Beer[]): Beer | undefined {
    if (random(1, 3) === 3) {
      return undefined;
    }
    return beers[random(beers.length - 1)];
  }

  nextActivity() {
    if (this.finished) {
      return new WaitingBeerActivity(this.character, this.expectedBeer);
    }
  }
}

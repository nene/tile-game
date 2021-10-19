import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { WaitingBeerActivity } from "./WaitingBeerActivity";
import { Beer } from "../items/Beer";
import { random } from "lodash";
import { TextContent } from "../dialogs/TextContent";
import { Interaction } from "./Interaction";

export class RequestBeerInteraction implements Interaction {
  private expectedBeer?: Beer;

  constructor(private character: Character) {
    this.expectedBeer = this.chooseBeer(this.character.favoriteBeers);
  }

  interact(ui: UiController) {
    if (this.expectedBeer) {
      this.showDialog(ui, `Hea rebane, palun too mulle üks ${this.expectedBeer.name}.`);
      ui.giveMoney(this.expectedBeer.price);
    } else {
      const money = random(2, 6);
      this.showDialog(ui, `Hea rebane, palun too mulle üks õlu omal valikul. Siin sulle ${money} münti.`);
      ui.giveMoney(money);
    }
  }

  nextActivity() {
    return new WaitingBeerActivity(this.character, this.expectedBeer);
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
}

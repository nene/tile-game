import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { WaitingDrinkActivity } from "./WaitingDrinkActivity";
import { Drink } from "../items/Drink";
import { random } from "lodash";
import { TextContent } from "../dialogs/TextContent";
import { Interaction } from "./Interaction";
import { Dialog } from "../dialogs/Dialog";

export class RequestDrinkInteraction implements Interaction {
  private expectedDrink?: Drink;

  constructor(private character: Character) {
    this.expectedDrink = this.chooseDrink(this.character.favoriteDrinks);
  }

  interact(ui: UiController) {
    if (this.expectedDrink) {
      this.showDialog(ui, `Hea rebane, palun too mulle üks ${this.expectedDrink.name}.`);
      ui.giveMoney(this.expectedDrink.price);
    } else {
      const money = random(2, 6);
      this.showDialog(ui, `Hea rebane, palun too mulle üks õlu omal valikul. Siin sulle ${money} münti.`);
      ui.giveMoney(money);
    }
  }

  nextActivity() {
    return new WaitingDrinkActivity(this.character, this.expectedDrink);
  }

  private showDialog(ui: UiController, text: string) {
    ui.showDialog(new Dialog({
      character: this.character,
      createContent: (rect) => new TextContent(text, rect),
      onClose: () => ui.hideDialog(),
    }));
  }

  private chooseDrink(drinks: Drink[]): Drink | undefined {
    if (random(1, 3) === 3) {
      return undefined;
    }
    return drinks[random(drinks.length - 1)];
  }
}

import { Activity, ActivityUpdates } from "./Activity";
import { UiController } from "../UiController";
import { FeenoksLadyCharacter } from "../npc/FeenoksLadyCharacter";
import { showPlainTextDialog } from "../dialogs/showPlainTextDialog";
import { BeerBottle } from "../items/BeerBottle";
import { getDrink } from "../items/Drink";
import { Shop } from "../inventory/Shop";
import { SimpleBottleOpener } from "../items/SimpleBottleOpener";
import { ShopView } from "../inventory/ShopView";

export class SellAlcoholActivity implements Activity {
  private shop = new Shop([
    new BeerBottle(getDrink("limonaad")),
    new BeerBottle(getDrink("kriek")),
    new BeerBottle(getDrink("pilsner")),
    new BeerBottle(getDrink("heineken")),
    new BeerBottle(getDrink("tommu-hiid")),
    new BeerBottle(getDrink("alexander")),
    new BeerBottle(getDrink("special")),
    new BeerBottle(getDrink("paulaner")),
    new BeerBottle(getDrink("porter")),
    new BeerBottle(getDrink("bock")),
    new SimpleBottleOpener(),
  ]);

  constructor(private character: FeenoksLadyCharacter) {
  }

  tick(): ActivityUpdates {
    return {};
  }

  isFinished() {
    return false;
  }

  isInteractable() {
    return true;
  }

  interact(ui: UiController) {
    showPlainTextDialog({
      ui,
      character: this.character,
      text: "Teretulemast Feenoksi alkoparadiisi!",
      onClose: () => this.showShop(ui),
    });
  }

  private showShop(ui: UiController) {
    ui.showInventory(new ShopView({
      shop: this.shop,
      wallet: ui.getAttributes().wallet,
      headline: {
        title: "Feenoks",
        description: "Kui seda siin ei müüda, siis polegi mõtet seda osta.",
      },
      onClose: () => ui.hideInventory(),
    }));
  }

  nextActivity() {
    return undefined;
  }
}

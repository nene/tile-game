import { Activity, ActivityUpdates } from "./Activity";
import { UiController } from "../UiController";
import { FeenoksLadyCharacter } from "../npc/FeenoksLadyCharacter";
import { BeerBottle } from "../items/BeerBottle";
import { getDrink } from "../items/Drink";
import { Shop } from "../inventory/Shop";
import { SimpleBottleOpener } from "../items/SimpleBottleOpener";
import { ShopView } from "../inventory/ShopView";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { CharacterDialog } from "../dialogs/CharacterDialog";

export class SellAlcoholActivity implements Activity {
  private animation: SpriteAnimation;
  private dialog: CharacterDialog;

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
    this.animation = character.getGraphics().getIdleAnimation();
    this.dialog = new CharacterDialog(character);
  }

  tick(): ActivityUpdates {
    this.animation.tick();
    return {
      sprites: this.animation.getSprites(),
    };
  }

  isFinished() {
    return false;
  }

  isInteractable() {
    return true;
  }

  interact(ui: UiController) {
    if (this.character.isDialogShown()) {
      return this.showShop(ui);
    }

    this.dialog.show(ui, "Teretulemast Feenoksi alkoparadiisi!", {
      onClose: () => {
        this.character.markDialogShown();
        this.showShop(ui);
      },
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

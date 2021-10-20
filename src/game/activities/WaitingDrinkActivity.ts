import { Dialog } from "../dialogs/Dialog";
import { TextContent } from "../dialogs/TextContent";
import { Drink } from "../items/Drink";
import { BeerBottle } from "../items/BeerBottle";
import { BeerGlass, DrinkLevel } from "../items/BeerGlass";
import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { Activity } from "./Activity";
import { DrinkActivity } from "./DrinkActivity";

export class WaitingDrinkActivity implements Activity {
  private receivedBeerGlass?: BeerGlass;

  constructor(private character: Character, private expectedDrink?: Drink) {
  }

  tick() {
    return {};
  }

  isFinished() {
    return Boolean(this.receivedBeerGlass);
  }

  isInteractable(ui: UiController) {
    const item = ui.getSelectedItem();
    return item instanceof BeerBottle || item instanceof BeerGlass;
  }

  interact(ui: UiController) {
    const item = ui.getSelectedItem();
    if (!item || !(item instanceof BeerBottle || item instanceof BeerGlass)) {
      return;
    }

    if (this.acceptDrink(ui, item)) {
      ui.removeSelectedItem();
      this.receivedBeerGlass = item;
    }
  }

  private acceptDrink(ui: UiController, item: BeerGlass | BeerBottle): item is BeerGlass {
    const beer = item.getDrink();
    if (this.expectedDrink && beer !== this.expectedDrink) {
      this.showDialog(ui, `See pole see õlu mis ma palusin. Too mulle ${this.expectedDrink.name}.`);
      return false;
    }
    else if (item instanceof BeerGlass) {
      const isFavorite = !this.expectedDrink && beer && this.character.favoriteDrinks.includes(beer);
      const isHated = !this.expectedDrink && beer && this.character.hatedDrinks.includes(beer);
      this.showDialog(ui, this.getThanks(item, isFavorite, isHated));
      if (item.getLevel() > DrinkLevel.empty) {
        return true;
      } else {
        return false;
      }
    }
    else if (item instanceof BeerBottle && !item.isOpen()) {
      this.showDialog(ui, "Aitäh.\nTee palun pudel lahti ja vala šoppenisse ka.");
      return false;
    }
    else if (item instanceof BeerBottle && item.isOpen()) {
      this.showDialog(ui, "Aitäh.\nVala õlu šoppenisse ka.");
      return false;
    }
    return false;
  }

  private showDialog(ui: UiController, text: string) {
    ui.showDialog(new Dialog({
      character: this.character,
      createContent: (rect) => new TextContent(text, rect),
      onClose: () => ui.hideDialog(),
    }));
  }

  nextActivity() {
    if (this.receivedBeerGlass) {
      return new DrinkActivity(this.receivedBeerGlass, this.character);
    }
  }

  private getThanks(beerGlass: BeerGlass, isFavorite: boolean = false, isHated: boolean = false): string {
    switch (beerGlass.getLevel()) {
      case DrinkLevel.full:
        if (isFavorite) {
          return "Ooo! Täis šoppen minu lemmikõllega! Oled parim rebane.";
        } else if (isHated) {
          return "Uhh! Terve šoppenitäis sellist jälkust. Kao mu silmist, sa igavene!";
        } else {
          return "Ooo! See on ju suurepäraselt täidetud šoppen. Oled tõega kiitust väärt.";
        }
      case DrinkLevel.almostFull:
        if (isFavorite) {
          return "Vau! Šoppen minu lemmikõllega! Suur aitäh!";
        } else if (isHated) {
          return "Väkk, mis asi! Kas sa ise jood seda?";
        } else {
          return "Aitäh! Oled üsna tublisti valanud.";
        }
      case DrinkLevel.half:
        if (isFavorite) {
          return "Oo... Minu lemmikõlu! Aga miks vaid pool šoppenit?";
        } else if (isHated) {
          return "Nojah... See pole just suurem asi... Vähemalt pole seda palju.";
        } else {
          return "No kuule! See on ju poolik šoppen. Mis jama sa mulle tood!";
        }
      case DrinkLevel.almostEmpty:
        if (isFavorite) {
          return "Oo... Minu lemmikõlu! Aga miks vaid pool šoppenit?";
        } else if (isHated) {
          return "Einoh... Kui seda jama juua, siis rohkem kui lonksu ma ei võtakski.";
        } else {
          return "See ei lähe! Ma palusin sul tuua šoppeni täie õlut, aga sina tood mulle mingi tilga šoppeni põhjas.";
        }
      case DrinkLevel.empty:
        return "Eee... jah, see on šoppen. Aga paluksin õlut ka siia sisse, aitäh.";
    }
  }
}

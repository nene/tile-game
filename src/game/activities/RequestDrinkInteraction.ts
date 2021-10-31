import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { TextContent } from "../dialogs/TextContent";
import { Interaction, InteractionType } from "./Interaction";
import { Dialog } from "../dialogs/Dialog";
import { BeerGlass, DrinkLevel } from "../items/BeerGlass";
import { DrinkActivity } from "./DrinkActivity";
import { BeerBottle } from "../items/BeerBottle";
import { ValidationResult } from "../questions/Question";
import { getDrink } from "../items/Drink";

export class RequestDrinkInteraction implements Interaction {
  private receivedBeerGlass?: BeerGlass;

  constructor(private character: Character) {
  }

  getType() {
    return InteractionType.beer;
  }

  isFinished() {
    return Boolean(this.receivedBeerGlass);
  }

  interact(ui: UiController) {
    const item = ui.getSelectedItem();
    if (!item || !(item instanceof BeerBottle || item instanceof BeerGlass)) {
      this.showDialog(ui, "Rebane! Too mulle šoppen õlut.");
      return;
    }

    if (item.getDrink() === getDrink("water")) {
      this.showDialog(ui, "Vett võid sa ise juua kui tahad.");
      return;
    }

    if (this.acceptDrink(ui, item)) {
      ui.setSelectedItem(undefined);
      ui.getAttributes().wallet.add(item.getDrink()?.price || 0);
      this.receivedBeerGlass = item;
    }
  }

  private acceptDrink(ui: UiController, item: BeerGlass | BeerBottle): item is BeerGlass {
    if (item instanceof BeerGlass) {
      const result = this.validateBeerGlass(item);
      this.showDialog(ui, result.msg);

      if (result.type === "praise") {
        this.character.changeOpinion(+1);
      }
      else if (result.type === "punish") {
        this.character.changeOpinion(-1);
      }

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
    ui.showModal(new Dialog({
      character: this.character,
      createContent: (rect) => new TextContent(text, rect),
      onClose: () => ui.hideModal(),
    }));
  }

  nextActivity() {
    if (this.receivedBeerGlass) {
      return new DrinkActivity(this.receivedBeerGlass, this.character);
    }
  }

  private validateBeerGlass(beerGlass: BeerGlass): ValidationResult {
    const drink = beerGlass.getDrink();
    const isFavorite = drink && this.character.getFavoriteDrinks().includes(drink);
    const isHated = drink && this.character.getHatedDrinks().includes(drink);

    switch (beerGlass.getLevel()) {
      case DrinkLevel.full:
        if (isFavorite) {
          return { type: "praise", msg: "Ooo! Täis šoppen minu lemmikõllega! Oled parim rebane." };
        } else if (isHated) {
          return { type: "punish", msg: "Uhh! Terve šoppenitäis sellist jälkust. Kao mu silmist, sa igavene!" };
        } else {
          return { type: "praise", msg: "Ooo! See on ju suurepäraselt täidetud šoppen. Oled tõega kiitust väärt." };
        }
      case DrinkLevel.almostFull:
        if (isFavorite) {
          return { type: "praise", msg: "Vau! Šoppen minu lemmikõllega! Suur aitäh!" };
        } else if (isHated) {
          return { type: "punish", msg: "Väkk, mis asi! Kas sa ise jood seda?" };
        } else {
          return { type: "neutral", msg: "Aitäh! Oled üsna tublisti valanud." };
        }
      case DrinkLevel.half:
        if (isFavorite) {
          return { type: "neutral", msg: "Oo... Minu lemmikõlu! Aga miks vaid pool šoppenit?" };
        } else if (isHated) {
          return { type: "neutral", msg: "Nojah... See pole just suurem asi... Vähemalt pole seda palju." };
        } else {
          return { type: "punish", msg: "No kuule! See on ju poolik šoppen. Mis jama sa mulle tood!" };
        }
      case DrinkLevel.almostEmpty:
        if (isFavorite) {
          return { type: "punish", msg: "Kas sa õrritad mind või? Õlu tundub hea, aga miks ainult tilk šoppeni põhjas?" };
        } else if (isHated) {
          return { type: "neutral", msg: "Einoh... Kui seda jama juua, siis rohkem kui lonksu ma ei võtakski." };
        } else {
          return { type: "punish", msg: "See ei lähe! Ma palusin sul tuua šoppeni täie õlut, aga sina tood mulle mingi tilga šoppeni põhjas." };
        }
      case DrinkLevel.empty:
        return { type: "neutral", msg: "Eee... jah, see on šoppen. Aga paluksin õlut ka siia sisse, aitäh." };
    }
  }
}

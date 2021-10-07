import { Beer } from "../items/Beer";
import { BeerBottle } from "../items/BeerBottle";
import { BeerGlass, BeerLevel } from "../items/BeerGlass";
import { Character } from "../npc/Character";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";
import { Activity } from "./Activity";
import { DrinkActivity } from "./DrinkActivity";

export class WaitingBeerActivity implements Activity {
  private sprite: Sprite;
  private receivedBeerGlass?: BeerGlass;

  constructor(private character: Character, private expectedBeer?: Beer) {
    this.sprite = SpriteLibrary.get(character.spriteSet).getSprite([0, 0]);
  }

  tick() {
    return { sprites: [this.sprite] };
  }

  isFinished() {
    return Boolean(this.receivedBeerGlass);
  }

  interact(ui: UiController) {
    const item = ui.getSelectedItem();
    if (!item || !(item instanceof BeerBottle || item instanceof BeerGlass)) {
      return;
    }

    if (this.acceptBeer(ui, item)) {
      ui.removeSelectedItem();
      this.receivedBeerGlass = item;
    }
  }

  private acceptBeer(ui: UiController, item: BeerGlass | BeerBottle): item is BeerGlass {
    const beer = item.getBeer();
    if (this.expectedBeer && beer !== this.expectedBeer) {
      ui.showDialog(this.character, `See pole see õlu mis ma palusin. Too mulle ${this.expectedBeer.name}.`);
      return false;
    }
    else if (item instanceof BeerGlass) {
      const isFavorite = !this.expectedBeer && beer && this.character.favoriteBeers.includes(beer);
      const isHated = !this.expectedBeer && beer && this.character.hatedBeers.includes(beer);
      ui.showDialog(this.character, this.getThanks(item, isFavorite, isHated));
      if (item.getLevel() > BeerLevel.empty) {
        return true;
      } else {
        return false;
      }
    }
    else if (item instanceof BeerBottle && !item.isOpen()) {
      ui.showDialog(this.character, "Aitäh.\nTee palun pudel lahti ja vala shoppenisse ka.");
      return false;
    }
    else if (item instanceof BeerBottle && item.isOpen()) {
      ui.showDialog(this.character, "Aitäh.\nVala õlu shoppenisse ka.");
      return false;
    }
    return false;
  }

  nextActivity() {
    if (this.receivedBeerGlass) {
      return new DrinkActivity(this.receivedBeerGlass, this.character);
    }
  }

  private getThanks(beer: BeerGlass, isFavorite: boolean = false, isHated: boolean = false): string {
    switch (beer.getLevel()) {
      case BeerLevel.full:
        if (isFavorite) {
          return "Ooo! Täis shoppen minu lemmikõllega! Oled parim rebane.";
        } else if (isHated) {
          return "Uhh! Terve shoppenitäis sellist jälkust. Kao mu silmist, sa igavene!";
        } else {
          return "Ooo! See on ju suurepäraselt täidetud shoppen. Oled tõega kiitust väärt.";
        }
      case BeerLevel.almostFull:
        if (isFavorite) {
          return "Vau! Shoppen minu lemmikõllega! Suur aitäh!";
        } else if (isHated) {
          return "Väkk, mis asi! Kas sa ise jood seda?";
        } else {
          return "Aitäh! Oled üsna tublisti valanud.";
        }
      case BeerLevel.half:
        if (isFavorite) {
          return "Oo... Minu lemmikõlu! Aga miks vaid pool shoppenit?";
        } else if (isHated) {
          return "Nojah... See pole just suurem asi... Vähemalt pole seda palju.";
        } else {
          return "No kuule! See on ju poolik shoppen. Mis jama sa mulle tood!";
        }
      case BeerLevel.almostEmpty:
        if (isFavorite) {
          return "Oo... Minu lemmikõlu! Aga miks vaid pool shoppenit?";
        } else if (isHated) {
          return "Einoh... Kui seda jama juua, siis rohkem kui lonksu ma ei võtakski.";
        } else {
          return "See ei lähe! Ma palusin sul tuua shoppeni täie õlut, aga sina tood mulle mingi tilga shoppeni põhjas.";
        }
      case BeerLevel.empty:
        return "Eee... jah, see on shoppen. Aga paluksin õlut ka siia sisse, aitäh.";
    }
  }
}

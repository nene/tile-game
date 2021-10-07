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
      ui.showDialog(this.character, `See pole see õlu mis ma palusin.\nToo mulle ${this.expectedBeer.name}.`);
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
      ui.showDialog(this.character, "Aitäh.\nTee palun pudel lahti ja vala\nshoppenisse ka.");
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
          return "Ooo!\nTäis shoppen minu lemmikõllega!\nOled parim rebane.";
        } else if (isHated) {
          return "Uhh!\nTerve shoppenitäis sellist jälkust\nKao mu silmist,\nsa igavene.";
        } else {
          return "Ooo!\nSee on ju suurepäraselt täidetud\nshoppen.\nOled tõega kiitust väärt.";
        }
      case BeerLevel.almostFull:
        if (isFavorite) {
          return "Vau!\nShoppen minu lemmikõllega!\nSuur aitäh!";
        } else if (isHated) {
          return "Väkk, mis asi!\nKas sa ise jood seda?";
        } else {
          return "Aitäh!\nOled üsna tublisti valanud.";
        }
      case BeerLevel.half:
        if (isFavorite) {
          return "Oo...\nMinu lemmikõlu!\nAga miks vaid pool shoppenit?";
        } else if (isHated) {
          return "Nojah...\nSee pole just suurem asi...\nVähemalt pole seda palju.";
        } else {
          return "No kuule!\nSee on ju poolik shoppen.\nMis jama sa mulle tood!";
        }
      case BeerLevel.almostEmpty:
        if (isFavorite) {
          return "Oo...\nMinu lemmikõlu!\nAga miks vaid pool shoppenit?";
        } else if (isHated) {
          return "Einoh...\nKui seda jama juua,\nsiis rohkem kui lonksu\nma ei võtakski.";
        } else {
          return "See ei lähe!\nMa palusin sul tuua shoppeni täie õlut,\naga sina tood mulle mingi tilga shoppeni põhjas.";
        }
      case BeerLevel.empty:
        return "Eee...\njah, see on shoppen.\nAga paluksin õlut ka siia sisse, aitäh.";
    }
  }
}

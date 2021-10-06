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

  constructor(private character: Character, private expectedBeer: Beer) {
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
    if ((item instanceof BeerBottle || item instanceof BeerGlass) && item.getBeer() !== this.expectedBeer) {
      ui.showDialog(this.character, `See pole see õlu mis ma palusin.\nToo mulle ${this.expectedBeer.name}.`);
    }
    else if (item instanceof BeerGlass) {
      ui.showDialog(this.character, this.getThanks(item));
      if (item.getLevel() > BeerLevel.empty) {
        ui.removeSelectedItem();
        this.receivedBeerGlass = item;
      }
    }
    else if (item instanceof BeerBottle && !item.isOpen()) {
      ui.showDialog(this.character, "Aitäh.\nTee palun pudel lahti ja vala\nshoppenisse ka.");
    }
    else if (item instanceof BeerBottle && item.isOpen()) {
      ui.showDialog(this.character, "Aitäh.\nVala õlu shoppenisse ka.");
    }
  }

  nextActivity() {
    if (this.receivedBeerGlass) {
      return new DrinkActivity(this.receivedBeerGlass, this.character);
    }
  }

  private getThanks(beer: BeerGlass): string {
    switch (beer.getLevel()) {
      case BeerLevel.full: return "Ooo!\nSee on ju suurepäraselt täidetud\nshoppen.\nOled tõega kiitust väärt.";
      case BeerLevel.almostFull: return "Aitäh!\nOled üsna tublisti valanud.";
      case BeerLevel.half: return "No kuule!\nSee on ju poolik shoppen.\nMis jama sa mulle tood!";
      case BeerLevel.almostEmpty: return "See ei lähe!\nMa palusin sul tuua shoppeni täie õlut,\naga sina tood mulle mingi tilga shoppeni põhjas.";
      case BeerLevel.empty: return "Eee...\njah, see on shoppen.\nAga paluksin õlut ka siia sisse, aitäh.";
    }
  }
}

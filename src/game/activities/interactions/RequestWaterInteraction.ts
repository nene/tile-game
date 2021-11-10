import { Character } from "../../npc/Character";
import { UiController } from "../../UiController";
import { Interaction, InteractionType } from "./Interaction";
import { DrinkLevel, isBeerGlass } from "../../items/BeerGlass";
import { getDrink } from "../../items/Drink";
import { showPlainTextDialog } from "../../dialogs/showPlainTextDialog";
import { GameItem } from "../../items/GameItem";

export class RequestWaterInteraction implements Interaction {
  private finished = false;

  constructor(private character: Character) {
  }

  getType() {
    return InteractionType.water;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController, item?: GameItem) {
    if (!item || !(isBeerGlass(item))) {
      this.showDialog(ui, "Too šoppen vett!");
      return;
    }
    if (item.getDrink() !== getDrink("water")) {
      this.showDialog(ui, "Vesi, vesi... kus on vesi?");
      return;
    }
    if (item.getLevel() !== DrinkLevel.full) {
      this.showDialog(ui, "Meil on kraanis vett küllaga. Palun täida seal šoppen ääreni.");
      return;
    }

    this.showDialog(ui, "Võta laituseks sisse!", () => {
      ui.getWorld().getPlayer().interact(ui, item);
      this.finished = true;
    });
  }

  private showDialog(ui: UiController, text: string, onClose?: () => void) {
    showPlainTextDialog({ ui, character: this.character, text, onClose });
  }

  nextActivity() {
    return undefined;
  }
}

import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { Interaction, InteractionType } from "./Interaction";
import { DrinkLevel, isBeerGlass } from "../../items/BeerGlass";
import { getDrink } from "../../items/Drink";
import { GameItem } from "../../items/GameItem";
import { CharacterDialog } from "../../dialogs/CharacterDialog";

export class RequestWaterInteraction implements Interaction {
  private finished = false;
  private dialog: CharacterDialog;

  constructor(private character: AcademicCharacter) {
    this.dialog = new CharacterDialog(character);
  }

  getType() {
    return InteractionType.water;
  }

  isFinished() {
    return this.finished;
  }

  interact(ui: UiController, item?: GameItem) {
    if (!item || !(isBeerGlass(item))) {
      this.dialog.show(ui, "Too šoppen vett!");
      return;
    }
    if (item.getDrink() !== getDrink("water")) {
      this.dialog.show(ui, "Vesi, vesi... kus on vesi?");
      return;
    }
    if (item.getLevel() !== DrinkLevel.full) {
      this.dialog.show(ui, "Meil on kraanis vett küllaga. Palun täida seal šoppen ääreni.");
      return;
    }

    this.dialog.show(ui, "Võta laituseks sisse!", {
      onClose: () => {
        ui.getWorld().getPlayer().interact(ui, item);
        this.finished = true;
      },
    });
  }

  nextActivity() {
    return undefined;
  }
}

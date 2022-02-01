import { isBook } from "../../items/Book";
import { getDrink } from "../../items/Drink";
import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { CallFuxActivity } from "../CallFuxActivity";
import { InteractionResult, PlainInteraction } from "./PlainInteraction";
import { RequestWaterInteraction } from "../interactions/RequestWaterInteraction";
import { GameItem } from "../../items/GameItem";
import { CharacterDialog } from "../../dialogs/CharacterDialog";

export class ReceiveBookInteraction implements PlainInteraction {
  private dialog: CharacterDialog;

  constructor(private character: AcademicCharacter) {
    this.dialog = new CharacterDialog(character);
  }

  interact(ui: UiController, item?: GameItem): InteractionResult | undefined {
    if (!item || !isBook(item)) {
      return undefined;
    }

    if (item.getEntries().some((char) => char === this.character)) {
      this.dialog.show(
        ui,
        "Milleks mulle see. Ma olen majaraamatus kenasti kirjas.\nToo endale šoppen vett, et oma tähelepanu turgutada.",
      );
      return { type: "activity", activity: new CallFuxActivity(this.character, new RequestWaterInteraction(this.character)) };
    } else {
      this.dialog.show(
        ui,
        "Paistab, et olen unustanud end majaraamatusse kirjutada. Tänud tähelepanu juhtimast. Siin sulle kuue õlle raha.",
      );
      item.addEntry(this.character);
      ui.getAttributes().wallet.add(getDrink("alexander").price * 6);
      return { type: "done" };
    }
  }
}

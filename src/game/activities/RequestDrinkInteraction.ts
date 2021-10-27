import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { WaitingDrinkActivity } from "./WaitingDrinkActivity";
import { TextContent } from "../dialogs/TextContent";
import { Interaction, InteractionType } from "./Interaction";
import { Dialog } from "../dialogs/Dialog";

export class RequestDrinkInteraction implements Interaction {
  constructor(private character: Character) {
  }

  getType() {
    return InteractionType.beer;
  }

  interact(ui: UiController) {
    this.showDialog(ui, `Hea rebane, palun too mulle üks õlu.`);
  }

  nextActivity() {
    return new WaitingDrinkActivity(this.character);
  }

  private showDialog(ui: UiController, text: string) {
    ui.showDialog(new Dialog({
      character: this.character,
      createContent: (rect) => new TextContent(text, rect),
      onClose: () => ui.hideDialog(),
    }));
  }
}

import { getDrink } from "../../items/Drink";
import { AcademicCharacter, ColorBandState } from "../../npc/AcademicCharacter";
import { UiController } from "../../UiController";
import { CallFuxActivity } from "../CallFuxActivity";
import { InteractionResult, PlainInteraction } from "./PlainInteraction";
import { RequestWaterInteraction } from "../interactions/RequestWaterInteraction";
import { GameItem } from "../../items/GameItem";
import { isColorBandTouch } from "../../items/ColorBandTouch";
import { CharacterDialog } from "../../dialogs/CharacterDialog";

export class ColorBandInteraction implements PlainInteraction {
  private dialog: CharacterDialog;

  constructor(private character: AcademicCharacter) {
    this.dialog = new CharacterDialog(character);
  }

  interact(ui: UiController, item?: GameItem): InteractionResult | undefined {
    if (!item || !isColorBandTouch(item)) {
      return undefined;
    }

    switch (this.character.getColorBandState()) {
      case ColorBandState.correct:
        this.dialog.show(
          ui,
          "Ai ai ai! Värve rebane puutuda ei tohi. Too endale kohe üks korralik šoppen vett.",
        );
        return { type: "activity", activity: new CallFuxActivity(this.character, new RequestWaterInteraction(this.character)) };
      case ColorBandState.twisted:
        this.dialog.show(
          ui,
          "Oi... mu lint!\nVäga tähelepanelik rebane! Siin sulle kuue õlle raha.",
        );
        this.character.correctColorBand();
        ui.getAttributes().wallet.add(getDrink("alexander").price * 6);
        return { type: "done" };
      case ColorBandState.inverted:
        this.dialog.show(
          ui,
          "Ai kurjam... kuidas ma küll niipidi!\nTänud tähelepanu juhtimast hea rebane! Siin sulle 12 õlle raha.",
        );
        this.character.correctColorBand();
        ui.getAttributes().wallet.add(getDrink("alexander").price * 12);
        return { type: "done" };
    }
  }
}

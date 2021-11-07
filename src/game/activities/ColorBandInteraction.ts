import { showPlainTextDialog } from "../dialogs/showPlainTextDialog";
import { getDrink } from "../items/Drink";
import { Character, ColorBandState } from "../npc/Character";
import { UiController } from "../UiController";
import { CallFuxActivity } from "./CallFuxActivity";
import { InteractionResult, PlainInteraction } from "./PlainInteraction";
import { RequestWaterInteraction } from "./RequestWaterInteraction";

export class ColorBandInteraction implements PlainInteraction {
  constructor(private character: Character) { }

  interact(ui: UiController): InteractionResult | undefined {
    if (!ui.isTouchingColorBand()) {
      return undefined;
    }

    switch (this.character.getColorBandState()) {
      case ColorBandState.correct:
        showPlainTextDialog({
          ui,
          character: this.character,
          text: "Ai ai ai! Värve rebane puutuda ei tohi. Too endale kohe üks korralik šoppen vett.",
        });
        return { type: "activity", activity: new CallFuxActivity(this.character, new RequestWaterInteraction(this.character)) };
      case ColorBandState.twisted:
        showPlainTextDialog({
          ui,
          character: this.character,
          text: "Oi... mu lint!\nVäga tähelepanelik rebane! Siin sulle kuue õlle raha.",
        });
        this.character.correctColorBand();
        ui.getAttributes().wallet.add(getDrink("alexander").price * 6);
        return { type: "done" };
      case ColorBandState.inverted:
        showPlainTextDialog({
          ui,
          character: this.character,
          text: "Ai kurjam... kuidas ma küll niipidi!\nTänud tähelepanu juhtimast hea rebane! Siin sulle 12 õlle raha.",
        });
        this.character.correctColorBand();
        ui.getAttributes().wallet.add(getDrink("alexander").price * 12);
        return { type: "done" };
    }
  }
}

import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { isEqual, random } from "lodash";
import { TextContent } from "../dialogs/TextContent";
import { allOrganizations, Organization } from "../orgs/Organization";
import { FlagQuestionContent } from "../dialogs/FlagQuestionContent";
import { FlagColor } from "../orgs/FlagColors";
import { Interaction } from "./Interaction";
import { Dialog } from "../dialogs/Dialog";

export class AskQuestionInteraction implements Interaction {
  private expectedOrg: Organization;

  constructor(private character: Character) {
    this.expectedOrg = this.chooseOrg();
  }

  private chooseOrg(): Organization {
    const orgs = allOrganizations();
    return orgs[random(orgs.length - 1)];
  }

  interact(ui: UiController) {
    ui.showDialog(new Dialog({
      character: this.character,
      createContent: (rect) => new FlagQuestionContent({
        org: this.expectedOrg,
        container: rect,
        onAnswer: (colors) => {
          if (this.validateAnswer(colors)) {
            this.showReply(ui, "Õige!\nTubli rebane. Kiidan.");
          } else {
            this.showReply(ui, `Vale!\n${this.expectedOrg.name} värvid on ${this.colorsString(this.expectedOrg.flag)}.\nVõta laituseks sisse.`);
          }
        },
      }),
      onClose: () => {
        this.showReply(ui, `Rumal rebane.\nTea siis, et ${this.expectedOrg.name} värvid on ${this.colorsString(this.expectedOrg.flag)}.\nVõta laituseks sisse.`);
      }
    }));
  }

  nextActivity() {
    return undefined;
  }

  private validateAnswer(colors: FlagColor[]): boolean {
    return isEqual(colors, this.expectedOrg.flag);
  }

  private showReply(ui: UiController, text: string) {
    ui.showDialog(new Dialog({
      character: this.character,
      createContent: (rect) => new TextContent(text, rect),
      onClose: () => ui.hideDialog(),
    }));
  }

  private colorsString(colors: FlagColor[]): string {
    return colors.map((c) => c.name).join("-");
  }
}

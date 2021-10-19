import { coordAdd } from "../Coord";
import { Activity, ActivityUpdates } from "./Activity";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Character } from "../npc/Character";
import { UiController } from "../UiController";
import { isEqual, random } from "lodash";
import { TextContent } from "../dialogs/TextContent";
import { allOrganizations, Organization } from "../orgs/Organization";
import { FlagQuestionContent } from "../dialogs/FlagQuestionContent";
import { FlagColor } from "../orgs/FlagColors";

export class AskQuestionActivity implements Activity {
  private counter = 0;
  private sprite: Sprite;
  private calloutSprite: Sprite;
  private expectedOrg: Organization;
  private finished = false;

  constructor(private character: Character) {
    this.sprite = SpriteLibrary.getSprite(character.spriteSet);
    this.calloutSprite = SpriteLibrary.getSprite("callout");
    // Place above the head
    this.calloutSprite.offset = coordAdd(this.calloutSprite.offset, [0, -32]);
    this.expectedOrg = this.chooseOrg();
  }

  private chooseOrg(): Organization {
    const orgs = allOrganizations();
    return orgs[random(orgs.length - 1)];
  }

  tick(): ActivityUpdates {
    this.counter++;
    return {
      sprites: this.isShouting() ? [this.sprite, this.calloutSprite] : [this.sprite],
    };
  }

  // shout for a second, then wait for a second
  private isShouting(): boolean {
    const currentSecond = Math.floor(this.counter / 10);
    return currentSecond % 2 === 0;
  }

  isFinished() {
    return this.finished;
  }

  isInteractable() {
    return true;
  }

  interact(ui: UiController) {
    this.finished = true;
    this.showQuestion(ui);
  }

  private showQuestion(ui: UiController) {
    ui.showDialog(this.character, (rect) => new FlagQuestionContent({
      org: this.expectedOrg,
      container: rect,
      onAnswer: (colors) => {
        if (this.validateAnswer(colors)) {
          this.showReply(ui, "Õige!\nTubli rebane. Kiidan.");
        } else {
          this.showReply(ui, `Vale!\n${this.expectedOrg.name} värvid on ${this.colorsString(this.expectedOrg.flag)}.\nVõta laituseks sisse.`);
        }
      },
      onCancel: () => {
        this.showReply(ui, `Rumal rebane.\nTea siis, et ${this.expectedOrg.name} värvid on ${this.colorsString(this.expectedOrg.flag)}.\nVõta laituseks sisse.`);
      },
    }));
  }

  private validateAnswer(colors: FlagColor[]): boolean {
    return isEqual(colors, this.expectedOrg.flag);
  }

  private showReply(ui: UiController, text: string) {
    ui.showDialog(this.character, (rect) => new TextContent(text, rect));
  }

  private colorsString(colors: FlagColor[]): string {
    return colors.map((c) => c.name).join("-");
  }

  nextActivity() {
    return undefined;
  }
}

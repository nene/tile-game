import { times } from "lodash";
import { Coord, coordAdd, coordMul, isCoordInRect, rectGrow } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { Component } from "../ui/Component";
import { UI_SHADOW_COLOR } from "../ui/ui-utils";
import { Window } from "../ui/Window";
import { OrgSkill } from "./OrgSkill";

enum OpinionShield {
  negative = 0,
  positive = 1,
  colored = 2,
}

interface SkillsViewConfig {
  orgSkill: OrgSkill,
  onClose: () => void;
}

export class SkillsView implements Component {
  private window: Window;
  private onClose: () => void;
  private orgSkill: OrgSkill;
  private shieldSprites: SpriteSheet;

  constructor({ orgSkill, onClose }: SkillsViewConfig) {
    this.shieldSprites = SpriteLibrary.get("opinion-shield");
    this.orgSkill = orgSkill;
    this.onClose = onClose;

    this.window = new Window({
      headline: {
        title: "Oskused",
        description: "Rebasel on tarvis palju osavust ja nutikust."
      },
      size: [192, 129 - 21],
      onClose,
    });
  }

  paint(screen: PixelScreen) {
    this.window.paint(screen);
    const contentRect = rectGrow(this.window.contentAreaRect(), [-3, -3]);
    this.drawSkill(screen, "Ak. Orgid", this.orgSkill.getLevel(), contentRect.coord);
  }

  private drawSkill(screen: PixelScreen, title: string, level: number, offset: Coord) {
    screen.drawText(title, offset, { color: "#000", shadowColor: UI_SHADOW_COLOR });
    this.drawScore(screen, level, coordAdd(offset, [100, 0]));
  }

  private drawScore(screen: PixelScreen, score: number, offset: Coord) {
    times(10, (i) => {
      const coord = coordAdd(offset, coordMul([7, 0], [i, i]));
      screen.drawSprite(this.shieldSprites.getSprite([this.scoreShield(i + 1, score), 0]), coord);
    });
  }

  private scoreShield(level: number, score: number): OpinionShield {
    if (score >= level) {
      return OpinionShield.colored;
    }
    return level < 6 ? OpinionShield.negative : OpinionShield.positive;
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    if (this.window.handleGameEvent(event)) {
      return true;
    }

    if (event.type === "click" && !isCoordInRect(event.coord, this.window.getRect())) {
      this.onClose();
      return true;
    }
  }
}

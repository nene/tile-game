import { Coord, coordAdd, isCoordInRect, rectGrow } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Component } from "../ui/Component";
import { ScoreChart } from "../ui/ScoreChart";
import { UI_SHADOW_COLOR } from "../ui/ui-utils";
import { Window } from "../ui/Window";
import { PlayerAttributes } from "./PlayerAttributes";
import { Skill } from "./Skill";

interface SkillsViewConfig {
  attributes: PlayerAttributes,
  onClose: () => void;
}

export class SkillsView implements Component {
  private window: Window;
  private onClose: () => void;
  private scoreChart: ScoreChart;
  private attributes: PlayerAttributes;
  private uususedSkill: Skill = {
    getLevel: () => 0,
    getProgress: () => 0,
    getIcon: () => SpriteLibrary.getSprite("level-up-icons"),
  };

  constructor({ attributes, onClose }: SkillsViewConfig) {
    this.scoreChart = new ScoreChart();
    this.attributes = attributes;
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
    const { coord } = rectGrow(this.window.contentAreaRect(), [-3, -3]);

    this.drawSkill(screen, "Õlletaluvus", this.attributes.alcoSkill, coordAdd(coord, [0, 13 * 0]));
    this.drawSkill(screen, "Õllevalamine", this.attributes.pouringSkill, coordAdd(coord, [0, 13 * 1]));
    this.drawSkill(screen, "Ak. Orgid", this.attributes.orgSkill, coordAdd(coord, [0, 13 * 2]));
    this.drawSkill(screen, "Uusused", this.uususedSkill, coordAdd(coord, [0, 13 * 3]));
  }

  private drawSkill(screen: PixelScreen, title: string, skill: Skill, offset: Coord) {
    screen.drawText(title, offset, { color: "#000", shadowColor: UI_SHADOW_COLOR });
    this.scoreChart.paint(screen, skill.getLevel(), coordAdd(offset, [85, 0]));
    this.drawProgress(screen, skill.getProgress(), offset);
  }

  private drawProgress(screen: PixelScreen, progress: number, offset: Coord) {
    const opacity = 0.25 + progress * 0.75;
    screen.withOpacity(opacity, () => {
      screen.drawSprite(SpriteLibrary.getSprite("level-up-mini"), coordAdd(offset, [175, 1]));
      screen.drawText(Math.round(progress * 100) + "%", coordAdd(offset, [174, 1.5]), { size: "small", align: "right", color: "#364a3c" });
    });
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

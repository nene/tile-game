import { Coord, coordAdd, isCoordInRect, rectGrow } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { Component } from "../ui/Component";
import { ScoreChart } from "../ui/ScoreChart";
import { UI_SHADOW_COLOR } from "../ui/ui-utils";
import { Window } from "../ui/Window";
import { PlayerAttributes } from "./PlayerAttributes";

interface SkillsViewConfig {
  attributes: PlayerAttributes,
  onClose: () => void;
}

export class SkillsView implements Component {
  private window: Window;
  private onClose: () => void;
  private scoreChart: ScoreChart;
  private attributes: PlayerAttributes;

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

    this.drawSkill(screen, "Õlletaluvus", this.attributes.alcoSkill.getLevel(), coordAdd(coord, [0, 13 * 0]));
    this.drawSkill(screen, "Õllevalamine", this.attributes.pouringSkill.getLevel(), coordAdd(coord, [0, 13 * 1]));
    this.drawSkill(screen, "Ak. Orgid", this.attributes.orgSkill.getLevel(), coordAdd(coord, [0, 13 * 2]));
    this.drawSkill(screen, "Uusused", 0, coordAdd(coord, [0, 13 * 3]));
  }

  private drawSkill(screen: PixelScreen, title: string, level: number, offset: Coord) {
    screen.drawText(title, offset, { color: "#000", shadowColor: UI_SHADOW_COLOR });
    this.scoreChart.paint(screen, level, coordAdd(offset, [100, 0]));
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

import { reverse } from "lodash";
import { Coord, coordAdd, coordMul, Rect, rectCenter } from "../Coord";
import { GameEvent } from "../GameEvent";
import { Organization } from "../orgs/Organization";
import { TextButton } from "../ui/TextButton";
import { PixelScreen } from "../PixelScreen";
import { ColorButton } from "../ui/ColorButton";
import { ColorMenu } from "../ui/ColorMenu";
import { DialogContent } from "./DialogContent";
import { TextContent } from "./TextContent";
import { FlagColor } from "../orgs/FlagColors";

interface FlagQuestionContentConfig {
  org: Organization;
  container: Rect;
  onAnswer: (colors: FlagColor[]) => void;
}

export class FlagQuestionContent implements DialogContent {
  private question: TextContent;
  private colorButtons: ColorButton[];
  private menu?: ColorMenu;
  private answerButton: TextButton;

  constructor({ org, container, onAnswer }: FlagQuestionContentConfig) {
    this.question = new TextContent(`Millised on ${org.name} värvid?`, container);
    this.colorButtons = this.createColorButtons(container);
    this.answerButton = new TextButton({
      rect: { coord: coordAdd(container.coord, [container.size[0] - 60, container.size[1] - 14]), size: [60, 14] },
      text: "Vasta",
      onClick: () => onAnswer(this.getAnswer()),
    });
  }

  private createColorButtons(container: Rect): ColorButton[] {
    const buttonSize: Coord = [14, 14];
    const threeButtonsSize = coordAdd(coordMul(buttonSize, [3, 1]), [2, 0]);
    const buttonsRect = rectCenter({ coord: [0, 0], size: threeButtonsSize }, container);

    return [0, 1, 2].map((i) => {
      const buttonOffset = 15 * i;
      const coord = coordAdd(buttonsRect.coord, [buttonOffset, 0])
      const btn = new ColorButton({
        coord: coord,
        onClick: () => { this.showMenu(btn, coord); },
      });
      return btn;
    });
  }

  private getAnswer(): FlagColor[] {
    return this.colorButtons.map((button) => button.getColor()).filter(isDefined);
  }

  paint(screen: PixelScreen) {
    this.question.paint(screen);

    this.answerButton.paint(screen);

    // HACK: Render from right to left, so tooltips render on top of buttons
    reverse([...this.colorButtons]).forEach((btn) => {
      btn.paint(screen);
    });

    this.menu?.paint(screen);
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    if (this.menu?.handleGameEvent(event)) {
      return true;
    }
    this.colorButtons.forEach((btn) => {
      btn.handleGameEvent(event);
    });
    this.answerButton.handleGameEvent(event);
  }

  private showMenu(btn: ColorButton, coord: Coord) {
    this.menu = new ColorMenu({
      container: { coord, size: [16, 16] },
      onSelect: (color) => {
        btn.setColor(color);
        this.menu = undefined;
      }
    });
  }
}

function isDefined<T>(x: T | undefined): x is T {
  return Boolean(x);
}

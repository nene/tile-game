import { Coord, coordAdd, coordMul, Rect, rectCenter } from "../Coord";
import { GameEvent } from "../GameEvent";
import { Organization } from "../orgs/Organization";
import { PixelScreen } from "../PixelScreen";
import { ColorButton } from "../ui/ColorButton";
import { DialogContent } from "./DialogContent";
import { TextContent } from "./TextContent";

export class FlagQuestionContent implements DialogContent {
  private question: TextContent;
  private colorButtons: ColorButton[];

  constructor(private org: Organization, private container: Rect) {
    this.question = new TextContent(`Millised on ${org.name} värvid?`, container);
    this.colorButtons = this.createColorButtons();
  }

  private createColorButtons(): ColorButton[] {
    const buttonSize: Coord = [14, 14];
    const threeButtonsSize = coordAdd(coordMul(buttonSize, [3, 1]), [2, 0]);
    const buttonsRect = rectCenter({ coord: [0, 0], size: threeButtonsSize }, this.container);

    return [0, 1, 2].map((i) => {
      const buttonOffset = 15 * i;
      return new ColorButton({
        coord: coordAdd(buttonsRect.coord, [buttonOffset, 0]),
        color: this.org.flag[i],
        onClick: () => { },
      });
    });
  }

  paint(screen: PixelScreen) {
    this.question.paint(screen);
    this.colorButtons.forEach((btn) => {
      btn.paint(screen);
    });
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    this.colorButtons.forEach((btn) => {
      btn.handleGameEvent(event);
    });
    return undefined;
  }
}

import { reverse } from "lodash";
import { Coord, coordAdd, coordMul, Rect, rectCenter } from "../Coord";
import { GameEvent } from "../GameEvent";
import { Organization } from "../orgs/Organization";
import { PixelScreen } from "../PixelScreen";
import { ColorButton } from "../ui/ColorButton";
import { ColorMenu } from "../ui/ColorMenu";
import { DialogContent } from "./DialogContent";
import { TextContent } from "./TextContent";

export class FlagQuestionContent implements DialogContent {
  private question: TextContent;
  private colorButtons: ColorButton[];
  private menu?: ColorMenu;

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
      const coord = coordAdd(buttonsRect.coord, [buttonOffset, 0])
      const btn = new ColorButton({
        coord: coord,
        onClick: () => { this.showMenu(btn, coord); },
      });
      return btn;
    });
  }

  paint(screen: PixelScreen) {
    this.question.paint(screen);

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

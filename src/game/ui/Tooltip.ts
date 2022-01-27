import { debounce } from "lodash";
import { Coord, Rect, coordAdd, rectContains, rectGrow } from "../Coord";
import { PixelScreen, TextStyle } from "../PixelScreen";
import { SCREEN_RECT, SCREEN_SIZE } from "./screen-size";

const PADDING: Coord = [2, 1];

export class Tooltip {
  private mouseCoord?: Coord;
  private text?: string;

  hide() {
    this.mouseCoord = undefined;
    this.text = undefined;
    this.show();
  }

  show = debounce((mouseCoord?: Coord, text?: string) => {
    this.mouseCoord = mouseCoord;
    this.text = text;
  }, 500);

  paint(screen: PixelScreen) {
    if (!this.text || !this.mouseCoord) {
      return;
    }
    const style: TextStyle = { color: "#3e2821" };

    const rect = this.tooltipRect({
      coord: coordAdd(this.mouseCoord, [11, 2]),
      size: screen.measureText(this.text, style),
    });
    screen.drawRect(rect, "#c8b997");
    screen.drawText(this.text, coordAdd(rect.coord, PADDING), style);
  }

  private tooltipRect(textRect: Rect): Rect {
    const rect = rectGrow(textRect, PADDING);
    if (rectContains(SCREEN_RECT, rect)) {
      return rect;
    }
    return { coord: [rect.coord[0], SCREEN_SIZE[1] - rect.size[1]], size: rect.size };
  }
}

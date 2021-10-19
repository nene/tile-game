import { debounce } from "lodash";
import { Coord, coordAdd, rectGrow } from "../Coord";
import { PixelScreen, TextStyle } from "../PixelScreen";

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
    const textCoord = coordAdd(this.mouseCoord, [11, 2]);
    const textSize = screen.measureText(this.text, style);
    screen.drawRect(rectGrow({ coord: textCoord, size: textSize }, [2, 1]), "#c8b997");
    screen.drawText(this.text, textCoord, style);
  }
}

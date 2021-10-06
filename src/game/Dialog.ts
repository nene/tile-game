import { Bursh } from "./Bursh";
import { Coord, coordAdd, isCoordInRect, Rect, rectGrow } from "./Coord";
import { PixelScreen } from "./PixelScreen";
import { UI_SHADOW_COLOR } from "./ui/ui-utils";
import { Window } from "./ui/Window";

export class Dialog {
  private rect: Rect = { coord: [60, 100], size: [200, 100] };
  private window: Window;

  constructor(private person: Bursh, private text: string) {
    this.window = new Window({
      headline: {
        title: person.getName() + ":",
        description: "",
      },
      rect: this.rect,
    });
  }

  paint(screen: PixelScreen) {
    this.window.paint(screen);
    this.drawContent(this.text, screen);
  }

  private drawContent(text: string, screen: PixelScreen) {
    const start: Coord = rectGrow(this.window.contentAreaRect(), [-2, -2]).coord;
    const lineHeight = 12;
    text.split("\n").forEach((line, i) => {
      screen.drawText(line, coordAdd(start, [0, lineHeight * i]), { color: "#000", shadowColor: UI_SHADOW_COLOR });
    });
  }

  isCoordInView(coord: Coord): boolean {
    return isCoordInRect(coord, this.rect);
  }
}

import { Bursh } from "./Bursh";
import { Coord, coordAdd, isCoordInRect, Rect } from "./Coord";
import { PixelScreen } from "./PixelScreen";

export class Dialog {
  private rect: Rect = { coord: [59, 99], size: [202, 102] };

  constructor(private person: Bursh, private text: string) { }

  paint(screen: PixelScreen) {
    this.drawContainer(screen);
    this.drawTitle(this.person.getName() + ":", screen);
    this.drawContent(this.text, screen);
  }

  private drawContainer(screen: PixelScreen) {
    screen.drawRect(this.rect, "#3e2821", { fixed: true });
    screen.drawRect({ coord: [60, 100], size: [200, 100] }, "#c8b997", { fixed: true });
  }

  private drawTitle(text: string, screen: PixelScreen) {
    screen.drawRect({ coord: [60, 100], size: [200, 11] }, "#8f563b", { fixed: true });
    screen.drawText(text, "#3e2821", "#8f563b", [62, 109]);
  }

  private drawContent(text: string, screen: PixelScreen) {
    const start: Coord = [62, 121];
    const lineHeight = 9;
    text.split("\n").forEach((line, i) => {
      screen.drawText(line, "#8f563b", "#c8b997", coordAdd(start, [0, lineHeight * i]));
    });
  }

  isCoordInView(coord: Coord): boolean {
    return isCoordInRect(coord, this.rect);
  }
}

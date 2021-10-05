import { Bursh } from "./Bursh";
import { Coord, coordAdd, isCoordInRect, Rect, rectGrow } from "./Coord";
import { PixelScreen } from "./PixelScreen";

export class Dialog {
  private rect: Rect = { coord: [60, 100], size: [200, 100] };

  constructor(private person: Bursh, private text: string) { }

  paint(screen: PixelScreen) {
    this.drawContainer(screen);
    this.drawTitle(this.person.getName() + ":", screen);
    this.drawContent(this.text, screen);
  }

  private drawContainer(screen: PixelScreen) {
    screen.drawRect(rectGrow(this.rect, [1, 1]), "#3e2821");
    screen.drawRect(this.rect, "#c8b997");
  }

  private drawTitle(text: string, screen: PixelScreen) {
    const [, textHeight] = screen.measureText(text);
    screen.drawRect({ coord: this.rect.coord, size: [this.rect.size[0], textHeight + 4] }, "#8f563b");
    screen.drawText(text, coordAdd(this.rect.coord, [2, 2]), { color: "#3e2821" });
  }

  private drawContent(text: string, screen: PixelScreen) {
    const start: Coord = coordAdd(this.rect.coord, [2, 16]);
    const lineHeight = 12;
    text.split("\n").forEach((line, i) => {
      screen.drawText(line, coordAdd(start, [0, lineHeight * i]), { color: "#8f563b" });
    });
  }

  isCoordInView(coord: Coord): boolean {
    return isCoordInRect(coord, this.rect);
  }
}

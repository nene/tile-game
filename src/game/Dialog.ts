import { Bursh } from "./Bursh";
import { Coord, coordAdd, coordSub, isCoordInRect, Rect } from "./Coord";
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
    screen.drawRect({ coord: coordSub(this.rect.coord, [1, 1]), size: coordAdd(this.rect.size, [2, 2]) }, "#3e2821", { fixed: true });
    screen.drawRect(this.rect, "#c8b997", { fixed: true });
  }

  private drawTitle(text: string, screen: PixelScreen) {
    const [, textHeight] = screen.measureText(text);
    screen.drawRect({ coord: this.rect.coord, size: [this.rect.size[0], textHeight + 4] }, "#8f563b", { fixed: true });
    screen.drawText(text, "#3e2821", coordAdd(this.rect.coord, [2, 2]));
  }

  private drawContent(text: string, screen: PixelScreen) {
    const start: Coord = coordAdd(this.rect.coord, [2, 16]);
    const lineHeight = 12;
    text.split("\n").forEach((line, i) => {
      screen.drawText(line, "#8f563b", coordAdd(start, [0, lineHeight * i]));
    });
  }

  isCoordInView(coord: Coord): boolean {
    return isCoordInRect(coord, this.rect);
  }
}

import { Coord, coordAdd, isCoordInRect, Rect, rectGrow } from "./Coord";
import { Character } from "./npc/Character";
import { PixelScreen } from "./PixelScreen";
import { fitText } from "./ui/fitText";
import { UI_SHADOW_COLOR } from "./ui/ui-utils";
import { Window } from "./ui/Window";

export class Dialog {
  private rect: Rect = { coord: [60, 100], size: [200, 100] };
  private window: Window;

  constructor(private character: Character, private text: string) {
    this.window = new Window({
      headline: {
        title: character.name + ":",
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
    const style = { color: "#000", shadowColor: UI_SHADOW_COLOR };
    const { coord, size } = rectGrow(this.window.contentAreaRect(), [-2, -2]);
    const lineHeight = 12;
    fitText(screen, size, text, style).forEach((line, i) => {
      screen.drawText(line, coordAdd(coord, [0, lineHeight * i]),);
    });
  }

  isCoordInView(coord: Coord): boolean {
    return isCoordInRect(coord, this.rect);
  }
}

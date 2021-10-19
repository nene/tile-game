import { Coord, coordAdd, isCoordInRect, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { drawInset, drawUpset } from "./ui-utils";

interface TextButtonConfig {
  rect: Rect;
  text: string;
  onClick: () => void;
}

export class TextButton {
  rect: Rect;
  text: string;
  onClick: () => void;
  pressed = false;

  constructor({ rect, text, onClick }: TextButtonConfig) {
    this.rect = rect;
    this.text = text;
    this.onClick = onClick;
  }

  paint(screen: PixelScreen) {
    if (this.pressed) {
      this.drawText(screen, [1, 1]);
      drawInset(screen, this.rect);
    } else {
      this.drawText(screen, [0, 0]);
      drawUpset(screen, this.rect);
    }
  }

  private drawText(screen: PixelScreen, offset: Coord) {
    const cornerCoord = coordAdd(this.rect.coord, coordAdd([0, 3], offset));
    const halfWidth: Coord = [Math.floor(this.rect.size[0] / 2), 0];
    screen.drawText(this.text, coordAdd(cornerCoord, halfWidth), { align: "center" });
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    switch (event.type) {
      case "mousedown":
        if (isCoordInRect(event.coord, this.rect)) {
          this.pressed = true;
        }
        break;
      case "mouseup":
        this.pressed = false;
        break;
      case "click":
        if (isCoordInRect(event.coord, this.rect)) {
          this.onClick();
        }
        break;
    }
    return undefined;
  }
}

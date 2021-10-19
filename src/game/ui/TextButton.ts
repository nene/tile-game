import { Coord, coordAdd, isCoordInRect, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { drawInset, drawUpset } from "./ui-utils";

interface TextButtonConfig {
  rect: Rect;
  text: string;
  align?: "left" | "center";
  onClick: () => void;
}

export class TextButton {
  private rect: Rect;
  private text: string;
  private align: "left" | "center";
  private onClick: () => void;
  private pressed = false;

  constructor({ rect, text, align, onClick }: TextButtonConfig) {
    this.rect = rect;
    this.text = text;
    this.align = align ?? "center";
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
    screen.drawText(this.text, coordAdd(cornerCoord, this.textStartOffset()), { align: this.align });
  }

  private textStartOffset(): Coord {
    if (this.align === "center") {
      return [Math.floor(this.rect.size[0] / 2), 0];
    } else {
      return [3, 0];
    }
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

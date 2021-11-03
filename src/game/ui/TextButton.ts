import { Coord, coordAdd, isCoordInRect, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { Component } from "./Component";
import { drawInset, drawUpset, UI_BG_COLOR } from "./ui-utils";

interface TextButtonConfig {
  rect: Rect;
  text: string;
  align?: "left" | "center";
  size?: "medium" | "small";
  opaque?: boolean;
  onClick: () => void;
}

export class TextButton implements Component {
  private rect: Rect;
  private text: string;
  private align: "left" | "center";
  private onClick: () => void;
  private pressed = false;
  private opaque = false;
  private size: "medium" | "small";

  constructor({ rect, text, align, size, opaque, onClick }: TextButtonConfig) {
    this.rect = rect;
    this.text = text;
    this.align = align ?? "center";
    this.size = size ?? "medium";
    this.opaque = opaque ?? false;
    this.onClick = onClick;
  }

  paint(screen: PixelScreen) {
    if (this.opaque) {
      screen.drawRect(this.rect, UI_BG_COLOR);
    }
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
    screen.drawText(this.text, coordAdd(cornerCoord, this.textStartOffset()), { align: this.align, size: this.size });
  }

  private textStartOffset(): Coord {
    if (this.align === "center") {
      return [Math.floor(this.rect.size[0] / 2), this.textYOffset()];
    } else {
      return [3, this.textYOffset()];
    }
  }

  private textYOffset(): number {
    return this.size === "medium" ? 0 : 2;
  }

  getRect(): Rect {
    return this.rect;
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

import { Coord, coordAdd, isCoordInRect, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { FlagColor } from "../orgs/FlagColors";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { drawInset, drawUpset } from "./ui-utils";

interface ColorButtonConfig {
  coord: Coord;
  color?: FlagColor;
  onClick: () => void;
}

export class ColorButton {
  color?: FlagColor;
  rect: Rect;
  pressed = false;
  onClick: () => void;

  constructor({ coord, color, onClick }: ColorButtonConfig) {
    this.rect = { coord: coord, size: [14, 14] };
    this.color = color;
    this.onClick = onClick;
  }

  paint(screen: PixelScreen) {
    if (this.pressed) {
      this.drawContent(screen, [1, 1]);
      drawInset(screen, this.rect);
    } else {
      this.drawContent(screen, [0, 0]);
      drawUpset(screen, this.rect);
    }
  }

  private drawContent(screen: PixelScreen, offset: Coord) {
    if (this.color) {
      if (typeof this.color.code === "string") {
        screen.drawRect({
          coord: coordAdd(this.rect.coord, coordAdd([1, 1], offset)),
          size: [12, 12],
        }, this.color.code);
      } else {
        screen.drawSprite(
          SpriteLibrary.getSprite("flag-colors", this.color.code),
          coordAdd(this.rect.coord, coordAdd([1, 1], offset)),
        );
      }
    } else {
      screen.drawText("?", coordAdd(this.rect.coord, coordAdd([5, 4], offset)));
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

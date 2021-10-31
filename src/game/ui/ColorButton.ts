import { Coord, coordAdd, isCoordInRect, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { FlagColor } from "../orgs/FlagColors";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Component } from "./Component";
import { Tooltip } from "./Tooltip";
import { drawInset, drawUpset } from "./ui-utils";

interface ColorButtonConfig {
  coord: Coord;
  color?: FlagColor;
  onClick: () => void;
}

export class ColorButton implements Component {
  private color?: FlagColor;
  private rect: Rect;
  private pressed = false;
  private onClick: () => void;
  private tooltip = new Tooltip();

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
    this.tooltip.paint(screen);
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
      screen.drawText("?", coordAdd(this.rect.coord, coordAdd([4, 3], offset)));
    }
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    switch (event.type) {
      case "mousemove":
        this.tooltip.hide();
        if (isCoordInRect(event.coord, this.rect)) {
          this.tooltip.show(event.coord, this.color?.name);
        }
        break;
      case "mousedown":
        if (isCoordInRect(event.coord, this.rect)) {
          this.pressed = true;
        }
        break;
      case "mouseup":
        this.pressed = false;
        break;
      case "click":
        this.tooltip.hide();
        if (isCoordInRect(event.coord, this.rect)) {
          this.onClick();
        }
        break;
    }
    return undefined;
  }

  getColor(): FlagColor | undefined {
    return this.color;
  }

  setColor(color: FlagColor) {
    this.color = color;
  }
}

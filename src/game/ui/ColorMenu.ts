import { Coord, coordAdd, coordMul, isCoordInRect, Rect, rectCenter } from "../Coord";
import { GameEvent } from "../GameEvent";
import { FlagColor, allFlagColors } from "../orgs/FlagColors";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Tooltip } from "./Tooltip";
import { drawUpset, strokeRect, UI_BG_COLOR } from "./ui-utils";

interface ColorMenuConfig {
  container: Rect,
  onSelect: (color: FlagColor) => void;
}

export class ColorMenu {
  private rect: Rect;
  private onSelect: (color: FlagColor) => void;
  private colors = allFlagColors();
  private highlightedColor?: FlagColor;
  private tooltip = new Tooltip();

  constructor({ container, onSelect }: ColorMenuConfig) {
    this.rect = rectCenter({ coord: [0, 0], size: coordAdd(coordMul([13, 12], [this.colors.length, 1]), [3, 4]) }, container);
    this.onSelect = onSelect;
  }

  paint(screen: PixelScreen) {
    screen.drawRect(this.rect, UI_BG_COLOR);
    drawUpset(screen, this.rect);
    this.colors.forEach((color, i) => this.drawColorCell(screen, color, i));
    this.tooltip.paint(screen);
  }

  private drawColorCell(screen: PixelScreen, color: FlagColor, index: number) {
    const offset = coordAdd([2, 2], coordMul([13, 12], [index, 0]));
    const coord = coordAdd(this.rect.coord, offset);
    if (typeof color.code === "string") {
      screen.drawRect({ coord, size: [12, 12] }, color.code);
    } else {
      screen.drawSprite(SpriteLibrary.getSprite("flag-colors", color.code), coord);
    }
    if (color === this.highlightedColor) {
      strokeRect(screen, { coord, size: [12, 12] }, "#fff");
    }
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    switch (event.type) {
      case "mousemove":
        this.highlightedColor = this.getColorByCoord(event.coord);
        this.tooltip.hide();
        this.tooltip.show(event.coord, this.highlightedColor?.name);
        break;
      case "click":
        this.tooltip.hide();
        if (isCoordInRect(event.coord, this.rect)) {
          const color = this.getColorByCoord(event.coord);
          if (color) {
            this.onSelect(color);
          }
        }
        break;
    }
    return true;
  }

  private getColorByCoord(coord: Coord): FlagColor | undefined {
    if (isCoordInRect(coord, this.rect)) {
      return this.colors.find((color, i) => {
        const offset = coordAdd([2, 2], coordMul([13, 12], [i, 0]));
        return isCoordInRect(coord, { coord: coordAdd(this.rect.coord, offset), size: [12, 12] });
      });
    }
    return undefined;
  }
}

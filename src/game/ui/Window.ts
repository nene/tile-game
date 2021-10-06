import { Coord, coordAdd, coordSub, isCoordInRect, Rect, rectGrow } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { drawInset, drawUpset, UI_BG_COLOR, UI_SHADOW_COLOR } from "../ui/ui-utils";

interface WindowCfg {
  title: string;
  description: string;
  rect: Rect;
}

const TITLE_HEIGHT = 17;

export class Window {
  private title: string;
  private description: string;
  private rect: Rect;

  constructor({ title, description, rect }: WindowCfg) {
    this.title = title;
    this.description = description;
    this.rect = rect;
  }

  paint(screen: PixelScreen) {
    screen.drawRect(this.rect, UI_BG_COLOR);
    drawUpset(screen, this.rect);
    drawInset(screen, rectGrow(this.contentAreaRect(), [1, 1]));
    this.drawTitle(screen);
  }

  isCoordInView(coord: Coord): boolean {
    return isCoordInRect(coord, this.rect);
  }

  private drawTitle(screen: PixelScreen) {
    screen.drawText(this.title, coordAdd(this.rect.coord, [3, 2]), { shadowColor: UI_SHADOW_COLOR });
    screen.drawText(this.description, coordAdd(this.rect.coord, [3, 12]), { size: "small" });
  }

  contentAreaRect(): Rect {
    const { coord, size } = rectGrow(this.rect, [-3, -3]);
    return { coord: coordAdd(coord, [0, TITLE_HEIGHT]), size: coordSub(size, [0, TITLE_HEIGHT]) };
  }
}


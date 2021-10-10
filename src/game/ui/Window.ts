import { Coord, coordAdd, coordSub, Rect, rectCenter, rectGrow } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { drawInset, drawUpset, UI_BG_COLOR, UI_SHADOW_COLOR } from "../ui/ui-utils";

interface WindowCfg {
  headline: Headline;
  coord?: Coord;
  size: Coord;
}

export interface Headline {
  title: string;
  description: string;
}

const TITLE_HEIGHT = 17;

export class Window {
  private headline: Headline;
  private rect: Rect;

  constructor({ headline, coord, size }: WindowCfg) {
    this.headline = headline;
    this.rect = coord ? { coord, size } : rectCenter({ coord: [0, 0], size }, { coord: [0, 0], size: [320, 200] });
  }

  paint(screen: PixelScreen) {
    screen.drawRect(this.rect, UI_BG_COLOR);
    drawUpset(screen, this.rect);
    drawInset(screen, rectGrow(this.contentAreaRect(), [1, 1]));
    this.drawHeadline(screen);
  }

  getRect(): Rect {
    return this.rect;
  }

  private drawHeadline(screen: PixelScreen) {
    screen.drawText(this.headline.title, coordAdd(this.rect.coord, [3, 2]), { shadowColor: UI_SHADOW_COLOR });
    screen.drawText(this.headline.description, coordAdd(this.rect.coord, [3, 12]), { size: "small" });
  }

  contentAreaRect(): Rect {
    const { coord, size } = rectGrow(this.rect, [-3, -3]);
    return { coord: coordAdd(coord, [0, TITLE_HEIGHT]), size: coordSub(size, [0, TITLE_HEIGHT]) };
  }
}


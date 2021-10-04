import { Coord, coordAdd, coordMul, coordSub, Rect, rectGrow, rectOverlaps, rectTranslate } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { ScrollBar } from "./ScrollBar";

interface ScrollViewCfg<T> {
  items: T[];
  rect: Rect,
  itemSize: Coord;
  itemSeparator: number;
  margin: Coord;
  bgColor: string;
  renderer: (screen: PixelScreen, rect: Rect, item: T) => void;
}

export class ScrollView<T> {
  private scrollBar: ScrollBar;

  constructor(private cfg: ScrollViewCfg<T>) {
    this.scrollBar = new ScrollBar(this.scrollBarRect());
  }

  handleMouseEvent(type: string, coord: Coord) {
    this.scrollBar.handleMouseEvent(type, coord);
  }

  paint(screen: PixelScreen) {
    screen.drawRect(this.cfg.rect, this.cfg.bgColor);

    this.scrollBar.paint(screen);

    const viewRect = this.viewRect();
    const itemRect: Rect = { coord: coordSub(viewRect.coord, this.scrollCoord()), size: this.cfg.itemSize };

    screen.withClippedRegion(viewRect, () => {
      this.cfg.items.forEach((item, i) => {
        const offset: Coord = [0, i * this.fullItemHeight()];
        const rect = rectTranslate(itemRect, offset);
        // Only draw the item when it's in visible area
        if (rectOverlaps(rect, viewRect)) {
          this.cfg.renderer(screen, rect, item);
        }
      });
    });
  }

  private scrollCoord(): Coord {
    const fullHeight = this.fullItemHeight() * this.cfg.items.length - this.cfg.itemSeparator;
    const viewHeight = this.viewRect().size[1];
    const scrollHeight = Math.max(0, fullHeight - viewHeight);
    return [0, Math.floor(scrollHeight * this.scrollBar.scrollPosition())];
  }

  private viewRect() {
    return rectGrow(this.cfg.rect, coordMul(this.cfg.margin, [-1, -1]));
  }

  private fullItemHeight() {
    return this.cfg.itemSize[1] + this.cfg.itemSeparator;
  }

  private scrollBarRect(): Rect {
    const { coord, size } = this.cfg.rect;
    return { coord: coordAdd(coord, [size[0] - 8, 0]), size: [8, size[1]] };
  }
}

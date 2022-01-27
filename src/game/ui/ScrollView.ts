import { Coord, coordAdd, coordMul, coordSub, isCoordInRect, Rect, rectGrow, rectOverlaps, rectTranslate } from "../Coord";
import { GameEvent } from "../GameEvent";
import { PixelScreen } from "../PixelScreen";
import { Component } from "./Component";
import { ScrollBar } from "./ScrollBar";

interface ScrollViewCfg<T> {
  items: T[];
  rect: Rect,
  itemSize: Coord;
  itemSeparator: number;
  margin: Coord;
  bgColor: string;
  renderer: (screen: PixelScreen, rect: Rect, item: T, highlighted: boolean) => void;
}

export class ScrollView<T> implements Component {
  private scrollBar: ScrollBar;
  private highlightedIndex = -1;

  constructor(private cfg: ScrollViewCfg<T>) {
    this.scrollBar = new ScrollBar({
      rect: this.scrollBarRect(),
      scrollArea: this.cfg.rect,
    });
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    return this.scrollBar.handleGameEvent(event) ||
      this.highlightHoveredItem(event);
  }

  highlightHoveredItem({ type, coord }: GameEvent): boolean | undefined {
    switch (type) {
      case "mousemove":
        this.highlightedIndex = this.getItemIndexAtCoord(coord);
        return undefined;
      default:
        if (!isCoordInRect(coord, this.viewRect())) {
          this.highlightedIndex = -1;
        }
        return undefined;
    }
  }

  getItemIndexAtCoord(coord: Coord) {
    if (!isCoordInRect(coord, this.viewRect())) {
      return -1;
    }

    return this.cfg.items.findIndex((item, i) => isCoordInRect(coord, this.itemRect(i)));
  }

  paint(screen: PixelScreen) {
    screen.getOffscreen().drawRect(this.cfg.rect, this.cfg.bgColor);

    this.cfg.items.forEach((item, i) => {
      const rect = this.itemRect(i);
      // Only draw the item when it's in visible area
      if (rectOverlaps(rect, this.cfg.rect)) {
        this.cfg.renderer(screen.getOffscreen(), rect, item, this.highlightedIndex === i);
      }
    });

    screen.copyFromOffscreen(this.cfg.rect, this.cfg.rect.coord);

    this.scrollBar.paint(screen);
  }

  private scrollCoord(): Coord {
    const fullHeight = this.fullItemHeight() * this.cfg.items.length - this.cfg.itemSeparator;
    const viewHeight = this.viewRect().size[1];
    const scrollHeight = Math.max(0, fullHeight - viewHeight);
    return [0, Math.floor(scrollHeight * this.scrollBar.scrollPosition())];
  }

  private itemRect(i: number): Rect {
    const itemRect: Rect = { coord: coordSub(this.viewRect().coord, this.scrollCoord()), size: this.cfg.itemSize };
    const offset: Coord = [0, i * this.fullItemHeight()];
    return rectTranslate(itemRect, offset);
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

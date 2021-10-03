import { coordAdd, coordSub, Rect, rectGrow, rectTranslate } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { drawInset, drawUpset, UI_BG_COLOR, UI_SHADOW_COLOR } from "../ui-utils";
import { ScrollBar } from "./ScrollBar";
import { ShopListView } from "./ShopListView";

export class ShopView {
  private rect: Rect = { coord: [64, 16], size: [192, 108] };
  private titleHeight = 17;
  private shopListView: ShopListView;
  private scrollBar: ScrollBar;

  constructor() {
    this.shopListView = new ShopListView(rectTranslate(rectGrow(this.shopListRect(), [-2.5, -2]), [-0.5, 0]));
    this.scrollBar = new ScrollBar(this.scrollBarRect());
  }

  paint(screen: PixelScreen) {
    screen.withFixedCoords(() => {
      screen.drawRect(this.rect, UI_BG_COLOR);
      drawUpset(screen, this.rect);
      this.drawTitle(screen);

      drawInset(screen, this.shopListRect());
      screen.drawRect(rectGrow(this.shopListRect(), [-1, -1]), "#000");

      this.shopListView.paint(screen);

      this.scrollBar.paint(screen);
    });
  }

  private drawTitle(screen: PixelScreen) {
    screen.drawText("Külmkapp", coordAdd(this.rect.coord, [3, 2]), { shadowColor: UI_SHADOW_COLOR });
    screen.drawText("Kui märjukest soovid, siis ka õllekassasse münt poeta.", coordAdd(this.rect.coord, [3, 12]), { size: "small" });
  }

  private shopListRect(): Rect {
    const { coord, size } = rectGrow(this.rect, [-2, -2]);
    return { coord: coordAdd(coord, [0, this.titleHeight]), size: coordSub(size, [0, this.titleHeight]) };
  }

  private scrollBarRect(): Rect {
    const { coord, size } = this.shopListRect();
    return { coord: coordAdd(coord, [size[0] - 9, 1]), size: [8, size[1] - 2] };
  }
}


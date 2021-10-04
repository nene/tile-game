import { Coord, coordAdd, coordSub, Rect, rectGrow } from "../Coord";
import { Beer, getBeer } from "../items/Beer";
import { PixelScreen } from "../PixelScreen";
import { drawInset, drawUpset, UI_BG_COLOR, UI_SHADOW_COLOR } from "../ui-utils";
import { ScrollView } from "./ScrollView";
import { ShopItemRenderer } from "./ShopItemRenderer";

export class ShopView {
  private rect: Rect = { coord: [64, 16], size: [192, 108] };
  private titleHeight = 17;
  private shopItemRenderer: ShopItemRenderer;
  private scrollView: ScrollView<Beer>;

  constructor() {
    this.shopItemRenderer = new ShopItemRenderer();
    this.scrollView = new ScrollView({
      items: [
        getBeer("alexander"),
        getBeer("pilsner"),
        getBeer("tommu-hiid"),
        getBeer("limonaad"),
        getBeer("bock"),
        getBeer("porter"),
        getBeer("special"),
        getBeer("kriek"),
      ],
      rect: rectGrow(this.shopListRect(), [-1, -1]),
      itemSize: [this.rect.size[0] - 16, 20],
      itemSeparator: 1,
      margin: [1, 1],
      bgColor: "#000",
      renderer: this.shopItemRenderer.render.bind(this.shopItemRenderer),
    });
  }

  handleMouseEvent(type: string, coord: Coord) {
    this.scrollView.handleMouseEvent(type, coord);
  }

  paint(screen: PixelScreen) {
    screen.withFixedCoords(() => {
      this.drawBackground(screen);
      this.drawTitle(screen);
      this.scrollView.paint(screen);
    });
  }

  private drawBackground(screen: PixelScreen) {
    screen.drawRect(this.rect, UI_BG_COLOR);
    drawUpset(screen, this.rect);
    drawInset(screen, this.shopListRect());
  }

  private drawTitle(screen: PixelScreen) {
    screen.drawText("Külmkapp", coordAdd(this.rect.coord, [3, 2]), { shadowColor: UI_SHADOW_COLOR });
    screen.drawText("Kui märjukest soovid, siis ka õllekassasse münt poeta.", coordAdd(this.rect.coord, [3, 12]), { size: "small" });
  }

  private shopListRect(): Rect {
    const { coord, size } = rectGrow(this.rect, [-2, -2]);
    return { coord: coordAdd(coord, [0, this.titleHeight]), size: coordSub(size, [0, this.titleHeight]) };
  }
}


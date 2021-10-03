import { Coord, coordAdd, Rect, rectTranslate } from "../Coord";
import { getBeer } from "../items/Beer";
import { BeerBottle } from "../items/BeerBottle";
import { GameItem } from "../items/GameItem";
import { PixelScreen } from "../PixelScreen";
import { UI_BG_COLOR, UI_HIGHLIGHT_COLOR, UI_SHADOW_COLOR } from "../ui-utils";

const ITEM_HEIGHT = 21;

export class ShopListView {
  private items: GameItem[];

  constructor(private rect: Rect) {
    this.items = [
      new BeerBottle(getBeer("alexander")),
      new BeerBottle(getBeer("pilsner")),
      new BeerBottle(getBeer("tommu-hiid")),
      new BeerBottle(getBeer("limonaad")),
    ];
  }

  paint(screen: PixelScreen) {
    const itemRect: Rect = { coord: this.rect.coord, size: [this.rect.size[0] - 7, 20] };
    const iconRect: Rect = { coord: coordAdd(this.rect.coord, [2, 2]), size: [16, 16] };
    const nameCoord: Coord = coordAdd(iconRect.coord, [18, -1]);
    const descriptionCoord: Coord = coordAdd(iconRect.coord, [18, 9]);
    this.items.forEach((item, i) => {
      const offset: Coord = [0, i * ITEM_HEIGHT];
      screen.drawRect(rectTranslate(itemRect, offset), UI_BG_COLOR);
      screen.drawRect(rectTranslate(iconRect, offset), UI_HIGHLIGHT_COLOR);
      screen.drawSprite(item.getSprite(), coordAdd(iconRect.coord, offset));
      screen.drawText(item.getName(), coordAdd(nameCoord, offset), { shadowColor: UI_SHADOW_COLOR });
      screen.drawText(item.getName(), coordAdd(descriptionCoord, offset), { size: "small" });
    });
  }
}

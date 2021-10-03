import { Coord, coordAdd, Rect, rectTranslate } from "../Coord";
import { Beer, getBeer } from "../items/Beer";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { SpriteSheet } from "../SpriteSheet";
import { UI_BG_COLOR, UI_HIGHLIGHT_COLOR, UI_SHADOW_COLOR } from "../ui-utils";

const ITEM_HEIGHT = 21;

export class ShopListView {
  private items: Beer[];
  private beerSprites: SpriteSheet;
  private goldSprite: Sprite;

  constructor(private rect: Rect) {
    this.items = [
      getBeer("alexander"),
      getBeer("pilsner"),
      getBeer("tommu-hiid"),
      getBeer("limonaad"),
    ];
    this.beerSprites = SpriteLibrary.get("bottle");
    this.goldSprite = SpriteLibrary.get("gold").getSprite([0, 0]);
  }

  paint(screen: PixelScreen) {
    const itemRect: Rect = { coord: this.rect.coord, size: [this.rect.size[0] - 7, 20] };

    this.items.forEach((item, i) => {
      const offset: Coord = [0, i * ITEM_HEIGHT];
      this.drawItem(screen, rectTranslate(itemRect, offset), item);
    });
  }

  private drawItem(screen: PixelScreen, rect: Rect, item: Beer) {
    const iconRect: Rect = { coord: coordAdd(rect.coord, [2, 2]), size: [16, 16] };
    const goldCoord: Coord = coordAdd(rect.coord, [rect.size[0] - 10, 2]);

    screen.drawRect(rect, UI_BG_COLOR);
    screen.drawRect(iconRect, UI_HIGHLIGHT_COLOR);
    screen.drawSprite(this.beerSprites.getSprite([1, item.spriteIndex]), iconRect.coord);
    screen.drawText(item.name, coordAdd(iconRect.coord, [18, -1]), { shadowColor: UI_SHADOW_COLOR });
    screen.drawText(item.description, coordAdd(iconRect.coord, [18, 9]), { size: "small" });
    screen.drawSprite(this.goldSprite, goldCoord);
    screen.drawText(item.price + "", coordAdd(goldCoord, [-2, -1]), { align: "right", shadowColor: UI_SHADOW_COLOR });
  }
}

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
    const iconRect: Rect = { coord: coordAdd(this.rect.coord, [2, 2]), size: [16, 16] };
    const nameCoord: Coord = coordAdd(iconRect.coord, [18, -1]);
    const descriptionCoord: Coord = coordAdd(iconRect.coord, [18, 9]);
    const goldCoord: Coord = coordAdd(itemRect.coord, [itemRect.size[0] - 10, 2]);
    const priceCoord: Coord = coordAdd(goldCoord, [-2, -1]);
    this.items.forEach((item, i) => {
      const offset: Coord = [0, i * ITEM_HEIGHT];
      screen.drawRect(rectTranslate(itemRect, offset), UI_BG_COLOR);
      screen.drawRect(rectTranslate(iconRect, offset), UI_HIGHLIGHT_COLOR);
      screen.drawSprite(this.beerSprites.getSprite([1, item.spriteIndex]), coordAdd(iconRect.coord, offset));
      screen.drawText(item.name, coordAdd(nameCoord, offset), { shadowColor: UI_SHADOW_COLOR });
      screen.drawText(item.description, coordAdd(descriptionCoord, offset), { size: "small" });
      screen.drawSprite(this.goldSprite, coordAdd(goldCoord, offset));
      screen.drawText(item.price + "", coordAdd(priceCoord, offset), { align: "right", shadowColor: UI_SHADOW_COLOR });
    });
  }
}

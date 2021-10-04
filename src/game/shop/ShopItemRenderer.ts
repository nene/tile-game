import { Coord, coordAdd, Rect } from "../Coord";
import { Beer } from "../items/Beer";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { SpriteSheet } from "../SpriteSheet";
import { UI_BG_COLOR, UI_HIGHLIGHT_COLOR, UI_SHADOW_COLOR } from "../ui-utils";

export class ShopItemRenderer {
  private beerSprites: SpriteSheet;
  private goldSprite: Sprite;

  constructor() {
    this.beerSprites = SpriteLibrary.get("bottle");
    this.goldSprite = SpriteLibrary.get("gold").getSprite([0, 0]);
  }

  render(screen: PixelScreen, rect: Rect, item: Beer) {
    const iconRect: Rect = { coord: coordAdd(rect.coord, [2, 2]), size: [16, 16] };
    const nameCoord = coordAdd(iconRect.coord, [18, -1]);
    const [nameLen] = screen.measureText(item.name);
    const goldCoord: Coord = coordAdd(rect.coord, [rect.size[0] - 10, 2]);

    screen.drawRect(rect, UI_BG_COLOR);
    screen.drawRect(iconRect, UI_HIGHLIGHT_COLOR);
    screen.drawSprite(this.beerSprites.getSprite([1, item.spriteIndex]), iconRect.coord);
    screen.drawText(item.name, nameCoord, { shadowColor: UI_SHADOW_COLOR });
    screen.drawText(item.alcohol + "%", coordAdd(nameCoord, [nameLen + 3, 3.5]), { size: "small", color: "#481a12" });
    screen.drawText(item.description, coordAdd(iconRect.coord, [18, 9]), { size: "small" });
    screen.drawSprite(this.goldSprite, goldCoord);
    screen.drawText(item.price, coordAdd(goldCoord, [-2, -1]), { align: "right", shadowColor: UI_SHADOW_COLOR });
  }
}

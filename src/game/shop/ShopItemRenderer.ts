import { Coord, coordAdd, Rect } from "../Coord";
import { BeerBottle } from "../items/BeerBottle";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../Sprite";
import { SpriteLibrary } from "../SpriteLibrary";
import { SpriteSheet } from "../SpriteSheet";
import { UI_BG_COLOR, UI_HIGHLIGHT_COLOR, UI_SHADOW_COLOR } from "../ui-utils";

const SHOP_ITEM_HIGHLIGHT_COLOR = "#cab59e";

export class ShopItemRenderer {
  private beerSprites: SpriteSheet;
  private goldSprite: Sprite;

  constructor() {
    this.beerSprites = SpriteLibrary.get("bottle");
    this.goldSprite = SpriteLibrary.get("gold").getSprite([0, 0]);
  }

  render(screen: PixelScreen, rect: Rect, item: BeerBottle, highlighted: boolean) {
    const beer = item.getBeer();

    const iconRect: Rect = { coord: coordAdd(rect.coord, [2, 2]), size: [16, 16] };
    const nameCoord = coordAdd(iconRect.coord, [18, -1]);
    const [nameLen] = screen.measureText(beer.name);
    const goldCoord: Coord = coordAdd(rect.coord, [rect.size[0] - 10, 2]);

    screen.drawRect(rect, UI_BG_COLOR);
    screen.drawRect(iconRect, UI_HIGHLIGHT_COLOR);
    screen.drawSprite(this.beerSprites.getSprite([1, beer.spriteIndex]), iconRect.coord);
    screen.drawText(beer.name, nameCoord, { shadowColor: UI_SHADOW_COLOR });
    screen.drawText(beer.alcohol + "%", coordAdd(nameCoord, [nameLen + 3, 3.5]), { size: "small", color: "#481a12" });
    screen.drawText(beer.description, coordAdd(iconRect.coord, [18, 9]), { size: "small" });
    screen.drawSprite(this.goldSprite, goldCoord);
    screen.drawText(beer.price, coordAdd(goldCoord, [-2, -1]), { align: "right", shadowColor: UI_SHADOW_COLOR });

    if (highlighted) {
      this.strokeRect(screen, rect, SHOP_ITEM_HIGHLIGHT_COLOR);
    }
  }

  private strokeRect(screen: PixelScreen, { coord, size }: Rect, color: string) {
    screen.drawRect({ coord, size: [size[0], 1] }, color);
    screen.drawRect({ coord, size: [1, size[1]] }, color);
    screen.drawRect({ coord: [coord[0] + size[0] - 1, coord[1]], size: [1, size[1]] }, color);
    screen.drawRect({ coord: [coord[0], coord[1] + size[1] - 1], size: [size[0], 1] }, color);
  }
}

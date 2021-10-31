import { Coord, coordAdd, Rect } from "../Coord";
import { BeerBottle } from "../items/BeerBottle";
import { SellableGameItem } from "../items/GameItem";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { strokeRect, UI_BG_COLOR, UI_HIGHLIGHT_COLOR, UI_MENU_ITEM_HIGHLIGHT_COLOR, UI_SHADOW_COLOR } from "../ui/ui-utils";
import { Wallet } from "../attributes/Wallet";

export class ShopItemRenderer {
  private beerSprites: SpriteSheet;
  private goldSprite: Sprite;

  constructor(private wallet: Wallet) {
    this.beerSprites = SpriteLibrary.get("bottle");
    this.goldSprite = SpriteLibrary.getSprite("gold");
  }

  render(screen: PixelScreen, rect: Rect, item: SellableGameItem, highlighted: boolean) {
    const iconRect: Rect = { coord: coordAdd(rect.coord, [2, 2]), size: [16, 16] };
    const nameCoord = coordAdd(iconRect.coord, [18, -1]);
    const [nameLen] = screen.measureText(item.getName());
    const goldCoord: Coord = coordAdd(rect.coord, [rect.size[0] - 10, 2]);
    const textStyle = this.getTextStyle(item.getPrice());

    screen.drawRect(rect, UI_BG_COLOR);
    screen.drawRect(iconRect, UI_HIGHLIGHT_COLOR);
    screen.drawSprite(item.getSprite(), iconRect.coord);
    screen.drawText(item.getName(), nameCoord, textStyle);
    if (item instanceof BeerBottle) {
      screen.drawText(item.getDrink().alcohol + "%", coordAdd(nameCoord, [nameLen + 3, 3.5]), { size: "small", color: "#481a12" });
    }
    screen.drawText(item.getDescription(), coordAdd(iconRect.coord, [18, 9]), { size: "small", color: textStyle.color });
    screen.drawSprite(this.goldSprite, goldCoord);
    screen.drawText(item.getPrice(), coordAdd(goldCoord, [-2, -1]), { align: "right", ...textStyle });

    if (highlighted && this.canAfford(item.getPrice())) {
      strokeRect(screen, rect, UI_MENU_ITEM_HIGHLIGHT_COLOR);
    }
  }

  private getTextStyle(price: number) {
    if (this.canAfford(price)) {
      return { color: "#000", shadowColor: UI_SHADOW_COLOR };
    } else {
      return { color: "#74593b", shadowColor: "#a4744f" };
    }
  }

  private canAfford(price: number) {
    return price <= this.wallet.getMoney();
  }
}

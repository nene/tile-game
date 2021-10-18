import { Coord, Rect } from "../Coord";
import { GameEvent } from "../GameEvent";
import { BeerBottle } from "../items/BeerBottle";
import { PixelScreen } from "../PixelScreen";
import { ScrollView } from "../ui/ScrollView";
import { Shop } from "./Shop";
import { ShopItemRenderer } from "./ShopItemRenderer";
import { InventoryView } from "./InventoryView";
import { Wallet } from "../Wallet";
import { Headline, Window } from "../ui/Window";

interface ShopViewConfig {
  shop: Shop;
  wallet: Wallet;
  headline: Headline;
  onClose: () => void;
}

export class ShopView implements InventoryView {
  private shopItemRenderer: ShopItemRenderer;
  private scrollView: ScrollView<BeerBottle>;
  private window: Window;

  constructor({ shop, wallet, headline, onClose }: ShopViewConfig) {
    this.window = new Window({
      size: [192, 129],
      headline,
      onClose,
    });

    const contentRect = this.window.contentAreaRect();

    this.shopItemRenderer = new ShopItemRenderer(wallet);
    this.scrollView = new ScrollView({
      items: shop.allItems(),
      rect: contentRect,
      itemSize: [contentRect.size[0] - 10, 20],
      itemSeparator: 1,
      margin: [1, 1],
      bgColor: "#000",
      renderer: this.shopItemRenderer.render.bind(this.shopItemRenderer),
    });
  }

  handleGameEvent(event: GameEvent): boolean | undefined {
    this.window.handleGameEvent(event);
    return this.scrollView.handleGameEvent(event);
  }

  paint(screen: PixelScreen) {
    this.window.paint(screen);
    this.scrollView.paint(screen);
  }

  getRect(): Rect {
    return this.window.getRect();
  }

  getSlotIndexAtCoord(coord: Coord): number {
    return this.scrollView.getItemIndexAtCoord(coord);
  }
}


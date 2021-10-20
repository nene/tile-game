import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { Shop } from "../inventory/Shop";
import { ShopView } from "../inventory/ShopView";
import { getBeer } from "../items/Beer";
import { BeerBottle } from "../items/BeerBottle";
import { BottleOpener, BottleOpenerType } from "../items/BottleOpener";
import { PixelScreen } from "../PixelScreen";
import { SoundLibrary } from "../sounds/SoundLibrary";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";

export class Fridge implements GameObject {
  private sprite: Sprite;
  private shop: Shop;

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.getSprite("fridge");
    this.shop = new Shop([
      new BeerBottle(getBeer("alexander")),
      new BeerBottle(getBeer("pilsner")),
      new BeerBottle(getBeer("tommu-hiid")),
      new BeerBottle(getBeer("limonaad")),
      new BeerBottle(getBeer("bock")),
      new BeerBottle(getBeer("porter")),
      new BeerBottle(getBeer("special")),
      new BeerBottle(getBeer("kriek")),
      new BeerBottle(getBeer("heineken")),
      new BeerBottle(getBeer("paulaner")),
      new BottleOpener(BottleOpenerType.simple),
    ]);
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.sprite, this.coord);
  }

  zIndex() {
    return this.coord[1];
  }

  getCoord() {
    return this.coord;
  }

  isSolid() {
    return true;
  }

  hitBox(): Rect {
    return { coord: [0, -32], size: [16, 45] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [16, 13] };
  }

  isInteractable() {
    return true;
  }

  onInteract(ui: UiController) {
    SoundLibrary.play('opening-fridge-door');
    ui.showInventory(this.shop, new ShopView({
      shop: this.shop,
      wallet: ui.getAttributes().wallet,
      headline: {
        title: "Külmkapp",
        description: "Kui märjukest võtad, siis ka õllekassasse mündi paned.",
      },
      onClose: () => ui.hideInventory(),
    }));
  }
}

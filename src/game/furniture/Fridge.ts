import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { Shop } from "../inventory/Shop";
import { ShopView } from "../inventory/ShopView";
import { getDrink } from "../items/Drink";
import { BeerBottle } from "../items/BeerBottle";
import { PixelScreen } from "../PixelScreen";
import { SoundLibrary } from "../sounds/SoundLibrary";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";
import { SimpleBottleOpener } from "../items/SimpleBottleOpener";

export class Fridge implements GameObject {
  private sprite: Sprite;
  private shop: Shop;

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.getSprite("fridge");
    this.shop = new Shop([
      new BeerBottle(getDrink("alexander")),
      new BeerBottle(getDrink("pilsner")),
      new BeerBottle(getDrink("tommu-hiid")),
      new BeerBottle(getDrink("limonaad")),
      new BeerBottle(getDrink("bock")),
      new BeerBottle(getDrink("porter")),
      new BeerBottle(getDrink("special")),
      new BeerBottle(getDrink("kriek")),
      new BeerBottle(getDrink("heineken")),
      new BeerBottle(getDrink("paulaner")),
      new SimpleBottleOpener(),
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
    ui.showInventory(new ShopView({
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

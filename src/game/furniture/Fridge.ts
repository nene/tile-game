import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { Shop } from "../inventory/Shop";
import { ShopView } from "../inventory/ShopView";
import { getDrink } from "../items/Drink";
import { BeerBottle } from "../items/BeerBottle";
import { PixelScreen } from "../PixelScreen";
import { SoundLibrary } from "../sounds/SoundLibrary";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiApi } from "../UiController";
import { SimpleBottleOpener } from "../items/SimpleBottleOpener";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { readAsepriteAnimation } from "../sprites/readAsepriteAnimation";
import fridgeJson from "../sprites/data/fridge.json";

export class Fridge implements GameObject {
  private animation: SpriteAnimation;
  private shop: Shop;

  constructor(private coord: Coord) {
    this.animation = new SpriteAnimation(SpriteLibrary.get("fridge"), {
      frames: readAsepriteAnimation("humming", fridgeJson),
    });
    this.shop = new Shop([
      new BeerBottle(getDrink("limonaad")),
      new BeerBottle(getDrink("kriek")),
      new BeerBottle(getDrink("pilsner")),
      new BeerBottle(getDrink("heineken")),
      new BeerBottle(getDrink("tommu-hiid")),
      new BeerBottle(getDrink("alexander")),
      new BeerBottle(getDrink("special")),
      new BeerBottle(getDrink("paulaner")),
      new BeerBottle(getDrink("porter")),
      new BeerBottle(getDrink("bock")),
      new SimpleBottleOpener(),
    ]);
  }

  tick() {
    this.animation.tick();
  }

  paint(screen: PixelScreen) {
    screen.drawSprites(this.animation.getSprites(), this.coord);
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

  interact(ui: UiApi) {
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

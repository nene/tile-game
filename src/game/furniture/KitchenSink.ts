import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { BeerGlass, DrinkLevel } from "../items/BeerGlass";
import { getDrink } from "../items/Drink";
import { GameItem } from "../items/GameItem";
import { PixelScreen } from "../PixelScreen";
import { SoundLibrary } from "../sounds/SoundLibrary";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { UiController } from "../UiController";

export class KitchenSink implements GameObject {
  constructor(private coord: Coord) {
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(SpriteLibrary.getSprite('kitchen-sink'), this.coord);
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
    return { coord: [0, -27], size: [16, 43] };
  }

  boundingBox(): Rect {
    return { coord: [0, -16], size: [16, 32] };
  }

  isInteractable(ui: UiController) {
    return this.isEmptyGlass(ui.getSelectedItem());
  }

  onInteract(ui: UiController) {
    const glass = ui.getSelectedItem();
    if (!this.isEmptyGlass(glass)) {
      return;
    }

    SoundLibrary.play("pouring-water");
    glass.fill(getDrink("water"), DrinkLevel.full);
  }

  private isEmptyGlass(item: GameItem | undefined): item is BeerGlass {
    return item instanceof BeerGlass && item.getLevel() === DrinkLevel.empty;
  }
}

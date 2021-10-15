import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";

export class Sofa implements GameObject {
  private sprite: Sprite;

  constructor(private coord: Coord) {
    this.sprite = SpriteLibrary.getSprite("sofa");
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
    return { coord: [0, -15], size: [48, 26] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [48, 11] };
  }

  isInteractable() {
    return false;
  }

  onInteract() { }
}

import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";

export class Painting implements GameObject {
  private sprite: Sprite;

  constructor(private coord: Coord, name: SpriteName) {
    this.sprite = SpriteLibrary.get(name).getSprite([0, 0]);
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.sprite, this.coord);
  }

  getCoord() {
    return this.coord;
  }

  zIndex() {
    return this.coord[1];
  }

  isSolid() {
    return false;
  }

  hitBox(): Rect {
    return { coord: [0, 0], size: [0, 0] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [0, 0] };
  }

  isInteractable() {
    return false;
  }

  onInteract() { }
}

import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";

export class Lamp implements GameObject {
  constructor(private coord: Coord, private spriteName: SpriteName, private turnedOn: boolean = false) {
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(SpriteLibrary.getSprite(this.spriteName, [this.turnedOn ? 1 : 0, 0]), this.coord);
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

  interact() { }

  toggle(turnedOn: boolean) {
    this.turnedOn = turnedOn;
  }
}

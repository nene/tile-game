import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Lamp } from "./Lamp";

export class LightSwitch implements GameObject {
  constructor(private coord: Coord, private lamps: Lamp[], private turnedOn: boolean = false) {
    this.lamps.forEach((lamp) => lamp.toggle(this.turnedOn));
  }

  tick() { }

  paint(screen: PixelScreen) {
    screen.drawSprite(SpriteLibrary.getSprite("light-switch", [this.turnedOn ? 1 : 0, 0]), this.coord);
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
    return { coord: [2, -21], size: [13, 10] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [0, 0] };
  }

  isInteractable() {
    return true;
  }

  interact() {
    this.turnedOn = !this.turnedOn;
    this.lamps.forEach((lamp) => lamp.toggle(this.turnedOn));
  }
}

import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteAnimation } from "../sprites/SpriteAnimation";

export class Fireplace implements GameObject {
  private animation: SpriteAnimation;

  constructor(private coord: Coord) {
    this.animation = new SpriteAnimation(SpriteLibrary.get("fireplace"), { frames: { from: [0, 0], to: [4, 0] } });
  }

  tick() {
    this.animation.tick();
  }

  paint(screen: PixelScreen) {
    this.animation.getSprites().forEach((sprite) => {
      screen.drawSprite(sprite, this.coord);
    });
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
    return { coord: [0, -22], size: [48, 32] };
  }

  boundingBox(): Rect {
    return { coord: [1, 0], size: [62, 12] };
  }

  isInteractable() {
    return false;
  }

  interact() { }
}

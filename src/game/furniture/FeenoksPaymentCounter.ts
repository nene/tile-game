import { Coord, Rect } from "../Coord";
import { GameObject } from "../GameObject";
import { PixelScreen } from "../PixelScreen";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { readAsepriteAnimation } from "../sprites/readAsepriteAnimation";
import feenoksPaymentCounterJson from "../sprites/data/feenoks-payment-counter.json";

export class FeenoksPaymentCounter implements GameObject {
  private animation: SpriteAnimation;

  constructor(private coord: Coord) {
    this.animation = new SpriteAnimation(SpriteLibrary.get("feenoks-payment-counter"), {
      frames: readAsepriteAnimation("idle", feenoksPaymentCounterJson),
    });
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
    return { coord: [0, 0], size: [32, 12] };
  }

  boundingBox(): Rect {
    return { coord: [0, 0], size: [32, 12] };
  }

  isInteractable() {
    return false;
  }

  interact() { }
}

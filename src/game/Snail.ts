import { Coord, coordAdd } from "./Coord";
import { GameObject } from "./GameObject";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteSheet } from "./SpriteSheet";

export class Snail implements GameObject {
  private animation: SpriteAnimation;
  private killAnimation: SpriteAnimation;
  private offset: Coord = [-8, -16];

  constructor(images: ImageLibrary, private coord: Coord) {
    this.animation = new SpriteAnimation(new SpriteSheet(images.get("snail"), [32, 32], [1, 5]));
    this.killAnimation = new SpriteAnimation(new SpriteSheet(images.get("snailKill"), [112, 40], [1, 11]));
  }

  kill() {
    this.animation = this.killAnimation;
    this.offset = [-48, -24];
  }

  tick(screen: PixelScreen) {
    if (this.animation === this.killAnimation && this.animation.getFrame() === 10) {
      return; // stop when killed
    }

    this.animation.tick();
    if (this.animation.isFinished() && this.animation.getFrame() === 0) {
      this.coord = coordAdd(this.coord, [-3, 0]);
      if (this.coord[0] < 0) {
        this.coord = [screen.width(), this.coord[1]];
      }
    }
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.animation.getSprite(), coordAdd(this.coord, this.offset));
  }

  zIndex() {
    return this.coord[1];
  }

  getCoord() {
    return this.coord;
  }
}

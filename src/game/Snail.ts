import { Coord, coordAdd } from "./Coord";
import { GameObject } from "./GameObject";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteSheet } from "./SpriteSheet";

export class Snail implements GameObject {
  private spriteSheet: SpriteSheet;
  private animation: SpriteAnimation;
  private offset: Coord = [-8, -16];

  constructor(images: ImageLibrary, private coord: Coord) {
    this.spriteSheet = new SpriteSheet(images.get("snail"), [32, 32], [1, 5]);
    this.animation = new SpriteAnimation(this.spriteSheet);
  }

  tick(screen: PixelScreen) {
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
}

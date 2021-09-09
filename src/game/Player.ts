import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet, Sprite } from "./SpriteSheet";
import { GameObject } from "./GameObject";
import { Coord, coordAdd } from "./Coord";
import { SpriteAnimation } from "./SpriteAnimation";

const max = Math.max;
const min = Math.min;

export class Player implements GameObject {
  private coord: Coord;
  private speed: Coord;
  private standRight: SpriteAnimation;
  private standLeft: SpriteAnimation;
  private walkRight: SpriteAnimation;
  private walkLeft: SpriteAnimation;
  private animation: SpriteAnimation;

  constructor(images: ImageLibrary) {
    this.coord = [0, 0];
    this.speed = [0, 0];

    this.standRight = new SpriteAnimation(new SpriteSheet(images.get("walkRight"), [32, 32], 1));
    this.standLeft = new SpriteAnimation(new SpriteSheet(images.get("walkLeft"), [32, 32], 1));
    this.walkRight = new SpriteAnimation(new SpriteSheet(images.get("walkRight"), [32, 32], 8));
    this.walkLeft = new SpriteAnimation(new SpriteSheet(images.get("walkLeft"), [32, 32], 8));

    this.animation = this.standRight;
  }

  moveRight() {
    this.speed = [3, this.speed[1]];
    this.pickAnimation();
  }

  moveLeft() {
    this.speed = [-3, this.speed[1]];
    this.pickAnimation();
  }

  moveUp() {
    this.speed = [this.speed[0], -3];
    this.pickAnimation();
  }

  moveDown() {
    this.speed = [this.speed[0], 3];
    this.pickAnimation();
  }

  stopRight() {
    const oldSpeed = this.speed;
    this.speed = [min(0, this.speed[0]), this.speed[1]];
    this.pickAnimation(oldSpeed);
  }

  stopLeft() {
    const oldSpeed = this.speed;
    this.speed = [max(0, this.speed[0]), this.speed[1]];
    this.pickAnimation(oldSpeed);
  }

  stopDown() {
    const oldSpeed = this.speed;
    this.speed = [this.speed[0], min(0, this.speed[1])];
    this.pickAnimation(oldSpeed);
  }

  stopUp() {
    const oldSpeed = this.speed;
    this.speed = [this.speed[0], max(0, this.speed[1])];
    this.pickAnimation(oldSpeed);
  }

  pickAnimation(oldSpeed?: Coord) {
    if (this.speed[0] > 0 || this.speed[1] > 0) {
      this.animation = this.walkRight;
    } else if (this.speed[0] < 0 || this.speed[1] < 0) {
      this.animation = this.walkLeft;
    } else if (oldSpeed) {
      // when standing
      if (oldSpeed[0] > 0 || oldSpeed[1] > 0) {
        this.animation = this.standRight;
      } else {
        this.animation = this.standLeft;
      }
    }
  }

  tick(screen: PixelScreen) {
    this.coord = coordAdd(this.coord, this.speed);
    if (this.coord[0] > screen.width() - 32) {
      this.coord = [screen.width() - 32, this.coord[1]];
    }
    if (this.coord[0] < 0) {
      this.coord = [0, this.coord[1]];
    }
    if (this.coord[1] < 0) {
      this.coord = [this.coord[0], 0];
    }
    if (this.coord[1] > screen.height() - 32) {
      this.coord = [this.coord[0], screen.height() - 32];
    }
    this.animation.tick();
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.animation.getSprite(), this.coord);
  }

  zIndex(): number {
    return this.coord[1];
  }
}

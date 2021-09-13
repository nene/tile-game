import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { GameObject } from "./GameObject";
import { Coord, coordAdd } from "./Coord";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteSheet2D } from "./SpriteSheet2D";

const max = Math.max;
const min = Math.min;

type Direction = 'up' | 'down' | 'left' | 'right';

export class Player implements GameObject {
  private coord: Coord;
  private speed: Coord;
  private offset: Coord = [-8, -16];
  private standRight: SpriteAnimation;
  private standLeft: SpriteAnimation;
  private standBack: SpriteAnimation;
  private standForward: SpriteAnimation;
  private walkRight: SpriteAnimation;
  private walkLeft: SpriteAnimation;
  private walkBack: SpriteAnimation;
  private walkForward: SpriteAnimation;
  private animation: SpriteAnimation;

  constructor(images: ImageLibrary) {
    this.coord = [0, 16];
    this.speed = [0, 0];

    this.standRight = new SpriteAnimation(new SpriteSheet2D(images.get("walkRight"), [32, 32], [1, 1]));
    this.standLeft = new SpriteAnimation(new SpriteSheet2D(images.get("walkLeft"), [32, 32], [1, 1]));
    this.standBack = new SpriteAnimation(new SpriteSheet2D(images.get("walkBack"), [32, 32], [1, 1]));
    this.standForward = new SpriteAnimation(new SpriteSheet2D(images.get("walkForward"), [32, 32], [1, 1]));

    this.walkRight = new SpriteAnimation(new SpriteSheet2D(images.get("walkRight"), [32, 32], [1, 8]));
    this.walkLeft = new SpriteAnimation(new SpriteSheet2D(images.get("walkLeft"), [32, 32], [1, 8]));
    this.walkBack = new SpriteAnimation(new SpriteSheet2D(images.get("walkBack"), [32, 32], [1, 8]));
    this.walkForward = new SpriteAnimation(new SpriteSheet2D(images.get("walkForward"), [32, 32], [1, 8]));

    this.animation = this.standRight;
  }

  moveRight() {
    this.changeSpeed([3, this.speed[1]]);
  }

  moveLeft() {
    this.changeSpeed([-3, this.speed[1]]);
  }

  moveUp() {
    this.changeSpeed([this.speed[0], -3]);
  }

  moveDown() {
    this.changeSpeed([this.speed[0], 3]);
  }

  stopRight() {
    this.changeSpeed([min(0, this.speed[0]), this.speed[1]]);
  }

  stopLeft() {
    this.changeSpeed([max(0, this.speed[0]), this.speed[1]]);
  }

  stopDown() {
    this.changeSpeed([this.speed[0], min(0, this.speed[1])]);
  }

  stopUp() {
    this.changeSpeed([this.speed[0], max(0, this.speed[1])]);
  }

  changeSpeed(newSpeed: Coord) {
    const oldSpeed = this.speed;
    if (this.isMoving(newSpeed)) {
      const oldAnimation = this.animation;
      this.animation = this.pickByDirection(newSpeed, {
        right: this.walkRight,
        left: this.walkLeft,
        up: this.walkBack,
        down: this.walkForward,
      });
      if (this.isStanding(oldSpeed)) {
        // started moving, begin new animation
        this.animation.setFrame(0);
      } else {
        // was already moving, preserve current animation frame
        this.animation.setFrame(oldAnimation.getFrame());
      }
    }
    else {
      if (this.isMoving(oldSpeed)) {
        // was moving, now stopped
        this.animation = this.pickByDirection(oldSpeed, {
          right: this.standRight,
          left: this.standLeft,
          up: this.standBack,
          down: this.standForward,
        });
      }
    }
    this.speed = newSpeed;
  }

  isStanding(speed: Coord) {
    return speed[0] === 0 && speed[1] === 0;
  }

  isMoving(speed: Coord) {
    return !this.isStanding(speed);
  }

  pickByDirection(speed: Coord, options: Record<Direction, SpriteAnimation>): SpriteAnimation {
    return options[this.lookingDirection(speed)];
  }

  lookingDirection(speed: Coord): Direction {
    if (speed[0] > 0) {
      return 'right';
    }
    if (speed[0] < 0) {
      return 'left';
    }
    if (speed[1] > 0) {
      return 'down';
    }
    return 'up';
  }

  tick(screen: PixelScreen) {
    this.coord = coordAdd(this.coord, this.speed);
    if (this.coord[0] > screen.width() - 16) {
      this.coord = [screen.width() - 16, this.coord[1]];
    }
    if (this.coord[0] < 0) {
      this.coord = [0, this.coord[1]];
    }
    if (this.coord[1] < 0) {
      this.coord = [this.coord[0], 0];
    }
    if (this.coord[1] > screen.height() - 16) {
      this.coord = [this.coord[0], screen.height() - 16];
    }
    this.animation.tick();
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.animation.getSprite(), coordAdd(this.coord, this.offset));
  }

  zIndex(): number {
    return this.coord[1];
  }
}

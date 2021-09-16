import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { GameObject } from "./GameObject";
import { Coord, coordAdd } from "./Coord";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteSheet } from "./SpriteSheet";
import { Snail } from "./Snail";
import { GameWorld } from "./GameWorld";

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
  private digRightSheet: SpriteSheet;
  private digging = false;
  private animation: SpriteAnimation;

  constructor(images: ImageLibrary) {
    this.coord = [0, 16];
    this.speed = [0, 0];

    this.standRight = new SpriteAnimation(new SpriteSheet(images.get("walkRight"), [32, 32], [1, 1]));
    this.standLeft = new SpriteAnimation(new SpriteSheet(images.get("walkLeft"), [32, 32], [1, 1]));
    this.standBack = new SpriteAnimation(new SpriteSheet(images.get("walkBack"), [32, 32], [1, 1]));
    this.standForward = new SpriteAnimation(new SpriteSheet(images.get("walkForward"), [32, 32], [1, 1]));

    this.walkRight = new SpriteAnimation(new SpriteSheet(images.get("walkRight"), [32, 32], [1, 8]));
    this.walkLeft = new SpriteAnimation(new SpriteSheet(images.get("walkLeft"), [32, 32], [1, 8]));
    this.walkBack = new SpriteAnimation(new SpriteSheet(images.get("walkBack"), [32, 32], [1, 8]));
    this.walkForward = new SpriteAnimation(new SpriteSheet(images.get("walkForward"), [32, 32], [1, 8]));

    this.digRightSheet = new SpriteSheet(images.get("digRight"), [32, 32], [1, 5]);

    this.animation = this.standRight;
  }

  handleKeyDown(key: string, world: GameWorld) {
    switch (key) {
      case "ArrowLeft":
        this.changeSpeed([-3, this.speed[1]]);
        break;
      case "ArrowRight":
        this.changeSpeed([3, this.speed[1]]);
        break;
      case "ArrowUp":
        this.changeSpeed([this.speed[0], -3]);
        break;
      case "ArrowDown":
        this.changeSpeed([this.speed[0], 3]);
        break;
      case " ":
        this.startDigging(world);
        break;
      default: // do nothing
    }
  }

  handleKeyUp(key: string, world: GameWorld) {
    switch (key) {
      case "ArrowLeft":
        this.changeSpeed([max(0, this.speed[0]), this.speed[1]]);
        break;
      case "ArrowRight":
        this.changeSpeed([min(0, this.speed[0]), this.speed[1]]);
        break;
      case "ArrowUp":
        this.changeSpeed([this.speed[0], max(0, this.speed[1])]);
        break;
      case "ArrowDown":
        this.changeSpeed([this.speed[0], min(0, this.speed[1])]);
        break;
      default: // do nothing
    }
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

  startDigging(world: GameWorld) {
    if (!this.digging) {
      this.digging = true;
      this.animation = new SpriteAnimation(this.digRightSheet);
      this.speed = [0, 0];

      const obj = world.getRightHandObject(this.coord);
      if (obj instanceof Snail) {
        obj.kill();
        this.coord = coordAdd(obj.getCoord(), [-17, -3]);
      }
    }
  }

  stopDigging() {
    this.digging = false;
    this.animation = this.standRight;
  }

  tick(world: GameWorld) {
    this.updatePosition(world);
    this.animation.tick();
    if (this.digging && this.animation.isFinished()) {
      this.stopDigging();
    }
  }

  updatePosition(world: GameWorld) {
    this.coord = coordAdd(this.coord, this.speed);
    if (this.coord[0] > world.width() - 16) {
      this.coord = [world.width() - 16, this.coord[1]];
    }
    if (this.coord[0] < 0) {
      this.coord = [0, this.coord[1]];
    }
    if (this.coord[1] < 0) {
      this.coord = [this.coord[0], 0];
    }
    if (this.coord[1] > world.height() - 16) {
      this.coord = [this.coord[0], world.height() - 16];
    }
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.animation.getSprite(), coordAdd(this.coord, this.offset));
  }

  zIndex(): number {
    return this.coord[1];
  }

  getCoord(): Coord {
    return this.coord;
  }
}

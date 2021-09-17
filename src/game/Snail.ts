import { Coord, coordAdd } from "./Coord";
import { GameObject } from "./GameObject";
import { GameWorld } from "./GameWorld";
import { PixelScreen } from "./PixelScreen";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteLibrary } from "./SpriteLibrary";

export class Snail implements GameObject {
  private animation: SpriteAnimation;
  private killAnimation: SpriteAnimation;

  constructor(sprites: SpriteLibrary, private coord: Coord) {
    this.animation = new SpriteAnimation(sprites.get("snail"), {
      frames: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
    });
    this.killAnimation = new SpriteAnimation(sprites.get("snail-kill"), {
      frames: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10]],
    });
  }

  kill() {
    this.animation = this.killAnimation;
  }

  tick(world: GameWorld) {
    if (this.animation === this.killAnimation && this.animation.getFrame() === 10) {
      return; // stop when killed
    }

    this.animation.tick();
    if (this.animation.isFinished() && this.animation.getFrame() === 0) {
      this.coord = coordAdd(this.coord, [-3, 0]);
      if (this.coord[0] < 0) {
        this.coord = [world.width(), this.coord[1]];
      }
    }
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.animation.getSprite(), this.coord);
  }

  zIndex() {
    return this.coord[1];
  }

  getCoord() {
    return this.coord;
  }
}

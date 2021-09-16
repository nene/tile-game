import { Coord, coordAdd } from "./Coord";
import { GameObject } from "./GameObject";
import { GameWorld } from "./GameWorld";
import { PixelScreen } from "./PixelScreen";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteLibrary } from "./SpriteLibrary";

export class Snail implements GameObject {
  private animation: SpriteAnimation;
  private killAnimation: SpriteAnimation;
  private offset: Coord = [-8, -16];

  constructor(sprites: SpriteLibrary, private coord: Coord) {
    this.animation = new SpriteAnimation(sprites.get("snail"));
    this.killAnimation = new SpriteAnimation(sprites.get("snail-kill"));
  }

  kill() {
    this.animation = this.killAnimation;
    this.offset = [-48, -24];
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
    screen.drawSprite(this.animation.getSprite(), coordAdd(this.coord, this.offset));
  }

  zIndex() {
    return this.coord[1];
  }

  getCoord() {
    return this.coord;
  }
}

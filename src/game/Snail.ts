import { Coord, coordAdd } from "./Coord";
import { GameObject } from "./GameObject";
import { GameWorld } from "./GameWorld";
import { PixelScreen } from "./PixelScreen";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteLibrary } from "./SpriteLibrary";

export class Snail implements GameObject {
  private animation: SpriteAnimation;

  constructor(sprites: SpriteLibrary, private coord: Coord, type: 0 | 1 | 2) {
    this.animation = new SpriteAnimation(sprites.get("cfe-ksv"), {
      frames: [[type, 0]],
    });
  }

  tick(world: GameWorld) {
    this.animation.tick();
    this.coord = coordAdd(this.coord, [-1, 0]);
    if (this.coord[0] < 0) {
      this.coord = [world.size()[0], this.coord[1]];
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

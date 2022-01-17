import { PixelScreen } from "../PixelScreen";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Coord, coordAdd } from "../Coord";
import { SCREEN_SIZE } from "../ui/screen-size";
import { random } from "lodash";

const LAST_FRAME = 15;

export class LeafParticle {
  private coord: Coord;
  private animation: SpriteAnimation;

  constructor() {
    const variant = this.randomVariant();
    this.animation = new SpriteAnimation(SpriteLibrary.get("leaves"), {
      frames: { from: [0, variant], to: [LAST_FRAME, variant] },
    });
    this.coord = this.randomStartCoord();
    this.animation.setFrame(this.randomStartFrame());
  }

  tick() {
    this.animation.tick();
    if (this.animation.getFrame() === 0) {
      this.coord = coordAdd(this.coord, [14, 7]);
      if (this.isOutsideScreen()) {
        this.coord = this.randomStartCoord();
        this.animation.setFrame(this.randomStartFrame());
      }
    }
  }

  private randomStartFrame(): number {
    return random(0, LAST_FRAME);
  }

  private randomVariant(): number {
    return random(0, 2);
  }

  private randomStartCoord(): Coord {
    return [random(-SCREEN_SIZE[0], SCREEN_SIZE[0]), random(-100, 0)];
  }

  private isOutsideScreen() {
    return this.coord[0] > SCREEN_SIZE[0] || this.coord[1] > SCREEN_SIZE[1];
  }

  paint(screen: PixelScreen) {
    this.animation.getSprites().forEach((sprite) => {
      screen.drawSprite(sprite, this.coord);
    });
  }
}

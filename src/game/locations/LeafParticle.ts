import { PixelScreen } from "../PixelScreen";
import leavesAnimationJson from "../sprites/data/leaves.json";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { readAsepriteAnimation } from "../sprites/readAsepriteAnimation";
import { Coord, coordAdd } from "../Coord";
import { SCREEN_SIZE } from "../ui/screen-size";
import { random } from "lodash";

const animationFrames = readAsepriteAnimation("fall", leavesAnimationJson);

export class LeafParticle {
  private coord: Coord;
  private animation = new SpriteAnimation(SpriteLibrary.get("leaves"), {
    frames: animationFrames,
  });

  constructor() {
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
    return random(0, animationFrames.length - 1);
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

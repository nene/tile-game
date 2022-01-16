import { PixelScreen } from "../PixelScreen";
import leavesAnimationJson from "../sprites/data/leaves.json";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { readAsepriteAnimation } from "../sprites/readAsepriteAnimation";
import { Coord, coordAdd } from "../Coord";
import { SCREEN_SIZE } from "../ui/screen-size";
import { random } from "lodash";

export class LeafParticle {
  private animation = new SpriteAnimation(SpriteLibrary.get("leaves"), {
    frames: readAsepriteAnimation("fall", leavesAnimationJson),
  });

  private coord = this.randomStartCoord();

  tick() {
    this.animation.tick();
    if (this.animation.getFrame() === 0) {
      this.coord = coordAdd(this.coord, [14, 7]);
      if (this.isOutsideScreen()) {
        this.coord = this.randomStartCoord();
      }
    }
  }

  private randomStartCoord(): Coord {
    return [random(0, SCREEN_SIZE[0]), 0];
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

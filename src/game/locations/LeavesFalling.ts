import { PixelScreen } from "../PixelScreen";
import { Particles } from "./Particles";
import leavesAnimationJson from "../sprites/data/leaves.json";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { readAsepriteAnimation } from "../sprites/readAsepriteAnimation";
import { Coord, coordAdd } from "../Coord";
import { SCREEN_SIZE } from "../ui/screen-size";

export class LeavesFalling implements Particles {
  private animation = new SpriteAnimation(SpriteLibrary.get("leaves"), {
    frames: readAsepriteAnimation("fall", leavesAnimationJson),
  });
  private coord: Coord = [50, 50];

  tick() {
    this.animation.tick();
    if (this.animation.getFrame() === 0) {
      this.coord = coordAdd(this.coord, [14, 7]);
      if (this.coord[1] > SCREEN_SIZE[1]) {
        this.coord = [50, 50];
      }
    }
  }

  paint(screen: PixelScreen) {
    screen.withFixedCoords(() => {
      this.animation.getSprites().forEach((sprite) => {
        screen.drawSprite(sprite, this.coord);
      });
    });
  }
}

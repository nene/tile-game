import { PixelScreen } from "../PixelScreen";
import { SpriteAnimation } from "../sprites/SpriteAnimation";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";
import { Coord, coordAdd } from "../Coord";
import { SCREEN_SIZE } from "../ui/screen-size";
import { random } from "lodash";
import { pickRandom } from "../utils/pickRandom";

interface LeafType {
  sprite: SpriteName;
  variant: number;
  lastFrame: number;
  step: Coord;
}

const leafTypes: LeafType[] = [
  { sprite: "leaves", variant: 0, lastFrame: 15, step: [14, 7] },
  { sprite: "leaves", variant: 1, lastFrame: 15, step: [14, 7] },
  { sprite: "leaves", variant: 2, lastFrame: 15, step: [14, 7] },
  { sprite: "leaves2", variant: 0, lastFrame: 3, step: [0, 18] },
  { sprite: "leaves2", variant: 1, lastFrame: 3, step: [0, 18] },
  { sprite: "leaves2", variant: 2, lastFrame: 3, step: [0, 18] },
  { sprite: "leaves3", variant: 0, lastFrame: 5, step: [0, 24] },
  { sprite: "leaves3", variant: 1, lastFrame: 5, step: [0, 24] },
  { sprite: "leaves3", variant: 2, lastFrame: 5, step: [0, 24] },
];

export class LeafParticle {
  private coord: Coord;
  private animation: SpriteAnimation;
  private leafType: LeafType;

  constructor() {
    this.leafType = this.randomLeafType();
    this.animation = new SpriteAnimation(SpriteLibrary.get(this.leafType.sprite), {
      frames: { from: [0, this.leafType.variant], to: [this.leafType.lastFrame, this.leafType.variant] },
    });
    this.coord = this.randomStartCoord();
    this.animation.setFrame(this.randomStartFrame());
  }

  tick() {
    this.animation.tick();
    if (this.animation.getFrame() === 0) {
      this.coord = coordAdd(this.coord, this.leafType.step);
      if (this.isOutsideScreen()) {
        this.coord = this.randomStartCoord();
        this.animation.setFrame(this.randomStartFrame());
      }
    }
  }

  private randomLeafType(): LeafType {
    return pickRandom(leafTypes);
  }

  private randomStartFrame(): number {
    return random(0, this.leafType.lastFrame);
  }

  private randomStartCoord(): Coord {
    return [random(-SCREEN_SIZE[0], SCREEN_SIZE[0]), random(-100, 0)];
  }

  private isOutsideScreen() {
    return this.coord[0] > SCREEN_SIZE[0] || this.coord[1] > SCREEN_SIZE[1];
  }

  paint(screen: PixelScreen) {
    screen.drawSprites(this.animation.getSprites(), this.coord);
  }
}

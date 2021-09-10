import { Coord, coordAdd } from "./Coord";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet } from "./SpriteSheet";
import { GameObject } from "./GameObject";
import { SpriteAnimation } from "./SpriteAnimation";

export class Grass implements GameObject {
  private coord: Coord;
  private animation: SpriteAnimation;
  private offset: Coord = [-8, -16];

  constructor(images: ImageLibrary, coord: Coord) {
    const img = images.get("grass" + (rand(4) + 1));
    this.animation = new SpriteAnimation(
      new SpriteSheet(img, [32, 32], 6),
      { ticksPerFrame: 2, currentFrame: rand(6) }
    );
    this.coord = coord;
  }

  tick() {
    this.animation.tick();
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.animation.getSprite(), coordAdd(this.coord, this.offset));
  }

  zIndex(): number {
    return this.coord[1];
  }
}

function rand(n: number): number {
  return Math.floor(Math.random() * n);
}

import { Coord, coordAdd } from "./Coord";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { GameObject } from "./GameObject";
import { SpriteAnimation } from "./SpriteAnimation";
import { SpriteSheet } from "./SpriteSheet";

export type GrassPlantType = 1 | 2 | 3 | 4;

export class GrassPlant implements GameObject {
  private coord: Coord;
  private animation: SpriteAnimation;
  private offset: Coord = [-8, -16];

  constructor(images: ImageLibrary, grassType: GrassPlantType, coord: Coord) {
    const img = images.get("grass" + grassType);
    this.animation = new SpriteAnimation(
      new SpriteSheet(img, [32, 32], [1, 6]),
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

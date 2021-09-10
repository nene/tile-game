import { Coord } from "./Coord";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet } from "./SpriteSheet";
import { GameObject } from "./GameObject";
import { SpriteAnimation } from "./SpriteAnimation";
import { GameGrid } from "./GameGrid";

export class Grass implements GameObject {
  private coord: Coord;
  private animation: SpriteAnimation;

  constructor(images: ImageLibrary, grid: GameGrid) {
    const img = images.get("grass" + (rand(4) + 1));
    this.animation = new SpriteAnimation(
      new SpriteSheet(img, [32, 32], 6),
      { ticksPerFrame: 2, currentFrame: rand(6) }
    );

    this.coord = grid.tileToScreenCoord([
      rand(grid.getRows()),
      rand(grid.getCols()),
    ]);
  }

  tick() {
    this.animation.tick();
  }

  paint(screen: PixelScreen) {
    screen.drawSprite(this.animation.getSprite(), this.coord);
  }

  zIndex(): number {
    return this.coord[1];
  }
}

function rand(n: number): number {
  return Math.floor(Math.random() * n);
}

import { GameGrid } from "./GameGrid";
import { Ground } from "./Ground";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet } from "./SpriteSheet";
import { SurfaceMap } from "./SurfaceMap";

export class Background {
  private initialized = false;
  private bgSprites: SpriteSheet;
  private ground: Ground;

  constructor(private grid: GameGrid, surface: SurfaceMap, images: ImageLibrary) {
    this.bgSprites = new SpriteSheet(images.get('grassBg'), [32, 32], [1, 1]);
    this.ground = new Ground(grid, surface, images);
  }

  paint(screen: PixelScreen) {
    if (!this.initialized) {
      this.grid.forEachTile(([x, y]) => {
        if (isEven(x) && isEven(y)) {
          screen.drawSprite(this.bgSprites.getSprite([0, 0]), this.grid.tileToScreenCoord([x, y]));
        }
      });
      this.ground.paint(screen);

      screen.saveBg();
      this.initialized = true;
    } else {
      screen.restoreBg();
    }
  }
}

function isEven(x: number): boolean {
  return x % 2 === 0;
}

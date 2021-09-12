import { GameGrid } from "./GameGrid";
import { GameObject } from "./GameObject";
import { Ground } from "./Ground";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet } from "./SpriteSheet";

export class Background implements GameObject {
  private initialized = false;
  private bgSprites: SpriteSheet;
  private ground: Ground;

  constructor(private grid: GameGrid, images: ImageLibrary) {
    this.bgSprites = new SpriteSheet(images.get('grassBg'), [32, 32], 1);
    this.ground = new Ground(grid, images);
  }

  tick() { }

  paint(screen: PixelScreen) {
    if (!this.initialized) {
      this.grid.forEachTile((coord) => {
        screen.drawSprite(this.bgSprites.getSprite(0), coord);
      }, [32, 32]);
      this.ground.paint(screen);

      screen.saveBg();
      this.initialized = true;
    } else {
      screen.restoreBg();
    }
  }

  zIndex() {
    return -1;
  }
}

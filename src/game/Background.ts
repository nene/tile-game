import { GameGrid } from "./GameGrid";
import { GameObject } from "./GameObject";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet } from "./SpriteSheet";

export class Background implements GameObject {
  private initialized = false;
  private bgSprites: SpriteSheet;

  constructor(private grid: GameGrid, images: ImageLibrary) {
    this.bgSprites = new SpriteSheet(images.get('grassBg'), [32, 32], 1)
  }

  tick() { }

  paint(screen: PixelScreen) {
    if (!this.initialized) {
      this.grid.forEachTile((coord) => {
        screen.drawSprite(this.bgSprites.getSprite(0), coord);
      });
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

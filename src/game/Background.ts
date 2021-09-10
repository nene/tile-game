import { GameGrid } from "./GameGrid";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet } from "./SpriteSheet";

export class Background {
  private bgSprites: SpriteSheet;

  constructor(private grid: GameGrid, images: ImageLibrary) {
    this.bgSprites = new SpriteSheet(images.get('grassBg'), [32, 32], 1)
  }

  paint(screen: PixelScreen) {
    this.grid.forEachTile((coord) => {
      screen.drawSprite(this.bgSprites.getSprite(0), coord);
    });
  }
}

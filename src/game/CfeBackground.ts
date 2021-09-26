import { GameGrid } from "./GameGrid";
import { GameLocationBackground } from "./GameLocation";
import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./SpriteLibrary";
import { SpriteSheet } from "./SpriteSheet";

export class CfeBackground implements GameLocationBackground {
  private bgSprites: SpriteSheet;

  constructor(private grid: GameGrid) {
    this.bgSprites = SpriteLibrary.get('cfe-bg');
  }

  paint(screen: PixelScreen) {
    const [width, height] = this.grid.size();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        screen.drawSprite(this.bgSprites.getSprite([0, 3]), this.grid.tileToScreenCoord([x, y]));
      }
    }
  }
}

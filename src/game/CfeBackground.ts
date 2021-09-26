import { GameGrid } from "./GameGrid";
import { GameLocationBackground } from "./GameLocation";
import { PixelScreen } from "./PixelScreen";
import { Sprite } from "./Sprite";
import { SpriteLibrary } from "./SpriteLibrary";

export class CfeBackground implements GameLocationBackground {
  private floorSprite: Sprite;

  constructor(private grid: GameGrid) {
    this.floorSprite = SpriteLibrary.get('cfe-bg').getSprite([0, 3]);
  }

  paint(screen: PixelScreen) {
    const [width, height] = this.grid.size();
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        screen.drawSprite(this.floorSprite, this.grid.tileToScreenCoord([x, y]));
      }
    }
  }
}

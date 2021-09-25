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
    this.grid.forEachTile((tileCoord) => {
      screen.drawSprite(this.bgSprites.getSprite([0, 3]), this.grid.tileToScreenCoord(tileCoord));
    });
  }
}

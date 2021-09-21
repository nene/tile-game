import { GameGrid } from "./GameGrid";
import { GameLocationBackground } from "./GameLocation";
import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./SpriteLibrary";
import { SpriteSheet } from "./SpriteSheet";

export class CfeBackground implements GameLocationBackground {
  private bgSprites: SpriteSheet;

  constructor(private grid: GameGrid, sprites: SpriteLibrary) {
    this.bgSprites = sprites.get('cfe-bg');
  }

  paint(screen: PixelScreen) {
    this.grid.forEachTile((tileCoord) => {
      screen.drawSprite(this.bgSprites.getSprite([0, 3]), this.grid.tileToScreenCoord(tileCoord));
    });
  }
}

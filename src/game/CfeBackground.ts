import { Coord } from "./Coord";
import { GameGrid } from "./GameGrid";
import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./SpriteLibrary";
import { SpriteSheet } from "./SpriteSheet";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";

export class CfeBackground {
  private bgSprites: SpriteSheet;
  private tileMap: Record<SurfaceType, Coord> = {
    [SurfaceType.empty]: [-1, -1],
    [SurfaceType.wallUpper]: [0, 0],
    [SurfaceType.wallLower]: [0, 1],
    [SurfaceType.floor]: [0, 2],
  };

  constructor(private grid: GameGrid, private surface: SurfaceMap, sprites: SpriteLibrary) {
    this.bgSprites = sprites.get('cfe-bg');
  }

  paint(screen: PixelScreen) {
    this.grid.forEachTile(([x, y]) => {
      const tileCoord = this.tileMap[this.surface[x][y]];
      screen.drawSprite(this.bgSprites.getSprite(tileCoord), this.grid.tileToScreenCoord([x, y]));
    });
  }
}

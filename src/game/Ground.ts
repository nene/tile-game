import { GameGrid } from "./GameGrid";
import { PixelScreen } from "./PixelScreen";
import { SurfaceSpriteSheet } from "./SurfaceSpriteSheet";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";
import { SpriteLibrary } from "./SpriteLibrary";

export class Ground {
  private stones: SurfaceSpriteSheet;
  private water: SurfaceSpriteSheet;

  constructor(private grid: GameGrid, private surface: SurfaceMap, sprites: SpriteLibrary) {
    this.stones = new SurfaceSpriteSheet(sprites.get('stones'), SurfaceType.stone);
    this.water = new SurfaceSpriteSheet(sprites.get('water'), SurfaceType.water);
  }

  paint(screen: PixelScreen) {
    // depending on surrounding tiles, decide the type of stone tile and paint it
    this.grid.forEachTile(([x, y]) => {
      if (this.surface[x][y] === SurfaceType.stone) {
        screen.drawSprite(
          this.stones.getSprite([x, y], this.surface),
          this.grid.tileToScreenCoord([x, y]),
        );
      }
      if (this.surface[x][y] === SurfaceType.water) {
        screen.drawSprite(
          this.water.getSprite([x, y], this.surface),
          this.grid.tileToScreenCoord([x, y]),
        );
      }
    });
  }
}

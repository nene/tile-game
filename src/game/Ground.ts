import { GameGrid } from "./GameGrid";
import { GameObject } from "./GameObject";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SurfaceSpriteSheet } from "./SurfaceSpriteSheet";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";

export class Ground implements GameObject {
  private stones: SurfaceSpriteSheet;
  private water: SurfaceSpriteSheet;

  constructor(private grid: GameGrid, private surface: SurfaceMap, images: ImageLibrary) {
    this.stones = new SurfaceSpriteSheet(images.get('stones'), SurfaceType.stone);
    this.water = new SurfaceSpriteSheet(images.get('water'), SurfaceType.water);
  }

  tick() { }

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

  zIndex() {
    return -1;
  }
}

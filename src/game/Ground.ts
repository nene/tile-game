import { GameGrid } from "./GameGrid";
import { GameObject } from "./GameObject";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SurfaceSpriteSheet } from "./SurfaceSpriteSheet";
import { SurfaceType } from "./SurfaceMap";
import { generateSurface } from "./generateSurface";

export class Ground implements GameObject {
  private stones: SurfaceSpriteSheet;

  constructor(private grid: GameGrid, images: ImageLibrary) {
    this.stones = new SurfaceSpriteSheet(images.get('stones'), SurfaceType.stone);
  }

  tick() { }

  paint(screen: PixelScreen) {
    const surface = generateSurface(this.grid);

    // depending on surrounding tiles, decide the type of stone tile and paint it
    this.grid.forEachTile((coord, [x, y]) => {
      if (surface[x][y] === SurfaceType.stone) {
        screen.drawSprite(this.stones.getSprite([x, y], surface), coord);
      }
    });
  }

  zIndex() {
    return -1;
  }
}

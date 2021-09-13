import { GameGrid } from "./GameGrid";
import { GameObject } from "./GameObject";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import SimplexNoise from "simplex-noise";
import { SurfaceSpriteSheet } from "./SurfaceSpriteSheet";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";

export class Ground implements GameObject {
  private stones: SurfaceSpriteSheet;

  constructor(private grid: GameGrid, images: ImageLibrary) {
    this.stones = new SurfaceSpriteSheet(images.get('stones'), SurfaceType.stone);
  }

  tick() { }

  paint(screen: PixelScreen) {
    const ground = this.emptySurface(this.grid.getRows(), this.grid.getCols());
    const noise = new SimplexNoise();

    // decide which tiles contain stones
    this.grid.forEachTile((coord, [x, y]) => {
      ground[x][y] = noise.noise2D(x / 10, y / 10) > 0.3 ? 1 : 0;
    });

    // depending on surrounding tiles, decide the type of stone tile and paint it
    this.grid.forEachTile((coord, [x, y]) => {
      if (ground[x][y] > 0) {
        screen.drawSprite(this.stones.getSprite([x, y], ground), coord);
      }
    });
  }

  emptySurface(width: number, height: number): SurfaceMap {
    const arr: number[][] = [];
    for (let x = 0; x < width; x++) {
      arr.push([]);
      for (let y = 0; y < height; y++) {
        arr[x].push(SurfaceType.grass);
      }
    }
    return arr;
  }

  zIndex() {
    return -1;
  }
}

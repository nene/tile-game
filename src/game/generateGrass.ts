import SimplexNoise from "simplex-noise";
import { GameGrid } from "./GameGrid";
import { Grass } from "./Grass";
import { ImageLibrary } from "./ImageLibrary";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";

export function generateGrass(grid: GameGrid, surface: SurfaceMap, images: ImageLibrary): Grass[] {
  const noise = new SimplexNoise();

  return grid.allTiles()
    .filter(([x, y]) => surface[x][y] === SurfaceType.grass)
    .filter(([x, y]) => noise.noise2D(x / 10, y / 10) > 0.5)
    .map((colRow) => new Grass(images, grid.tileToScreenCoord(colRow)));
}

import SimplexNoise from "simplex-noise";
import { GameGrid } from "./GameGrid";
import { GrassPlant } from "./GrassPlant";
import { ImageLibrary } from "./ImageLibrary";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";

export function generatePlants(grid: GameGrid, surface: SurfaceMap, images: ImageLibrary): GrassPlant[] {
  const noise = new SimplexNoise();

  return grid.allTiles()
    .filter(([x, y]) => surface[x][y] === SurfaceType.grass)
    .filter(([x, y]) => noise.noise2D(x / 10, y / 10) > 0.5)
    .map((colRow) => new GrassPlant(images, grid.tileToScreenCoord(colRow)));
}

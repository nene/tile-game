import SimplexNoise from "simplex-noise";
import { GameGrid } from "./GameGrid";
import { GrassPlant, GrassPlantType } from "./GrassPlant";
import { ImageLibrary } from "./ImageLibrary";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";

export function generatePlants(grid: GameGrid, surface: SurfaceMap, images: ImageLibrary): GrassPlant[] {
  const plantExistanceNoise = new SimplexNoise();
  const plantTypeNoise = new SimplexNoise();

  return grid.allTiles()
    .filter(([x, y]) => surface[x][y] === SurfaceType.grass)
    .filter(([x, y]) => plantExistanceNoise.noise2D(x / 10, y / 10) > 0.5)
    .map(([x, y]) => new GrassPlant(
      images,
      pickGrassPlantType(plantTypeNoise.noise2D(x / 10, y / 10)),
      grid.tileToScreenCoord([x, y]),
    ));
}

function pickGrassPlantType(x: number): GrassPlantType {
  if (x > 0.5) {
    return 1;
  }
  if (x > 0) {
    return 2;
  }
  if (x > -0.5) {
    return 3;
  }
  return 4;
}

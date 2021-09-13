import SimplexNoise from "simplex-noise";
import { GameGrid } from "./GameGrid";
import { GameObject } from "./GameObject";
import { GrassPlant, GrassPlantType } from "./GrassPlant";
import { ImageLibrary } from "./ImageLibrary";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";
import { WaterPlant, WaterPlantType } from "./WaterPlant";

export function generatePlants(grid: GameGrid, surface: SurfaceMap, images: ImageLibrary): GameObject[] {
  const plantExistanceNoise = new SimplexNoise();
  const plantTypeNoise = new SimplexNoise();
  const waterPlantTypeNoise = new SimplexNoise();

  return grid.allTiles()
    .filter(([x, y]) => surface[x][y] === SurfaceType.grass || surface[x][y] === SurfaceType.water)
    .filter(([x, y]) => plantExistanceNoise.noise2D(x / 10, y / 10) > 0.5)
    .map(([x, y]) => {
      if (surface[x][y] === SurfaceType.grass) {
        return new GrassPlant(
          images,
          pickGrassPlantType(plantTypeNoise.noise2D(x / 10, y / 10)),
          grid.tileToScreenCoord([x, y]),
        );
      } else {
        return new WaterPlant(
          images,
          pickWaterPlantType(waterPlantTypeNoise.noise2D(x / 10, y / 10)),
          grid.tileToScreenCoord([x, y]),
        );
      }
    });
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

function pickWaterPlantType(x: number): WaterPlantType {
  if (x > 0) {
    return WaterPlantType.reed;
  }
  return WaterPlantType.waterLily;
}

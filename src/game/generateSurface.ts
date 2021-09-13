import SimplexNoise from "simplex-noise";
import { GameGrid } from "./GameGrid";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";

export function generateSurface(grid: GameGrid): SurfaceMap {
  const surface = emptySurface(grid.getRows(), grid.getCols());
  const noise = new SimplexNoise();

  // decide which tiles contain stones
  grid.forEachTile(([x, y]) => {
    surface[x][y] = pickSurfaceType(noise.noise2D(x / 10, y / 10));
  });

  return surface;
}

function pickSurfaceType(x: number): SurfaceType {
  if (x > 0.3) {
    return SurfaceType.stone;
  }
  if (x < -0.6) {
    return SurfaceType.water;
  }
  return SurfaceType.grass;
}

function emptySurface(width: number, height: number): SurfaceMap {
  const arr: number[][] = [];
  for (let x = 0; x < width; x++) {
    arr.push([]);
    for (let y = 0; y < height; y++) {
      arr[x].push(SurfaceType.grass);
    }
  }
  return arr;
}

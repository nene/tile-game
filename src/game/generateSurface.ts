import SimplexNoise from "simplex-noise";
import { GameGrid } from "./GameGrid";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";

export function generateSurface(grid: GameGrid): SurfaceMap {
  const surface = emptySurface(grid.getRows(), grid.getCols());
  const noise = new SimplexNoise();

  // decide which tiles contain stones
  grid.forEachTile((coord, [x, y]) => {
    surface[x][y] = noise.noise2D(x / 10, y / 10) > 0.3 ? SurfaceType.stone : SurfaceType.grass;
  });

  return surface;
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

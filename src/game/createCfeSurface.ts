import { GameGrid } from "./GameGrid";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";

export function createCfeSurface(grid: GameGrid): SurfaceMap {
  const surface = emptySurface(grid.getRows(), grid.getCols());

  // simplistic room plan
  grid.forEachTile(([x, y]) => {
    if (y <= 1) {
      surface[x][y] = SurfaceType.wallUpper;
    }
    else if (y === 2) {
      surface[x][y] = SurfaceType.wallLower;
    }
    else {
      surface[x][y] = SurfaceType.floor;
    }
  });

  return surface;
}

function emptySurface(width: number, height: number): SurfaceMap {
  const arr: number[][] = [];
  for (let x = 0; x < width; x++) {
    arr.push([]);
    for (let y = 0; y < height; y++) {
      arr[x].push(SurfaceType.empty);
    }
  }
  return arr;
}

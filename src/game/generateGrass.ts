import { shuffle, take } from "lodash";
import { GameGrid } from "./GameGrid";
import { Grass } from "./Grass";
import { ImageLibrary } from "./ImageLibrary";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";

export function generateGrass(grid: GameGrid, surface: SurfaceMap, images: ImageLibrary): Grass[] {
  return take(shuffle(grid.allTiles()), 50)
    .filter(([x, y]) => surface[x][y] === SurfaceType.grass)
    .map((colRow) => new Grass(images, grid.tileToScreenCoord(colRow)));
}

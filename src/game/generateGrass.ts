import { shuffle, take } from "lodash";
import { GameGrid } from "./GameGrid";
import { Grass } from "./Grass";
import { ImageLibrary } from "./ImageLibrary";

export function generateGrass(grid: GameGrid, images: ImageLibrary): Grass[] {
  return take(shuffle(grid.allTiles()), 50).map((colRow) => new Grass(images, grid.tileToScreenCoord(colRow)));
}

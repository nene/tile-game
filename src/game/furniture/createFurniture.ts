import { Coord } from "../Coord";
import { GameObject } from "../GameObject";
import { BoardTable } from "./BoardTable";
import { Pianino } from "./Pianino";

const classMap: Record<string, { new(coord: Coord): GameObject }> = {
  "Pianino": Pianino,
  "BoardTable": BoardTable,
}

export function createFurniture(type: string, coord: Coord): GameObject {
  return new classMap[type](coord);
}

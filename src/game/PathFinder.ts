import { sortBy } from "lodash";
import { Coord, coordAdd, coordDistance, coordEq } from "./Coord";

export class PathFinder {
  constructor(private isTileEmpty: (coord: Coord) => boolean) { }

  public findPath(coord1: Coord, coord2: Coord): Coord[] | undefined {
    const startCoord = coord1;
    const visited = [coord1];
    const path: Coord[] = [];

    while (true) {
      const next = this.takeStep(coord1, coord2, visited);
      if (next) {
        path.push(next);
        visited.push(next);
        coord1 = next;

        if (coordEq(next, coord2)) {
          return path;
        }
      } else {
        if (path.length === 0) {
          // Can't backtrack any more, so no path found
          return undefined;
        }
        path.pop();
        coord1 = path[path.length - 1] || startCoord;
      }
    }
  }

  private takeStep(coord1: Coord, coord2: Coord, visited: Coord[]): Coord | undefined {
    for (const next of this.possibleSteps(coord1, coord2)) {
      if (this.isTileEmpty(next) && !visited.some((coord) => coordEq(next, coord))) {
        return next;
      }
    }
    return undefined;
  }

  private possibleSteps(coord1: Coord, coord2: Coord): Coord[] {
    const possibleDirections: Coord[] = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    // look at each direction
    // sort them by these that take us closer to our target
    return sortBy(possibleDirections.map(dir => coordAdd(coord1, dir)), (coord) => coordDistance(coord, coord2));
  }
}

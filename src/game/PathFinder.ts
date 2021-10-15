import { sortBy } from "lodash";
import { Coord, coordAdd, coordDistance, coordEq, coordSub } from "./Coord";

export class PathFinder {
  constructor(private isTileEmpty: (coord: Coord) => boolean) { }

  public findPath(coord1: Coord, coord2: Coord): Coord[] | undefined {
    const path = this.findRawPath(coord1, coord2);
    return path ? this.cutCorners(path) : undefined;
  }

  private cutCorners(path: Coord[]): Coord[] {
    const cleanPath = [];
    for (let i = 0; i < path.length; i++) {
      cleanPath.push(path[i]);
      if (path[i + 2] && this.isCuttableCorner(path[i], path[i + 2])) {
        i++; // skip over the corner
      }
    }
    return cleanPath;
  }

  private isCuttableCorner(a: Coord, b: Coord): boolean {
    const [dx, dy] = coordSub(b, a);
    const isCorner = Math.abs(dx) === 1 && Math.abs(dy) === 1;
    return isCorner &&
      this.isTileEmpty(coordAdd(a, [dx, 0])) &&
      this.isTileEmpty(coordAdd(a, [0, dy]));
  }

  private findRawPath(coord1: Coord, coord2: Coord): Coord[] | undefined {
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

import { groupBy, sortBy } from "lodash";
import { Coord, coordAdd, Rect } from "../Coord";

export const detectWallSections = (wallMap: boolean[][]): Rect[] => {
  return combineHorizontalSpans(detectHorizontalSpans(wallMap));
}

const detectHorizontalSpans = (wallMap: boolean[][]): Rect[] => {
  const width = wallMap[0]?.length ?? 0;
  const height = wallMap.length;

  const horizontalSpans: Rect[] = [];
  let currentSpan: Coord | undefined; // [start, length]

  for (let y = 0; y < height; y++) {
    currentSpan = undefined;
    for (let x = 0; x < width; x++) {
      if (wallMap[y][x]) {
        if (currentSpan) {
          currentSpan = [currentSpan[0], currentSpan[1] + 1];
        } else {
          currentSpan = [x, 1];
        }
      } else {
        if (currentSpan) {
          horizontalSpans.push({ coord: [currentSpan[0], y], size: [currentSpan[1], 1] })
          currentSpan = undefined;
        }
      }
    }

    if (currentSpan) {
      horizontalSpans.push({ coord: [currentSpan[0], y], size: [currentSpan[1], 1] })
    }
  }

  return horizontalSpans;
}

const combineHorizontalSpans = (spans: Rect[]): Rect[] => {
  // Group spans that align horizontally (have same width and x-coord)
  return Object.values(groupBy(spans, ({ coord, size }) => [coord[0], size[0]]))
    .flatMap((group) => {
      // Sort each group by Y-coordinate
      return sortBy(group, ({ coord }) => coord[1])
        // Combine walls next to each other
        .reduce(([prev, ...rest]: Rect[], rect: Rect) => {
          if (!prev) {
            return [rect];
          } else if (isCombinable(prev, rect)) {
            return [combine(prev, rect), ...rest];
          } else {
            return [rect, prev, ...rest];
          }
        }, []);
    })
}

const isCombinable = (a: Rect, b: Rect): boolean => (
  a.coord[0] === b.coord[0] &&
  a.coord[1] + a.size[1] === b.coord[1] &&
  a.size[0] === b.size[0]
);

const combine = (a: Rect, b: Rect): Rect => ({
  coord: a.coord,
  size: coordAdd(a.size, [0, b.size[1]])
});

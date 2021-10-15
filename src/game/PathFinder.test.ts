import { Coord } from "./Coord";
import { PathFinder } from "./PathFinder";

type IsTileEmpty = (coord: Coord) => boolean;

function locate(char: string, map: string[]): Coord {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y].charAt(x) === char) {
        return [x, y];
      }
    }
  }
}

function createIsTileEmpty(map: string[]): IsTileEmpty {
  return ([x, y]: Coord) => map[y].charAt(x) !== "#";
}

function setCharAt(i: number, char: string, str: string): string {
  const before = str.slice(0, i);
  const after = str.slice(i + 1);
  return before + char + after;
}

function runPathFinder(map: string[]): string[] {
  const finder = new PathFinder(createIsTileEmpty(map));
  const path = finder.findPath(locate("A", map), locate("B", map));
  if (!path) {
    return undefined;
  }
  path.forEach(([x, y], i) => {
    map[y] = setCharAt(x, String(i % 10), map[y]);
  });
  return map;
}

describe("PathFinder", () => {
  it("finds straight path (left-right)", () => {
    expect(runPathFinder([
      ".....",
      "A...B",
      ".....",
    ])).toEqual([
      ".....",
      "A0123",
      ".....",
    ]);
  });

  it("finds straight path (bottom-up)", () => {
    expect(runPathFinder([
      "..B..",
      ".....",
      "..A..",
    ])).toEqual([
      "..1..",
      "..0..",
      "..A..",
    ]);
  });

  it("finds straight diagonal path", () => {
    expect(runPathFinder([
      ".....",
      "B....",
      ".....",
      ".....",
      "...A.",
    ])).toEqual([
      ".....",
      "54...",
      ".32..",
      "..10.",
      "...A.",
    ]);
  });

  it("avoids obsticle", () => {
    expect(runPathFinder([
      "............",
      ".......#....",
      "...A...#..B.",
      ".......#....",
      "............",
    ])).toEqual([
      "............",
      ".......#....",
      "...A012#..0.",
      "......3#.89.",
      "......4567..",
    ]);
  });

  // Bad
  it("gets out of U-shaped obsticle", () => {
    expect(runPathFinder([
      "............",
      "..######....",
      ".......#....",
      ".....A.#..B.",
      ".......#....",
      "..######....",
      "............",
    ])).toEqual([
      "............",
      "..######....",
      ".2165..#....",
      ".3074A0#..8.",
      ".498321#.67.",
      ".5######45..",
      ".67890123...",
    ]);
  });

  it("gets out of room", () => {
    expect(runPathFinder([
      "............",
      "..##.###....",
      "..#....#....",
      "..#..A.#..B.",
      "..#....#....",
      "..######....",
      "............",
    ])).toEqual([
      "....78901...",
      "..##6###2...",
      "..#.5..#34..",
      "..#.4A0#.56.",
      "..#.321#....",
      "..######....",
      "............",
    ]);
  });

  it("returns undefined when no path exists", () => {
    expect(runPathFinder([
      "#######......",
      "#.....#......",
      "#.A...#....B.",
      "#.....#.....",
      "#######.....",
    ])).toBe(undefined);
  });
});

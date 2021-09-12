import { Coord } from "./Coord";
import { GameGrid } from "./GameGrid";
import { GameObject } from "./GameObject";
import { ImageLibrary } from "./ImageLibrary";
import { PixelScreen } from "./PixelScreen";
import { SpriteSheet2D } from "./SpriteSheet2D";
import SimplexNoise from "simplex-noise";

export class Ground implements GameObject {
  private stones: SpriteSheet2D;
  private patterns: Record<string, Coord> = {
    ".XX.": [0, 0],
    ".XXX": [1, 0],
    "..XX": [2, 0],
    "XXX.": [0, 1],
    "XXXX": [1, 1],
    "X.XX": [2, 1],
    "XX..": [0, 2],
    "XX.X": [1, 2],
    "X..X": [2, 2],

    "..X.": [3, 0],
    "X.X.": [3, 1],
    "X...": [3, 2],

    ".X..": [0, 3],
    ".X.X": [1, 3],
    "...X": [2, 3],

    "....": [3, 3],
  };

  constructor(private grid: GameGrid, images: ImageLibrary) {
    this.stones = new SpriteSheet2D(images.get('stones'), [16, 16], [4, 4]);
  }

  tick() { }

  paint(screen: PixelScreen) {
    const ground = this.empty2dArray(this.grid.getRows(), this.grid.getCols());
    const noise = new SimplexNoise();

    // decide which tiles contain stones
    this.grid.forEachTile((coord, [x, y]) => {
      ground[x][y] = noise.noise2D(x / 10, y / 10) > 0.3 ? 1 : 0;
    });

    // depending on surrounding tiles, decide the type of stone tile and paint it
    this.grid.forEachTile((coord, [x, y]) => {
      if (ground[x][y] > 0) {
        const tileSpriteCoord = this.lookupTile(this.surroundingTiles([x, y], ground));
        screen.drawSprite(this.stones.getSprite(tileSpriteCoord), coord);
      }
    });
  }

  surroundingTiles([x, y]: Coord, ground: number[][]): boolean[] {
    return [
      this.isFilled(ground, x, y - 1), // top
      this.isFilled(ground, x + 1, y), // right
      this.isFilled(ground, x, y + 1), // bottom
      this.isFilled(ground, x - 1, y), // left
    ];
  }

  isFilled(ground: number[][], x: number, y: number): boolean {
    if (ground[x] === undefined || ground[x][y] === undefined) {
      return true;
    }
    return ground[x][y] > 0;
  }

  lookupTile(surroundings: boolean[]): Coord {
    const pattern = surroundings.map((x) => x ? "X" : ".").join("");
    return this.patterns[pattern];
  }

  empty2dArray(width: number, height: number) {
    const arr: number[][] = [];
    for (let x = 0; x < width; x++) {
      arr.push([]);
      for (let y = 0; y < height; y++) {
        arr[x].push(0);
      }
    }
    return arr;
  }

  zIndex() {
    return -1;
  }
}

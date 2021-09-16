import { Coord } from "./Coord";
import { Sprite } from "./Sprite";
import { SpriteSheet } from "./SpriteSheet";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";

const patternMap: Record<string, Coord> = {
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

export class SurfaceSpriteSheet {
  private spriteSheet: SpriteSheet;
  private type: SurfaceType;

  constructor(image: HTMLImageElement, type: SurfaceType) {
    this.spriteSheet = new SpriteSheet(image, [16, 16], [4, 4]);
    this.type = type;
  }

  public getSprite(coord: Coord, map: SurfaceMap): Sprite {
    const tileSpriteCoord = this.lookupTile(this.surroundingTiles(coord, map));
    return this.spriteSheet.getSprite(tileSpriteCoord);
  }

  private surroundingTiles([x, y]: Coord, map: SurfaceMap): boolean[] {
    return [
      this.isFilled(map, x, y - 1), // top
      this.isFilled(map, x + 1, y), // right
      this.isFilled(map, x, y + 1), // bottom
      this.isFilled(map, x - 1, y), // left
    ];
  }

  private isFilled(map: SurfaceMap, x: number, y: number): boolean {
    if (map[x] === undefined || map[x][y] === undefined) {
      return true;
    }
    return map[x][y] === this.type;
  }

  private lookupTile(surroundings: boolean[]): Coord {
    const pattern = surroundings.map((x) => x ? "X" : ".").join("");
    return patternMap[pattern];
  }
}

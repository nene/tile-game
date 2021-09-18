import { Coord } from "./Coord";
import { Sprite } from "./Sprite";
import { SpriteSheet } from "./SpriteSheet";
import { SurfaceMap, SurfaceType } from "./SurfaceMap";

const patternMap: Record<string, Coord> = {
  "...X": [0, 0],
  "..XX": [1, 0],
  "..X.": [2, 0],
  ".X.X": [0, 1],
  "XXXX": [1, 1],
  "X.X.": [2, 1],
  ".X..": [0, 2],
  "XX..": [1, 2],
  "X...": [2, 2],

  "XXX.": [3, 0],
  "XX.X": [4, 0],
  "X.XX": [3, 1],
  ".XXX": [4, 1],

  "X..X": [3, 2],
  ".XX.": [4, 2],
};

export class SurfaceSpriteSheet {
  constructor(private spriteSheet: SpriteSheet, private type: SurfaceType) {
  }

  public getSprite(topLeftCoord: Coord, map: SurfaceMap): Sprite | undefined {
    const tileSpriteCoord = this.lookupTile(this.surroundingTiles(topLeftCoord, map));
    return tileSpriteCoord && this.spriteSheet.getSprite(tileSpriteCoord);
  }

  private surroundingTiles([x, y]: Coord, map: SurfaceMap): boolean[] {
    return [
      this.isFilled(map, x, y), // top-left
      this.isFilled(map, x + 1, y), // top-right
      this.isFilled(map, x, y + 1), // bottom-left
      this.isFilled(map, x + 1, y + 1), // bottom-right
    ];
  }

  private isFilled(map: SurfaceMap, x: number, y: number): boolean {
    if (map[x] === undefined || map[x][y] === undefined) {
      return false;
    }
    return map[x][y] === this.type;
  }

  private lookupTile(surroundings: boolean[]): Coord | undefined {
    const pattern = surroundings.map((x) => x ? "X" : ".").join("");
    return patternMap[pattern];
  }
}

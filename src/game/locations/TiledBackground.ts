import { Coord, tileToScreenCoord, tileToScreenRect } from "../Coord";
import { Wall } from "../furniture/Wall";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { detectWallSections } from "./detectWallSections";
import { LocationBackground } from "./LocationBackground";

const spriteIndex: Record<string, Coord> = {
  "7": [0, 0], // void (top-left)
  "4": [0, 1], // void (left)
  "1": [0, 2], // void (bottom-left)
  "8": [1, 0], // void (top)
  "#": [1, 1], // void (middle)
  "2": [1, 2], // void (bottom)
  "9": [2, 0], // void (top-right)
  "6": [2, 1], // void (right)
  "3": [2, 2], // void (bottom-right)

  "T": [3, 0], // Wall top (cellar)
  "M": [3, 1], // Wall middle (cellar)
  "B": [3, 2], // Wall bottom (cellar)
  ".": [3, 3], // Floor (cellar)

  "t": [4, 0], // Wall top (hall)
  "m": [4, 1], // Wall middle (hall)
  "b": [4, 2], // Wall bottom (hall)
  "_": [4, 3], // Floor (hall)
};

const isWallSymbol = (char: string): boolean => /[1234#6789TMBtmb]/.test(char);

export class TiledBackground implements LocationBackground {
  private bg: SpriteSheet;
  private width: number;
  private height: number;

  constructor(private spriteMap: string[]) {
    this.bg = SpriteLibrary.get('cfe-bg');
    this.width = spriteMap[0].length;
    this.height = spriteMap.length;
  }

  paint(screen: PixelScreen) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        screen.drawSprite(this.lookupSprite([x, y]), tileToScreenCoord([x, y]));
      }
    }
  }

  private lookupSprite(coord: Coord): Sprite {
    return this.bg.getSprite(spriteIndex[this.lookupSymbol(coord)]);
  }

  private lookupSymbol([x, y]: Coord): string {
    return this.spriteMap[y].charAt(x);
  }

  getGridSize(): Coord {
    return [this.width, this.height];
  }

  private getWallMap(): boolean[][] {
    const map: boolean[][] = [];
    for (let y = 0; y < this.height; y++) {
      const row: boolean[] = [];
      for (let x = 0; x < this.width; x++) {
        row.push(isWallSymbol(this.lookupSymbol([x, y])));
      }
      map.push(row);
    }
    return map;
  }

  getWalls(): Wall[] {
    return detectWallSections(this.getWallMap())
      .map(tileToScreenRect)
      .map((rect) => new Wall(rect));
  }
}

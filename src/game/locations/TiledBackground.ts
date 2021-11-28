import { Coord, tileToScreenCoord } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
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

  private lookupSprite([x, y]: Coord): Sprite {
    const char = this.spriteMap[y].charAt(x);
    return this.bg.getSprite(spriteIndex[char]);
  }
}

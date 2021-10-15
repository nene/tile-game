import { Coord, tileToScreenCoord } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { LocationBackground } from "./LocationBackground";

// 21 x 16
const spriteMap = [
  "TTTTTTTTTTTTTT4######",
  "MMMMMMMMMMMMMM4######",
  "BBBBBBBBBBBBBB1222222",
  "..............TTTTTTT",
  "..............MMMMMMM",
  "..............BBBBBBB",
  ".....................",
  ".....................",
  ".....................",
  ".....................",
  ".....................",
  ".....................",
  ".....................",
  ".....................",
  ".....................",
  ".....................",
];

const spriteIndex: Record<string, Coord> = {
  "T": [0, 0], // Wall top
  "M": [0, 1], // Wall middle
  "B": [0, 2], // Wall bottom
  ".": [0, 3], // Floor
  "7": [1, 0], // void (top-left)
  "4": [1, 1], // void (left)
  "1": [1, 2], // void (bottom-left)
  "8": [2, 0], // void (top)
  "#": [2, 1], // void (middle)
  "2": [2, 2], // void (bottom)
  "9": [3, 0], // void (top-right)
  "6": [3, 1], // void (right)
  "3": [3, 2], // void (bottom-right)
};

export class CfeBackground implements LocationBackground {
  private bg: SpriteSheet;

  constructor(private size: Coord) {
    this.bg = SpriteLibrary.get('cfe-bg');
  }

  paint(screen: PixelScreen) {
    const [width, height] = this.size;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        screen.drawSprite(this.lookupSprite([x, y]), tileToScreenCoord([x, y]));
      }
    }
  }

  private lookupSprite([x, y]: Coord): Sprite {
    const char = spriteMap[y].charAt(x);
    return this.bg.getSprite(spriteIndex[char]);
  }
}

import { Coord, tileToScreenCoord } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { SpriteSheet } from "../sprites/SpriteSheet";
import { LocationBackground } from "./LocationBackground";

// 23 x 17
const spriteMap = [
  "#22222222222222########",
  "6TTTTTTTTTTTTTT4#######",
  "6MMMMMMMMMMMMMM4#######",
  "6BBBBBBBBBBBBBB1222222#",
  "6..............TTTTTTT4",
  "6..............MMMMMMM4",
  "6..............BBBBBBB4",
  "6.....................4",
  "6.....................4",
  "6.....................4",
  "6.....................4",
  "6.....................4",
  "6.....................4",
  "6.....................4",
  "6.....................4",
  "6.....................4",
  "#888888888888888888888#",
];

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
  "T": [3, 0], // Wall top
  "M": [3, 1], // Wall middle
  "B": [3, 2], // Wall bottom
  ".": [3, 3], // Floor
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

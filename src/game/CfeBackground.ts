import { Coord } from "./Coord";
import { tileToScreenCoord } from "./GameGrid";
import { GameLocationBackground } from "./GameLocation";
import { PixelScreen } from "./PixelScreen";
import { Sprite } from "./Sprite";
import { SpriteLibrary } from "./SpriteLibrary";

export class CfeBackground implements GameLocationBackground {
  private floorSprite: Sprite;

  constructor(private size: Coord) {
    this.floorSprite = SpriteLibrary.get('cfe-floor').getSprite([0, 0]);
  }

  paint(screen: PixelScreen) {
    const [width, height] = this.size;
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        screen.drawSprite(this.floorSprite, tileToScreenCoord([x, y]));
      }
    }
  }
}

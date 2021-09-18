import { GameGrid } from "./GameGrid";
import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./SpriteLibrary";
import { SpriteSheet } from "./SpriteSheet";

export class PlainBackground {
  private bgSprites: SpriteSheet;

  constructor(private grid: GameGrid, sprites: SpriteLibrary) {
    this.bgSprites = sprites.get('grass-bg');
  }

  paint(screen: PixelScreen) {
    this.grid.forEachTile(([x, y]) => {
      if (isEven(x) && isEven(y)) {
        screen.drawSprite(this.bgSprites.getSprite([0, 0]), this.grid.tileToScreenCoord([x, y]));
      }
    });
  }
}

function isEven(x: number): boolean {
  return x % 2 === 0;
}

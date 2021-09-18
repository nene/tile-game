import { Coord, coordEq } from "./Coord";
import { GameGrid } from "./GameGrid";
import { Ground } from "./Ground";
import { PixelScreen } from "./PixelScreen";
import { SpriteLibrary } from "./SpriteLibrary";
import { SpriteSheet } from "./SpriteSheet";
import { SurfaceMap } from "./SurfaceMap";

export class Background {
  private bgSprites: SpriteSheet;
  private ground: Ground;
  private previousOffset: Coord = [-1, -1];

  constructor(private grid: GameGrid, surface: SurfaceMap, sprites: SpriteLibrary) {
    this.bgSprites = sprites.get('grass-bg');
    this.ground = new Ground(grid, surface, sprites);
  }

  paint(screen: PixelScreen) {
    if (coordEq(screen.getOffset(), this.previousOffset)) {
      screen.restoreBg();
      return;
    }

    this.grid.forEachTile(([x, y]) => {
      if (isEven(x) && isEven(y)) {
        screen.drawSprite(this.bgSprites.getSprite([0, 0]), this.grid.tileToScreenCoord([x, y]));
      }
    });

    this.ground.paint(screen);
    screen.saveBg();
    this.previousOffset = screen.getOffset();
  }
}

function isEven(x: number): boolean {
  return x % 2 === 0;
}

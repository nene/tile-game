import { Coord, coordEq } from "./Coord";
import { GameGrid } from "./GameGrid";
import { Ground } from "./Ground";
import { PixelScreen } from "./PixelScreen";
import { PlainBackground } from "./PlainBackground";
import { SpriteLibrary } from "./SpriteLibrary";
import { SurfaceMap } from "./SurfaceMap";

export class Background {
  private plainBg: PlainBackground;
  private ground: Ground;
  private previousOffset: Coord = [-1, -1];

  constructor(grid: GameGrid, surface: SurfaceMap, sprites: SpriteLibrary) {
    this.plainBg = new PlainBackground(grid, sprites);
    this.ground = new Ground(grid, surface, sprites);
  }

  paint(screen: PixelScreen) {
    if (coordEq(screen.getOffset(), this.previousOffset)) {
      screen.restoreBg();
      return;
    }

    this.plainBg.paint(screen);
    this.ground.paint(screen);
    screen.saveBg();
    this.previousOffset = screen.getOffset();
  }
}

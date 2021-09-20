import { Coord, coordEq } from "./Coord";
import { GameGrid } from "./GameGrid";
import { PixelScreen } from "./PixelScreen";
import { CfeBackground } from "./CfeBackground";
import { SpriteLibrary } from "./SpriteLibrary";
import { SurfaceMap } from "./SurfaceMap";

export class Background {
  private cfeBg: CfeBackground;
  private previousOffset: Coord = [-1, -1];

  constructor(grid: GameGrid, surface: SurfaceMap, sprites: SpriteLibrary) {
    this.cfeBg = new CfeBackground(grid, surface, sprites);
  }

  paint(screen: PixelScreen) {
    if (coordEq(screen.getOffset(), this.previousOffset)) {
      screen.restoreBg();
      return;
    }

    this.cfeBg.paint(screen);
    screen.saveBg();
    this.previousOffset = screen.getOffset();
  }
}

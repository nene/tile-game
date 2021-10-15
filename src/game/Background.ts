import { Coord, coordEq } from "./Coord";
import { PixelScreen } from "./PixelScreen";
import { GameLocationBackground } from "./locations/GameLocation";

export class Background {
  private previousOffset: Coord = [-1, -1];

  constructor(private bg: GameLocationBackground) { }

  paint(screen: PixelScreen) {
    if (coordEq(screen.getOffset(), this.previousOffset)) {
      screen.restoreBg();
      return;
    }

    this.bg.paint(screen);
    screen.saveBg();
    this.previousOffset = screen.getOffset();
  }
}

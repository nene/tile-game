import { Coord, coordEq } from "../Coord";
import { PixelScreen } from "../PixelScreen";
import { LocationBackground } from "./LocationBackground";

export class BackgroundCache {
  private previousOffset: Coord = [-1, -1];

  constructor(private bg: LocationBackground) { }

  paint(screen: PixelScreen) {
    if (coordEq(screen.getOffset(), this.previousOffset)) {
      screen.restoreBg();
      return;
    }

    this.bg.paint(screen);
    screen.saveBg();
    this.previousOffset = screen.getOffset();
  }

  invalidate() {
    this.previousOffset = [-1, -1];
  }
}

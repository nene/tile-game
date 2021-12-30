import { PixelScreen } from "../PixelScreen";
import { SCREEN_RECT } from "../ui/screen-size";
import { LocationBackground } from "./LocationBackground";

export class SolidBackground implements LocationBackground {
  constructor(private color: string = "#000000") { }

  paint(screen: PixelScreen) {
    screen.withFixedCoords(() => {
      screen.drawRect(SCREEN_RECT, this.color);
    });
  }
}

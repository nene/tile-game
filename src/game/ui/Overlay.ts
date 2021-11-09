import { PixelScreen } from "../PixelScreen";
import { SCREEN_RECT } from "./screen-size";

export class Overlay {
  public static paint(screen: PixelScreen, opacity = 0.5) {
    screen.drawRect(SCREEN_RECT, `rgba(0,0,0,${opacity})`);
  }
}

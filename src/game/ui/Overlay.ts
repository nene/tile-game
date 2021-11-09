import { PixelScreen } from "../PixelScreen";
import { SCREEN_SIZE } from "./screen-size";

export class Overlay {
  public static paint(screen: PixelScreen, opacity = 0.5) {
    screen.drawRect({ coord: [0, 0], size: SCREEN_SIZE }, `rgba(0,0,0,${opacity})`);
  }
}

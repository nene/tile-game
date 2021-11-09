import { PixelScreen } from "../PixelScreen";

export class Overlay {
  public static paint(screen: PixelScreen) {
    screen.drawRect({ coord: [0, 0], size: [320, 200] }, "rgba(0,0,0,0.5)");
  }
}

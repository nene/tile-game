import { GameLocationBackground } from "./GameLocation";
import { PixelScreen } from "../PixelScreen";

export class OutdoorsBackground implements GameLocationBackground {
  paint(screen: PixelScreen) {
    screen.drawRect({ coord: [0, 0], size: [336, 50] }, "#bc945c");
    screen.drawRect({ coord: [0, 50], size: [336, 62] }, "#a08052");
    screen.drawRect({ coord: [0, 112], size: [336, 128] }, "#494132");
  }
}

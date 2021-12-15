import { tileToScreenCoord } from "../../Coord";
import { PixelScreen } from "../../PixelScreen";
import { LocationBackground } from "../LocationBackground";

export class OutdoorsBackground implements LocationBackground {
  paint(screen: PixelScreen) {
    screen.drawRect({ coord: [0, 0], size: tileToScreenCoord([45, 7]) }, "#bc945c");
    screen.drawRect({ coord: tileToScreenCoord([0, 7]), size: tileToScreenCoord([45, 11]) }, "#a08052");
    screen.drawRect({ coord: tileToScreenCoord([0, 11]), size: tileToScreenCoord([45, 20]) }, "#494132");
  }
}

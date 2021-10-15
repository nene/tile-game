import { GameLocationBackground } from "./LocationFactory";
import { PixelScreen } from "../PixelScreen";
import { Building } from "./Building";

export class OutdoorsBackground implements GameLocationBackground {
  constructor(private buildings: Building[]) { }

  paint(screen: PixelScreen) {
    screen.drawRect({ coord: [0, 0], size: [336, 50] }, "#bc945c");
    screen.drawRect({ coord: [0, 50], size: [336, 62] }, "#a08052");
    screen.drawRect({ coord: [0, 112], size: [336, 128] }, "#494132");

    this.buildings.forEach((building) => {
      building.paint(screen);
    });
  }
}

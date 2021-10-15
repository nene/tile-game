import { Coord, tileToScreenCoord } from "../Coord";
import { LocationFactory, LocationName } from "./LocationFactory";
import { GameObject } from "../GameObject";
import { OutdoorsBackground } from "./OutdoorsBackground";
import { CfeBuilding } from "./CfeBuilding";
import { Building } from "./Building";
import { Door } from "../furniture/Door";

export class OutdoorsLocationFactory implements LocationFactory {
  private background: OutdoorsBackground;
  private objects: GameObject[];
  private buildings: Building[];

  constructor() {
    this.buildings = [
      new CfeBuilding([28, 32]),
    ];

    this.background = new OutdoorsBackground(this.buildings);

    this.objects = [
      ...this.buildings.flatMap((building) => building.getWalls()),
      new Door({
        coord: [228, 173],
        spriteName: "cfe-building-door",
        target: { location: "cfe" },
      }),
    ];
  }

  getName(): LocationName {
    return "outdoors";
  }

  getSize(): Coord {
    return tileToScreenCoord([21, 15]);
  }

  getBackground() {
    return this.background;
  }

  getObjects() {
    return this.objects;
  }
}

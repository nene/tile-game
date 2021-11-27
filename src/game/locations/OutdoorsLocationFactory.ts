import { Coord, coordAdd, tileToScreenCoord } from "../Coord";
import { LocationFactory, LocationName } from "./LocationFactory";
import { GameObject } from "../GameObject";
import { OutdoorsBackground } from "./OutdoorsBackground";
import { CfeBuilding } from "./CfeBuilding";
import { Building } from "./Building";
import { Door } from "../furniture/Door";
import { Fence } from "../furniture/Fence";
import { SpawnPoint } from "../furniture/SpawnPoint";

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
        from: "outdoors",
        to: "cfe-hall",
      }),
      new Fence(tileToScreenCoord([0, 14])),
      new Fence(coordAdd(tileToScreenCoord([4, 14]), [8, 0])),
      new Fence(tileToScreenCoord([9, 14])),
      new Fence(tileToScreenCoord([16, 14])),
      // A spawn location outside of the fence
      new SpawnPoint(tileToScreenCoord([14, 13])),
    ];
  }

  getName(): LocationName {
    return "outdoors";
  }

  getSize(): Coord {
    return tileToScreenCoord([21, 16]);
  }

  getBackground() {
    return this.background;
  }

  getObjects() {
    return this.objects;
  }
}

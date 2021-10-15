import { Coord } from "../Coord";
import { GameLocation } from "./GameLocation";
import { GameObject } from "../GameObject";
import { OutdoorsBackground } from "./OutdoorsBackground";
import { CfeBuilding } from "./CfeBuilding";
import { Building } from "./Building";

const SIZE: Coord = [21, 15]; // Size in tiles

export class OutdoorsLocation implements GameLocation {
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
    ];
  }

  getGridSize(): Coord {
    return SIZE;
  }

  getBackground() {
    return this.background;
  }

  getObjects() {
    return this.objects;
  }
}

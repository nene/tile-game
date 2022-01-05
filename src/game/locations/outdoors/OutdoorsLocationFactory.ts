import { Coord, tileToScreenCoord } from "../../Coord";
import { LocationFactory, LocationName } from "../LocationFactory";
import { GameObject } from "../../GameObject";
import { SpawnPoint } from "../../furniture/SpawnPoint";
import { TiledLevelFactory } from "../TiledLevelFactory";
import { getLevel } from "../Level";

export class OutdoorsLocationFactory implements LocationFactory {
  private levelFactory = new TiledLevelFactory(getLevel("Outdoors"));
  private objects: GameObject[];

  constructor() {
    this.objects = [
      ...this.levelFactory.getWalls(),
      ...this.levelFactory.getFurniture(),
      // A spawn location outside of the fence
      new SpawnPoint(tileToScreenCoord([14, 15])),
    ];
  }

  getName(): LocationName {
    return "outdoors";
  }

  getSize(): Coord {
    return tileToScreenCoord(this.levelFactory.getGridSize());
  }

  getBackgrounds() {
    return [
      this.levelFactory.getBackground(),
      this.levelFactory.getGrass(),
      this.levelFactory.getBuildings(),
    ];
  }

  getForeground() {
    return undefined;
  }

  getObjects() {
    return this.objects;
  }
}

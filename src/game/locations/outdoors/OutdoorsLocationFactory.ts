import { Coord, tileToScreenCoord } from "../../Coord";
import { LocationFactory, LocationName } from "../LocationFactory";
import { GameObject } from "../../GameObject";
import { Door } from "../../furniture/Door";
import { SpawnPoint } from "../../furniture/SpawnPoint";
import { TiledLevelFactory } from "../TiledLevelFactory";
import { getLevel } from "../Level";
import { SpriteLibrary } from "../../sprites/SpriteLibrary";
import { SolidBackground } from "../SolidBackground";

export class OutdoorsLocationFactory implements LocationFactory {
  private levelFactory = new TiledLevelFactory(getLevel("Outdoors"));
  private objects: GameObject[];

  constructor() {
    this.objects = [
      ...this.levelFactory.getWalls(),
      ...this.levelFactory.getFurniture(),
      new Door({
        coord: [229, 173 + 33],
        area: SpriteLibrary.getSprite("cfe-building-door"),
        from: "outdoors",
        to: "cfe-hall",
      }),
      new Door({
        coord: [344, 185],
        area: { coord: [0, -38], size: [27, 38] },
        from: "outdoors",
        to: "sakala-hall",
      }),
      new Door({
        coord: [726, 223],
        area: { coord: [0, -33], size: [21, 32] },
        from: "outdoors",
        to: "feenoks",
      }),
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
      new SolidBackground(),
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

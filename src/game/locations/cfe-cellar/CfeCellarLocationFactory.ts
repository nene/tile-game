import { Coord, tileToScreenCoord } from "../../Coord";
import { LocationFactory, LocationName } from "../LocationFactory";
import { GameObject } from "../../GameObject";
import { Door } from "../../furniture/Door";
import { getLevel } from "../Level";
import { TiledLevelFactory } from "../TiledLevelFactory";

export class CfeCellarLocationFactory implements LocationFactory {
  private levelFactory = new TiledLevelFactory(getLevel("CFE_cellar"));

  private objects: GameObject[] = [
    ...this.levelFactory.getWalls(),
    ...this.levelFactory.getFurniture(),

    // new Table(tileToScreenCoord([8, 8])),
    // new Table(tileToScreenCoord([3, 8]), "rtl"),
    new Door({
      coord: tileToScreenCoord([12, 4]),
      spriteName: "staircase-door",
      spriteCoord: [1, 0],
      from: "cfe-cellar",
      to: "cfe-hall",
      teleportOffset: [16, -8],
    }),
  ];

  getName(): LocationName {
    return "cfe-cellar";
  }

  getSize(): Coord {
    return tileToScreenCoord(this.levelFactory.getGridSize());
  }

  getBackground() {
    return this.levelFactory.getBackground();
  }

  getForeground() {
    return this.levelFactory.getForeground();
  }

  getObjects() {
    return this.objects;
  }
}

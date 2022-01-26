import { Coord, tileToScreenCoord } from "../../Coord";
import { LocationFactory, LocationName } from "../LocationFactory";
import { GameObject } from "../../GameObject";
import { Door } from "../../furniture/Door";
import { getLevel } from "../Level";
import { TiledLevelFactory } from "../TiledLevelFactory";
import { SpriteLibrary } from "../../sprites/SpriteLibrary";

export class CfeCellarLocationFactory implements LocationFactory {
  private levelFactory = new TiledLevelFactory(getLevel("CFE_cellar"));

  private objects: GameObject[] = [
    ...this.levelFactory.getWalls(),
    ...this.levelFactory.getFurniture(),

    new Door({
      coord: tileToScreenCoord([11, 4]),
      area: SpriteLibrary.getSprite("staircase-door"),
      from: "cfe-cellar",
      to: "cfe-hall",
      teleportOffset: [16, -8],
      autoTeleportSide: "top",
    }),
  ];

  getName(): LocationName {
    return "cfe-cellar";
  }

  getSize(): Coord {
    return tileToScreenCoord(this.levelFactory.getGridSize());
  }

  getBackgrounds() {
    return [this.levelFactory.getBackground()];
  }

  getForegrounds() {
    return [this.levelFactory.getForeground()];
  }

  getObjects() {
    return this.objects;
  }
}

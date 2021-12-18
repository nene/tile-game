import { Coord, tileToScreenCoord } from "../../Coord";
import { LocationFactory, LocationName } from "../LocationFactory";
import { Door } from "../../furniture/Door";
import { GameObject } from "../../GameObject";
import { getLevel } from "../Level";
import { TiledLevelFactory } from "../TiledLevelFactory";
import { SpriteLibrary } from "../../sprites/SpriteLibrary";

export class SakalaHallLocationFactory implements LocationFactory {
  private levelFactory = new TiledLevelFactory(getLevel("Sakala_hall"));

  private objects: GameObject[];

  constructor() {
    this.objects = [
      ...this.levelFactory.getWalls(),
      ...this.levelFactory.getFurniture(),

      new Door({
        coord: tileToScreenCoord([2, 4]),
        area: SpriteLibrary.getSprite("door-large"),
        from: "sakala-hall",
        to: "outdoors",
        teleportOffset: [16, 8],
      }),
    ];
  }

  getName(): LocationName {
    return "sakala-hall";
  }

  getSize(): Coord {
    return tileToScreenCoord(this.levelFactory.getGridSize());
  }

  getBackgrounds() {
    return [this.levelFactory.getBackground()];
  }

  getForeground() {
    return this.levelFactory.getForeground();
  }

  getObjects() {
    return this.objects;
  }
}

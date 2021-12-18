import { Coord, tileToScreenCoord } from "../../Coord";
import { LocationFactory, LocationName } from "../LocationFactory";
import { Door } from "../../furniture/Door";
import { Lamp } from "../../furniture/Lamp";
import { GameObject } from "../../GameObject";
import { LightSwitch } from "../../furniture/LightSwitch";
import { getLevel } from "../Level";
import { TiledLevelFactory } from "../TiledLevelFactory";
import { WallSection } from "../../furniture/WallSection";
import { SpriteLibrary } from "../../sprites/SpriteLibrary";

export class CfeHallLocationFactory implements LocationFactory {
  private levelFactory = new TiledLevelFactory(getLevel("CFE_hall"));

  private objects: GameObject[];

  constructor() {
    const lamps = [
      new Lamp(tileToScreenCoord([3, 6])),
      new Lamp(tileToScreenCoord([8, 6])),
      new Lamp(tileToScreenCoord([11, 6])),
      new Lamp(tileToScreenCoord([16, 7])),
      new Lamp(tileToScreenCoord([19, 7])),
    ];

    this.objects = [
      ...this.levelFactory.getWalls(),
      ...this.levelFactory.getFurniture(),

      new Door({
        coord: tileToScreenCoord([9, 6]),
        area: SpriteLibrary.getSprite("door-large"),
        from: "cfe-hall",
        to: "outdoors",
        teleportOffset: [16, 8],
      }),

      new Door({
        coord: tileToScreenCoord([17, 13]),
        area: { coord: [0, -48], size: [32, 48] },
        from: "cfe-hall",
        to: "cfe-cellar",
        teleportOffset: [16, -24],
      }),
      ...lamps,
      new LightSwitch(tileToScreenCoord([15, 7]), lamps, false),

      new WallSection({ coord: tileToScreenCoord([23, 6]), size: tileToScreenCoord([3, 1]) }, "cfe-hall"),
    ];
  }

  getName(): LocationName {
    return "cfe-hall";
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

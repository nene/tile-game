import { Coord, coordAdd, tileToScreenCoord } from "../../Coord";
import { LocationFactory, LocationName } from "../LocationFactory";
import { Door } from "../../furniture/Door";
import { Lamp } from "../../furniture/Lamp";
import { Painting } from "../../furniture/Painting";
import { Pianino } from "../../furniture/Pianino";
import { GameObject } from "../../GameObject";
import { LightSwitch } from "../../furniture/LightSwitch";
import { BoardTable } from "../../furniture/BoardTable";
import { TiledBackground } from "../TiledBackground";
import { getLevel } from "../Level";

export class CfeHallLocationFactory implements LocationFactory {
  private background = new TiledBackground(getLevel("CFE_hall"));

  private objects: GameObject[];

  constructor() {
    const lamps = [
      new Lamp(tileToScreenCoord([3, 4])),
      new Lamp(tileToScreenCoord([8, 4])),
      new Lamp(tileToScreenCoord([11, 4])),
      new Lamp(tileToScreenCoord([18, 7])),
    ];

    this.objects = [
      ...this.background.getWalls(),

      new Painting(tileToScreenCoord([4, 4]), "coat-of-arms"),
      new BoardTable(coordAdd(tileToScreenCoord([5, 4]), [0, 5])),

      new Door({
        coord: tileToScreenCoord([9, 4]),
        spriteName: "door-large",
        from: "cfe-hall",
        to: "outdoors",
        teleportOffset: [16, 8],
      }),
      new Painting(tileToScreenCoord([12, 4]), "polonia-cartel"),
      new Pianino(tileToScreenCoord([12, 4])),

      new Door({
        coord: tileToScreenCoord([17, 13]),
        spriteName: "staircase-door",
        from: "cfe-hall",
        to: "cfe-cellar",
        teleportOffset: [16, -24],
      }),
      ...lamps,
      new LightSwitch(tileToScreenCoord([19, 7]), lamps, false),
    ];
  }

  getName(): LocationName {
    return "cfe-hall";
  }

  getSize(): Coord {
    return tileToScreenCoord(this.background.getGridSize());
  }

  getBackground() {
    return this.background;
  }

  getObjects() {
    return this.objects;
  }
}

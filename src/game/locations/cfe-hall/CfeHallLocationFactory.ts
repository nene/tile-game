import { Coord, tileToScreenCoord } from "../../Coord";
import { LocationFactory, LocationName } from "../LocationFactory";
import { Wall } from "../../furniture/Wall";
import { Door } from "../../furniture/Door";
import { TiledBackground } from "../TiledBackground";
import { Lamp } from "../../furniture/Lamp";
import { Painting } from "../../furniture/Painting";
import { Pianino } from "../../furniture/Pianino";
import { GameObject } from "../../GameObject";
import { LightSwitch } from "../../furniture/LightSwitch";

export class CfeHallLocationFactory implements LocationFactory {
  private background = new TiledBackground([
    "#22222222222222#######",
    "6tttttttttttttt4######",
    "6mmmmmmmmmmmmmm4######",
    "6bbbbbbbbbbbbbb122222#",
    "6______________tttttt4",
    "6______________mmmmmm4",
    "6______________bbbbbb4",
    "6____________________4",
    "6____________________4",
    "6____________________4",
    "6______________788888#",
    "6______________4######",
    "6______________4######",
    "6______________4######",
    "#88888888888888#######",
  ]);

  private objects: GameObject[];

  constructor() {
    const lamps = [
      new Lamp(tileToScreenCoord([3, 4])),
      new Lamp(tileToScreenCoord([8, 4])),
      new Lamp(tileToScreenCoord([11, 4])),
      new Lamp(tileToScreenCoord([18, 7])),
    ];

    this.objects = [
      new Wall({ coord: tileToScreenCoord([0, 1]), size: tileToScreenCoord([22, 3]) }),
      new Wall({ coord: tileToScreenCoord([15, 4]), size: tileToScreenCoord([7, 3]) }),
      new Wall({ coord: tileToScreenCoord([0, 0]), size: tileToScreenCoord([1, 15]) }),
      new Wall({ coord: tileToScreenCoord([1, 14]), size: tileToScreenCoord([22, 1]) }),
      new Wall({ coord: tileToScreenCoord([21, 7]), size: tileToScreenCoord([1, 7]) }),
      new Wall({ coord: tileToScreenCoord([15, 10]), size: tileToScreenCoord([6, 4]) }),

      new Painting(tileToScreenCoord([4, 4]), "coat-of-arms"),

      new Door({
        coord: tileToScreenCoord([9, 4]),
        spriteName: "door-large",
        from: "cfe-hall",
        to: "outdoors",
      }),
      new Painting(tileToScreenCoord([12, 4]), "polonia-cartel"),
      new Pianino(tileToScreenCoord([12, 4])),

      new Door({
        coord: tileToScreenCoord([16, 7]),
        spriteName: "door",
        from: "cfe-hall",
        to: "cfe-cellar",
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

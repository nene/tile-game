import { Coord, tileToScreenCoord } from "../Coord";
import { LocationFactory, LocationName } from "./LocationFactory";
import { Wall } from "../furniture/Wall";
import { Door } from "../furniture/Door";
import { TiledBackground } from "./TiledBackground";

const CFE_HALL_SIZE: Coord = [23, 17]; // Size in tiles

export class CfeHallLocationFactory implements LocationFactory {
  private background = new TiledBackground([
    "#22222222222222########",
    "6TTTTTTTTTTTTTT4#######",
    "6MMMMMMMMMMMMMM4#######",
    "6BBBBBBBBBBBBBB1222222#",
    "6..............TTTTTTT4",
    "6..............MMMMMMM4",
    "6..............BBBBBBB4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "6.....................4",
    "#888888888888888888888#",
  ]);


  private objects = [
    new Wall({ coord: tileToScreenCoord([0, 1]), size: tileToScreenCoord([22, 3]) }),
    new Wall({ coord: tileToScreenCoord([15, 4]), size: tileToScreenCoord([8, 3]) }),
    new Wall({ coord: tileToScreenCoord([0, 0]), size: tileToScreenCoord([1, 17]) }),
    new Wall({ coord: tileToScreenCoord([1, 16]), size: tileToScreenCoord([22, 1]) }),
    new Wall({ coord: tileToScreenCoord([22, 7]), size: tileToScreenCoord([1, 9]) }),

    new Door({
      coord: tileToScreenCoord([13, 4]),
      spriteName: "door",
      from: "cfe-hall",
      to: "cfe-cellar",
    }),

    new Door({
      coord: tileToScreenCoord([16, 7]),
      spriteName: "door",
      from: "cfe-hall",
      to: "outdoors",
    }),
  ];

  getName(): LocationName {
    return "cfe-hall";
  }

  getSize(): Coord {
    return tileToScreenCoord(CFE_HALL_SIZE);
  }

  getBackground() {
    return this.background;
  }

  getObjects() {
    return this.objects;
  }
}

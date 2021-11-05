import { BeerCabinet } from "../furniture/BeerCabinet";
import { CfeBackground } from "./CfeBackground";
import { Coord, tileToScreenCoord } from "../Coord";
import { Fridge } from "../furniture/Fridge";
import { LocationFactory, LocationName } from "./LocationFactory";
import { GameObject } from "../GameObject";
import { Table } from "../furniture/Table";
import { Wall } from "../furniture/Wall";
import { BeerBox } from "../furniture/BeerBox";
import { Door } from "../furniture/Door";
import { Sofa } from "../furniture/Sofa";
import { Fireplace } from "../furniture/Fireplace";
import { Countertop } from "../furniture/Countertop";
import { Painting } from "../furniture/Painting";
import { KitchenSink } from "../furniture/KitchenSink";
import { BookCabinet } from "../furniture/BookCabinet";

const CFE_SIZE: Coord = [23, 17]; // Size in tiles

export class CfeLocationFactory implements LocationFactory {
  private background: CfeBackground;
  private objects: GameObject[];

  constructor() {
    this.background = new CfeBackground(CFE_SIZE);

    this.objects = [
      // Walls
      new Wall({ coord: tileToScreenCoord([0, 1]), size: tileToScreenCoord([22, 3]) }),
      new Wall({ coord: tileToScreenCoord([15, 4]), size: tileToScreenCoord([8, 3]) }),
      new Wall({ coord: tileToScreenCoord([0, 0]), size: tileToScreenCoord([1, 17]) }),
      new Wall({ coord: tileToScreenCoord([1, 16]), size: tileToScreenCoord([22, 1]) }),
      new Wall({ coord: tileToScreenCoord([22, 7]), size: tileToScreenCoord([1, 9]) }),

      // Color shield on wall
      new Painting(tileToScreenCoord([4, 4]), "color-shield"),
      // A table
      new Table(tileToScreenCoord([8, 8])),
      new Table(tileToScreenCoord([3, 8])),
      // Sofa
      new Sofa(tileToScreenCoord([3, 4])),
      // Fire
      new Fireplace(tileToScreenCoord([6, 4])),
      // Where to write in
      new BookCabinet(tileToScreenCoord([11, 4])),
      // A door
      new Door({
        coord: tileToScreenCoord([13, 4]),
        spriteName: "door",
        target: { location: "outdoors" },
      }),

      // Bar countertop
      new Countertop(tileToScreenCoord([15, 7])),
      // Notes
      new Painting(tileToScreenCoord([15, 7]), "bulletin-board"),
      // A storage of beer glasses
      new BeerCabinet(tileToScreenCoord([17, 7])),
      // A fridge
      new Fridge(tileToScreenCoord([19, 7])),
      // Place for empty bottles
      new BeerBox(tileToScreenCoord([20, 7])),
      // Tap water
      new KitchenSink(tileToScreenCoord([21, 8])),
    ];
  }

  getName(): LocationName {
    return "cfe";
  }

  getSize(): Coord {
    return tileToScreenCoord(CFE_SIZE);
  }

  getBackground() {
    return this.background;
  }

  getObjects() {
    return this.objects;
  }
}

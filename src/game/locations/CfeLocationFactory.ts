import { BeerCabinet } from "../furniture/BeerCabinet";
import { CfeBackground } from "./CfeBackground";
import { Coord, tileToScreenCoord } from "../Coord";
import { Fridge } from "../furniture/Fridge";
import { LocationFactory } from "./LocationFactory";
import { GameObject } from "../GameObject";
import { Table } from "../furniture/Table";
import { Wall } from "../furniture/Wall";
import { BeerBox } from "../furniture/BeerBox";
import { Door } from "../furniture/Door";
import { Sofa } from "../furniture/Sofa";
import { Fireplace } from "../furniture/Fireplace";
import { Countertop } from "../furniture/Countertop";
import { Painting } from "../furniture/Painting";

const CFE_SIZE: Coord = [21, 16]; // Size in tiles

export class CfeLocationFactory implements LocationFactory {
  private background: CfeBackground;
  private objects: GameObject[];

  constructor() {
    this.background = new CfeBackground(CFE_SIZE);

    this.objects = [
      // Walls
      new Wall({ coord: tileToScreenCoord([0, 0]), size: tileToScreenCoord([21, 3]) }),
      new Wall({ coord: tileToScreenCoord([14, 3]), size: tileToScreenCoord([7, 3]) }),

      // Color shield on wall
      new Painting(tileToScreenCoord([3, 3]), "color-shield"),
      // A table
      new Table(tileToScreenCoord([4, 7])),
      new Table(tileToScreenCoord([0, 11])),
      // Sofa
      new Sofa(tileToScreenCoord([3, 3])),
      // Fire
      new Fireplace(tileToScreenCoord([6, 3])),
      // A door
      new Door(tileToScreenCoord([12, 3])),

      // Bar countertop
      new Countertop(tileToScreenCoord([14, 6])),
      // Notes
      new Painting(tileToScreenCoord([14, 6]), "bulletin-board"),
      // A storage of beer glasses
      new BeerCabinet(tileToScreenCoord([16, 6])),
      // A fridge
      new Fridge(tileToScreenCoord([18, 6])),
      // Place for empty bottles
      new BeerBox(tileToScreenCoord([19, 6])),
    ];
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

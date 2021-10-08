import { BeerCabinet } from "./furniture/BeerCabinet";
import { CfeBackground } from "./CfeBackground";
import { Coord, tileToScreenCoord } from "./Coord";
import { Fridge } from "./furniture/Fridge";
import { GameLocation } from "./GameLocation";
import { GameObject } from "./GameObject";
import { Table } from "./furniture/Table";
import { Wall } from "./furniture/Wall";
import { BeerBox } from "./furniture/BeerBox";
import { Door } from "./furniture/Door";
import { Fireplace } from "./furniture/Fireplace";
import { Countertop } from "./furniture/Countertop";

const CFE_SIZE: Coord = [21, 16]; // Size in tiles

export class CfeLocation implements GameLocation {
  private background: CfeBackground;
  private staticObjects: GameObject[];

  constructor() {
    this.background = new CfeBackground(CFE_SIZE);

    this.staticObjects = this.createStaticObjects();
  }

  private createStaticObjects(): GameObject[] {
    const objects: GameObject[] = [];

    // long wall (the length of whole room)
    objects.push(new Wall(tileToScreenCoord([0, 0]), CFE_SIZE[0]));

    // A table
    objects.push(new Table(tileToScreenCoord([2, 8])));
    // A fridge
    objects.push(new Fridge(tileToScreenCoord([3, 3])));
    // A storage of beer glasses
    objects.push(new BeerCabinet(tileToScreenCoord([5, 3])));
    // Place for empty bottles
    objects.push(new BeerBox(tileToScreenCoord([8, 3])));
    // Fire
    objects.push(new Fireplace(tileToScreenCoord([9, 3])));
    // A door
    objects.push(new Door(tileToScreenCoord([15, 3])));
    // Bar countertop
    objects.push(new Countertop(tileToScreenCoord([17, 3])));

    return objects;
  }

  getGridSize(): Coord {
    return CFE_SIZE;
  }

  getBackground() {
    return this.background;
  }

  getStaticObjects() {
    return this.staticObjects;
  }
}

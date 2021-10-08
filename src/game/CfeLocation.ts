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
import { Painting } from "./furniture/Painting";

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

    // Walls
    objects.push(new Wall(tileToScreenCoord([0, 2]), 15));
    objects.push(new Wall(tileToScreenCoord([15, 3]), 1));
    objects.push(new Wall(tileToScreenCoord([15, 4]), 1));
    objects.push(new Wall(tileToScreenCoord([15, 5]), 6));

    // Color shield on wall
    objects.push(new Painting(tileToScreenCoord([3, 3]), "color-shield"));
    // A table
    objects.push(new Table(tileToScreenCoord([4, 7])));
    objects.push(new Table(tileToScreenCoord([0, 11])));
    // Fire
    objects.push(new Fireplace(tileToScreenCoord([6, 3])));
    // A door
    objects.push(new Door(tileToScreenCoord([12, 3])));

    // Bar countertop
    objects.push(new Countertop(tileToScreenCoord([14, 6])));
    // A storage of beer glasses
    objects.push(new BeerCabinet(tileToScreenCoord([16, 6])));
    // A fridge
    objects.push(new Fridge(tileToScreenCoord([18, 6])));
    // Place for empty bottles
    objects.push(new BeerBox(tileToScreenCoord([19, 6])));

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

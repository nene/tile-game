import { Coord } from "../Coord";
import { GameLocation } from "./GameLocation";
import { GameObject } from "../GameObject";
import { OutdoorsBackground } from "./OutdoorsBackground";

const SIZE: Coord = [21, 15]; // Size in tiles

export class OutdoorsLocation implements GameLocation {
  private background: OutdoorsBackground;
  private objects: GameObject[];

  constructor() {
    this.background = new OutdoorsBackground();

    this.objects = [];
  }

  getGridSize(): Coord {
    return SIZE;
  }

  getBackground() {
    return this.background;
  }

  getObjects() {
    return this.objects;
  }
}

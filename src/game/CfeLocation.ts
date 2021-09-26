import { BeerCabinet } from "./furniture/BeerCabinet";
import { Bursh, BurshType } from "./Bursh";
import { CfeBackground } from "./CfeBackground";
import { Coord, coordAdd } from "./Coord";
import { Fridge } from "./furniture/Fridge";
import { tileToScreenCoord } from "./GameGrid";
import { GameLocation } from "./GameLocation";
import { GameObject } from "./GameObject";
import { Table } from "./furniture/Table";
import { Wall } from "./furniture/Wall";

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

  getDynamicObjects(): GameObject[] {
    return [
      this.spawnBursh([150, 150], BurshType.gray, "ksv! Juhan Juurikas"),
      this.spawnBursh([200, 80], BurshType.brown, "vil! Jaanus Simm"),
      this.spawnBursh([30, 240], BurshType.blue, "ksv! Richard Kappel"),
    ];
  }

  private spawnBursh(coord: Coord, type: BurshType, name: string): Bursh {
    const bursh = new Bursh(coord, { type, name });
    const table = this.staticObjects.find((obj) => obj instanceof Table) as Table;
    const chairMapping = {
      [BurshType.gray]: 0,
      [BurshType.brown]: 1,
      [BurshType.blue]: 2,
    };
    const chairOffset = coordAdd([8, -8], [chairMapping[type] * 16, 0]);
    bursh.moveTo(coordAdd(table.getCoord(), chairOffset));
    return bursh;
  }
}

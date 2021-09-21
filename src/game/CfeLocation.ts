import { BeerCabinet } from "./BeerCabinet";
import { Bursh } from "./Bursh";
import { CfeBackground } from "./CfeBackground";
import { Coord, coordAdd } from "./Coord";
import { Fridge } from "./Fridge";
import { GameGrid } from "./GameGrid";
import { GameLocation } from "./GameLocation";
import { GameObject } from "./GameObject";
import { SpriteLibrary } from "./SpriteLibrary";
import { Table } from "./Table";
import { Wall } from "./Wall";

const CFE_SIZE: Coord = [32, 32]; // Size in tiles

export class CfeLocation implements GameLocation {
  private background: CfeBackground;
  private grid: GameGrid;
  private staticObjects: GameObject[];

  constructor(private sprites: SpriteLibrary) {
    this.grid = new GameGrid({ gridSize: CFE_SIZE, tileSize: [16, 16] });

    this.background = new CfeBackground(this.grid, sprites);

    this.staticObjects = this.createStaticObjects();
  }

  private createStaticObjects(): GameObject[] {
    const objects: GameObject[] = [];

    // simplistic room plan
    this.grid.forEachTile(([x, y]) => {
      if (y === 1) {
        objects.push(new Wall(this.grid.tileToScreenCoord([x, y]), this.sprites));
      }
    });

    // A table
    objects.push(new Table(this.grid.tileToScreenCoord([2, 5]), this.sprites));
    // A fridge
    objects.push(new Fridge(this.grid.tileToScreenCoord([10, 3]), this.sprites));
    // A storage of beer glasses
    objects.push(new BeerCabinet(this.grid.tileToScreenCoord([12, 3]), this.sprites));

    return objects;
  }

  getGrid() {
    return this.grid;
  }

  getBackground() {
    return this.background;
  }

  getStaticObjects() {
    return this.staticObjects;
  }

  getDynamicObjects(): GameObject[] {
    return [
      this.spawnBursh([150, 150], 0),
      this.spawnBursh([200, 80], 1),
      this.spawnBursh([30, 240], 2),
    ];
  }

  private spawnBursh(coord: Coord, type: 0 | 1 | 2): Bursh {
    const bursh = new Bursh(this.sprites, coord, type);
    const table = this.staticObjects.find((obj) => obj instanceof Table) as Table;
    const chairOffset = coordAdd([8, -8], [type * 16, 0]);
    bursh.moveTo(coordAdd(table.getCoord(), chairOffset));
    return bursh;
  }
}

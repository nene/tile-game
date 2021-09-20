import { CfeBackground } from "./CfeBackground";
import { Coord } from "./Coord";
import { GameGrid } from "./GameGrid";
import { GameLocation } from "./GameLocation";
import { GameObject } from "./GameObject";
import { SpriteLibrary } from "./SpriteLibrary";
import { Wall } from "./Wall";

const CFE_SIZE: Coord = [32, 32]; // Size in tiles

export class CfeLocation implements GameLocation {
  private background: CfeBackground;
  private grid: GameGrid;
  private staticObjects: GameObject[];

  constructor(private sprites: SpriteLibrary) {
    this.grid = new GameGrid({ rows: CFE_SIZE[0], cols: CFE_SIZE[1], tileSize: [16, 16] });

    this.background = new CfeBackground(this.grid, sprites);

    this.staticObjects = this.createStaticObjects();
  }

  createStaticObjects(): GameObject[] {
    const objects: GameObject[] = [];

    // simplistic room plan
    this.grid.forEachTile(([x, y]) => {
      if (y === 2) {
        objects.push(new Wall(this.grid.tileToScreenCoord([x, y]), this.sprites));
      }
    });

    return objects;
  }

  gridSize() {
    return CFE_SIZE;
  }

  getBackground() {
    return this.background;
  }

  getStaticObjects() {
    return this.staticObjects;
  }
}

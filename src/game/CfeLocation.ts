import { CfeBackground } from "./CfeBackground";
import { Coord } from "./Coord";
import { createCfeSurface } from "./createCfeSurface";
import { GameGrid } from "./GameGrid";
import { GameLocation } from "./GameLocation";
import { SpriteLibrary } from "./SpriteLibrary";

const CFE_SIZE: Coord = [32, 32];

export class CfeLocation implements GameLocation {
  private background: CfeBackground;
  private grid: GameGrid;

  constructor(sprites: SpriteLibrary) {
    this.grid = new GameGrid({ rows: CFE_SIZE[0], cols: CFE_SIZE[1], tileSize: [16, 16] });
    const surface = createCfeSurface(this.grid);

    this.background = new CfeBackground(this.grid, surface, sprites);
  }

  size() {
    return CFE_SIZE;
  }

  getBackground() {
    return this.background;
  }
}

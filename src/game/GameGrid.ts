import { Coord } from "./Coord";

interface GameGridConfig {
  gridSize: Coord;
  tileSize: Coord;
}

export class GameGrid {
  private gridSize: Coord;
  private tileSize: Coord;

  constructor(cfg: GameGridConfig) {
    this.gridSize = cfg.gridSize;
    this.tileSize = cfg.tileSize;
  }

  tileToScreenCoord([x, y]: Coord): Coord {
    return [x * this.tileSize[0], y * this.tileSize[1]];
  }

  screenToTileCoord([x, y]: Coord): Coord {
    return [Math.floor(x / this.tileSize[0]), Math.floor(y / this.tileSize[0])];
  }

  size() {
    return this.gridSize;
  }
}

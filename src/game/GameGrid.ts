import { Coord } from "./Coord";

interface GameGridConfig {
  rows: number;
  cols: number;
  tileSize: Coord;
}

export class GameGrid {
  private rows: number;
  private cols: number;
  private tileSize: Coord;

  constructor(cfg: GameGridConfig) {
    this.rows = cfg.rows;
    this.cols = cfg.cols;
    this.tileSize = cfg.tileSize;
  }

  forEachTile(callback: (colRow: Coord) => void) {
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        callback([x, y]);
      }
    }
  }

  allTiles(): Coord[] {
    const tiles: Coord[] = [];
    this.forEachTile((tile) => tiles.push(tile));
    return tiles;
  }

  tileToScreenCoord([x, y]: Coord): Coord {
    return [x * this.tileSize[0], y * this.tileSize[1]];
  }

  getRows() {
    return this.rows;
  }

  getCols() {
    return this.cols;
  }
}

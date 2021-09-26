import { Coord, coordDiv, coordMul } from "./Coord";

interface GameGridConfig {
  gridSize: Coord;
}

const TILE_SIZE: Coord = [16, 16];

export class GameGrid {
  private gridSize: Coord;

  constructor(cfg: GameGridConfig) {
    this.gridSize = cfg.gridSize;
  }

  size() {
    return this.gridSize;
  }
}

export function tileToScreenCoord(tileCoord: Coord): Coord {
  return coordMul(tileCoord, TILE_SIZE);
}

export function screenToTileCoord(screenCoord: Coord): Coord {
  return coordDiv(screenCoord, TILE_SIZE).map(Math.floor) as Coord;
}

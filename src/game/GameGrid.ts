import { Coord, coordDiv, coordMul } from "./Coord";

const TILE_SIZE: Coord = [16, 16];

export function tileToScreenCoord(tileCoord: Coord): Coord {
  return coordMul(tileCoord, TILE_SIZE);
}

export function screenToTileCoord(screenCoord: Coord): Coord {
  return coordDiv(screenCoord, TILE_SIZE).map(Math.floor) as Coord;
}

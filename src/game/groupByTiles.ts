import { Coord, coordAdd, Rect, screenToFractionalTileCoord, screenToTileCoord } from "./Coord";

type ObjectWithBounds = { getCoord: () => Coord; boundingBox: () => Rect }

type GroupMap<T> = Record<string, T[]>;

export function groupByTiles<T extends ObjectWithBounds>(objects: T[]): GroupMap<T> {
  const tileMap: GroupMap<T> = {};
  objects.forEach((obj) => {
    tilesCoveredBy(obj).forEach((tileCoord) => {
      const key = tileCoord.join(",");
      const array = tileMap[key] ?? [];
      array.push(obj);
      tileMap[key] = array;
    });
  });

  return tileMap;
}

export function tilesCoveredBy<T extends ObjectWithBounds>(obj: T): Coord[] {
  const { coord: offset, size } = obj.boundingBox();
  const coord = coordAdd(obj.getCoord(), offset);
  const topLeftTile = screenToTileCoord(coord);
  const bottomRightTile = screenToFractionalTileCoord(coordAdd(coord, size)).map(Math.ceil) as Coord;

  const tiles: Coord[] = [];
  for (let x = topLeftTile[0]; x < bottomRightTile[0]; x++) {
    for (let y = topLeftTile[1]; y < bottomRightTile[1]; y++) {
      tiles.push([x, y]);
    }
  }
  return tiles;
}

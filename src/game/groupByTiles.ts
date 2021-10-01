import { Coord, coordAdd, Rect, screenToFractionalTileCoord, screenToTileCoord } from "./Coord";

type ObjectWithBounds = { getCoord: () => Coord; boundingBox: () => Rect }

type GroupMap<T> = Record<string, T[]>;

export function groupByTiles<T extends ObjectWithBounds>(objects: T[]): GroupMap<T> {
  const tileMap: GroupMap<T> = {};
  objects.forEach((obj) => {
    const { coord: offset, size } = obj.boundingBox();
    const coord = coordAdd(obj.getCoord(), offset);
    const topLeftTile = screenToTileCoord(coord);
    const bottomRightTile = screenToFractionalTileCoord(coordAdd(coord, size)).map(Math.ceil) as Coord;

    for (let dx = topLeftTile[0]; dx < bottomRightTile[0]; dx++) {
      for (let dy = topLeftTile[1]; dy < bottomRightTile[1]; dy++) {
        const key = [dx, dy].join(",");
        const array = tileMap[key] ?? [];
        array.push(obj);
        tileMap[key] = array;
      }
    }
  });

  return tileMap;
}

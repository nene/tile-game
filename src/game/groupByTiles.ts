import { Coord, coordAdd, screenToTileCoord } from "./Coord";

type ObjectWithTileSize = { getCoord: () => Coord, tileSize: () => Coord }

type GroupMap<T> = Record<string, T[]>;

export function groupByTiles<T extends ObjectWithTileSize>(objects: T[]): GroupMap<T> {
  const tileMap: GroupMap<T> = {};
  objects.forEach((obj) => {
    const tileCoord = screenToTileCoord(obj.getCoord());
    for (let dx = 0; dx < obj.tileSize()[0]; dx++) {
      for (let dy = 0; dy < obj.tileSize()[1]; dy++) {
        const key = coordAdd(tileCoord, [dx, dy]).join(",");
        const array = tileMap[key] ?? [];
        array.push(obj);
        tileMap[key] = array;
      }
    }
  });

  return tileMap;
}

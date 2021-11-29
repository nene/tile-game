import locationsJson from "./locations.json";

export interface Level {
  identifier: string;
  pxWid: number;
  pxHei: number;
  layerInstances: Layer[];
}

export type Layer = IntLayer | TileLayer;

interface BaseLayer {
  __identifier: string;
  __cWid: number;
  __cHei: number;
}

export interface IntLayer extends BaseLayer {
  __type: "IntGrid";
  intGridCsv: number[];
}

export interface TileLayer extends BaseLayer {
  __type: "Tiles";
  gridTiles: Tile[];
}

type Coord = [number, number];

export interface Tile {
  px: Coord;
  src: Coord;
  f: number;
  t: number;
  d: number[];
}

export function getLevel(name: string): Level {
  const level = locationsJson.levels.find((level) => level.identifier === name) as Level | undefined;
  if (!level) {
    throw new Error(`Unknown level name: ${name}`);
  }
  return level;
}

export function isTileLayer(layer: Layer): layer is TileLayer {
  return layer.__type === "Tiles";
}

export function isIntLayer(layer: Layer): layer is IntLayer {
  return layer.__type === "IntGrid";
}

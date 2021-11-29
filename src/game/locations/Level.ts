import locationsJson from "./locations.json";

export interface Level {
  identifier: string;
  pxWid: number;
  pxHei: number;
  layerInstances: Layer[];
}

export type Layer = IntLayer | TileLayer | EntityLayer;

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

export interface EntityLayer extends BaseLayer {
  __type: "Entities";
  entityInstances: Entity[];
}

type Coord = [number, number];

export interface Tile {
  px: Coord;
  src: Coord;
  f: number;
  t: number;
  d: number[];
}

export interface Entity {
  __identifier: string;
  px: Coord;
  fieldInstances: EntityField[];
}

export interface EntityField {
  __identifier: string;
  __type: string;
  __value: string;
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

export function isBackgroundLayer(layer: Layer): layer is TileLayer {
  return isTileLayer(layer) && layer.__identifier === "Background";
}

export function isForegroundLayer(layer: Layer): layer is TileLayer {
  return isTileLayer(layer) && layer.__identifier === "Foreground";
}

export function isIntLayer(layer: Layer): layer is IntLayer {
  return layer.__type === "IntGrid";
}

export function isWallLayer(layer: Layer): layer is IntLayer {
  return isIntLayer(layer) && layer.__identifier === "Walls";
}

export function isEntityLayer(layer: Layer): layer is EntityLayer {
  return layer.__type === "Entities";
}

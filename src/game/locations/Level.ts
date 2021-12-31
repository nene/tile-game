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

export interface AutoTileLayer extends IntLayer {
  __type: "IntGrid";
  intGridCsv: number[];
  autoLayerTiles: Tile[];
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
  width: number;
  height: number;
  fieldInstances: EntityField[];
}

export interface EnumEntityField {
  __identifier: string;
  __type: "LocalEnum.Painting" | "LocalEnum.SittingDir" | "LocalEnum.FenceType";
  __value: string;
}

export interface IntEntityField {
  __identifier: string;
  __type: "Int";
  __value: number;
}

export type EntityField = EnumEntityField | IntEntityField;

export const isIntEntityField = (field: EntityField): field is IntEntityField => field.__type === "Int";

export const isEnumEntityField = (field: EntityField): field is IntEntityField => !isIntEntityField(field);

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

export function isTileLayerWithName(name: string) {
  return (layer: Layer): layer is TileLayer => {
    return isTileLayer(layer) && layer.__identifier === name;
  };
}

export function isIntLayer(layer: Layer): layer is IntLayer {
  return layer.__type === "IntGrid";
}

export function isWallLayer(layer: Layer): layer is IntLayer {
  return isIntLayer(layer) && layer.__identifier === "Walls";
}

export function isGrassLayer(layer: Layer): layer is AutoTileLayer {
  return isIntLayer(layer) && layer.__identifier === "Grass";
}

export function isEntityLayer(layer: Layer): layer is EntityLayer {
  return layer.__type === "Entities";
}

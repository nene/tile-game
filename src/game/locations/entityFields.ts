import { Coord } from "../Coord";
import { EntityField } from "./Level";

export function fieldExists(id: string, fields: EntityField[]): boolean {
  return fields.some((f) => f.__identifier === id && f.__value !== undefined && f.__value !== null);
}

export function readIntField(id: string, fields: EntityField[]): number {
  const field = lookupField(id, fields);
  if (typeof field.__value !== "number") {
    throw new Error(`Field ${id} is not a number`);
  }
  return field.__value;
}

export function readStringField(id: string, fields: EntityField[]): string {
  const field = lookupField(id, fields);
  if (typeof field.__value !== "string") {
    throw new Error(`Field ${id} is not a string`);
  }
  return field.__value;
}

export function readCoordField(id: string, fields: EntityField[]): Coord {
  const field = lookupField(id, fields);
  if (!(field.__value instanceof Object && typeof field.__value.cx === "number" && typeof field.__value.cy === "number")) {
    throw new Error(`Field ${id} is not a point`);
  }
  return [field.__value.cx, field.__value.cy];
}

export function readMappedField<T>(id: string, map: Record<string, T>, fields: EntityField[]): T {
  const field = lookupField(id, fields);
  if (typeof field.__value !== "string") {
    throw new Error(`Field ${id} is not a string value and can't be mapped`);
  }
  if (map[field.__value] === undefined) {
    throw new Error(`The field ${id} has value ${map[field.__value]}, which isn't defined in the map`);
  }
  return map[field.__value];
}

function lookupField(id: string, fields: EntityField[]): EntityField {
  const field = fields.find((f) => f.__identifier === id);
  if (!field) {
    throw new Error(`Field ${id} not found`);
  }
  return field;
}

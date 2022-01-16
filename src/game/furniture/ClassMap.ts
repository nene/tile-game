import { Coord } from "../Coord";
import { GameObject } from "../GameObject";

export type ClassMap = Record<string, { new(coord: Coord): GameObject }>;

export type VariantClassMap = Record<string, { new(coord: Coord, variant?: number): GameObject }>;

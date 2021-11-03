import { Coord } from "../Coord";

export interface FlagColor {
  name: string;
  code: string | Coord;
}

const colorDef = (color: FlagColor) => color;

const colors = {
  kirsipruun: colorDef({ name: "kirsipruun", code: "#8c3818" }),
  punane: colorDef({ name: "punane", code: "#a83324" }),
  helebeez: colorDef({ name: "helebeež", code: "#eae2cc" }),
  kuldne: colorDef({ name: "kuldne", code: [0, 0] as Coord }),
  kollane: colorDef({ name: "kollane", code: "#bfb44a" }),
  roheline: colorDef({ name: "roheline", code: "#156323" }),
  helesinine: colorDef({ name: "helesinine", code: "#61aadb" }),
  sinine: colorDef({ name: "sinine", code: "#444eb8" }),
  lilla: colorDef({ name: "lilla", code: "#834d9d" }),
  violett: colorDef({ name: "violett", code: "#84336f" }),
  roosa: colorDef({ name: "roosa", code: "#eb70af" }),
  hobedane: colorDef({ name: "hõbedane", code: [1, 0] as Coord }),
  valge: colorDef({ name: "valge", code: "#c9c9c9" }),
  must: colorDef({ name: "must", code: "#000" }),
};

export type ColorName = keyof typeof colors;

export function getFlagColor(name: ColorName): FlagColor {
  return colors[name];
}

export function makeFlag(...names: ColorName[]): FlagColor[] {
  return names.map(getFlagColor);
}

export function allFlagColors(): FlagColor[] {
  return Object.values(colors);
}

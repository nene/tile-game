export interface FlagColor {
  name: string;
  code: string;
}

const colors = {
  kirsipruun: { name: "kirsipruun", code: "#8c3818" },
  punane: { name: "punane", code: "#a83324" },
  // gold
  kollane: { name: "kollane", code: "#bfb44a" },
  roheline: { name: "roheline", code: "#156323" },
  sinine: { name: "sinine", code: "#444eb8" },
  lilla: { name: "lilla", code: "#834d9d" },
  violett: { name: "violett", code: "#84336f" },
  roosa: { name: "roosa", code: "#eb70af" },
  // silver
  valge: { name: "valge", code: "#c9c9c9" },
  must: { name: "must", code: "#000" },
};

export type ColorName = keyof typeof colors;

export function getFlagColor(name: ColorName): FlagColor {
  return colors[name];
}

export function makeFlag(...names: ColorName[]): FlagColor[] {
  return names.map(getFlagColor);
}

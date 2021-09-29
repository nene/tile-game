export interface Beer {
  name: string;
  spriteIndex: number;
  alcohol: number; // How much alcohol it has (ABV %)
  foamStrength: number; // How much foam does it generate when pouring (0 ... 1)
  capStrength: number; // How hard is it to open the bottle (0 ... 1)
}

// Typecheck helper for the below definitions
const beerDef = (x: Beer) => x;

const beers = {
  "alexander": beerDef({
    name: "Sass",
    spriteIndex: 1,
    alcohol: 5.2,
    foamStrength: 2 / 5,
    capStrength: 2 / 5,
  }),
  "heineken": beerDef({
    name: "Heineken",
    spriteIndex: 2,
    alcohol: 5,
    foamStrength: 1 / 5,
    capStrength: 3 / 5,
  }),
  "special": beerDef({
    name: "Special",
    spriteIndex: 3,
    alcohol: 5.2,
    foamStrength: 1 / 5,
    capStrength: 3 / 5,
  }),
  "pilsner": beerDef({
    name: "Pilku",
    spriteIndex: 4,
    alcohol: 4.2,
    foamStrength: 1 / 5,
    capStrength: 1 / 5,
  }),
  "tommu-hiid": beerDef({
    name: "Tõmmu hiid",
    spriteIndex: 5,
    alcohol: 4.7,
    foamStrength: 4 / 5,
    capStrength: 2 / 5,
  }),
  "kriek": beerDef({
    name: "Kriek",
    spriteIndex: 6,
    alcohol: 3.5,
    foamStrength: 4 / 5,
    capStrength: 5 / 5,
  }),
  "limonaad": beerDef({
    name: "Limpa",
    spriteIndex: 7,
    alcohol: 0,
    foamStrength: 0,
    capStrength: 0,
  }),
  "paulaner": beerDef({
    name: "Hefeweisen",
    spriteIndex: 8,
    alcohol: 5.5,
    foamStrength: 4 / 5,
    capStrength: 4 / 5,
  }),
  "bock": beerDef({
    name: "Double Bock",
    spriteIndex: 9,
    alcohol: 7,
    foamStrength: 3 / 5,
    capStrength: 3 / 5,
  }),
  "porter": beerDef({
    name: "Sokolaadi porter",
    spriteIndex: 10,
    alcohol: 6.9,
    foamStrength: 5 / 5,
    capStrength: 2 / 5,
  }),
}

export type BeerType = keyof typeof beers;

export function getBeer(type: BeerType): Beer {
  return beers[type];
}

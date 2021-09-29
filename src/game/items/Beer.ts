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
}

export type BeerType = keyof typeof beers;

export function getBeer(type: BeerType): Beer {
  return beers[type];
}

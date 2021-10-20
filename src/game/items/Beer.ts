export interface Beer {
  name: string;
  description: string;
  price: number;
  bottleSpriteIndex: number;
  alcohol: number; // How much alcohol it has (ABV %)
  foam: Foaminess; // How much foam does it generate when pouring
  capStrength: number; // How hard is it to open the bottle (0 ... 1)
  color: BeerColor;
}

export enum BeerColor {
  water = 0,
  light = 1,
  dark = 2,
  red = 3,
}

export interface Foaminess {
  min: number;
  max: number;
}

const foamLevel: Foaminess[] = [
  { min: 0.00, max: 0.00 }, // #0
  { min: 0.00, max: 0.10 }, // #1
  { min: 0.05, max: 0.20 }, // #2
  { min: 0.10, max: 0.40 }, // #3
  { min: 0.15, max: 0.60 }, // #4
  { min: 0.20, max: 0.90 }, // #5
];

// Typecheck helper for the below definitions
const beerDef = (x: Beer) => x;

const beers = {
  "water": beerDef({
    name: "Vesi",
    description: "Seda tuleb kraanist lõputult.",
    price: 0,
    bottleSpriteIndex: 0,
    alcohol: 0,
    foam: foamLevel[0],
    capStrength: 0,
    color: BeerColor.water,
  }),
  "alexander": beerDef({
    name: "Alexander",
    description: "Sassi läheb kui loed mitu pudelit sai joodud.",
    price: 2,
    bottleSpriteIndex: 1,
    alcohol: 5.2,
    foam: foamLevel[2],
    capStrength: 2,
    color: BeerColor.light,
  }),
  "heineken": beerDef({
    name: "Heineken",
    description: "Väljamaine rüübe rohelises pudelis.",
    price: 3,
    bottleSpriteIndex: 2,
    alcohol: 5,
    foam: foamLevel[1],
    capStrength: 3,
    color: BeerColor.light,
  }),
  "special": beerDef({
    name: "Special",
    description: "Eriline jook puhuks kui paremat pole võtta.",
    price: 3,
    bottleSpriteIndex: 3,
    alcohol: 5.2,
    foam: foamLevel[1],
    capStrength: 3,
    color: BeerColor.light,
  }),
  "pilsner": beerDef({
    name: "Pilsner",
    description: "EÜSnikute lemmiknaps.",
    price: 1,
    bottleSpriteIndex: 4,
    alcohol: 4.2,
    foam: foamLevel[1],
    capStrength: 1,
    color: BeerColor.light,
  }),
  "tommu-hiid": beerDef({
    name: "Tõmmu hiid",
    description: "Vana vilistlase rammujook.",
    price: 4,
    bottleSpriteIndex: 5,
    alcohol: 4.7,
    foam: foamLevel[4],
    capStrength: 2,
    color: BeerColor.dark,
  }),
  "kriek": beerDef({
    name: "Kriek",
    description: "Seda hõrku nestet libistavad ka naiskorporandid.",
    price: 6,
    bottleSpriteIndex: 6,
    alcohol: 3.5,
    foam: foamLevel[4],
    capStrength: 5,
    color: BeerColor.red,
  }),
  "limonaad": beerDef({
    name: "Limpa limonaad",
    description: "See magus jook kipub šoppeni põhja kleepuma.",
    price: 1,
    bottleSpriteIndex: 7,
    alcohol: 0,
    foam: foamLevel[0],
    capStrength: 0,
    color: BeerColor.light,
  }),
  "paulaner": beerDef({
    name: "Hefeweisen",
    description: "Saksamaine nisumärjuke (bratwursti kõrvale).",
    price: 5,
    bottleSpriteIndex: 8,
    alcohol: 5.5,
    foam: foamLevel[4],
    capStrength: 4,
    color: BeerColor.light,
  }),
  "bock": beerDef({
    name: "Double Bock",
    description: "Revelia kvarteriturniiri erikülaline.",
    price: 3,
    bottleSpriteIndex: 9,
    alcohol: 7,
    foam: foamLevel[3],
    capStrength: 3,
    color: BeerColor.light,
  }),
  "porter": beerDef({
    name: "Šokolaadi porter",
    description: "Väidetavalt muudab suure mehe päkapikuks.",
    price: 4,
    bottleSpriteIndex: 10,
    alcohol: 6.9,
    foam: foamLevel[5],
    capStrength: 2,
    color: BeerColor.dark,
  }),
}

export type BeerType = keyof typeof beers;

export function getBeer(type: BeerType): Beer {
  return beers[type];
}

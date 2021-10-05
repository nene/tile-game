export interface Beer {
  name: string;
  description: string;
  price: number;
  spriteIndex: number;
  alcohol: number; // How much alcohol it has (ABV %)
  foam: Foaminess; // How much foam does it generate when pouring
  capStrength: number; // How hard is it to open the bottle (0 ... 1)
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
  "alexander": beerDef({
    name: "Alexander",
    description: "Sassi läheb kui loed mitu pudelit sai joodud.",
    price: 2,
    spriteIndex: 1,
    alcohol: 5.2,
    foam: foamLevel[2],
    capStrength: 2 / 5,
  }),
  "heineken": beerDef({
    name: "Heineken",
    description: "Väljamaine rüübe rohelises pudelis.",
    price: 3,
    spriteIndex: 2,
    alcohol: 5,
    foam: foamLevel[1],
    capStrength: 3 / 5,
  }),
  "special": beerDef({
    name: "Special",
    description: "Eriline jook puhuks kui paremat pole võtta.",
    price: 3,
    spriteIndex: 3,
    alcohol: 5.2,
    foam: foamLevel[1],
    capStrength: 3 / 5,
  }),
  "pilsner": beerDef({
    name: "Pilsner",
    description: "EÜSnikute lemmiknaps.",
    price: 1,
    spriteIndex: 4,
    alcohol: 4.2,
    foam: foamLevel[1],
    capStrength: 1 / 5,
  }),
  "tommu-hiid": beerDef({
    name: "Tõmmu hiid",
    description: "Vana vilistlase rammujook.",
    price: 4,
    spriteIndex: 5,
    alcohol: 4.7,
    foam: foamLevel[4],
    capStrength: 2 / 5,
  }),
  "kriek": beerDef({
    name: "Kriek",
    description: "Seda hõrku nestet libistavad ka naiskorporandid.",
    price: 6,
    spriteIndex: 6,
    alcohol: 3.5,
    foam: foamLevel[4],
    capStrength: 5 / 5,
  }),
  "limonaad": beerDef({
    name: "Limpa limonaad",
    description: "See magus jook kipub shoppeni põhja kleepuma.",
    price: 1,
    spriteIndex: 7,
    alcohol: 0,
    foam: foamLevel[0],
    capStrength: 0,
  }),
  "paulaner": beerDef({
    name: "Hefeweisen",
    description: "Saksamaine nisumärjuke (bratwursti kõrvale).",
    price: 5,
    spriteIndex: 8,
    alcohol: 5.5,
    foam: foamLevel[4],
    capStrength: 4 / 5,
  }),
  "bock": beerDef({
    name: "Double Bock",
    description: "Revelia kvarteriturniiri erikülaline.",
    price: 3,
    spriteIndex: 9,
    alcohol: 7,
    foam: foamLevel[3],
    capStrength: 3 / 5,
  }),
  "porter": beerDef({
    name: "Sokolaadi porter",
    description: "Väidetavalt muudab suure mehe päkapikuks.",
    price: 4,
    spriteIndex: 10,
    alcohol: 6.9,
    foam: foamLevel[5],
    capStrength: 2 / 5,
  }),
}

export type BeerType = keyof typeof beers;

export function getBeer(type: BeerType): Beer {
  return beers[type];
}

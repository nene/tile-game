export interface Drink {
  name: string;
  description: string;
  price: number;
  bottleSpriteIndex: number;
  alcohol: number; // How much alcohol it has (ABV %)
  foam: Foaminess; // How much foam does it generate when pouring
  capStrength: number; // How hard is it to open the bottle (0 ... 1)
  color: DrinkColor;
}

export enum DrinkColor {
  water = 0,
  lemonade = 1,
  light = 2,
  dark = 3,
  red = 4,
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
const drinkDef = (x: Drink) => x;

const drinks = {
  "water": drinkDef({
    name: "Vesi",
    description: "Seda tuleb kraanist lõputult.",
    price: 0,
    bottleSpriteIndex: 11,
    alcohol: 0,
    foam: foamLevel[0],
    capStrength: 0,
    color: DrinkColor.water,
  }),
  "alexander": drinkDef({
    name: "Alexander",
    description: "Sassi läheb kui loed mitu pudelit sai joodud.",
    price: 2,
    bottleSpriteIndex: 1,
    alcohol: 2, // 5.2,
    foam: foamLevel[2],
    capStrength: 2,
    color: DrinkColor.light,
  }),
  "heineken": drinkDef({
    name: "Heineken",
    description: "Väljamaine rüübe rohelises pudelis.",
    price: 3,
    bottleSpriteIndex: 2,
    alcohol: 1.5, // 5,
    foam: foamLevel[1],
    capStrength: 3,
    color: DrinkColor.light,
  }),
  "special": drinkDef({
    name: "Special",
    description: "Eriline jook puhuks kui paremat pole võtta.",
    price: 3,
    bottleSpriteIndex: 3,
    alcohol: 2, // 5.2,
    foam: foamLevel[1],
    capStrength: 3,
    color: DrinkColor.light,
  }),
  "pilsner": drinkDef({
    name: "Pilsner",
    description: "EÜSnikute lemmiknaps.",
    price: 1,
    bottleSpriteIndex: 4,
    alcohol: 1, // 4.2,
    foam: foamLevel[1],
    capStrength: 1,
    color: DrinkColor.light,
  }),
  "tommu-hiid": drinkDef({
    name: "Tõmmu hiid",
    description: "Vana vilistlase rammujook.",
    price: 4,
    bottleSpriteIndex: 5,
    alcohol: 2, // 4.7,
    foam: foamLevel[4],
    capStrength: 2,
    color: DrinkColor.dark,
  }),
  "kriek": drinkDef({
    name: "Kriek",
    description: "Seda hõrku nestet libistavad ka naiskorporandid.",
    price: 6,
    bottleSpriteIndex: 6,
    alcohol: 0.8, // 3.5,
    foam: foamLevel[4],
    capStrength: 5,
    color: DrinkColor.red,
  }),
  "limonaad": drinkDef({
    name: "Limpa limonaad",
    description: "See magus jook kipub šoppeni põhja kleepuma.",
    price: 1,
    bottleSpriteIndex: 7,
    alcohol: 0,
    foam: foamLevel[0],
    capStrength: 0,
    color: DrinkColor.lemonade,
  }),
  "paulaner": drinkDef({
    name: "Hefeweisen",
    description: "Saksamaine nisumärjuke (bratwursti kõrvale).",
    price: 5,
    bottleSpriteIndex: 8,
    alcohol: 2.5, // 5.5,
    foam: foamLevel[4],
    capStrength: 4,
    color: DrinkColor.light,
  }),
  "bock": drinkDef({
    name: "Double Bock",
    description: "Revelia kvarteriturniiri erikülaline.",
    price: 3,
    bottleSpriteIndex: 9,
    alcohol: 4, // 7,
    foam: foamLevel[3],
    capStrength: 3,
    color: DrinkColor.light,
  }),
  "porter": drinkDef({
    name: "Šokolaadi porter",
    description: "Väidetavalt muudab suure mehe päkapikuks.",
    price: 4,
    bottleSpriteIndex: 10,
    alcohol: 4, // 6.9,
    foam: foamLevel[5],
    capStrength: 2,
    color: DrinkColor.dark,
  }),
}

export type DirnkType = keyof typeof drinks;

export function getDrink(type: DirnkType): Drink {
  return drinks[type];
}

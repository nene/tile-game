import { Drink, getDrink } from "../items/Drink";
import { SpriteName } from "../sprites/SpriteLibrary";

export interface Character {
  name: string;
  spriteSet: SpriteName;
  favoriteDrinks: Drink[];
  hatedDrinks: Drink[];
  spawnTime: number;
}

const charDef = (o: Character) => o;

const characterDefs = {
  "koppel": charDef({
    name: "ksv! Jakob Koppel",
    spriteSet: "cfe-ksv-2",
    spawnTime: 1 * 10,
    favoriteDrinks: [getDrink("bock"), getDrink("pilsner")],
    hatedDrinks: [getDrink("limonaad"), getDrink("paulaner"), getDrink("porter")],
  }),
  "sass": charDef({
    name: "vil! Aleksander Popov",
    spriteSet: "cfe-ksv-1",
    spawnTime: 5 * 10,
    favoriteDrinks: [getDrink("alexander"), getDrink("tommu-hiid")],
    hatedDrinks: [getDrink("porter"), getDrink("limonaad")],
  }),
  "pikmets": charDef({
    name: "bvil! Richard Pikmets",
    spriteSet: "cfe-ksv-3",
    spawnTime: 20 * 10,
    favoriteDrinks: [getDrink("special"), getDrink("kriek")],
    hatedDrinks: [getDrink("alexander"), getDrink("pilsner")],
  }),
  "otto": charDef({
    name: "vil! Otto Pukk",
    spriteSet: "cfe-ksv-4",
    spawnTime: 30 * 10,
    favoriteDrinks: [getDrink("paulaner"), getDrink("porter")],
    hatedDrinks: [getDrink("kriek"), getDrink("limonaad")],
  }),
};

export type CharacterName = keyof typeof characterDefs;

export function getCharacter(name: CharacterName): Character {
  return characterDefs[name];
}

export function getAllCharacters(): Character[] {
  return Object.values(characterDefs);
}

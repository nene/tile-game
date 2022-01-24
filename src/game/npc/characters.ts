import { getDrink } from "../items/Drink";
import { AcademicCharacter } from "./AcademicCharacter";
import { Character } from "./Character";
import { FeenoksLadyCharacter } from "./FeenoksLadyCharacter";

const characters = {
  "koppel": new AcademicCharacter({
    name: "ksv! Jakob Koppel",
    spriteName: "cfe-ksv-koppel",
    days: {
      2: { spawnTime: 1 * 10 },
    },
    favoriteDrinks: [getDrink("bock"), getDrink("pilsner")],
    hatedDrinks: [getDrink("limonaad"), getDrink("paulaner"), getDrink("porter")],
  }),
  "sass": new AcademicCharacter({
    name: "vil! Aleksander Popov",
    spriteName: "cfe-ksv-sass",
    moveAnimationFrames: {
      down: [[0, 0]],
      up: [[3, 0]],
      left: [[4, 0]],
      right: [[5, 0]],
    },
    days: {
      2: { spawnTime: 5 * 10 },
    },
    favoriteDrinks: [getDrink("alexander"), getDrink("tommu-hiid")],
    hatedDrinks: [getDrink("porter"), getDrink("limonaad")],
  }),
  "pikmets": new AcademicCharacter({
    name: "b!vil! Richard Pikmets",
    spriteName: "cfe-ksv-pikmets",
    days: {
      2: { spawnTime: 20 * 10 },
    },
    favoriteDrinks: [getDrink("special"), getDrink("kriek")],
    hatedDrinks: [getDrink("alexander"), getDrink("pilsner")],
  }),
  "otto": new AcademicCharacter({
    name: "vil! Otto Pukk",
    spriteName: "cfe-ksv-otto",
    days: {
      2: { spawnTime: 30 * 10 },
    },
    favoriteDrinks: [getDrink("paulaner"), getDrink("porter")],
    hatedDrinks: [getDrink("kriek"), getDrink("limonaad")],
  }),
  "vanamees": new AcademicCharacter({
    name: "Vanamees",
    spriteName: "cfe-ksv-karl",
    days: {
      1: { spawnTime: 1 * 10 },
      2: { spawnTime: 32 * 10 },
    },
    favoriteDrinks: [getDrink("alexander"), getDrink("pilsner"), getDrink("tommu-hiid")],
    hatedDrinks: [getDrink("bock")],
  }),
  "kark": new AcademicCharacter({
    name: "vil! Raul Tõniste",
    spriteName: "cfe-ksv-kark",
    days: {
      2: { spawnTime: 40 * 10 },
    },
    favoriteDrinks: [getDrink("paulaner")],
    hatedDrinks: [getDrink("porter")],
  }),
  "feenoks-lady": new FeenoksLadyCharacter(),
};

export type CharacterName = keyof typeof characters;

export function getCharacter(name: CharacterName): Character {
  return characters[name];
}

export function getAllCharacters(): Character[] {
  return Object.values(characters);
}

export function resetCharactersForDay(n: number) {
  getAllCharacters().forEach((char) => char.resetForDay(n));
}

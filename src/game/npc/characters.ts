import { getDrink } from "../items/Drink";
import { AcademicCharacter } from "./AcademicCharacter";
import { Character } from "./Character";
import { FeenoksLadyCharacter } from "./FeenoksLadyCharacter";
import { readAsepriteAnimation } from "../sprites/readAsepriteAnimation";
import koppelJson from "../sprites/data/cfe-ksv-koppel.json";
import sassJson from "../sprites/data/cfe-ksv-sass.json";
import pikmetsJson from "../sprites/data/cfe-ksv-pikmets.json";
import ottoJson from "../sprites/data/cfe-ksv-otto.json";
import karlJson from "../sprites/data/cfe-ksv-karl.json";
import karkJson from "../sprites/data/cfe-ksv-kark.json";

const characters = {
  "koppel": new AcademicCharacter({
    json: koppelJson,
    name: "ksv! Jakob Koppel",
    spriteName: "cfe-ksv-koppel",
    moveAnimationFrames: {
      down: readAsepriteAnimation("w-down", koppelJson),
      up: readAsepriteAnimation("w-up", koppelJson),
      left: readAsepriteAnimation("w-left", koppelJson),
      right: readAsepriteAnimation("w-right", koppelJson),
    },
    days: {
      2: { spawnTime: 1 * 10 },
    },
    favoriteDrinks: [getDrink("bock"), getDrink("pilsner")],
    hatedDrinks: [getDrink("limonaad"), getDrink("paulaner"), getDrink("porter")],
  }),
  "sass": new AcademicCharacter({
    json: sassJson,
    name: "vil! Aleksander Popov",
    spriteName: "cfe-ksv-sass",
    moveAnimationFrames: {
      down: readAsepriteAnimation("w-down", sassJson),
      up: readAsepriteAnimation("w-up", sassJson),
      left: readAsepriteAnimation("w-left", sassJson),
      right: readAsepriteAnimation("w-right", sassJson),
    },
    days: {
      2: { spawnTime: 5 * 10 },
    },
    favoriteDrinks: [getDrink("alexander"), getDrink("tommu-hiid")],
    hatedDrinks: [getDrink("porter"), getDrink("limonaad")],
  }),
  "pikmets": new AcademicCharacter({
    json: pikmetsJson,
    name: "b!vil! Richard Pikmets",
    spriteName: "cfe-ksv-pikmets",
    days: {
      2: { spawnTime: 20 * 10 },
    },
    favoriteDrinks: [getDrink("special"), getDrink("kriek")],
    hatedDrinks: [getDrink("alexander"), getDrink("pilsner")],
  }),
  "otto": new AcademicCharacter({
    json: ottoJson,
    name: "vil! Otto Pukk",
    spriteName: "cfe-ksv-otto",
    days: {
      2: { spawnTime: 30 * 10 },
    },
    favoriteDrinks: [getDrink("paulaner"), getDrink("porter")],
    hatedDrinks: [getDrink("kriek"), getDrink("limonaad")],
  }),
  "vanamees": new AcademicCharacter({
    json: karlJson,
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
    json: karkJson,
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

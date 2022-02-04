import { getDrink } from "../items/Drink";
import { AcademicCharacter } from "./AcademicCharacter";
import { Character } from "./Character";
import { FeenoksLadyCharacter } from "./FeenoksLadyCharacter";
import { readAsepriteAnimation } from "../sprites/readAsepriteAnimation";
import { Facing } from "./Facing";
import { FramesDef } from "../sprites/SpriteAnimation";
import { AsepriteFile } from "../sprites/Aseprite";
import koppelJson from "../sprites/data/cfe-ksv-koppel.json";
import sassJson from "../sprites/data/cfe-ksv-sass.json";
import pikmetsJson from "../sprites/data/cfe-ksv-pikmets.json";
import ottoJson from "../sprites/data/cfe-ksv-otto.json";
import karlJson from "../sprites/data/cfe-ksv-karl.json";
import karkJson from "../sprites/data/cfe-ksv-kark.json";

function readWalkAnimations(json: AsepriteFile): Record<Facing, FramesDef> {
  return {
    down: readAsepriteAnimation("w-down", json),
    up: readAsepriteAnimation("w-up", json),
    left: readAsepriteAnimation("w-left", json),
    right: readAsepriteAnimation("w-right", json),
  };
}

function readStandAnimations(json: AsepriteFile): Record<Facing, FramesDef> {
  return {
    down: readAsepriteAnimation("D", json),
    up: readAsepriteAnimation("U", json),
    left: readAsepriteAnimation("L", json),
    right: readAsepriteAnimation("R", json),
  };
}

const characters = {
  "koppel": new AcademicCharacter({
    json: koppelJson,
    name: "ksv! Jakob Koppel",
    spriteName: "cfe-ksv-koppel",
    moveAnimationFrames: readWalkAnimations(koppelJson),
    days: {
      2: { spawnTime: 1 * 10 },
    },
    favoriteDrinks: [getDrink("bock"), getDrink("pilsner")],
    hatedDrinks: [getDrink("limonaad"), getDrink("paulaner"), getDrink("porter")],
    drinkingSpeed: {
      idleTicks: 10,
      drinkTicks: 6,
    },
    skills: { opening: true, pouring: false },
  }),
  "sass": new AcademicCharacter({
    json: sassJson,
    name: "vil! Aleksandr Popov",
    spriteName: "cfe-ksv-sass",
    moveAnimationFrames: readWalkAnimations(sassJson),
    days: {
      2: { spawnTime: 5 * 10 },
    },
    favoriteDrinks: [getDrink("alexander"), getDrink("tommu-hiid")],
    hatedDrinks: [getDrink("porter"), getDrink("limonaad")],
    skills: { opening: true, pouring: true },
  }),
  "pikmets": new AcademicCharacter({
    json: pikmetsJson,
    name: "b!vil! Richard Pikmets",
    spriteName: "cfe-ksv-pikmets",
    moveAnimationFrames: readWalkAnimations(pikmetsJson),
    days: {
      2: { spawnTime: 20 * 10 },
    },
    favoriteDrinks: [getDrink("special"), getDrink("kriek")],
    hatedDrinks: [getDrink("alexander"), getDrink("pilsner")],
    skills: { opening: true, pouring: true },
  }),
  "otto": new AcademicCharacter({
    json: ottoJson,
    name: "vil! Otto Pukk",
    spriteName: "cfe-ksv-otto",
    moveAnimationFrames: readStandAnimations(ottoJson),
    days: {
      2: { spawnTime: 30 * 10 },
    },
    favoriteDrinks: [getDrink("paulaner"), getDrink("porter")],
    hatedDrinks: [getDrink("kriek"), getDrink("limonaad")],
    drinkingSpeed: {
      idleTicks: 0,
      drinkTicks: 5,
    },
    skills: { opening: false, pouring: true },
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
    skills: { opening: true, pouring: true },
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
    skills: { opening: false, pouring: true },
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

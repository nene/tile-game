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
    favoriteDrinks: [
      { drink: "bock", opinion: "Vat see on üks korralik õlu! Mitte mingi lurr!" },
      { drink: "pilsner", opinion: "Oo jaa! See märjuke õlitab iga korralikku korporanti." },
    ],
    hatedDrinks: [
      { drink: "limonaad", opinion: "Õlut, mitte limonaadi!" },
      { drink: "paulaner", opinion: "Seda sakste löga ma oma suu sisse ei võta!" },
      { drink: "porter", opinion: "Öäkk! Misasja sa mulle pakud!" },
    ],
    drinkingSpeed: {
      idleTicks: 10,
      drinkTicks: 6,
    },
    skills: { opening: false, pouring: false },
  }),
  "sass": new AcademicCharacter({
    json: sassJson,
    name: "vil! Aleksandr Popov",
    spriteName: "cfe-ksv-sass",
    moveAnimationFrames: readWalkAnimations(sassJson),
    days: {
      2: { spawnTime: 5 * 10 },
    },
    favoriteDrinks: [
      { drink: "alexander", opinion: "Võid ise arvata, kas ma omanimelist õlut armastan või jumaldan." },
      { drink: "tommu-hiid", opinion: "Mmm... Klassikud on minu lauas alati teretulnud." },
    ],
    hatedDrinks: [
      { drink: "limonaad", opinion: "Õlut, mitte limonaadi!" },
      { drink: "porter", opinion: "Öäkk! Misasja sa mulle pakud!" },
    ],
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
    favoriteDrinks: [
      { drink: "special", opinion: "Üks eriline õlu erilisele mehele. Aitäh!" },
      { drink: "kriek", opinion: "Ooo... see on ju Belgia õllekunsti meistriteos!" },
    ],
    hatedDrinks: [
      { drink: "pilsner", opinion: "Ega ma mingi mats pole, et pilkut kaanin!" },
      { drink: "alexander", opinion: "Lihtrahva õlled las jäävad rebastele. Mulle palun too midagi viisakamat." },
    ],
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
    favoriteDrinks: [
      { drink: "paulaner", opinion: "Seda jooki võiks ette võtta suuremates kogustes!" },
      { drink: "porter", opinion: "Võrratu valik. Tume ja tummine!" },
    ],
    hatedDrinks: [
      { drink: "limonaad", opinion: "Õlut, mitte limonaadi!" },
      { drink: "kriek", opinion: "See on ju naiste õlu! Vii see mõnele neiule, mulle too meeste jooki." },
    ],
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
    favoriteDrinks: [
      { drink: "alexander", opinion: "Vahune sass in iga õllekannu uhkuseks!" },
      { drink: "pilsner", opinion: "Priima! Võid seda vabalt kohe kastiga ette kanda." },
      { drink: "tommu-hiid", opinion: "Tänud. Sellesse pudelisse on villitud pesueht Tartu vaim." },
    ],
    hatedDrinks: [
      { drink: "bock", opinion: "Jeerum, kas ma olen Revelia kaatripäevale sattunud? Vii see tagasi sinne kust sa selle leidsid." },
    ],
    skills: { opening: true, pouring: true },
  }),
  "kark": new AcademicCharacter({
    json: karkJson,
    name: "vil! Raul Tõniste",
    spriteName: "cfe-ksv-kark",
    moveAnimationFrames: readWalkAnimations(karkJson),
    days: {
      2: { spawnTime: 40 * 10 },
    },
    favoriteDrinks: [
      { drink: "paulaner", opinion: "Selle hurmava märjukesega määrin ma vahel ka oma banjo pillikeeli." },
    ],
    hatedDrinks: [
      { drink: "porter", opinion: "See on solvang püha õllekunsti pihta. Kao mu silmist!" },
    ],
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

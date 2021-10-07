import { Coord } from "../Coord";
import { Beer, getBeer } from "../items/Beer";
import { SpriteName } from "../sprites/SpriteLibrary";

export interface Character {
  name: string;
  spriteSet: SpriteName;
  startCoord: Coord;
  chairIndex: number;
  favoriteBeers: Beer[];
  hatedBeers: Beer[];
  spawnTime: number;
}

const charDef = (o: Character) => o;

const characterDefs = {
  "koppel": charDef({
    name: "ksv! Jakob Koppel",
    spriteSet: "cfe-ksv-1",
    startCoord: [150, 150],
    spawnTime: 1 * 10,
    chairIndex: 0,
    favoriteBeers: [getBeer("bock"), getBeer("pilsner")],
    hatedBeers: [getBeer("limonaad"), getBeer("paulaner"), getBeer("porter")],
  }),
  "sass": charDef({
    name: "vil! Aleksander Popov",
    spriteSet: "cfe-ksv-2",
    startCoord: [200, 80],
    spawnTime: 5 * 10,
    chairIndex: 1,
    favoriteBeers: [getBeer("alexander"), getBeer("tommu-hiid")],
    hatedBeers: [getBeer("porter"), getBeer("limonaad")],
  }),
  "pikmets": charDef({
    name: "bvil! Richard Pikmets",
    spriteSet: "cfe-ksv-3",
    startCoord: [30, 240],
    spawnTime: 20 * 10,
    chairIndex: 2,
    favoriteBeers: [getBeer("special"), getBeer("kriek")],
    hatedBeers: [getBeer("alexander"), getBeer("pilsner")],
  }),
};

export type CharacterName = keyof typeof characterDefs;

export function getCharacter(name: CharacterName): Character {
  return characterDefs[name];
}

export function getAllCharacters(): Character[] {
  return Object.values(characterDefs);
}

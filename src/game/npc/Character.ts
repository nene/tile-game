import { Coord } from "../Coord";
import { SpriteName } from "../sprites/SpriteLibrary";

export interface Character {
  name: string;
  spriteSet: SpriteName;
  startCoord: Coord;
  chairIndex: number;
}

const charDef = (o: Character) => o;

const characterDefs = {
  "koppel": charDef({
    name: "ksv! Jakob Koppel",
    spriteSet: "cfe-ksv-1",
    startCoord: [150, 150],
    chairIndex: 0,
  }),
  "sass": charDef({
    name: "vil! Aleksander Popov",
    spriteSet: "cfe-ksv-2",
    startCoord: [200, 80],
    chairIndex: 1,
  }),
  "pikmets": charDef({
    name: "bvil! Richard Pikmets",
    spriteSet: "cfe-ksv-3",
    startCoord: [30, 240],
    chairIndex: 2,
  }),
};

export type CharacterName = keyof typeof characterDefs;

export function getCharacter(name: CharacterName): Character {
  return characterDefs[name];
}

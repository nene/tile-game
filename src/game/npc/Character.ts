import { Drink, getDrink } from "../items/Drink";
import { SpriteName } from "../sprites/SpriteLibrary";

export interface CharacterDef {
  name: string;
  spriteSet: SpriteName;
  favoriteDrinks: Drink[];
  hatedDrinks: Drink[];
  spawnTime: number;
}

export class Character {
  // How much the NPC likes or dislikes the player
  private opinion = 0;

  constructor(private def: CharacterDef) { }

  getName() {
    return this.def.name;
  }

  getSpriteSet() {
    return this.def.spriteSet;
  }

  getSpawnTime() {
    return this.def.spawnTime;
  }

  getFavoriteDrinks() {
    return this.def.favoriteDrinks;
  }

  getHatedDrinks() {
    return this.def.favoriteDrinks;
  }

  getOpinion() {
    return this.opinion;
  }

  changeOpinion(amount: number) {
    this.opinion += amount;
  }
}

const characters = {
  "koppel": new Character({
    name: "ksv! Jakob Koppel",
    spriteSet: "cfe-ksv-2",
    spawnTime: 1 * 10,
    favoriteDrinks: [getDrink("bock"), getDrink("pilsner")],
    hatedDrinks: [getDrink("limonaad"), getDrink("paulaner"), getDrink("porter")],
  }),
  "sass": new Character({
    name: "vil! Aleksander Popov",
    spriteSet: "cfe-ksv-1",
    spawnTime: 5 * 10,
    favoriteDrinks: [getDrink("alexander"), getDrink("tommu-hiid")],
    hatedDrinks: [getDrink("porter"), getDrink("limonaad")],
  }),
  "pikmets": new Character({
    name: "b!vil! Richard Pikmets",
    spriteSet: "cfe-ksv-3",
    spawnTime: 20 * 10,
    favoriteDrinks: [getDrink("special"), getDrink("kriek")],
    hatedDrinks: [getDrink("alexander"), getDrink("pilsner")],
  }),
  "otto": new Character({
    name: "vil! Otto Pukk",
    spriteSet: "cfe-ksv-4",
    spawnTime: 30 * 10,
    favoriteDrinks: [getDrink("paulaner"), getDrink("porter")],
    hatedDrinks: [getDrink("kriek"), getDrink("limonaad")],
  }),
  "karl": new Character({
    name: "ksv! Karl Jõgi",
    spriteSet: "cfe-ksv-5",
    spawnTime: 32 * 10,
    favoriteDrinks: [getDrink("alexander"), getDrink("pilsner"), getDrink("tommu-hiid")],
    hatedDrinks: [getDrink("bock")],
  }),
};

export type CharacterName = keyof typeof characters;

export function getCharacter(name: CharacterName): Character {
  return characters[name];
}

export function getAllCharacters(): Character[] {
  return Object.values(characters);
}

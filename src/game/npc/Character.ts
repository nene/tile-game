import { compact } from "lodash";
import { Drink, getDrink } from "../items/Drink";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary, SpriteName } from "../sprites/SpriteLibrary";
import { constrain } from "../utils/constrain";
import { pickRandom } from "../utils/pickRandom";

export type Desire = "beer" | "question";

export enum ColorBandState {
  correct = 0,
  twisted = 1,
  inverted = 2,
}

interface DayConfig {
  spawnTime: number;
}

export interface CharacterDef {
  name: string;
  spriteName: SpriteName;
  favoriteDrinks: Drink[];
  hatedDrinks: Drink[];
  days: Record<number, DayConfig>;
}

const MAX_BEERS = 2;
const MAX_QUESTIONS = 3;

export class Character {
  // How much the NPC likes or dislikes the player
  private opinion = 0; // 0..10
  // 3 times out of 4 the fraater will remember to write himself into the book
  private willWriteToBook = this.randomWillWriteToBook();
  private beersConsumed = 0;
  private questionsAsked = 0;
  private colorBandState = this.randomColorBandState();
  private today?: DayConfig;

  constructor(private def: CharacterDef) {
  }

  resetForDay(day: number) {
    this.today = this.def.days[day];
    this.willWriteToBook = this.randomWillWriteToBook();
    this.beersConsumed = 0;
    this.questionsAsked = 0;
    this.colorBandState = this.randomColorBandState();
  }

  private randomWillWriteToBook(): boolean {
    return Math.random() < 3 / 4;
  }

  private randomColorBandState(): ColorBandState {
    return pickRandom([ColorBandState.correct, ColorBandState.twisted, ColorBandState.inverted])
  }

  getName() {
    return this.def.name;
  }

  getSpriteName() {
    return this.def.spriteName;
  }

  getFaceSprite(): Sprite {
    // Extract the upper portion (face) of the first sprite
    return {
      ...SpriteLibrary.getSprite(this.def.spriteName, [0, 0]),
      coord: [0, 3],
      size: [16, 16],
      offset: [0, 0],
    };
  }

  getSpawnTime(): number {
    return this.today?.spawnTime ?? Infinity;
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
    this.opinion = constrain(this.opinion + amount, { min: 0, max: 10 });
  }

  isRememberingBookWriting() {
    return this.willWriteToBook;
  }

  getDesires(): Desire[] {
    return compact([
      this.beersConsumed < MAX_BEERS ? "beer" : undefined,
      this.questionsAsked < MAX_QUESTIONS ? "question" : undefined,
    ]);
  }

  satisfyDesire(desire: Desire) {
    switch (desire) {
      case "beer":
        this.beersConsumed++;
        break;
      case "question":
        this.questionsAsked++;
        break;
    }
  }

  getColorBandState(): ColorBandState {
    return this.colorBandState;
  }

  correctColorBand() {
    this.colorBandState = ColorBandState.correct;
  }
}

const characters = {
  "koppel": new Character({
    name: "ksv! Jakob Koppel",
    spriteName: "cfe-ksv-koppel",
    days: {
      2: { spawnTime: 1 * 10 },
    },
    favoriteDrinks: [getDrink("bock"), getDrink("pilsner")],
    hatedDrinks: [getDrink("limonaad"), getDrink("paulaner"), getDrink("porter")],
  }),
  "sass": new Character({
    name: "vil! Aleksander Popov",
    spriteName: "cfe-ksv-sass",
    days: {
      2: { spawnTime: 5 * 10 },
    },
    favoriteDrinks: [getDrink("alexander"), getDrink("tommu-hiid")],
    hatedDrinks: [getDrink("porter"), getDrink("limonaad")],
  }),
  "pikmets": new Character({
    name: "b!vil! Richard Pikmets",
    spriteName: "cfe-ksv-pikmets",
    days: {
      2: { spawnTime: 20 * 10 },
    },
    favoriteDrinks: [getDrink("special"), getDrink("kriek")],
    hatedDrinks: [getDrink("alexander"), getDrink("pilsner")],
  }),
  "otto": new Character({
    name: "vil! Otto Pukk",
    spriteName: "cfe-ksv-otto",
    days: {
      2: { spawnTime: 30 * 10 },
    },
    favoriteDrinks: [getDrink("paulaner"), getDrink("porter")],
    hatedDrinks: [getDrink("kriek"), getDrink("limonaad")],
  }),
  "vanamees": new Character({
    name: "Vanamees",
    spriteName: "cfe-ksv-karl",
    days: {
      1: { spawnTime: 1 * 10 },
      2: { spawnTime: 32 * 10 },
    },
    favoriteDrinks: [getDrink("alexander"), getDrink("pilsner"), getDrink("tommu-hiid")],
    hatedDrinks: [getDrink("bock")],
  }),
  "kark": new Character({
    name: "vil! Raul Tõniste",
    spriteName: "cfe-ksv-kark",
    days: {
      2: { spawnTime: 40 * 10 },
    },
    favoriteDrinks: [getDrink("paulaner")],
    hatedDrinks: [getDrink("porter")],
  }),
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

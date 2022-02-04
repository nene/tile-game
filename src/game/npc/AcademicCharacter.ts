import { compact } from "lodash";
import { Drink, getDrink } from "../items/Drink";
import { SpriteName } from "../sprites/SpriteLibrary";
import { constrain } from "../utils/constrain";
import { pickRandom } from "../utils/pickRandom";
import { Character } from "./Character";
import { createAcademicCharacterActivity } from "../activities/createAcademicCharacterActivity";
import { Facing } from "../npc/Facing";
import { FramesDef } from "../sprites/SpriteAnimation";
import { AsepriteFile } from "../sprites/Aseprite";
import { Table } from "../furniture/Table";
import { BeerGlass } from "../items/BeerGlass";
import { isEmptyBeerBottle } from "../items/BeerBottle";
import { Activity } from "../activities/Activity";
import { IdleActivity } from "../activities/IdleActivity";
import { AcademicCharacterGraphics } from "./AcademicCharacterGraphics";

export type Desire = "beer" | "question";

export enum ColorBandState {
  correct = 0,
  twisted = 1,
  inverted = 2,
}

interface DayConfig {
  spawnTime: number;
}

export interface AcademicCharacterDef {
  json: AsepriteFile;
  name: string;
  spriteName: SpriteName;
  moveAnimationFrames?: Record<Facing, FramesDef>;
  favoriteDrinks: Drink[];
  hatedDrinks: Drink[];
  days: Record<number, DayConfig>;
  drinkingSpeed?: { idleTicks: number; drinkTicks: number };
  skills: {
    opening: boolean;
    pouring: boolean;
  };
}

const MAX_BEERS = 3;
const MAX_QUESTIONS = 0;
const MAX_EMPTY_BOTTLES = 3;

type Fields = {
  table?: Table;
  glass?: BeerGlass;
}
type FieldName = keyof Fields;

export type ValidationResult = { valid: true } | { valid: false, msg: string };

export class AcademicCharacter implements Character {
  private graphics: AcademicCharacterGraphics;
  // How much the NPC likes or dislikes the player
  private opinion = 0; // 0..10
  // 3 times out of 4 the fraater will remember to write himself into the book
  private willWriteToBook = this.randomWillWriteToBook();
  private beersConsumed = 0;
  private questionsAsked = 0;
  private colorBandState = this.randomColorBandState();
  private activity: Activity = new IdleActivity();
  private today?: DayConfig;
  private fields: Fields = {};
  private greetedCharacters = new Set<Character>();

  constructor(private def: AcademicCharacterDef) {
    this.graphics = new AcademicCharacterGraphics(def);
  }

  resetForDay(day: number) {
    this.today = this.def.days[day];
    this.willWriteToBook = this.randomWillWriteToBook();
    this.beersConsumed = 0;
    this.questionsAsked = 0;
    this.colorBandState = this.randomColorBandState();
    this.fields = {};
    this.activity = createAcademicCharacterActivity(this);
    this.greetedCharacters = new Set<Character>();
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

  getGraphics() {
    return this.graphics;
  }

  currentActivity(): Activity {
    return this.activity;
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

  validateDrink(drink: Drink): ValidationResult {
    if (drink === getDrink("water")) {
      return { valid: false, msg: "Vett võid sa ise juua kui tahad." };
    }
    if (drink === getDrink("limonaad")) {
      return { valid: false, msg: "Õlut, mitte limonaadi!" };
    }
    return { valid: true };
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

  getAnnoyance(): "empty-bottles" | undefined {
    const table = this.getField("table");
    if (table && table.getInventory().allItems().filter(isEmptyBeerBottle).length > MAX_EMPTY_BOTTLES) {
      return "empty-bottles";
    }
    return undefined;
  }

  getColorBandState(): ColorBandState {
    return this.colorBandState;
  }

  correctColorBand() {
    this.colorBandState = ColorBandState.correct;
  }

  setField<T extends FieldName>(name: T, value: Fields[T]) {
    this.fields[name] = value;
  }

  getField<T extends FieldName>(name: T): Fields[T] {
    return this.fields[name];
  }

  isGreetable() {
    return true;
  }

  // Returns true when character ha not been greeted yet
  greet(character: Character): boolean {
    if (character === this || this.greetedCharacters.has(character) || !character.isGreetable()) {
      return false;
    } else {
      this.greetedCharacters.add(character);
      return true;
    }
  }

  hasSkill(skill: "opening" | "pouring"): boolean {
    return this.def.skills[skill];
  }
}

export const isAcademicCharacter = (char: Character): char is AcademicCharacter => char instanceof AcademicCharacter;

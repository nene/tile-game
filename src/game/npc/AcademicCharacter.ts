import { compact } from "lodash";
import { Drink, DrinkType, getAllDrinks, getDrink } from "../items/Drink";
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
import { ValidationResult } from "../questions/ValidationResult";
import { isOcean } from "../items/Ocean";
import { AnnoyanceType } from "../activities/AvoidAnnoyancesActivity";
import { GameItem } from "../items/GameItem";

export type Desire = "beer" | "question";

export enum ColorBandState {
  correct = 0,
  twisted = 1,
  inverted = 2,
}

interface DayConfig {
  spawnTime: number;
}

interface DrinkOpinion {
  drink: DrinkType;
  opinion: string;
}

export interface AcademicCharacterDef {
  json: AsepriteFile;
  name: string;
  spriteName: SpriteName;
  moveAnimationFrames: Record<Facing, FramesDef>;
  favoriteDrinks: DrinkOpinion[];
  hatedDrinks: DrinkOpinion[];
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
const MAX_OCEAN = 3;

type Fields = {
  table?: Table;
  glass?: BeerGlass;
}
type FieldName = keyof Fields;

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

  validateDrink(drink: Drink): ValidationResult {
    if (drink === getDrink("water")) {
      return { type: "punish", msg: "Vett võid sa ise juua kui tahad." };
    }
    const badOpinion = this.def.hatedDrinks.find((opinion) => getDrink(opinion.drink) === drink)
    if (badOpinion) {
      return { type: "punish", msg: badOpinion.opinion };
    }
    const goodOpinion = this.def.favoriteDrinks.find((opinion) => getDrink(opinion.drink) === drink)
    if (goodOpinion) {
      return { type: "praise", msg: goodOpinion.opinion };
    }
    return { type: "neutral", msg: "" };
  }

  getValidDrinks(): Drink[] {
    return getAllDrinks().filter((drink) => this.validateDrink(drink).type !== "punish");
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

  getAnnoyance(): AnnoyanceType | undefined {
    if (this.countItemsOnTable(isOcean) > MAX_OCEAN) {
      return "ocean";
    }
    if (this.countItemsOnTable(isEmptyBeerBottle) > MAX_EMPTY_BOTTLES) {
      return "empty-bottles";
    }
    return undefined;
  }

  private countItemsOnTable(predicate: (item: GameItem) => boolean): number {
    const table = this.getField("table");
    return table ? table.getInventory().allItems().filter(predicate).length : 0;
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

  getSpillAmount(): number {
    return 1;
  }
}

export const isAcademicCharacter = (char: Character): char is AcademicCharacter => char instanceof AcademicCharacter;

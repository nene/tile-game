import { AcademicCharacter } from "../npc/AcademicCharacter";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { GameItem } from "./GameItem";

export class Book implements GameItem {
  private entries: AcademicCharacter[] = [];

  getName() {
    return "Majaraamat";
  }

  getSprite(): Sprite {
    return SpriteLibrary.getSprite("book");
  }

  addEntry(char: AcademicCharacter) {
    this.entries.push(char);
  }

  getEntries(): AcademicCharacter[] {
    return this.entries;
  }

  combine() {
    return undefined;
  }
}

export const isBook = (item: GameItem): item is Book => item instanceof Book;

import { AcademicCharacter } from "../npc/AcademicCharacter";
import { Sprite } from "../sprites/Sprite";
import { ItemSpriteLibrary } from "./ItemSpriteLibrary";
import { GameItem } from "./GameItem";

export class Book implements GameItem {
  private entries: AcademicCharacter[] = [];

  getName() {
    return "Majaraamat";
  }

  getSprite(): Sprite {
    return ItemSpriteLibrary.getSprite("book");
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

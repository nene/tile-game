import { AkademicCharacter } from "../npc/Character";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { GameItem } from "./GameItem";

export class Book implements GameItem {
  private entries: AkademicCharacter[] = [];

  getName() {
    return "Majaraamat";
  }

  getSprite(): Sprite {
    return SpriteLibrary.getSprite("book");
  }

  addEntry(char: AkademicCharacter) {
    this.entries.push(char);
  }

  getEntries(): AkademicCharacter[] {
    return this.entries;
  }

  combine() {
    return undefined;
  }
}

export const isBook = (item: GameItem): item is Book => item instanceof Book;

import { Character } from "../npc/Character";
import { Sprite } from "../sprites/Sprite";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { GameItem } from "./GameItem";

export class Book implements GameItem {
  private entries: Character[] = [];

  getName() {
    return "Majaraamat";
  }

  getSprite(): Sprite {
    return SpriteLibrary.getSprite("book");
  }

  addEntry(char: Character) {
    this.entries.push(char);
  }

  getEntries(): Character[] {
    return this.entries;
  }

  combine() {
    return undefined;
  }
}

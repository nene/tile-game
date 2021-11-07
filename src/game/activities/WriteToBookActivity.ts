import { isBookCabinet } from "../furniture/BookCabinet";
import { Book } from "../items/Book";
import { Location } from "../locations/Location";
import { Character } from "../npc/Character";
import { CharacterFigure } from "../npc/CharacterFigure";
import { Activity, ActivityUpdates } from "./Activity";

export class WriteToBookActivity implements Activity {
  private finished = false;

  constructor(private character: Character) {
  }

  tick(figure: CharacterFigure, location: Location): ActivityUpdates {
    if (!this.character.isRememberingBookWriting()) {
      this.finished = true;
      return {};
    }

    const book = this.findBook(location);
    if (book) {
      book.addEntry(this.character);
      this.finished = true;
    }
    return {};
  }

  private findBook(location: Location): Book | undefined {
    const cabinet = location.allObjects().find(isBookCabinet);
    return cabinet?.getBook();
  }

  isFinished() {
    return this.finished;
  }

  isInteractable() {
    return false;
  }

  interact() { }

  nextActivity() {
    return undefined;
  }
}

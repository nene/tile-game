import { AcademicCharacter } from "../../npc/AcademicCharacter";
import { Completion } from "./Completion";

export class EmptyBottlesCompletion implements Completion {
  private complete = false;

  constructor(private character: AcademicCharacter) {
  }

  tryComplete(): boolean {
    return this.character.getAnnoyance() !== "empty-bottles";
  }

  isComplete() {
    return this.complete;
  }

  nextActivity() {
    return undefined;
  }
}

import { Subject } from "rxjs";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { LevelUpSubject, Skill } from "./Skill";

const correctAnswersPerLevel: Record<number, number> = {
  0: 1,
  1: 10,
  2: 10,
  3: 10,
  4: 10,
  5: 10,
  6: 100,
  7: 100,
  8: 100,
  9: 100,
  10: 100,
};

// Skill of answering questions about Uusused and other terminology.
// As the player levels up, questions become harder.
export class TermSkill implements Skill {
  private level = 0;
  private correctAnswers = 0;
  public levelUp$: LevelUpSubject = new Subject();

  getName() {
    return "Uusused";
  }

  getLevel(): number {
    return this.level;
  }

  getProgress(): number {
    return this.correctAnswers / correctAnswersPerLevel[this.level];
  }

  // Notifies about correctly answered question
  rightAnswer() {
    this.correctAnswers++;
    if (this.correctAnswers >= correctAnswersPerLevel[this.level]) {
      this.levelUp();
    }
  }

  // Notifies about incorrectly answered question
  wrongAnswer() {
    // For now, do nothing
  }

  private levelUp() {
    if (this.level < 10) {
      this.level++;
      this.correctAnswers = 0;
      this.levelUp$.next({ skill: this, msg: "Sinu teadmised on jõudnud uuele tasemele!" });
    }
  }

  getIcon() {
    return SpriteLibrary.getSprite("level-up-icons", [1, 0]);
  }
}

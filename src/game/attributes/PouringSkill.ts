import { Subject } from "rxjs";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { LevelUpSubject, Skill } from "./Skill";

const pouringsPerLevel: Record<number, number> = {
  0: 1,
  1: 5,
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

export class PouringSkill implements Skill {
  private level = 0; // number between 0..10
  private pourings = 0;
  public levelUp$: LevelUpSubject = new Subject();

  getName() {
    return "Õllevalamine";
  }

  getLevel(): number {
    return this.level;
  }

  getProgress(): number {
    return this.pourings / pouringsPerLevel[this.level];
  }

  getIcon() {
    return SpriteLibrary.getSprite("level-up-icons", [0, 0]);
  }

  pourDrink() {
    this.pourings++;
    if (this.pourings >= pouringsPerLevel[this.level]) {
      this.levelUp();
    }
  }

  private levelUp() {
    if (this.level < 10) {
      this.level++;
      this.pourings = 0;
      this.levelUp$.next({ skill: this, msg: "Muutud õllevalamises üha osavamaks!" });
    }
  }
}

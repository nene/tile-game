import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { Skill, SkillConfig } from "./Skill";

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

  constructor(private cfg: SkillConfig) { }

  getLevel(): number {
    return this.level;
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
      this.cfg.onLevelUp(this, "Muutud õllevalamises üha osavamaks!");
    }
  }
}

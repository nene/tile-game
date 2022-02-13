import { BehaviorSubject, Subject } from "rxjs";
import { Drink } from "../items/Drink";
import { SpriteLibrary } from "../sprites/SpriteLibrary";
import { constrain } from "../utils/constrain";
import { LevelUpSubject, Skill } from "./Skill";

const drunkennessMinMax = { min: 0, max: 5 };

const levelMultiplier: Record<number, number> = {
  0: 4, // max: 1 pilku
  1: 3, // max: 2 pilkut või sass
  2: 2,
  3: 1.5,
  4: 1.25,
  5: 1,
  6: 0.75,
  7: 0.5,
  8: 0.25,
  9: 0.2,
  10: 0.1,
};

export class AlcoSkill implements Skill {
  private level = 0; // 0 .. 10
  private drunkenness = 0; // 0 .. 5
  // Records the number of sips one has had of each drink
  private sippedDrinks = new Map<Drink, number>();

  public drunkenness$ = new BehaviorSubject(0);
  public levelUp$: LevelUpSubject = new Subject();

  // Consumes 1/4 of a glass (one step from beer glass)
  sip(drink: Drink) {
    if (drink.alcohol > 0) {
      this.drunkenness = constrain(this.drunkenness + this.drunkennessPerSip(drink), drunkennessMinMax);
    } else {
      this.drunkenness = constrain(this.drunkenness - 0.25, drunkennessMinMax);
    }
    this.sippedDrinks.set(drink, (this.sippedDrinks.get(drink) ?? 0) + 1);
    this.drunkenness$.next(this.drunkenness);
  }

  private drunkennessPerSip(drink: Drink) {
    return drink.alcohol * levelMultiplier[this.level] * 0.25;
  }

  private levelUp() {
    if (this.level < 10) {
      this.level++;
      this.levelUp$.next({ skill: this, msg: "Sinu õlletaluvus tõusis uuele tasemele!" });
    }
  }

  getName() {
    return "Õlletaluvus";
  }

  getLevel() {
    return this.level;
  }

  getProgress(): number {
    return this.drunkenness / drunkennessMinMax.max;
  }

  getIcon() {
    return SpriteLibrary.getSprite("level-up-icons", [0, 0]);
  }

  // Returns number between 0...1
  getHandShakeAmount(): number {
    return Math.abs(2 - this.drunkenness) / 3;
  }

  reset() {
    if (this.drunkenness >= drunkennessMinMax.max) {
      this.levelUp();
    }
    this.drunkenness = 0;
  }

  // True when one has consumed at least a glass of the given drink
  knowsDrink(drink: Drink): boolean {
    return (this.sippedDrinks.get(drink) ?? 0) >= 4;
  }
}

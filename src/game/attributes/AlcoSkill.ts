import { Drink } from "../items/Drink";
import { constrain } from "../utils/constrain";

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

export class AlcoSkill {
  private level = 0; // 0 .. 10
  private drunkenness = 0; // 0 .. 5
  private drunkennessChangeCallback?: (drunkenness: number) => void;

  // Consumes 1/4 of a glass (one step from beer glass)
  sip(drink: Drink) {
    if (drink.alcohol > 0) {
      this.drunkenness = constrain(this.drunkenness + this.drunkennessPerSip(drink), drunkennessMinMax);
    } else {
      this.drunkenness = constrain(this.drunkenness - 0.25, drunkennessMinMax);
    }
    this.drunkennessChangeCallback?.(this.drunkenness);
  }

  private drunkennessPerSip(drink: Drink) {
    return drink.alcohol * levelMultiplier[this.level] * 0.25;
  }

  private levelUp() {
    if (this.level < 10) {
      this.level++;
    }
  }

  getLevel() {
    return this.level;
  }

  getDrunkenness() {
    return this.drunkenness;
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

  onDrunkennessChange(callback: (drunkenness: number) => void) {
    this.drunkennessChangeCallback = callback;
  }
}

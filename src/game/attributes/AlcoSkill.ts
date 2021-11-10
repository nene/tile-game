import { Drink } from "../items/Drink";
import { constrain } from "../utils/constrain";

const levelMinMax = { min: 0, max: 5 };

export class AlcoSkill {
  private level = 0; // 0 .. 5

  // Consumes 1/4 of a glass (one level step from beer glass)
  sip(drink: Drink) {
    if (drink.alcohol > 0) {
      this.level = constrain(this.level + 0.25, levelMinMax);
    } else {
      this.level = constrain(this.level - 0.25, levelMinMax);
    }
  }

  getLevel() {
    return this.level;
  }

  // Returns number between 0...1
  getHandShakeAmount(): number {
    return Math.abs(2 - this.level) / 3;
  }

  reset() {
    this.level = 0;
  }
}

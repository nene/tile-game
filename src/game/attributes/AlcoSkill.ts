import { Drink } from "../items/Drink";
import { constrain } from "../utils/constrain";

const levelMinMax = { min: 0, max: 5 };

export class AlcoSkill {
  private drunkenness = 0; // 0 .. 5

  // Consumes 1/4 of a glass (one step from beer glass)
  sip(drink: Drink) {
    if (drink.alcohol > 0) {
      this.drunkenness = constrain(this.drunkenness + 0.25, levelMinMax);
    } else {
      this.drunkenness = constrain(this.drunkenness - 0.25, levelMinMax);
    }
  }

  getDrunkenness() {
    return this.drunkenness;
  }

  // Returns number between 0...1
  getHandShakeAmount(): number {
    return Math.abs(2 - this.drunkenness) / 3;
  }

  reset() {
    this.drunkenness = 0;
  }
}

import { Drink } from "../items/Drink";

const MAX_LEVEL = 5;

export class Drunkenness {
  private level = 0; // 0 .. 5

  // Consumes 1/4 of a glass (one level step from beer glass)
  sip(drink: Drink) {
    if (drink.alcohol > 0) {
      this.level = Math.min(MAX_LEVEL, this.level + 0.25);
    } else {
      this.level = Math.max(0, this.level - 0.25);
    }
  }

  getLevel() {
    return this.level;
  }

  // Returns number between 0...1
  getHandShakeAmount(): number {
    return Math.abs(2 - this.level) / 3;
  }
}

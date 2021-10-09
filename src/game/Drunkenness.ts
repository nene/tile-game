import { BeerGlass } from "./items/BeerGlass";

export class Drunkenness {
  private level = 0; // 0 .. 5

  consume(glass: BeerGlass) {
    this.level += 1;
  }

  getLevel() {
    return this.level;
  }
}

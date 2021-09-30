export class PouringLogic {
  private foamInGlass = 0;
  private beerInGlass = 0;
  private beerInBottle = 1;
  // Must be > 1 (1 means the glass can contain 1 bottle of beer, but no foam)
  private glassSize = 1.3; // 66px of beer + 20px foam

  /**
   * Effecting factors:
   *
   * - Foaminess of beer (determines the amount of foam generated)
   * - drunkenness of player (increases/reduces wobble of the pouring hand)
   * - pouring skill (reduces foaminess)
   */
  constructor(private foamStrength: number) { }

  /**
   * Pours beer at certain rate
   * @param flowRate number between 0.01 .. 1
   */
  pourToGlass(flowRate: number) {
    const amount = this.takeBeerFromBottle(this.flowToAmount(flowRate));
    this.beerInBottle -= amount;
    const [beer, foam] = this.splitBeerAndFoam(amount);
    this.beerInGlass = Math.min(this.glassSize - this.foamInGlass, this.beerInGlass + beer);
    this.foamInGlass = Math.min(this.glassSize - this.beerInGlass, this.foamInGlass + foam);
  }

  pourToGround(flowRate: number) {
    this.beerInBottle -= this.takeBeerFromBottle(this.flowToAmount(flowRate));
  }

  // How much beer flows out of bottle at certain rate
  // - Fastest rate: 3 sec ->  30 ticks (amount 1/30)
  // - Slowest rate: 60sec -> 600 ticks (amount 1/600)
  flowToAmount(x: number): number {
    // The following is a result of solving linear equation:
    // f(x) = ax + b
    // where f(1) = 30
    // where f(0.01) = 600
    const a = (600 - 30) * 100 / -99;
    const b = 30 - a;
    return 1 / (a * x + b);
  }

  private takeBeerFromBottle(amount: number): number {
    if (amount > this.beerInBottle) {
      return this.beerInBottle;
    } else {
      return amount;
    }
  }

  private splitBeerAndFoam(amount: number): [number, number] {
    return [amount, 0];
  }

  getFoamInGlass(): number {
    return this.foamInGlass;
  }

  getBeerInGlass(): number {
    return this.beerInGlass;
  }

  getBeerInBottle(): number {
    return this.beerInBottle;
  }

  isFinished(): boolean {
    return this.isGlassFull() || this.isBottleEmpty();
  }

  private isBottleEmpty(): boolean {
    return this.beerInBottle <= 0.0001;
  }

  private isGlassFull(): boolean {
    return this.beerInGlass + this.foamInGlass >= this.glassSize - 0.0001;
  }
}

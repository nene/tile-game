export interface Foaminess {
  min: number;
  max: number;
}

export class PouringLogic {
  private foamInGlass = 0;
  private liquidInGlass = 0;
  private liquidInBottle = 1;
  // Must be > 1 (1 means the glass can contain 1 bottle of beer, but no foam)
  private glassSize = 1.2; // 90% of beer + 30% of foam

  /**
   * Effecting factors:
   *
   * - Foaminess of beer (determines the amount of foam generated)
   *   - min : the minimum proportion of beer that turns to foam (when poured slowest)
   *   - max : the max proportion of beer that turns to foam (when poured fastest)
   * - drunkenness of player (increases/reduces wobble of the pouring hand)
   * - pouring skill (reduces foaminess)
   */
  constructor(private foam: Foaminess) { }

  /**
   * Pours beer at certain rate
   * @param flowRate number between 0.01 .. 1
   */
  pourToGlass(flowRate: number) {
    if (this.isFinished()) {
      return;
    }
    const amount = this.takeFromBottle(this.flowToAmount(flowRate));
    this.liquidInBottle -= amount;
    const [beer, foam] = this.splitBeerAndFoam(flowRate, amount);
    this.liquidInGlass = Math.min(this.glassSize - this.foamInGlass, this.liquidInGlass + beer);
    this.foamInGlass = Math.min(this.glassSize - this.liquidInGlass, this.foamInGlass + foam);
  }

  pourToGround(flowRate: number) {
    this.liquidInBottle -= this.takeFromBottle(this.flowToAmount(flowRate));
  }

  // How much beer flows out of bottle at certain rate
  // - Fastest rate: 3 sec ->  30 ticks (amount 1/30)
  // - Slowest rate: 60sec -> 600 ticks (amount 1/600)
  flowToAmount(flowRate: number): number {
    return 1 / this.scaleToRange(flowRate, 600, 30);
  }

  private takeFromBottle(amount: number): number {
    if (amount > this.liquidInBottle) {
      return this.liquidInBottle;
    } else {
      return amount;
    }
  }

  // Foam will take 3x the same volume as beer it was generated from
  private splitBeerAndFoam(flowRate: number, amount: number): [number, number] {
    const foamRatio = this.scaleToRange(flowRate, this.foam.min, this.foam.max);
    const foamPart = amount * foamRatio;
    const liquidPart = amount - foamPart;
    return [liquidPart, foamPart * 3];
  }

  // The following is a result of solving linear equation:
  // f(x) = ax + b
  // where f(0.01) = min
  // where f(1) = max
  private scaleToRange(x: number, min: number, max: number) {
    const a = (min - max) * 100 / -99;
    const b = max - a;
    return (a * x + b);
  }

  getFoamInGlass(): number {
    return this.foamInGlass;
  }

  getLiquidInGlass(): number {
    return this.liquidInGlass;
  }

  getLiquidInBottle(): number {
    return this.liquidInBottle;
  }

  // The total of liquid beer + foamed beer
  getTotalInGlass(): number {
    return this.liquidInGlass + this.foamInGlass / 3;
  }

  isFinished(): boolean {
    return this.isGlassFull() || this.isBottleEmpty();
  }

  private isBottleEmpty(): boolean {
    return this.liquidInBottle <= 0.0001;
  }

  private isGlassFull(): boolean {
    return this.liquidInGlass + this.foamInGlass >= this.glassSize - 0.0001;
  }
}

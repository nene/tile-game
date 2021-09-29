export class PouringLogic {
  private foamInGlass = 0;
  private beerInGlass = 0;
  private beerInBottle = 1;

  /**
   * @param glassSize Must be > 1 (1 means the glass can contain 1 bottle of beer, but no foam)
   * @param foamStrength Number between 0..1 (0 means no foam)
   */
  constructor(private glassSize: number, private foamStrength: number) { }

  pourToGlass(wantedAmount: number) {
    const amount = this.takeBeerFromBottle(wantedAmount);
    this.beerInBottle -= amount;
    const [beer, foam] = this.splitBeerAndFoam(amount);
    this.beerInGlass = Math.min(this.glassSize - this.foamInGlass, this.beerInGlass + beer);
    this.foamInGlass = Math.min(this.glassSize - this.beerInGlass, this.foamInGlass + foam);
  }

  pourToGround(amount: number) {
    this.beerInBottle -= this.takeBeerFromBottle(amount);
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

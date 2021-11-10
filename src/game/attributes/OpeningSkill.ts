const bottlesOpenedPerLevel: Record<number, number> = {
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

export class OpeningSkill {
  private level = 0; // number between 0..10
  private bottlesOpened = 0;

  getLevel(): number {
    return this.level;
  }

  openBottle() {
    this.bottlesOpened++;
    if (this.bottlesOpened >= bottlesOpenedPerLevel[this.level]) {
      this.levelUp();
    }
  }

  private levelUp() {
    if (this.level < 10) {
      this.level++;
      this.bottlesOpened = 0;
    }
  }
}

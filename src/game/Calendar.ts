const GAME_HOUR_LENGTH = 60;

const START_TIME = 6 * GAME_HOUR_LENGTH; // 6:00 pm

export class Calendar {
  private ticks = START_TIME;
  private day = 1;

  tick() {
    this.ticks++;
  }

  nextDay() {
    this.day++;
  }

  getDayText(): string {
    return `${this.day}. päev`;
  }

  getTimeText(): string {
    const hours = Math.floor(this.ticks / GAME_HOUR_LENGTH);
    const hours12h = hours % 12 === 0 ? 12 : hours % 12;
    return `kell ${hours12h}`;
  }
}

const GAME_MINUTE_LENGTH = 10;

const START_TIME = 18 * 60 * GAME_MINUTE_LENGTH; // 18:00

export class Calendar {
  private ticks = START_TIME;

  tick() {
    this.ticks++;
  }

  getDisplayText(): string {
    const totalMinutes = Math.floor(this.ticks / GAME_MINUTE_LENGTH)
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes - hours * 60;
    const cappedHours = hours % 24;
    return `${cappedHours}:${String(minutes).padStart(2, "0")}`;
  }
}

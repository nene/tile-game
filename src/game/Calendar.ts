const GAME_HOUR_LENGTH = 60 * 10;

const DAY_START_TIME = 6 * GAME_HOUR_LENGTH; // 6:00 pm
const DAY_END_TIME = (12 + 2) * GAME_HOUR_LENGTH; // 2:00 am

interface CalendarConfig {
  onNextDay: (day: number) => void;
}

export class Calendar {
  private ticks = DAY_START_TIME;
  private day = 1;
  private onNextDay: (day: number) => void;

  constructor({ onNextDay }: CalendarConfig) {
    this.onNextDay = onNextDay;
  }

  tick() {
    this.ticks++;
    if (this.ticks > DAY_END_TIME) {
      this.nextDay();
    }
  }

  private nextDay() {
    this.day++;
    this.ticks = DAY_START_TIME;
    this.onNextDay(this.day);
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

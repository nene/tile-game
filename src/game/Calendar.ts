import { Subject } from "rxjs";
const GAME_HOUR_LENGTH = 60 * 10;

const DAY_START_TIME = 6 * GAME_HOUR_LENGTH; // 6:00 pm
const DAY_END_TIME = (12 + 2) * GAME_HOUR_LENGTH; // 2:00 am

export class Calendar {
  private ticks = DAY_START_TIME;
  private day = 2;

  public dayEnd$ = new Subject<number>();

  endDay() {
    this.dayEnd$.next(this.day);
  }

  tick() {
    this.ticks++;
    if (this.ticks > DAY_END_TIME) {
      this.endDay();
    }
  }

  getDay() {
    return this.day;
  }

  setDay(day: number) {
    this.day = day;
    this.ticks = DAY_START_TIME;
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

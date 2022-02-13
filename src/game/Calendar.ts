import { BehaviorSubject, Subject } from "rxjs";
const GAME_HOUR_LENGTH = 60 * 10;

const DAY_START_TIME = 6 * GAME_HOUR_LENGTH; // 6:00 pm
const DAY_END_TIME = (12 + 2) * GAME_HOUR_LENGTH; // 2:00 am

export type DateTime = { day: number, time: number }

export class Calendar {
  private ticks = DAY_START_TIME;
  private day = 0;

  public dateTime$ = new BehaviorSubject<DateTime>({ day: this.day, time: this.ticksToHours(this.ticks) });
  public dayEnd$ = new Subject<number>();

  endDay() {
    this.dayEnd$.next(this.day);
  }

  tick() {
    this.ticks++;
    this.dateTime$.next({ day: this.day, time: this.ticksToHours(this.ticks) });
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
    this.dateTime$.next({ day: this.day, time: this.ticksToHours(this.ticks) });
  }

  private ticksToHours(ticks: number) {
    const hours = Math.floor(ticks / GAME_HOUR_LENGTH);
    return hours % 12 === 0 ? 12 : hours % 12;
  }
}

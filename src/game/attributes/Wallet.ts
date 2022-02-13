import { BehaviorSubject } from "rxjs";
import { SoundLibrary } from "../sounds/SoundLibrary";

export class Wallet {
  public money$: BehaviorSubject<number>;

  constructor(private money: number) {
    this.money$ = new BehaviorSubject(money);
  }

  getMoney() {
    return this.money;
  }

  add(amount: number) {
    this.money += amount;
    if (amount > 0) {
      SoundLibrary.play("coins");
      this.money$.next(this.money);
    }
  }

  remove(amount: number) {
    this.money -= amount;
    if (amount > 0) {
      SoundLibrary.play("coins");
      this.money$.next(this.money);
    }
  }
}

import { SoundLibrary } from "../sounds/SoundLibrary";

export class Wallet {
  constructor(private money: number) { }

  getMoney() {
    return this.money;
  }

  add(amount: number) {
    this.money += amount;
    if (amount > 0) {
      SoundLibrary.play("coins");
    }
  }

  remove(amount: number) {
    this.money -= amount;
    if (amount > 0) {
      SoundLibrary.play("coins");
    }
  }
}

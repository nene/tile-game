import { SoundLibrary } from "./SoundLibrary";

export class Wallet {
  constructor(private money: number) { }

  getMoney() {
    return this.money;
  }

  add(amount: number) {
    this.money += amount;
  }

  remove(amount: number) {
    this.money -= amount;
    SoundLibrary.play("coins");
  }
}

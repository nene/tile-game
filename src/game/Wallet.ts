import { SoundLibrary } from "./sounds/SoundLibrary";

export class Wallet {
  constructor(private money: number) { }

  getMoney() {
    return this.money;
  }

  add(amount: number) {
    this.money += amount;
    SoundLibrary.play("coins");
  }

  remove(amount: number) {
    this.money -= amount;
    SoundLibrary.play("coins");
  }
}

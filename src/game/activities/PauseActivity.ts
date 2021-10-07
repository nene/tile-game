import { Character } from "../npc/Character";
import { Activity } from "./Activity";

export class PauseActivity implements Activity {
  private tickCounter = 0;
  constructor(private duration: number, private character: Character) { }

  tick() {
    this.tickCounter++;
    return {};
  }

  isFinished() {
    return this.tickCounter === this.duration;
  }

  interact() { }

  nextActivity() {
    return undefined;
  }
}

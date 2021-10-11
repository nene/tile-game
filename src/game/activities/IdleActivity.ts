import { Character } from "../npc/Character";
import { Activity } from "./Activity";

export class IdleActivity implements Activity {
  constructor(private character: Character) { }

  tick() {
    return {};
  }

  isFinished() {
    return false;
  }

  isInteractable() {
    return false;
  }

  interact() { }

  nextActivity() {
    return undefined;
  }
}

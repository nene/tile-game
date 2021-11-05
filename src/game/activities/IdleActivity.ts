import { Activity } from "./Activity";

export class IdleActivity implements Activity {
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

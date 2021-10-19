import { UiController } from "../UiController";
import { Activity } from "./Activity";

export interface Interaction {
  interact: (ui: UiController) => void;
  nextActivity: () => Activity | undefined;
}

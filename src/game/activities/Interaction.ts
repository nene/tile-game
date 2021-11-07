import { UiController } from "../UiController";
import { Activity } from "./Activity";

export enum InteractionType {
  beer = 0,
  water = 1,
  question = 2,
}

export interface Interaction {
  interact: (ui: UiController) => void;
  isFinished: () => boolean;
  nextActivity: () => Activity | undefined;
  getType: () => InteractionType;
}

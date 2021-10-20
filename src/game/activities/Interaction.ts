import { GameWorld } from "../GameWorld";
import { UiController } from "../UiController";
import { Activity } from "./Activity";

export enum InteractionType {
  beer = 0,
  question = 1,
}

export interface Interaction {
  interact: (ui: UiController, world: GameWorld) => void;
  nextActivity: () => Activity | undefined;
  getType: () => InteractionType;
}

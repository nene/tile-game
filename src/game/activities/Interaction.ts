import { GameWorld } from "../GameWorld";
import { UiController } from "../UiController";
import { Activity } from "./Activity";

export interface Interaction {
  interact: (ui: UiController, world: GameWorld) => void;
  nextActivity: () => Activity | undefined;
}
